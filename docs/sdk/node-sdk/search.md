---
id: sdk-search
title: Search
sidebar_position: 5
---

# Search

Perform web searches and optionally scrape content from search results using DuckDuckGo.

## Creating Search Robots

```javascript
import { Search } from 'maxun-sdk';

const searcher = new Search({
  apiKey: process.env.MAXUN_API_KEY
});

const robot = await searcher.create(
  'Tech News Search',
  {
    query: 'artificial intelligence 2025',
    mode: 'discover',
    limit: 10
  }
);
```

## Configuration

### Required Options

**query** (required)

The search query in natural language.

```javascript
{
  query: 'latest AI developments'
}
```

### Optional Configuration

**mode** (optional)

Search mode. Defaults to `discover`.

- `discover` - Returns only search result metadata (title, URL, description)
- `scrape` - Visits each result page and extracts full content

```javascript
{
  mode: 'discover'  // or 'scrape'
}
```

**limit** (optional)

Maximum number of search results to return. Defaults to 10.

```javascript
{
  limit: 20
}
```

**filters** (optional)

Search filters for time range and region.

```javascript
{
  filters: {
    timeRange: 'week',  // 'day', 'week', 'month', 'year'
    region: 'us-en'     // Region code
  }
}
```

**provider** (optional)

Search provider. Currently only `duckduckgo` is supported. Defaults to `duckduckgo`.

```javascript
{
  provider: 'duckduckgo'
}
```

## Search Modes

### Discover Mode

Returns search result metadata only. Fast and lightweight.

```javascript
const robot = await searcher.create(
  'Quick Research',
  {
    query: 'web scraping tools',
    mode: 'discover',
    limit: 10
  }
);

const result = await robot.run();
```

**Returns:**
- Title
- URL
- Description

### Scrape Mode

Visits each search result and extracts full page content.

```javascript
const robot = await searcher.create(
  'Deep Research',
  {
    query: 'machine learning tutorials',
    mode: 'scrape',
    limit: 10
  }
);

const result = await robot.run();
```

**Returns all above plus:**
- Full page metadata
- HTML content
- Clean text content
- Links found on page
- HTTP status code

## Time Filters

Filter results by publication date.

```javascript
// Last 24 hours
{
  filters: { timeRange: 'day' }
}

// Last 7 days
{
  filters: { timeRange: 'week' }
}

// Last 30 days
{
  filters: { timeRange: 'month' }
}

// Last 12 months
{
  filters: { timeRange: 'year' }
}
```

## Examples

### Quick Research

```javascript
const robot = await searcher.create(
  'Topic Research',
  {
    query: 'react best practices 2025',
    mode: 'discover',
    limit: 15,
    filters: {
      timeRange: 'year'
    }
  }
);

const result = await robot.run();

result.data.searchData.forEach(item => {
  console.log('Title:', item.title);
  console.log('URL:', item.url);
  console.log('Description:', item.description);
});
```

### Content Scraping

```javascript
const robot = await searcher.create(
  'Content Analysis',
  {
    query: 'climate change solutions',
    mode: 'scrape',
    limit: 10,
    filters: {
      timeRange: 'month'
    }
  }
);

const result = await robot.run();

result.data.searchData.forEach(item => {
  console.log('URL:', item.metadata?.url);
  console.log('Title:', item.metadata?.title);
  console.log('Content:', item.text);
  console.log('Word count:', item.wordCount);
});
```

### Breaking News

```javascript
const robot = await searcher.create(
  'News Monitor',
  {
    query: 'technology breakthroughs',
    mode: 'scrape',
    limit: 20,
    filters: {
      timeRange: 'day'
    }
  }
);
```

### Competitive Research

```javascript
const robot = await searcher.create(
  'Competitor Analysis',
  {
    query: 'best project management tools',
    mode: 'scrape',
    limit: 30,
    filters: {
      timeRange: 'year'
    }
  }
);
```

### Market Analysis

```javascript
const queries = [
  'AI automation tools',
  'workflow automation software',
  'business process automation'
];

for (const query of queries) {
  const robot = await searcher.create(
    `Market Research: ${query}`,
    {
      query,
      mode: 'discover',
      limit: 20,
      filters: {
        timeRange: 'month'
      }
    }
  );

  const result = await robot.run();
  await saveToDatabase(query, result.data.searchData);
}
```

## Accessing Search Results

### Discover Mode Results

```javascript
const result = await robot.run();

if (result.data.searchData) {
  const results = result.data.searchData;

  results.forEach(item => {
    console.log('Title:', item.title);
    console.log('URL:', item.url);
    console.log('Description:', item.description);
  });
}
```

### Scrape Mode Results

```javascript
const result = await robot.run();

if (result.data.searchData) {
  const results = result.data.searchData;

  results.forEach(item => {
    console.log('URL:', item.metadata?.url);
    console.log('Title:', item.metadata?.title);
    console.log('HTML:', item.html);
    console.log('Text:', item.text);
    console.log('Links:', item.links);
    console.log('Status:', item.metadata?.statusCode);
  });
}
```

## Managing Search Robots

```javascript
// Get all search robots
const robots = await searcher.getRobots();

// Get specific robot
const robot = await searcher.getRobot('robot-id');

// Delete robot
await searcher.deleteRobot('robot-id');
```

## Running Search Robots

```javascript
// Run immediately
const result = await robot.run();

// Run with timeout
const result = await robot.run({
  timeout: 30000
});
```

For scheduling, webhooks, and other robot management features, see <a href="/sdk/node-sdk/sdk-robot">Robot Management</a>.
