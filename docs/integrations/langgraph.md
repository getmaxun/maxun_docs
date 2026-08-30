---
id: langgraph
title: LangGraph
sidebar_position: 5
description: Build stateful multi-step AI workflows with Maxun SDK and LangGraph.
---

# LangGraph

Build stateful, multi-step AI workflows with web scraping using Maxun and LangGraph.

## Setup

Install dependencies:

```bash
npm install maxun-sdk @langchain/langgraph @langchain/openai @langchain/core
```

Create `.env` file:

```env
MAXUN_API_KEY=your_maxun_key
OPENAI_API_KEY=your_openai_key
```

Initialize clients:

```javascript
import { StateGraph, Annotation, START, END, MessagesAnnotation } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { Scrape, Search } from 'maxun-sdk';

const maxun = {
  scrape: new Scrape({ apiKey: process.env.MAXUN_API_KEY }),
  search: new Search({ apiKey: process.env.MAXUN_API_KEY })
};

const llm = new ChatOpenAI({
  model: 'gpt-5-mini',
  apiKey: process.env.OPENAI_API_KEY
});
```

## Basic Workflow

Scrape a website and analyze with LLM:

```javascript
async function basicWorkflow() {
  async function scrapeNode(state: typeof MessagesAnnotation.State) {
    const robot = await maxun.scrape.create('Scraper', 'https://maxun.dev', {
      formats: ['markdown']
    });
    const result = await robot.run();
    const content = result.data.markdown?.slice(0, 3000) || 'No content found';

    return {
      messages: [new SystemMessage(`Here is the webpage content to analyze:\n\n${content}`)]
    };
  }

  async function analyzeNode(state: typeof MessagesAnnotation.State) {
    const messages = state.messages;
    const systemMsg = messages.find(m => m instanceof SystemMessage);
    const humanMsg = messages.find(m => m instanceof HumanMessage);

    const prompt = `Context:\n${systemMsg?.content || ''}\n\nRequest:\n${humanMsg?.content || 'Summarize the content'}`;

    const response = await llm.invoke([new HumanMessage(prompt)]);
    return { messages: [response] };
  }

  const graph = new StateGraph(MessagesAnnotation)
    .addNode('scrape', scrapeNode)
    .addNode('analyze', analyzeNode)
    .addEdge(START, 'scrape')
    .addEdge('scrape', 'analyze')
    .addEdge('analyze', END);

  const app = graph.compile();

  const result = await app.invoke({
    messages: [new HumanMessage('What are the main features of this product?')]
  });

  const lastMessage = result.messages[result.messages.length - 1];
  console.log('Result:', lastMessage.content);
}
```

## Multi-Step Workflow

Search for URLs, scrape them, and summarize:

```javascript
const WorkflowState = Annotation.Root({
  urls: Annotation<string[]>({
    reducer: (_, y) => y,
    default: () => []
  }),
  scrapedData: Annotation<Array<{ url: string; content: string }>>({
    reducer: (_, y) => y,
    default: () => []
  }),
  summary: Annotation<string>({
    reducer: (_, y) => y,
    default: () => ''
  })
});

async function multiStepWorkflow() {
  async function searchNode(state: typeof WorkflowState.State) {
    const robot = await maxun.search.create('Searcher', {
      query: 'best places to visit in Europe',
      mode: 'discover',
      limit: 3
    });
    const result = await robot.run();

    const searchData = result.data.searchData as any;
    const searchResults = searchData ? Object.values(searchData)[0] as any : null;
    const urls = searchResults?.results?.map((r: any) => r.url).filter(Boolean) || [];

    return { urls };
  }

  async function scrapeMultiple(state: typeof WorkflowState.State) {
    const scrapedData = [];

    for (const url of state.urls.slice(0, 2)) {
      try {
        const robot = await maxun.scrape.create('Scraper', url, {
          formats: ['markdown']
        });
        const result = await robot.run();
        scrapedData.push({ url, content: result.data.markdown?.slice(0, 2000) || '' });
      } catch (e) {
        console.log(`Failed: ${url}`);
      }
    }

    return { scrapedData };
  }

  async function summarizeAll(state: typeof WorkflowState.State) {
    const combinedContent = state.scrapedData
      .map(item => `Source: ${item.url}\n${item.content}`)
      .join('\n\n---\n\n');

    const response = await llm.invoke([
      { role: 'user', content: `Summarize the best travel destinations from these sources:\n${combinedContent}` }
    ]);

    return { summary: response.content as string };
  }

  const workflow = new StateGraph(WorkflowState)
    .addNode('search', searchNode)
    .addNode('scrape', scrapeMultiple)
    .addNode('summarize', summarizeAll)
    .addEdge(START, 'search')
    .addEdge('search', 'scrape')
    .addEdge('scrape', 'summarize')
    .addEdge('summarize', END);

  const app = workflow.compile();

  const result = await app.invoke({ urls: [] });
  console.log('Summary:', result.summary);
}
```

## Resources

- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
