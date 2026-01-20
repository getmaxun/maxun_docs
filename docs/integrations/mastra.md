---
id: mastra
title: Mastra
sidebar_position: 7
description: Build AI agent workflows with Maxun SDK and Mastra.
---

# Mastra

Build AI agent workflows with web scraping using Maxun and Mastra.

## Setup

Install dependencies:

```bash
npm install maxun-sdk @mastra/core zod
```

Create `.env` file:

```env
MAXUN_API_KEY=your_maxun_key
OPENAI_API_KEY=your_openai_key
```

Initialize clients:

```javascript
import { createWorkflow, createStep } from '@mastra/core/workflows';
import { Agent } from '@mastra/core/agent';
import { z } from 'zod';
import { Scrape, Search } from 'maxun-sdk';

const maxun = {
  scrape: new Scrape({ apiKey: process.env.MAXUN_API_KEY }),
  search: new Search({ apiKey: process.env.MAXUN_API_KEY })
};

const agent = new Agent({
  name: 'summarizer',
  instructions: 'You are a helpful assistant that creates concise summaries.',
  model: {
    id: 'openai/gpt-5-mini',
    apiKey: process.env.OPENAI_API_KEY
  }
});
```

## Multi-Step Workflow

Search, scrape, and summarize:

```javascript
const searchStep = createStep({
  id: 'search',
  inputSchema: z.object({
    query: z.string()
  }),
  outputSchema: z.object({
    url: z.string(),
    title: z.string()
  }),
  execute: async ({ inputData }) => {
    const robot = await maxun.search.create('Searcher', {
      query: inputData.query,
      mode: 'discover',
      limit: 1
    });
    const result = await robot.run();

    const searchData = result.data.searchData as any;
    const searchResults = searchData ? Object.values(searchData)[0] as any : null;
    const firstResult = searchResults?.results?.[0];

    if (!firstResult) {
      throw new Error('No search results found');
    }

    return {
      url: firstResult.url,
      title: firstResult.title
    };
  }
});

const scrapeStep = createStep({
  id: 'scrape',
  inputSchema: z.object({
    url: z.string(),
    title: z.string()
  }),
  outputSchema: z.object({
    markdown: z.string(),
    title: z.string()
  }),
  execute: async ({ inputData }) => {
    const robot = await maxun.scrape.create('Scraper', inputData.url, {
      formats: ['markdown']
    });
    const result = await robot.run();

    return {
      markdown: result.data.markdown?.slice(0, 3000) || '',
      title: inputData.title
    };
  }
});

const summarizeStep = createStep({
  id: 'summarize',
  inputSchema: z.object({
    markdown: z.string(),
    title: z.string()
  }),
  outputSchema: z.object({
    summary: z.string()
  }),
  execute: async ({ inputData }) => {
    const prompt = `Summarize in 2-3 sentences:\n\nTitle: ${inputData.title}\n\n${inputData.markdown}`;
    const result = await agent.generate(prompt);

    return { summary: result.text };
  }
});

const workflow = createWorkflow({
  id: 'search-scrape-summarize',
  inputSchema: z.object({
    query: z.string()
  }),
  outputSchema: z.object({
    summary: z.string()
  }),
  steps: [searchStep, scrapeStep, summarizeStep]
})
  .then(searchStep)
  .then(scrapeStep)
  .then(summarizeStep)
  .commit();
```

## Running the Workflow

```javascript
async function main() {
  const run = await workflow.createRunAsync();
  const result = await run.start({
    inputData: { query: 'best places to visit in Europe' }
  });

  if (result.status === 'success') {
    const { summarize } = result.steps;
    if (summarize.status === 'success') {
      console.log('Summary:', summarize.output.summary);
    }
  } else {
    console.error('Workflow failed:', result.status);
  }
}
```

## Resources

- [Mastra Documentation](https://mastra.ai/docs)
