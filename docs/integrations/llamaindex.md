---
id: llamaindex
title: LlamaIndex
sidebar_position: 8
description: Build RAG applications with Maxun SDK and LlamaIndex.
---

# LlamaIndex

Build RAG (Retrieval-Augmented Generation) applications with web scraping using Maxun and LlamaIndex.

## Setup

Install dependencies:

```bash
npm install maxun-sdk llamaindex @llamaindex/openai
```

Create `.env` file:

```env
MAXUN_API_KEY=your_maxun_key
OPENAI_API_KEY=your_openai_key
```

Initialize clients:

```javascript
import { Document, VectorStoreIndex, Settings } from 'llamaindex';
import { OpenAI, OpenAIEmbedding } from '@llamaindex/openai';
import { Scrape, Search } from 'maxun-sdk';

Settings.llm = new OpenAI({ model: 'gpt-5-mini' });
Settings.embedModel = new OpenAIEmbedding({ model: 'text-embedding-3-small' });

const maxun = {
  scrape: new Scrape({ apiKey: process.env.MAXUN_API_KEY }),
  search: new Search({ apiKey: process.env.MAXUN_API_KEY })
};
```

## RAG with Single Page

Scrape a website and answer questions about it:

```javascript
async function ragSinglePage() {
  const robot = await maxun.scrape.create('Scraper', 'https://www.ycombinator.com/jobs', {
    formats: ['markdown']
  });
  const result = await robot.run();

  const document = new Document({
    text: result.data.markdown?.slice(0, 5000) || '',
    id_: 'ycombinator-jobs',
    metadata: { url: 'https://www.ycombinator.com/jobs' }
  });

  const index = await VectorStoreIndex.fromDocuments([document]);

  const queryEngine = index.asQueryEngine();
  const response = await queryEngine.query({
    query: 'What job opportunities are available at YC startups?'
  });

  console.log('Answer:', response.toString());
}
```

## RAG with Multiple Pages

Search for pages, scrape them, and build a knowledge base:

```javascript
async function ragMultiplePages() {
  const searchRobot = await maxun.search.create('Searcher', {
    query: 'best places to visit in Europe',
    mode: 'discover',
    limit: 3
  });
  const searchResult = await searchRobot.run();

  const searchData = searchResult.data.searchData as any;
  const searchResults = searchData ? Object.values(searchData)[0] as any : null;
  const urls = searchResults?.results?.map((r: any) => r.url).filter(Boolean) || [];

  const documents: Document[] = [];
  for (const url of urls.slice(0, 2)) {
    try {
      const robot = await maxun.scrape.create('Scraper', url, {
        formats: ['markdown']
      });
      const result = await robot.run();

      documents.push(new Document({
        text: result.data.markdown?.slice(0, 3000) || '',
        id_: url,
        metadata: { url }
      }));
    } catch (e) {
      console.log(`Failed: ${url}`);
    }
  }

  const index = await VectorStoreIndex.fromDocuments(documents);

  const queryEngine = index.asQueryEngine();
  const response = await queryEngine.query({
    query: 'What are the top recommended destinations in Europe and why?'
  });

  console.log('Answer:', response.toString());
}
```

## Resources

- [LlamaIndex Documentation](https://ts.llamaindex.ai/)
