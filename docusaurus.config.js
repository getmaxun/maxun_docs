// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Maxun',
  tagline: 'Open-Source No-Code Web Data Extraction Platform',
  favicon: 'img/maxunlogo.png',

  // Set the production url of your site here
  url: 'https://docs.maxun.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'getmaxun', // Usually your GitHub org/user name.
  projectName: 'maxun_docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ['rss', 'atom'],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: 'warn',
        //   onInlineAuthors: 'warn',
        //   onUntruncatedBlogPosts: 'warn',
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/maxunlogo.png',
      navbar: {
        title: 'Maxun',
        logo: {
          alt: 'Maxun Logo',
          src: 'img/maxunlogo.png',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'docsSidebar',
          //   position: 'left',
          //   label: 'Docs',
          // },
          {to: 'https://docs.google.com/forms/d/e/1FAIpQLSdbD2uhqC4sbg4eLZ9qrFbyrfkXZ2XsI6dQ0USRCQNZNn5pzg/viewform', label: 'Join Maxun Cloud', position: 'right'},
          {
            to: 'https://github.com/getmaxun/maxun',
            label: 'GitHub',
            position: 'right',
          },
          {
            to: 'https://discord.com/invite/5GbPjBUkws',
            label: 'Discord',
            position: 'right',
          },
          {
            to: 'https://www.youtube.com/@MaxunOSS',
            label: 'Tutorials',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.com/invite/5GbPjBUkws',
              },
              {
                label: 'X (Twitter)',
                href: 'https://x.com/maxun_io',
              },
              {
                href: 'https://www.youtube.com/@MaxunOSS',
                label: 'YouTube',
              },
            ],
          },
          {
            title: 'Open Source',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/getmaxun/maxun',
              },
              {
                label: 'Edit This Site',
                href: 'https://github.com/getmaxun/maxun_docs',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Join Maxun Cloud',
                href: 'https://app.maxun.dev',
              },
              {
                label: 'Website',
                href: 'https://maxun.dev/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Maxun`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
