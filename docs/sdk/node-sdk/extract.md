---
id: sdk-extract
title: Extract
sidebar_position: 2
---

# Extract

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

### Non LLM Extraction

For non-LLM extraction, you define exact CSS selectors to capture data from web pages.

```javascript
import { Extract } from 'maxun-sdk';

const extractor = new Extract({
  apiKey: process.env.MAXUN_API_KEY
});

const robot = await extractor
  .create('Product Extractor')
  .navigate('https://example.com/products')
  .captureText({
    productName: '.product-title',
    price: '.price'
  });
```

### Key Features

### 1. Auto List Capture

When using `captureList`, you only need to provide the list item selector. Maxun automatically:
- Detects all meaningful fields within each list item
- Extracts clean, structured data from those fields

```javascript
.captureList({ 
  selector: '.product-card'  // That's it! Maxun finds all fields inside
})
```

###  2. Auto Pagination (Optional)

Pagination is completely optional. When you **don't specify** the `pagination` field, Maxun automatically detects and handles pagination for you.

```javascript
.captureList({ 
  selector: '.product-card',
  maxItems: 100
})
```

### 3. Pagination with Selectors

For precise control, specify the pagination type and selector

```javascript
.captureList({ 
  selector: '.product-card',
  pagination: {
    type: 'clickNext',
    selector: 'button.next-page'
  },
  maxItems: 100
})
```

**Pagination Types**

| Type | Description | Selector Required? | Example |
|------|-------------|-------------------|---------|
| `scrollDown` | Infinite scroll (downward) | ❌ No | `{ type: 'scrollDown' }` |
| `scrollUp` | Infinite scroll (upward) | ❌ No | `{ type: 'scrollUp' }` |
| `clickNext` | Click "Next" button/link | ✅ Yes | `{ type: 'clickNext', selector: 'a.next' }` |
| `clickLoadMore` | Click "Load More" button | ✅ Yes | `{ type: 'clickLoadMore', selector: 'button.load-more' }` |

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

Extract data from lists with automatic field detection. See [Key Features](#key-features) above for details on auto list capture and pagination.

```javascript
// Simple - auto-detects all fields
.captureList({
  selector: '.product-item'
}, 'Products')

// With pagination
.captureList({
  selector: '.product-item',
  pagination: { type: 'scrollDown' },
  maxItems: 50
}, 'Products')
```

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
    selector: 'article.news-item',
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
  .captureList({ selector: '.result-item' });
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

See <a href="/sdk/node-sdk/sdk-robot">Robot Management</a> for scheduling and webhooks.
