---
id: sdk-extract
title: Extract
sidebar_position: 3
---

# Extract

Build structured web data extraction workflows with the Maxun Python SDK.

Maxun supports two approaches:

* **AI Extraction** — describe what you want in natural language and let an LLM extract it.
* **Workflow Extraction** — build deterministic extraction workflows using CSS selectors and browser actions.

Both approaches return a [`Robot`](./sdk-robot) that you can run and manage.

## AI Extraction

Use `extract()` when you want to describe the data you need in natural language.

```python
from maxun import Extract, Config

extractor = Extract(Config(api_key="your-api-key"))

robot = await extractor.extract(
    url="https://example.com/products",
    prompt="Extract the first 20 product names and prices",
)

result = await robot.run()

print(result)
```

The returned `Robot` can be run multiple times, scheduled, monitored, or otherwise managed using the [Robot API](./sdk-robot).

### Using AI Extraction with Maxun Cloud

With Maxun Cloud, you only need to provide your Maxun API key:

```python
robot = await extractor.extract(
    url="https://example.com/products",
    prompt="Extract the first 20 product names and prices",
)
```

Maxun Cloud manages the LLM provider, model, and credentials.

### Using Your Own LLM

Self-hosted Maxun instances can use your own LLM provider.

Specify the provider, model, credentials, and optional base URL:

```python
robot = await extractor.extract(
    url="https://example.com/products",
    prompt="Extract the first 20 product names and prices",
    llm_provider="anthropic",
    llm_model="claude-3-5-sonnet-20241022",
    llm_api_key="your-anthropic-api-key",
)
```

The `llm_*` options are for self-hosted Maxun instances. When using Maxun Cloud, leave these options unset.

You can also specify:

```python
robot = await extractor.extract(
    url="https://example.com/products",
    prompt="Extract product information",
    llm_provider="anthropic",
    llm_model="your-model",
    llm_api_key="your-api-key",
    llm_base_url="https://your-llm-endpoint.example.com",
)
```

## Workflow Extraction

Use workflow extraction when you want precise control over how data is collected.

Create a workflow with `extractor.create()` and chain browser and extraction actions together:

```python
robot = await (
    extractor
    .create("Product Extractor")
    .navigate("https://example.com/products")
    .capture_text({
        "productName": ".product-title",
        "price": ".price",
    })
)
```

Run the resulting robot:

```python
result = await robot.run()
```

Workflow extraction does not require an LLM for basic selector-based extraction.

## Capturing Data

### Capture Text

Use `capture_text()` to extract specific fields using CSS selectors:

```python
robot = await (
    extractor
    .create("Article Info")
    .navigate("https://example.com/article")
    .capture_text({
        "title": ".article-title",
        "author": ".author-name",
    })
)

result = await robot.run()
```

You can optionally give the capture action a name:

```python
.capture_text(
    {
        "title": ".article-title",
        "author": ".author-name",
    },
    name="Article Info",
)
```

### Capture Lists

Use `capture_list()` to extract repeated items from a page.

Provide the selector for each list item:

```python
robot = await (
    extractor
    .create("Products")
    .navigate("https://example.com/products")
    .capture_list({
        "selector": ".product-card",
    })
)
```

Maxun automatically detects the meaningful fields within each list item.

You can also specify the maximum number of items:

```python
.capture_list({
    "selector": ".product-card",
    "maxItems": 100,
})
```

## Pagination

Pagination is optional.

If you don't provide a pagination configuration, Maxun can automatically handle pagination for supported page patterns.

```python
.capture_list({
    "selector": ".product-card",
    "maxItems": 100,
})
```

For more control, specify the pagination type and selector.

### Infinite Scroll

For pages that load more content while scrolling:

```python
.capture_list({
    "selector": ".product-card",
    "pagination": {
        "type": "scrollDown",
    },
    "maxItems": 100,
})
```

Available scroll types:

* `scrollDown`
* `scrollUp`

### Next Page

Click a next-page element:

```python
.capture_list({
    "selector": ".product-card",
    "pagination": {
        "type": "clickNext",
        "selector": "a.next-page",
    },
    "maxItems": 100,
})
```

### Load More

Click a Load More button:

```python
.capture_list({
    "selector": ".product-card",
    "pagination": {
        "type": "clickLoadMore",
        "selector": "button.load-more",
    },
    "maxItems": 100,
})
```

### Pagination Types

| Type            | Description                      | Selector     |
| --------------- | -------------------------------- | ------------ |
| `scrollDown`    | Scroll down to load more items   | Not required |
| `scrollUp`      | Scroll up to load more items     | Not required |
| `clickNext`     | Click a next-page button or link | Required     |
| `clickLoadMore` | Click a Load More button         | Required     |

## Browser Actions

Workflow extraction supports browser actions that can be combined with extraction steps.

### Navigate

Navigate to a URL:

```python
.navigate("https://example.com")
```

### Click

Click an element using a CSS selector:

```python
.click("button.show-more")
```

### Type

Enter text into an input:

```python
.type("input[name='search']", "web scraping")
```

You can optionally specify the input type:

```python
.type(
    "input[name='email']",
    "user@example.com",
    "email",
)
```

Supported input types include:

* `text`
* `email`
* `password`
* `number`
* `tel`
* `url`

### Scroll

Scroll the page:

```python
.scroll("down", 500)
```

The distance is optional:

```python
.scroll("up")
```

### Wait for an Element

Wait for an element to appear:

```python
.wait_for(".dynamic-content", 5000)
```

The timeout is in milliseconds.

If no timeout is provided, Maxun uses the default timeout.

### Wait

Wait for a fixed amount of time:

```python
.wait(2000)
```

The duration is in milliseconds.

### Screenshots

Capture a screenshot during a workflow:

```python
.capture_screenshot(
    "Homepage",
    {"fullPage": True},
)
```

### Cookies

Set cookies for the current navigation step:

```python
.set_cookies([
    {
        "name": "session",
        "value": "abc123",
        "domain": ".example.com",
    }
])
```

## Complete Examples

### List Extraction with Pagination

```python
robot = await (
    extractor
    .create("News Articles")
    .navigate("https://news.example.com")
    .capture_list({
        "selector": "article.news-item",
        "pagination": {
            "type": "clickNext",
            "selector": "a.next-page",
        },
        "maxItems": 100,
    })
)

result = await robot.run()
```

### Multi-Step Workflow

Combine navigation, interaction, waiting, and extraction:

```python
robot = await (
    extractor
    .create("Search Results")
    .navigate("https://example.com")
    .type("input[name='q']", "data extraction")
    .click("button[type='submit']")
    .wait_for(".results")
    .capture_list({
        "selector": ".result-item",
    })
)

result = await robot.run()
```

### Form Fill and Extraction

```python
robot = await (
    extractor
    .create("Account Data")
    .navigate("https://example.com/login")
    .type(
        "input[name='email']",
        "user@example.com",
        "email",
    )
    .type(
        "input[name='password']",
        "password123",
        "password",
    )
    .click("button[type='submit']")
    .wait_for(".dashboard")
    .capture_text({
        "username": ".user-name",
        "balance": ".account-balance",
    })
)

result = await robot.run()
```

## Managing Extract Robots

Unlike `Scrape`, the `Extract` service provides methods for retrieving and deleting extract robots.

### Get All Extract Robots

```python
robots = await extractor.get_robots()
```

This returns the extract robots associated with the current Maxun account/team.

### Get a Specific Robot

```python
robot = await extractor.get_robot("robot-id")
```

The returned value is a [`Robot`](./sdk-robot) instance.

You can then run or manage it normally:

```python
result = await robot.run()
```

### Delete a Robot

```python
await extractor.delete_robot("robot-id")
```

You can also delete a robot through the `Robot` instance:

```python
await robot.delete()
```

## Running Robots

Run a robot immediately:

```python
result = await robot.run()
```

You can also pass run options as a dictionary:

```python
result = await robot.run({
    "wait_for_completion": True,
    "timeout": 60000,
})
```

See [Robot Management](./sdk-robot) for runs, scheduling, webhooks, monitoring, and other robot operations.
