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

```python
from maxun import Extract, Config

extractor = Extract(Config(api_key="your-api-key"))

robot = await extractor.extract(
    url="https://example.com",
    prompt="Extract first 20 product names and prices",
    llm_provider="anthropic",
    llm_model="claude-3-5-sonnet-20241022",
    llm_api_key="your-anthropic-api-key",
)

result = await robot.run()
```

See <a href="/robot/extract/llm-extraction">AI Mode</a> for provider details and <a href="/llm-prompts">LLM Extraction Prompts</a> for writing effective prompts.

### Non LLM Extraction

For non-LLM extraction, you define exact CSS selectors to capture data from web pages.

```python
from maxun import Extract, Config

extractor = Extract(Config(api_key="your-api-key"))

robot = await (
    extractor
    .create("Product Extractor")
    .navigate("https://example.com/products")
    .capture_text({
        "productName": ".product-title",
        "price": ".price",
    })
)

result = await robot.run()
```

### Key Features

### 1. Auto List Capture

When using `captureList`, you only need to provide the list item selector. Maxun automatically:
- Detects all meaningful fields within each list item
- Extracts clean, structured data from those fields

```python
robot = await (
    extractor
    .create("Products")
    .navigate("https://example.com")
    .capture_list({
        "selector": ".product-card"
    })
)
```

###  2. Auto Pagination (Optional)

Pagination is completely optional. When you **don't specify** the `pagination` field, Maxun automatically detects and handles pagination for you.

```python
.capture_list({
    "selector": ".product-card",
    "maxItems": 100,
})
```

### 3. Pagination with Selectors

For precise control, specify the pagination type and selector

```python
.capture_list({
    "selector": ".product-card",
    "pagination": {
        "type": "clickNext",
        "selector": "button.next-page",
    },
    "maxItems": 100,
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

```python
.navigate("https://example.com")
```

### Data Extraction

**captureText(fields, name?)**

Extract specific text fields using CSS selectors:

```python
.capture_text(
    {
        "title": ".article-title",
        "author": ".author-name",
    },
    name="Article Info",
)
```

**captureList(config, name?)**

Extract data from lists with automatic field detection. See [Key Features](#key-features) above for details on auto list capture and pagination.

```python
# Simple auto-detection
.capture_list(
    {"selector": ".product-item"},
    name="Products",
)

# With pagination
.capture_list(
    {
        "selector": ".product-item",
        "pagination": {"type": "scrollDown"},
        "maxItems": 50,
    },
    name="Products",
)
```

**captureScreenshot(name?, options?)**

```python
.capture_screenshot("Homepage", {"fullPage": True})
```

### Interaction

**click(selector)**

```python
.click('button.show-more')
```

**type(selector, text, inputType?)**

```python
.type("input[name='search']", "web scraping", "text")
```

Input types: `text`, `email`, `password`, `number`, `tel`, `url`

**scroll(direction, distance?)**

```python
.scroll('down', 500)
.scroll('up')
```

### Waiting

**waitFor(selector, timeout?)**

```python
.wait_for(".dynamic-content", 5000))
```

**wait(milliseconds)**

```python
.wait(2000)
```

### Configuration

**setCookies(cookies)**

```python
.set_cookies([
    {
        "name": "session",
        "value": "abc123",
        "domain": ".example.com",
    }
])
```

## Examples

### List with Pagination

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

```python
robot = await (
    extractor
    .create("Search Results")
    .navigate("https://example.com")
    .type("input[name='q']", "data extraction")
    .click("button[type='submit']")
    .wait_for(".results")
    .capture_list({"selector": ".result-item"})
)
```

### Form Fill

```python
robot = await (
    extractor
    .create("Login and Extract")
    .navigate("https://example.com/login")
    .type("input[name='email']", "user@example.com", "email")
    .type("input[name='password']", "password123", "password")
    .click("button[type='submit']")
    .wait_for(".dashboard")
    .capture_text({
        "username": ".user-name",
        "balance": ".account-balance",
    })
)

result = await robot.run()
```

## Managing Robots

### Get All Robots

```python
robots = await extractor.get_robots()
```

### Get Specific Robot

```python
robot = await extractor.get_robot("robot-id")
```

### Delete Robot

```python
await extractor.delete_robot("robot-id")
```

## Running Robots

```python
# Run immediately
result = await robot.run()

# Run with options
result = await robot.run(
    wait_for_completion=True,
    timeout=60000,
)
```

See <a href="/sdk/python-sdk/sdk-robot">Robot Management</a> for scheduling and webhooks.
