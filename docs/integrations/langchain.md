---
id: langchain
title: LangChain
sidebar_position: 4
description: Integrate Maxun SDK with LangChain for AI-powered web scraping chains and agents.
---

# LangChain

Build LLM chains and agents with web scraping capabilities using Maxun and LangChain.

## Setup

Install dependencies:

```bash
npm install maxun-sdk @langchain/openai @langchain/core zod
```

Create `.env` file:

```env
MAXUN_API_KEY=your_maxun_key
OPENAI_API_KEY=your_openai_key
```

Initialize clients:

```javascript
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { Scrape, Search } from 'maxun-sdk';

const maxun = {
  scrape: new Scrape({ apiKey: process.env.MAXUN_API_KEY }),
  search: new Search({ apiKey: process.env.MAXUN_API_KEY })
};

const model = new ChatOpenAI({
  model: 'gpt-5-mini',
  apiKey: process.env.OPENAI_API_KEY
});
```

## Scrape + Chat

Scrape a website and chat about its content:

```javascript
async function scrapeAndChat() {
  const robot = await maxun.scrape.create('Scraper', 'https://medium.com', {
    formats: ['markdown']
  });
  const result = await robot.run();

  const response = await model.invoke([
    { role: 'user', content: `Summarize the trending topics in 3 bullet points: ${result.data.markdown?.slice(0, 5000)}` }
  ]);

  console.log('Summary:', response.content);
}
```

## Chains

Use LangChain chains for structured processing:

```javascript
async function useChains() {
  const robot = await maxun.scrape.create('Scraper', 'https://maxun.dev', {
    formats: ['markdown']
  });
  const result = await robot.run();

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', 'You are an expert at analyzing company websites. Be concise.'],
    ['user', 'Extract the company name and main features from: {content}']
  ]);

  const chain = prompt.pipe(model).pipe(new StringOutputParser());

  const analysis = await chain.invoke({
    content: result.data.markdown?.slice(0, 5000)
  });

  console.log('Analysis:', analysis);
}
```

## Tool Calling

Let the LLM decide when to scrape:

```javascript
async function toolCalling() {
  const scrapeTool = new DynamicStructuredTool({
    name: 'scrape_website',
    description: 'Scrape content from any website URL',
    schema: z.object({
      url: z.string().url().describe('The URL to scrape')
    }),
    func: async ({ url }) => {
      const robot = await maxun.scrape.create('Scraper', url, {
        formats: ['markdown']
      });
      const result = await robot.run();
      return result.data.markdown?.slice(0, 3000) || 'No content scraped';
    }
  });

  const modelWithTools = model.bindTools([scrapeTool]);

  const response = await modelWithTools.invoke(
    'What does Stripe do? Visit stripe.com and tell me about it.'
  );

  console.log('Response:', response.content);
  console.log('Tool calls:', response.tool_calls);
}
```

## Search + Analyze

Search the web and analyze results:

```javascript
async function searchAndAnalyze() {
  const robot = await maxun.search.create('Searcher', {
    query: 'best places to visit in Europe',
    mode: 'discover',
    limit: 5
  });
  const result = await robot.run();

  const searchData = result.data.searchData as any;
  const searchResults = searchData ? Object.values(searchData)[0] as any : null;
  const results = searchResults?.results || [];

  const context = results
    .map((r: any) => `${r.title}: ${r.description}`)
    .join('\n');

  const response = await model.invoke([
    { role: 'user', content: `Analyze these travel recommendations and list the top 5 destinations:\n${context}` }
  ]);

  console.log('Analysis:', response.content);
}
```

## Resources

- [LangChain Documentation](https://js.langchain.com/docs/)
