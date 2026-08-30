---
id: openai
title: OpenAI SDK
sidebar_position: 6
description: Integrate Maxun SDK with OpenAI SDK for direct function calling.
---

# OpenAI SDK

Use OpenAI's function calling with Maxun for autonomous web scraping.

## Setup

Install dependencies:

```bash
npm install maxun-sdk openai
```

Create `.env` file:

```env
MAXUN_API_KEY=your_maxun_key
OPENAI_API_KEY=your_openai_key
```

Initialize clients:

```javascript
import OpenAI from 'openai';
import { Scrape, Search } from 'maxun-sdk';

const maxun = {
  scrape: new Scrape({ apiKey: process.env.MAXUN_API_KEY }),
  search: new Search({ apiKey: process.env.MAXUN_API_KEY })
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MODEL = 'gpt-5-mini';
```

## Scrape + Summarize

Scrape a website and summarize with LLM:

```javascript
async function scrapeAndSummarize() {
  const robot = await maxun.scrape.create('Scraper', 'https://medium.com', {
    formats: ['markdown']
  });
  const result = await robot.run();

  const completion = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'user', content: `Summarize the trending topics in 3 bullet points: ${result.data.markdown?.slice(0, 5000)}` }
    ]
  });

  console.log('Summary:', completion.choices[0]?.message.content);
}
```

## Function Calling

Let LLM call Maxun tools automatically:

```javascript
async function functionCalling() {
  const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [{
    type: 'function',
    function: {
      name: 'scrape_website',
      description: 'Scrape content from any website URL',
      parameters: {
        type: 'object',
        properties: {
          url: { type: 'string', description: 'The URL to scrape' }
        },
        required: ['url']
      }
    }
  }];

  const response = await openai.chat.completions.create({
    model: MODEL,
    messages: [{ role: 'user', content: 'What does Maxun do? Visit maxun.dev and tell me.' }],
    tools
  });

  const message = response.choices[0]?.message;

  if (message?.tool_calls && message.tool_calls.length > 0) {
    for (const toolCall of message.tool_calls) {
      if (toolCall.type !== 'function') continue;

      const args = JSON.parse(toolCall.function.arguments);

      const robot = await maxun.scrape.create('Scraper', args.url, {
        formats: ['markdown']
      });
      const result = await robot.run();

      const finalResponse = await openai.chat.completions.create({
        model: MODEL,
        messages: [
          { role: 'user', content: 'What does Maxun do? Visit maxun.dev and tell me.' },
          message,
          {
            role: 'tool',
            tool_call_id: toolCall.id,
            content: result.data.markdown?.slice(0, 3000) || 'No content'
          }
        ]
      });

      console.log('Response:', finalResponse.choices[0]?.message?.content);
    }
  } else {
    console.log('Direct response:', message?.content);
  }
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

  const completion = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'user', content: `Analyze these travel recommendations and list the top 5 destinations:\n${context}` }
    ]
  });

  console.log('Analysis:', completion.choices[0]?.message?.content);
}
```

## Resources

- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Function Calling Guide](https://platform.openai.com/docs/guides/function-calling)
