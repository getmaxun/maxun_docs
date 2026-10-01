---
id: sdk-monitoring
title: Monitoring
sidebar_position: 7
---

# Monitoring

Monitoring compares every run of a robot with its previous successful run, so you can tell when a page changes: a new price, a new job posting, an updated policy.

It works for **scrape**, **crawl** and **extract** robots.

## Turn on monitoring

Pass `monitor=True` when you create the robot:

```python
# Scrape: watch a page's content
robot = await maxun.scrape("Pricing watch", "https://example.com/pricing", formats=["text"], monitor=True)

# Crawl: watch every page of a site
robot = await maxun.crawl("Docs watch", "https://docs.example.com", limit=50, monitor=True)

# Extract with a prompt: watch specific data
robot = await maxun.extract(
    "Product watch",
    "https://shop.example.com/product/42",
    prompt="Product name, price and availability",
    monitor=True,
)

# Extract with selectors
robot = await (
    maxun.extract("Listings watch", "https://shop.example.com/new", monitor=True)
    .capture_list(".listing")
    .build()
)
```

Or turn it on and off for an existing robot:

```python
await robot.set_monitoring(True)
await robot.set_monitoring(False)

print(robot.is_monitoring)
```

## Checking for changes

The first run is the baseline. From the second run on, the result says whether anything changed:

```python
result = await robot.run()

if result.has_changes:
    print("Changed:", result.changed_formats)
else:
    print("No changes")
```

```python
>>> result
{'runId': '9e1f…', 'status': 'success', 'text': '…', 'hasChanges': True, 'changedFormats': ['text']}
```

`hasChanges` and `changedFormats` only appear on robots with monitoring turned on.

| Robot | What is compared | `changed_formats` values |
|---|---|---|
| Scrape | The page's `text`, `markdown` and `html` | `text`, `markdown`, `html` |
| Crawl | Every page's `text`, `markdown` and `html`, matched by URL | `text`, `markdown`, `html` |
| Extract | The captured text and lists | `captured-text`, `captured-list` |

## Seeing what changed

`get_run_diff` returns the changes line by line:

```python
diff = await robot.get_run_diff(result.run_id)

for section in diff["diffs"]:
    print("Format:", section["format"])
    for change in section["changes"]:
        if change["added"]:
            print("+", change["value"])
        elif change["removed"]:
            print("-", change["value"])
```

```text
Format: text
- Pro plan: $49 / month
+ Pro plan: $59 / month
```

Limit the diff to one format with `format`:

```python
diff = await robot.get_run_diff(result.run_id, format="markdown")
```

`get_run_diff` works for any run, including scheduled runs:

```python
run = await robot.get_latest_run()
diff = await robot.get_run_diff(run.run_id)
```

### Crawl changes

For crawl robots you also get the pages that were added, removed or changed:

```python
result = await robot.run()

if result.has_changes:
    pages = result.changed_pages
    print("New pages:", pages["added"])
    print("Removed pages:", pages["removed"])
    print("Changed pages:", pages["changed"])
```

The same list is in `diff["pages"]`.

:::note
Crawl changes are computed by the SDK. `result.has_changes` is filled in for runs started with `robot.run()`. For scheduled crawl runs, use `get_run_diff`. Webhooks and the Maxun dashboard don't show crawl changes.
:::

## Monitor on a schedule

Monitoring is most useful with a [schedule](./sdk-robot#scheduling) and a [webhook](./sdk-robot#webhooks): Maxun checks the page for you and calls your server after every run.

```python
robot = await maxun.scrape("Pricing watch", "https://example.com/pricing", formats=["text"], monitor=True)

await robot.run()   # first run: the baseline

await robot.schedule(run_every=6, run_every_unit="HOURS")
await robot.add_webhook("https://your-app.com/hooks/pricing")
```

Later, check the latest scheduled run:

```python
run = await robot.get_latest_run()
diff = await robot.get_run_diff(run.run_id)

if diff["hasChanges"]:
    notify_team(diff)
```

## Complete example

```python
import asyncio

from dotenv import load_dotenv
from maxun import Maxun

load_dotenv()


async def main():
    async with Maxun() as maxun:
        robot = await maxun.extract(
            "HN top stories watch",
            "https://news.ycombinator.com",
            prompt="Title and points of the top 10 stories",
            monitor=True,
        )

        await robot.run()                 # baseline
        result = await robot.run()        # compared with the baseline

        if not result.has_changes:
            print("Nothing changed")
            return

        diff = await robot.get_run_diff(result.run_id)
        for section in diff["diffs"]:
            for change in section["changes"]:
                if change["added"] or change["removed"]:
                    print("+" if change["added"] else "-", change["value"])


asyncio.run(main())
```