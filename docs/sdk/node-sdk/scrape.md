---
id: sdk-scrape
title: Scrape
sidebar_position: 3
---

# Scrape

Convert webpages into clean HTML, LLM-ready Markdown, or screenshots with zero configuration.

## Creating Scrape Robots

```javascript
import { Scrape } from 'maxun-sdk';

const scraper = new Scrape({
  apiKey: process.env.MAXUN_API_KEY
});

const robot = await scraper.create(
  'Content Scraper',
  'https://example.com/article',
  { formats: ['markdown', 'html'] }
);
```

## Output Formats

### Markdown

```javascript
const robot = await scraper.create(
  'Article Scraper',
  'https://blog.example.com/post',
  { formats: ['markdown'] }
);

const result = await robot.run();
console.log(result.data.markdown);
```

### HTML

```javascript
const robot = await scraper.create(
  'HTML Scraper',
  'https://example.com',
  { formats: ['html'] }
);

const result = await robot.run();
console.log(result.data.html);
```

### Screenshots

```javascript
// Visible viewport
const robot = await scraper.create(
  'Screenshot Bot',
  'https://example.com',
  { formats: ['screenshot-visible'] }
);

// Full page
const robot = await scraper.create(
  'Full Page Screenshot',
  'https://example.com',
  { formats: ['screenshot-fullpage'] }
);
```

### Multiple Formats

```javascript
const robot = await scraper.create(
  'Multi-Format Scraper',
  'https://example.com',
  { formats: ['markdown', 'html', 'screenshot-visible'] }
);

const result = await robot.run();
console.log(result.data.markdown);
console.log(result.data.html);
console.log(result.data.screenshots);
```

## Examples

### RAG Pipeline

```javascript
const robot = await scraper.create(
  'RAG Content',
  'https://docs.example.com/guide',
  { formats: ['markdown'] }
);

const result = await robot.run();
const markdown = result.data.markdown;

// Send to embedding service
await createEmbeddings(markdown);
```

### Content Aggregation

```javascript
const urls = [
  'https://blog.example.com/post-1',
  'https://blog.example.com/post-2'
];

for (const url of urls) {
  const robot = await scraper.create(`Article ${url}`, url, {
    formats: ['markdown']
  });

  const result = await robot.run();
  await saveToDatabase(result.data.markdown);
}
```

## Managing Scrape Robots

```javascript
// Get all scrape robots
const robots = await scraper.getRobots();

// Get specific robot
const robot = await scraper.getRobot('robot-id');

// Delete robot
await scraper.deleteRobot('robot-id');
```

## Running Scrape Robots

```javascript
// Run immediately
const result = await robot.run();

// Run with timeout
const result = await robot.run({
  timeout: 30000
});
```

For scheduling, webhooks, and other robot management features, see <a href="/sdk/node-sdk/sdk-robot">Robot Management</a>.
