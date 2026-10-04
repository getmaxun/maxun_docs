---
id: sdk-scrape
title: "Node.js: Scrape Websites to Markdown & HTML"
description: "Scrape any webpage to Markdown, HTML, text, links, screenshots or AI summaries with the Maxun Node.js SDK."
sidebar_label: "Scrape"
sidebar_position: 2
---

# Scrape

A scrape robot turns a web page into clean Markdown, HTML, plain text, a list of links, an AI summary or screenshots.

```javascript
import { Maxun } from 'maxun-sdk';

const maxun = new Maxun();

const robot = await maxun.scrape('Example page', 'https://example.com');
const result = await robot.run();

console.log(result.markdown);
```

`maxun.scrape(name, url)` saves the robot on your account. Run it again any time with `await robot.run()`.

## Output formats

Choose what you want back with `formats`. The default is `['markdown']`.

| Format | Read it from | What you get |
|---|---|---|
| `markdown` | `result.markdown` | The page as clean Markdown, ready for an LLM |
| `html` | `result.html` | The page's HTML |
| `text` | `result.text` | The page's visible text |
| `links` | `result.links` | Every link on the page |
| `summary` | `result.summary` | An AI-written summary of the page |
| `screenshot-visible` | `result.screenshots` | A screenshot of the visible part of the page |
| `screenshot-fullpage` | `result.screenshots` | A screenshot of the whole page |

Ask for as many formats as you need in one robot:

```javascript
const robot = await maxun.scrape('Pricing page', 'https://example.com/pricing', {
  formats: ['markdown', 'links', 'screenshot-fullpage'],
});

const result = await robot.run();

console.log(result.markdown);
console.log(result.links);
console.log(result.screenshots);
```

The result only contains the formats the robot produced:

```javascript
console.log(result);
// {
//   runId: 'b05cea93-…',
//   status: 'success',
//   markdown: '# Pricing\n\n…',
//   links: [ … ],
//   screenshots: [ … ]
// }
```

### Summary

`summary` adds a short AI-written summary next to the other formats:

```javascript
const robot = await maxun.scrape('Blog post', 'https://blog.example.com/post', {
  formats: ['markdown', 'summary'],
});

const result = await robot.run();
console.log(result.summary);
```

## Smart Queries

A Smart Query is a question about the page. Maxun scrapes the page, then an LLM answers your question on every run.

```javascript
const robot = await maxun.scrape('Pricing plans', 'https://example.com/pricing', {
  smartQueries: 'List every plan with its monthly price.',
});

const result = await robot.run();
console.log(result.smartQueryResult);
```

You can also ask a different question for a single run, without changing the robot:

```javascript
const result = await robot.run({ smartQueries: 'Which plan includes SSO?' });
console.log(result.smartQueryResult);
```

:::note
`summary` and Smart Queries use an LLM. On Maxun Cloud this is handled for you. On self-hosted Maxun, add the [LLM settings](#llm-settings-self-hosted) below.
:::

## Options

| Option | Default | Description |
|---|---|---|
| `formats` | `['markdown']` | Output formats (see above) |
| `smartQueries` | none | A question an LLM answers about the page on every run |
| `monitor` | `false` | Compare every run with the previous one. See [Monitoring](./sdk-monitoring) |
| `llmProvider`, `llmModel`, `llmApiKey`, `llmBaseUrl` | none | Self-hosted Maxun only, see below |

## Running a scrape robot

```javascript
const result = await robot.run();
```

`run()` waits until the page is scraped and returns the result. You can change the formats for a single run:

```javascript
const result = await robot.run({ formats: ['html'] });
console.log(result.html);
```

If the run fails, `run()` throws `RunFailedError`. See [Robot Management](./sdk-robot) for run history, schedules and webhooks.

## LLM settings (self-hosted)

Self-hosted Maxun has no built-in LLM, so `summary` and Smart Queries need one:

```javascript
const robot = await maxun.scrape('Pricing plans', 'https://example.com/pricing', {
  smartQueries: 'List every plan with its monthly price.',
  llmProvider: 'anthropic',        // 'anthropic', 'openai' or 'ollama'
  llmApiKey: 'your-llm-api-key',   // required for anthropic and openai
  llmModel: 'claude-sonnet-4-5',   // optional
});
```

:::caution
Do not pass `llm*` options on Maxun Cloud. Cloud manages the model for you and rejects them.
:::

## Examples

### Feed a RAG pipeline

```javascript
const robot = await maxun.scrape('Docs guide', 'https://docs.example.com/guide');
const result = await robot.run();

await createEmbeddings(result.markdown);
```

### Scrape several pages

Give each robot its own name:

```javascript
const pages = {
  'Post: Launch week': 'https://blog.example.com/launch-week',
  'Post: Pricing update': 'https://blog.example.com/pricing-update',
};

for (const [name, url] of Object.entries(pages)) {
  const robot = await maxun.scrape(name, url);
  const result = await robot.run();
  await saveToDatabase(url, result.markdown);
}
```

### Use an existing robot

```javascript
const robot = await maxun.robots.find('Pricing plans');   // by name
const result = await robot.run();
```

List your scrape robots with `await maxun.scrape.list()`. See [Robot Management](./sdk-robot) for everything else you can do with a robot.