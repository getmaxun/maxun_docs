---
id: sdk-extract
title: Extract
sidebar_position: 3
---

# Extract

An extract robot pulls structured data (product lists, prices, job postings, tables) out of web pages. There are two ways to build one with Maxun SDK:

- **With a prompt**: describe the data in plain English and Maxun builds the robot for you.
- **With selectors**: list the steps and CSS or XPath selectors yourself, for precise and predictable results.

Both return a [`Robot`](./sdk-robot) that you can run as often as you like.

## Extract with a prompt

```javascript
const robot = await maxun.extract('YC companies', 'https://www.ycombinator.com/companies', {
  prompt: 'Company name, description and batch for the first 15 companies',
});

const result = await robot.run();

for (const company of result.listData) {
  console.log(company);
}
```

```javascript
{ 'Company name': 'Airbnb', Description: 'Book accommodations around the world.', Batch: 'W09' }
{ 'Company name': 'Stripe', Description: 'Economic infrastructure for the internet.', Batch: 'S09' }
...
```

### Without a URL

Leave the URL out and Maxun searches the web for a suitable page first:

```javascript
const robot = await maxun.extract('Top AI startups', {
  prompt: 'Names and funding of the top 10 AI startups from YCombinator',
});
```

### LLM settings (self-hosted)

On Maxun Cloud, a prompt is all you need. Self-hosted Maxun has no built-in LLM, so pass one:

```javascript
const robot = await maxun.extract('Products', 'https://shop.example.com', {
  prompt: 'Product names and prices',
  llmProvider: 'anthropic',        // 'anthropic', 'openai' or 'ollama'
  llmApiKey: 'your-llm-api-key',   // required for anthropic and openai
  llmModel: 'claude-sonnet-4-5',   // optional
  // llmBaseUrl: 'http://localhost:11434',   // optional, e.g. your Ollama server
});
```

:::caution
Do not pass `llm*` options on Maxun Cloud. Cloud manages the model for you and rejects them.
:::

## Extract with selectors

`maxun.extract(name, url)` starts a robot on that page. Chain the steps you want, then finish with `.build()`:

```javascript
const robot = await maxun
  .extract('Bookstore', 'https://books.toscrape.com')
  .captureText({ Heading: 'h1' })
  .captureList({ selector: 'article.product_pod', maxItems: 20 })
  .build();

const result = await robot.run();

console.log(result.textData);   // { Heading: 'All products' }
console.log(result.listData);   // [ {...}, {...}, ... ]
```

Selector robots don't use an LLM, so they work the same on Maxun Cloud and self-hosted Maxun.

### Capture text

`captureText` reads single values. Give each field a name and a selector:

```javascript
.captureText({
  Title: 'h1.article-title',
  Author: '.author-name',
  Published: 'time',
})
```

The values are in `result.textData`. CSS and XPath selectors both work.

### Capture a list

`captureList` reads every element that matches a selector. The fields inside each item are detected automatically:

```javascript
.captureList({ selector: 'article.product_pod', maxItems: 50 })
```

The items are in `result.listData`. `maxItems` defaults to 100.

### Pagination

Maxun detects pagination automatically. To control it yourself, add `pagination`:

```javascript
// Click a "Next" button
.captureList({
  selector: 'article.product_pod',
  maxItems: 100,
  pagination: { type: 'clickNext', selector: 'li.next a' },
})

// Click a "Load more" button
.captureList({ selector: '.card', pagination: { type: 'clickLoadMore', selector: 'button.load-more' } })

// Infinite scroll
.captureList({ selector: '.feed-item', pagination: { type: 'scrollDown' } })

// First page only
.captureList({ selector: '.result', pagination: { type: 'none' } })
```

| `type` | Use it for | Needs `selector` |
|---|---|---|
| `clickNext` | A "Next" button or link | Yes |
| `clickLoadMore` | A "Load more" button | Yes |
| `scrollDown` | Infinite scroll | No |
| `scrollUp` | Content that loads when scrolling up | No |
| `none` | Reading only the first page | No |

### Browser actions

Add steps in the order they should happen:

| Step | What it does |
|---|---|
| `.navigate(url)` | Go to another page |
| `.click(selector)` | Click an element |
| `.type(selector, text)` | Type into an input. The text is stored encrypted. |
| `.waitFor(selector, 30000)` | Wait for an element to appear (milliseconds) |
| `.wait(1000)` | Pause (milliseconds) |
| `.scroll(2)` | Scroll down by a number of screen heights |
| `.captureScreenshot('name', { fullPage: true })` | Take a screenshot, returned in `result.screenshots` |

Give any capture a label by passing a name as the second argument, for example `.captureList({ selector: '.product' }, 'Products')`.

## Examples

### A list across several pages

```javascript
const robot = await maxun
  .extract('Quotes', 'https://quotes.toscrape.com')
  .captureList({
    selector: 'div.quote',
    maxItems: 50,
    pagination: { type: 'clickNext', selector: 'li.next a' },
  })
  .build();

const result = await robot.run();
console.log(`${result.listData.length} quotes`);
```

### Several pages in one robot

```javascript
const robot = await maxun
  .extract('Store overview', 'https://shop.example.com')
  .captureText({ 'Store name': 'h1' })
  .navigate('https://shop.example.com/products')
  .captureList({ selector: '.product' }, 'Products')
  .navigate('https://shop.example.com/reviews')
  .captureList({ selector: '.review' }, 'Reviews')
  .build();
```

### Log in, then extract

```javascript
const robot = await maxun
  .extract('Dashboard data', 'https://app.example.com/login')
  .type('#email', 'you@example.com')
  .type('#password', 'your-password')
  .click('button[type=submit]')
  .waitFor('.dashboard')
  .captureText({ Balance: '.balance', Plan: '.plan-name' })
  .captureScreenshot('Dashboard')
  .build();
```

### Watch for changes

Turn on [monitoring](./sdk-monitoring) to compare every run with the previous one:

```javascript
const robot = await maxun.extract('Product prices', 'https://shop.example.com/product/42', {
  prompt: 'Product name, price and availability',
  monitor: true,
});
```

For selector robots, pass `{ monitor: true }` before building:

```javascript
const robot = await maxun
  .extract('Product prices', 'https://shop.example.com', { monitor: true })
  .captureList({ selector: '.product' })
  .build();
```

## Managing extract robots

```javascript
const robots = await maxun.extract.list();            // all extract robots
const robot = await maxun.robots.find('Bookstore');   // one robot, by name
await robot.delete();
```

:::note
Building a selector robot with a name and URL that already exist returns the existing robot unchanged, even if your steps are different. The SDK warns you when this happens. Use a new name, or delete the old robot first.
:::

See [Robot Management](./sdk-robot) to run, schedule and manage robots.