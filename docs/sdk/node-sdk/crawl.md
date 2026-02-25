---
id: sdk-crawl
title: Crawl
sidebar_position: 4
---

# Crawl

Automatically discover and scrape multiple pages from websites using sitemaps and link following.

## Creating Crawl Robots

```javascript
import { Crawl } from 'maxun-sdk';

const crawler = new Crawl({
  apiKey: process.env.MAXUN_API_KEY
});

const robot = await crawler.create(
  'Blog Crawler',
  'https://example.com/blog',
  {
    mode: 'domain',
    limit: 50,
    useSitemap: true,
    followLinks: true
  }
);
```

## Configuration

### Basic Options

**mode** (required)

Defines the crawl scope:
- `domain` - Only pages on the exact same domain
- `subdomain` - Domain and all its subdomains
- `path` - Only pages under the same path

**limit** (optional)

Maximum number of pages to crawl. Defaults to 10.

```javascript
{
  limit: 100
}
```

### Advanced Options

**maxDepth** (optional)

Maximum crawl depth from starting URL. Each link level counts as one depth.

```javascript
{
  maxDepth: 3
}
```

**useSitemap** (optional)

Fetch and parse the website's sitemap.xml. Defaults to `true`.

```javascript
{
  useSitemap: true
}
```

**followLinks** (optional)

Extract and follow links from each visited page. Defaults to `true`.

```javascript
{
  followLinks: true
}
```

**includePaths** (optional)

Regex patterns for URLs to include. Only matching URLs will be crawled.

```javascript
{
  includePaths: ['/blog/[0-9]{4}/.*']
}
```

**excludePaths** (optional)

Regex patterns for URLs to exclude from crawling.

```javascript
{
  excludePaths: ['.*/admin/.*', '.*/tag/.*']
}
```

**respectRobots** (optional)

Respect robots.txt directives. Defaults to `true`.

```javascript
{
  respectRobots: true
}
```

## Crawl Modes

### Domain Mode

```javascript
const robot = await crawler.create(
  'Domain Crawler',
  'https://blog.example.com',
  {
    mode: 'domain',
    limit: 50
  }
);
```

Crawls only `blog.example.com`. Won't crawl `shop.example.com` or `example.com`.

### Subdomain Mode

```javascript
const robot = await crawler.create(
  'Subdomain Crawler',
  'https://example.com',
  {
    mode: 'subdomain',
    limit: 100
  }
);
```

Crawls `example.com`, `blog.example.com`, `shop.example.com`, etc.

### Path Mode

```javascript
const robot = await crawler.create(
  'Path Crawler',
  'https://example.com/blog',
  {
    mode: 'path',
    limit: 50
  }
);
```

Crawls only pages under `/blog/` path.

## Examples

### Blog Crawl

```javascript
const robot = await crawler.create(
  'Blog Posts',
  'https://example.com/blog',
  {
    mode: 'path',
    limit: 50,
    useSitemap: true,
    followLinks: true
  }
);

const result = await robot.run();
console.log('Pages crawled:', result.data.crawlData.length);
```

### Documentation Crawl

```javascript
const robot = await crawler.create(
  'Documentation',
  'https://docs.example.com',
  {
    mode: 'subdomain',
    limit: 200,
    useSitemap: true,
    followLinks: false,
    maxDepth: 5
  }
);
```

### Filtered Crawl

```javascript
const robot = await crawler.create(
  'Product Pages',
  'https://example.com',
  {
    mode: 'domain',
    limit: 100,
    includePaths: ['/products/.*'],
    excludePaths: ['.*/reviews/.*', '.*/comments/.*'],
    useSitemap: true,
    followLinks: true
  }
);
```

### Full Site Crawl

```javascript
const robot = await crawler.create(
  'Full Site',
  'https://example.com',
  {
    mode: 'subdomain',
    limit: 500,
    excludePaths: ['.*/admin/.*', '.*/login.*'],
    useSitemap: true,
    followLinks: true,
    respectRobots: true
  }
);
```

## Accessing Crawl Results

```javascript
const result = await robot.run();

if (result.data.crawlData) {
  const pages = result.data.crawlData;

  pages.forEach(page => {
    console.log('URL:', page.metadata?.url);
    console.log('Title:', page.metadata?.title);
    console.log('Word count:', page.wordCount);
    console.log('Status:', page.metadata?.statusCode);
  });
}
```

Each page contains:
- **metadata** - URL, title, description, language, meta tags, favicon, status code
- **html** - Full page HTML
- **text** - Clean body text
- **wordCount** - Number of words
- **links** - All links found on the page

## Managing Crawl Robots

```javascript
// Get all crawl robots
const robots = await crawler.getRobots();

// Get specific robot
const robot = await crawler.getRobot('robot-id');

// Delete robot
await crawler.deleteRobot('robot-id');
```

## Running Crawl Robots

```javascript
// Run immediately
const result = await robot.run();

// Run with timeout
const result = await robot.run({
  timeout: 60000
});
```

For scheduling, webhooks, and other robot management features, see <a href="/sdk/node-sdk/sdk-robot">Robot Management</a>.
