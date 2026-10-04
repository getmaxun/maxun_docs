---
id: sdk-extract
title: "Python: Extract Structured Data From Websites"
description: "Extract structured data in Python with the Maxun SDK, from a plain-English prompt or CSS selectors, with lists, pagination and interactions."
sidebar_label: "Extract"
sidebar_position: 3
---

# Extract

An extract robot pulls structured data (product lists, prices, job postings, tables) out of web pages. There are two ways to build one using Maxun SDK:

- **With a prompt**: describe the data in plain English and Maxun builds the robot for you.
- **With selectors**: list the steps and CSS or XPath selectors yourself, for precise and predictable results.

Both return a [`Robot`](./sdk-robot) that you can run as often as you like.

## Extract with a prompt

```python
robot = await maxun.extract(
    "YC companies",
    "https://www.ycombinator.com/companies",
    prompt="Company name, description and batch for the first 15 companies",
)

result = await robot.run()

for company in result.list_data:
    print(company)
```

```python
{'Company name': 'Airbnb', 'Description': 'Book accommodations around the world.', 'Batch': 'W09'}
{'Company name': 'Stripe', 'Description': 'Economic infrastructure for the internet.', 'Batch': 'S09'}
...
```

### Without a URL

Leave the URL out and Maxun searches the web for a suitable page first:

```python
robot = await maxun.extract(
    "Top AI startups",
    prompt="Names and funding of the top 10 AI startups from YCombinator",
)
```

### LLM settings (self-hosted)

On Maxun Cloud, a prompt is all you need. Self-hosted Maxun has no built-in LLM, so pass one:

```python
robot = await maxun.extract(
    "Products",
    "https://shop.example.com",
    prompt="Product names and prices",
    llm_provider="anthropic",        # "anthropic", "openai" or "ollama"
    llm_api_key="your-llm-api-key",  # required for anthropic and openai
    llm_model="claude-sonnet-4-5",   # optional
    llm_base_url=None,               # optional, e.g. your Ollama server
)
```

:::caution
Do not pass `llm_*` options on Maxun Cloud. Cloud manages the model for you and rejects them.
:::

## Extract with selectors

`maxun.extract(name, url)` starts a robot on that page. Chain the steps you want, then finish with `.build()`:

```python
robot = await (
    maxun.extract("Bookstore", "https://books.toscrape.com")
    .capture_text({"Heading": "h1"})
    .capture_list("article.product_pod", max_items=20)
    .build()
)

result = await robot.run()

print(result.text_data)   # {'Heading': 'All products'}
print(result.list_data)   # [{...}, {...}, ...]
```

Selector robots don't use an LLM, so they work the same on Maxun Cloud and self-hosted Maxun.

### Capture text

`capture_text` reads single values. Give each field a name and a selector:

```python
.capture_text({
    "Title": "h1.article-title",
    "Author": ".author-name",
    "Published": "time",
})
```

The values are in `result.text_data`. CSS and XPath selectors both work.

### Capture a list

`capture_list` reads every element that matches a selector. The fields inside each item are detected automatically:

```python
.capture_list("article.product_pod", max_items=50)
```

The items are in `result.list_data`. `max_items` defaults to 100.

### Pagination

Maxun detects pagination automatically. To control it yourself, pass `pagination`:

```python
# Click a "Next" button
.capture_list("article.product_pod", max_items=100,
              pagination={"type": "clickNext", "selector": "li.next a"})

# Click a "Load more" button
.capture_list(".card", pagination={"type": "clickLoadMore", "selector": "button.load-more"})

# Infinite scroll
.capture_list(".feed-item", pagination={"type": "scrollDown"})

# First page only
.capture_list(".result", pagination={"type": "none"})
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
| `.wait_for(selector, timeout=30000)` | Wait for an element to appear (milliseconds) |
| `.wait(1000)` | Pause (milliseconds) |
| `.scroll(pages=2)` | Scroll down by a number of screen heights |
| `.capture_screenshot("name", full_page=True)` | Take a screenshot, returned in `result.screenshots` |

Give any capture a label with `name="..."`, for example `.capture_list(".product", name="Products")`.

## Examples

### A list across several pages

```python
robot = await (
    maxun.extract("Quotes", "https://quotes.toscrape.com")
    .capture_list(
        "div.quote",
        max_items=50,
        pagination={"type": "clickNext", "selector": "li.next a"},
    )
    .build()
)

result = await robot.run()
print(f"{len(result.list_data)} quotes")
```

### Several pages in one robot

```python
robot = await (
    maxun.extract("Store overview", "https://shop.example.com")
    .capture_text({"Store name": "h1"})
    .navigate("https://shop.example.com/products")
    .capture_list(".product", name="Products")
    .navigate("https://shop.example.com/reviews")
    .capture_list(".review", name="Reviews")
    .build()
)
```

### Log in, then extract

```python
robot = await (
    maxun.extract("Dashboard data", "https://app.example.com/login")
    .type("#email", "you@example.com")
    .type("#password", "your-password")
    .click("button[type=submit]")
    .wait_for(".dashboard")
    .capture_text({"Balance": ".balance", "Plan": ".plan-name"})
    .capture_screenshot("Dashboard")
    .build()
)
```

### Watch for changes

Turn on [monitoring](./sdk-monitoring) to compare every run with the previous one:

```python
robot = await maxun.extract(
    "Product prices",
    "https://shop.example.com/product/42",
    prompt="Product name, price and availability",
    monitor=True,
)
```

For selector robots, pass `monitor=True` before building:

```python
robot = await (
    maxun.extract("Product prices", "https://shop.example.com", monitor=True)
    .capture_list(".product")
    .build()
)
```

## Managing extract robots

```python
robots = await maxun.extract.list()          # all extract robots
robot = await maxun.robots.find("Bookstore") # one robot, by name
await robot.delete()
```

:::note
Building a selector robot with a name and URL that already exist returns the existing robot unchanged, even if your steps are different. The SDK warns you when this happens. Use a new name, or delete the old robot first.
:::

See [Robot Management](./sdk-robot) to run, schedule and manage robots.