// @ts-check
/**
 * Makes the docs easy for LLMs and AI agents to read:
 *
 *   /llms-full.txt   every doc page concatenated into one Markdown file
 *   /<page>.md       the Markdown source of each page (e.g. /quickstart.md,
 *                    /index.md for the home page)
 *
 * /llms.txt is written by hand in static/llms.txt.
 */
const fs = require('fs');
const path = require('path');

const SIDEBAR_ORDER = ['docsSidebar', 'aiSidebar', 'apiSidebar', 'sdkSidebar'];

/** Strip front matter and MDX-only lines so the output is plain Markdown. */
function toPlainMarkdown(raw) {
  let body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
  body = body
    .split('\n')
    .filter((line) => !/^(import|export)\s.+from\s+['"].+['"];?\s*$/.test(line))
    .join('\n');
  return body.trim();
}

/** @param {string} permalink */
function markdownPathFor(permalink) {
  const clean = permalink.replace(/\/+$/, '');
  return clean === '' ? 'index.md' : `${clean.replace(/^\//, '')}.md`;
}

/** @param {{file: string}} doc */
function readMarkdown(doc) {
  return `${toPlainMarkdown(fs.readFileSync(doc.file, 'utf8'))}\n`;
}

/**
 * @param {Array<{title: string, permalink: string, file: string}>} docs
 * @param {import('@docusaurus/types').DocusaurusConfig} siteConfig
 */
function renderLlmsFull(docs, siteConfig) {
  const site = siteConfig.url.replace(/\/$/, '');
  const header = [
    `# ${siteConfig.title} Documentation (full text)`,
    '',
    `> ${siteConfig.tagline}`,
    '',
    `Every page of ${site} as Markdown, for LLMs and AI agents. For a shorter map of the docs, see ${site}/llms.txt. Any page is also available as Markdown by adding .md to its URL (for example ${site}/quickstart.md).`,
  ].join('\n');
  const sections = docs.map(
    (doc) =>
      `<page url="${site}${doc.permalink}" title="${doc.title.replace(/"/g, '&quot;')}">\n\n${readMarkdown(doc).trim()}\n\n</page>`,
  );
  return `${header}\n\n${sections.join('\n\n')}\n`;
}

/**
 * Docusaurus adds this middleware in its own setupMiddlewares, which ours
 * replaces, so add it back (it powers the dev error overlay's source view).
 */
function loadEvalSourceMapMiddleware() {
  try {
    const mod = require('@docusaurus/core/lib/commands/utils/legacy/evalSourceMapMiddleware');
    return mod.default || mod;
  } catch {
    return null;
  }
}

/** @type {import('@docusaurus/types').PluginModule} */
module.exports = function llmsMarkdownPlugin(context) {
  /** @type {Array<{title: string, description?: string, permalink: string, file: string, rank: number}>} */
  let docs = [];

  return {
    name: 'llms-markdown',

    async allContentLoaded({allContent}) {
      const docsContent = allContent['docusaurus-plugin-content-docs']?.default;
      const version = docsContent?.loadedVersions?.[0];
      if (!version) return;

      // Order pages the way they appear in the sidebars: Documentation, AI, API, SDKs.
      const order = new Map();
      const visit = (items) => {
        for (const item of items ?? []) {
          if ((item.type === 'doc' || item.type === 'ref') && !order.has(item.id)) {
            order.set(item.id, order.size);
          }
          if (item.type === 'category') {
            if (item.link?.type === 'doc' && !order.has(item.link.id)) {
              order.set(item.link.id, order.size);
            }
            visit(item.items);
          }
        }
      };
      for (const name of SIDEBAR_ORDER) visit(version.sidebars?.[name]);

      docs = version.docs
        .filter((doc) => !doc.unlisted && !doc.draft)
        .map((doc) => ({
          title: doc.title,
          description: doc.description,
          permalink: doc.permalink,
          rank: order.get(doc.id) ?? Number.MAX_SAFE_INTEGER,
          file: path.join(context.siteDir, doc.source.replace(/^@site[\\/]/, '')),
        }))
        .sort((a, b) => a.rank - b.rank || a.file.localeCompare(b.file));
    },

    async postBuild({outDir}) {
      for (const doc of docs) {
        const mdPath = path.join(outDir, markdownPathFor(doc.permalink));
        fs.mkdirSync(path.dirname(mdPath), {recursive: true});
        fs.writeFileSync(mdPath, readMarkdown(doc));
      }
      fs.writeFileSync(path.join(outDir, 'llms-full.txt'), renderLlmsFull(docs, context.siteConfig));
    },

    // `npm start` only serves the React app, so serve the same files from
    // the dev server too. Production builds use the files written above.
    configureWebpack(config, isServer, utils) {
      if (isServer || process.env.NODE_ENV === 'production') return {};
      return {
        devServer: {
          setupMiddlewares(middlewares, devServer) {
            const sourceMaps = loadEvalSourceMapMiddleware();
            if (sourceMaps) middlewares.unshift(sourceMaps(devServer));
            middlewares.unshift({
              name: 'llms-markdown',
              middleware(req, res, next) {
                const url = decodeURIComponent((req.url || '').split('?')[0]);
                if (url === '/llms-full.txt') {
                  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                  return res.end(renderLlmsFull(docs, context.siteConfig));
                }
                if (url.endsWith('.md')) {
                  const doc = docs.find((d) => `/${markdownPathFor(d.permalink)}` === url);
                  if (doc) {
                    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
                    return res.end(readMarkdown(doc));
                  }
                }
                return next();
              },
            });
            return middlewares;
          },
        },
      };
    },
  };
};
