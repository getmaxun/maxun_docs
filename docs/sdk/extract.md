---
id: sdk-extract
title: Extract
sidebar_position: 2
---

# Extract Robots

Build structured data extraction workflows programmatically using the SDK.

## Creating Extract Robots
Extract robots can be created using LLM-based extraction or non-LLM rules.

### LLM Extraction (Beta)

Create robots using natural language.

```javascript
const robot = await extractor.extract('https://example.com', {
  prompt: 'Extract first 20 product names and prices',
  llmProvider: 'anthropic',
  llmApiKey: process.env.ANTHROPIC_API_KEY
});
```

See <a href="/robot/extract/llm-extraction">AI Mode</a> for provider details and <a href="/llm-prompts">LLM Extraction Prompts</a> for writing effective prompts.


```javascript
import { Extract } from 'maxun-sdk';

const extractor = new Extract({
  apiKey: process.env.MAXUN_API_KEY
});

const robot = await extractor
  .create('Product Scraper')
  .navigate('https://example.com/products')
  .captureText({
    productName: '.product-title',
    price: '.price'
  });
```

## Methods

### Navigation

**navigate(url)**

```javascript
.navigate('https://example.com')
```

### Data Extraction

**captureText(fields, name?)**

Extract specific text fields using CSS selectors:

```javascript
.captureText({
  title: '.article-title',
  author: '.author-name'
}, 'Article Info')
```

**captureList(config, name?)**

Automatically extracts all data fields found within each list item. Just provide the list selector—Maxun detects and extracts all fields automatically.

```javascript
.captureList({
  selector: '.product-item',  // All fields within each item are auto-extracted
  pagination: {
    type: 'clickNext',
    selector: 'button.next-page'
  },
  maxItems: 50
}, 'Products')
```

**Pagination types:** `scrollDown`, `clickNext`, `clickLoadMore`, `scrollUp`

**captureScreenshot(name?, options?)**

```javascript
.captureScreenshot('Homepage', { fullPage: true })
```

### Interaction

**click(selector)**

```javascript
.click('button.show-more')
```

**type(selector, text, inputType?)**

```javascript
.type('input[name="search"]', 'web scraping', 'text')
```

Input types: `text`, `email`, `password`, `number`, `tel`, `url`

**scroll(direction, distance?)**

```javascript
.scroll('down', 500)
.scroll('up')
```

### Waiting

**waitFor(selector, timeout?)**

```javascript
.waitFor('.dynamic-content', 5000)
```

**wait(milliseconds)**

```javascript
.wait(2000)
```

### Configuration

**setCookies(cookies)**

```javascript
.setCookies([
  { name: 'session', value: 'abc123', domain: '.example.com' }
])
```

## Examples

### List with Pagination

```javascript
const robot = await extractor
  .create('News Articles')
  .navigate('https://news.example.com')
  .captureList({
    selector: 'article.news-item',  // All data within each article is automatically extracted
    pagination: {
      type: 'clickNext',
      selector: 'a.next-page'
    },
    maxItems: 100
  });

const result = await robot.run();
```

### Multi-Step Workflow

```javascript
const robot = await extractor
  .create('Search Results')
  .navigate('https://example.com')
  .type('input[name="q"]', 'data extraction')
  .click('button[type="submit"]')
  .waitFor('.results')
  .captureList({ selector: '.result-item' });  // Automatically extracts all fields from each result
```

### Form Fill

```javascript
const robot = await extractor
  .create('Login and Extract')
  .navigate('https://example.com/login')
  .type('input[name="email"]', 'user@example.com', 'email')
  .type('input[name="password"]', 'password123', 'password')
  .click('button[type="submit"]')
  .waitFor('.dashboard')
  .captureText({
    username: '.user-name',
    balance: '.account-balance'
  });
```

## Managing Robots

### Get All Robots

```javascript
const robots = await extractor.getRobots();
```

### Get Specific Robot

```javascript
const robot = await extractor.getRobot('robot-id');
```

### Delete Robot

```javascript
await extractor.deleteRobot('robot-id');
```

## Running Robots

```javascript
// Run immediately
const result = await robot.run();

// Run with options
const result = await robot.run({
  waitForCompletion: true,
  timeout: 60000
});
```

See <a href="/sdk/sdk-robot">Robot Management</a> for scheduling and webhooks.
