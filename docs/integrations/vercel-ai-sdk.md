---
id: vercel-ai-sdk
title: Vercel AI SDK
sidebar_position: 5
description: Integrate Maxun SDK with Vercel AI SDK for React and Next.js applications.
---

# Vercel AI SDK

Build AI-powered web applications with scraping capabilities using Maxun and the Vercel AI SDK.

## Setup

Install dependencies:

```bash
npm install maxun-sdk ai @ai-sdk/openai zod
```

Create `.env` file:

```env
MAXUN_API_KEY=your_maxun_key
OPENAI_API_KEY=your_openai_key
```

Initialize clients:

```javascript
import { generateText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { Scrape, Search, Crawl, Extract } from 'maxun-sdk';

const maxun = {
  scrape: new Scrape({ apiKey: process.env.MAXUN_API_KEY }),
  search: new Search({ apiKey: process.env.MAXUN_API_KEY }),
  crawl: new Crawl({ apiKey: process.env.MAXUN_API_KEY }),
  extract: new Extract({ apiKey: process.env.MAXUN_API_KEY })
};

const model = openai('gpt-5-mini');
```

## Defining Tools

```javascript
const scrapeTool = tool({
  description: 'Scrape content from a website URL',
  parameters: z.object({
    url: z.string().url().describe('The URL to scrape')
  }),
  execute: async ({ url }) => {
    const robot = await maxun.scrape.create('Scraper', url, { formats: ['markdown'] });
    const result = await robot.run();
    return result.data.markdown?.slice(0, 3000) || 'No content';
  }
});

const searchTool = tool({
  description: 'Search the web for information',
  parameters: z.object({
    query: z.string().describe('Search query')
  }),
  execute: async ({ query }) => {
    const robot = await maxun.search.create('Searcher', { query, mode: 'discover', limit: 5 });
    const result = await robot.run();
    const searchData = result.data.searchData as any;
    const searchResults = searchData ? Object.values(searchData)[0] as any : null;
    return searchResults?.results || [];
  }
});

const crawlTool = tool({
  description: 'Crawl a website to discover pages',
  parameters: z.object({
    url: z.string().url().describe('The URL to crawl')
  }),
  execute: async ({ url }) => {
    const robot = await maxun.crawl.create('Crawler', url, { mode: 'domain', limit: 5 });
    const result = await robot.run();
    return result.data.crawlData || [];
  }
});

const extractTool = tool({
  description: 'Extract structured data from a website',
  parameters: z.object({
    url: z.string().url().describe('The URL to extract from'),
    prompt: z.string().describe('What to extract')
  }),
  execute: async ({ url, prompt }) => {
    const robot = await maxun.extract.extract({ url, prompt, llmProvider: 'openai' });
    const result = await robot.run();
    return result.data.listData || result.data.textData || {};
  }
});
```

## Scrape

```javascript
async function scrapeExample() {
  const { text } = await generateText({
    model,
    prompt: 'Scrape https://stripe.com and summarize what the company does in 3 bullet points',
    tools: { scrape: scrapeTool },
    maxSteps: 3
  });

  console.log(text);
}
```

## Search

```javascript
async function searchExample() {
  const { text } = await generateText({
    model,
    prompt: 'Search for best places to visit in Europe and recommend the top 5 destinations',
    tools: { search: searchTool },
    maxSteps: 3
  });

  console.log(text);
}
```

## Crawl

```javascript
async function crawlExample() {
  const { text } = await generateText({
    model,
    prompt: 'Crawl https://stripe.com and list the main sections of the website',
    tools: { crawl: crawlTool },
    maxSteps: 3
  });

  console.log(text);
}
```

## Extract

```javascript
async function extractExample() {
  const { text } = await generateText({
    model,
    prompt: 'Extract book titles and prices from https://books.toscrape.com',
    tools: { extract: extractTool },
    maxSteps: 3
  });

  console.log(text);
}
```

## Resources

- [Vercel AI SDK Documentation](https://sdk.vercel.ai/)
