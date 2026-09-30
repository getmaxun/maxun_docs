---
id: sdk-monitoring
title: Monitoring
sidebar_position: 6
---

# Monitoring

Maxun can monitor websites for changes by comparing the results of successive robot runs.

Monitoring can be enabled for:

* **AI Mode Extract**
* **Recorder / Workflow Mode Extract**
* **Scrape**
* **Crawl** — available on Maxun Cloud

Once monitoring is enabled, Maxun compares a new run with the previous successful run. You can then retrieve the changes between runs using the `Robot` API.

## Extract Monitoring

Monitoring is supported by both AI Mode and Recorder / Workflow Mode extraction.

### AI Mode

Use the `monitor` parameter when creating an AI extraction robot:

```python
from maxun import Extract

extractor = Extract(config)

robot = await extractor.extract(
    prompt="Extract the product name, price, and availability",
    url="https://example.com/product",
    monitor=True,
)
```

The returned robot can be run normally:

```python
run = await robot.run()
```

AI Mode monitoring is useful when you want Maxun to extract specific information from a page and detect when the extracted data changes.

For example:

```python
robot = await extractor.extract(
    prompt="""
    Extract:
    - Product name
    - Price
    - Availability
    """,
    url="https://example.com/product",
    monitor=True,
)
```

Maxun will use the extraction result when comparing subsequent runs.

### Recorder / Workflow Mode

For workflow-based extraction, enable monitoring with `monitor_changes()`:

```python
robot = await (
    extractor
    .create("Product Monitor")
    .navigate("https://example.com/product")
    .capture_text({
        "Name": "h1",
        "Price": ".price",
        "Availability": ".availability",
    })
    .monitor_changes()
)
```

You can then run the robot normally:

```python
run = await robot.run()
```

`monitor_changes()` enables monitoring on the workflow:

```python
.monitor_changes()
```

You can also explicitly disable it:

```python
.monitor_changes(False)
```

Both AI Mode and Recorder / Workflow Mode ultimately create Extract robots with monitoring enabled. The difference is how the extraction workflow is defined.

---

## Scrape Monitoring

Scrape robots also support monitoring.

Pass `monitor=True` when creating a scrape robot:

```python
from maxun import Scrape

scraper = Scrape(config)

robot = await scraper.create(
    "Product Monitor",
    "https://example.com/product",
    monitor=True,
)
```

You can then run the robot normally:

```python
run = await robot.run()
```

Monitoring works with the supported scrape formats, allowing you to track changes in the scraped content over time.

For example:

```python
robot = await scraper.create(
    "Article Monitor",
    "https://example.com/article",
    formats=["markdown"],
    monitor=True,
)
```

---

## Crawl Monitoring

Crawl monitoring is available on **Maxun Cloud**.

A monitored crawl can track changes across the pages discovered during a crawl.

Crawl monitoring is configured through Maxun Cloud rather than the current Python `CrawlConfig`, so there is no `monitor` parameter in the Python crawl configuration.

A typical monitored crawl looks like:

```text
Crawl website
     ↓
Discover pages
     ↓
Run crawl periodically
     ↓
Compare results
     ↓
Detect changes
```

For Cloud users, crawl monitoring can be combined with scheduling to continuously monitor a website or a set of pages.

---

## Comparing Runs

When monitoring is enabled, Maxun compares the result of a new run with a previous run.

The `Robot` API provides `get_run_diff()` for retrieving these changes.

```python
diff = await robot.get_run_diff(run_id)
```

You can also specify the output format:

```python
diff = await robot.get_run_diff(
    run_id,
    format="markdown",
)
```

The available diff output depends on the robot and the data being monitored.

### Getting the Run History

You can inspect the robot's previous runs with:

```python
runs = await robot.get_runs()
```

To retrieve a specific run:

```python
run = await robot.get_run(run_id)
```

Or retrieve the latest run:

```python
latest_run = await robot.get_latest_run()
```

For example, you can retrieve the latest run and then inspect its changes:

```python
latest_run = await robot.get_latest_run()

diff = await robot.get_run_diff(
    latest_run["id"],
    format="markdown",
)
```

---

## Scheduling Monitoring Robots

Monitoring becomes useful when a robot runs repeatedly.

You can schedule a robot using the `Robot` API:

```python
await robot.schedule({
    "runEvery": 1,
    "runEveryUnit": "DAYS",
})
```

The robot will then run according to the configured schedule.

You can inspect the current schedule with:

```python
schedule = await robot.get_schedule()
```

To remove the schedule:

```python
await robot.unschedule()
```

A common monitoring setup is:

```text
Create robot
     ↓
Enable monitoring
     ↓
Schedule robot
     ↓
Robot runs periodically
     ↓
Maxun compares runs
     ↓
Retrieve detected changes
```

---

## Webhooks

Monitoring and notifications are separate concepts.

**Monitoring** determines whether the results of successive runs have changed.

**Webhooks** allow you to receive run-related events in an external application.

You can add a webhook to a robot with:

```python
await robot.add_webhook({
    "url": "https://example.com/webhook",
})
```

To view the robot's webhooks:

```python
webhooks = await robot.get_webhooks()
```

To remove webhooks:

```python
await robot.remove_webhooks()
```

This allows you to build workflows where Maxun runs a monitored robot and your application receives the relevant run events.

---

## A Complete Monitoring Example

The following example creates an AI extraction robot, enables monitoring, schedules it to run daily, and retrieves the latest changes.

```python
from maxun import Extract

extractor = Extract(config)

robot = await extractor.extract(
    prompt="""
    Extract the following product information:
    - Product name
    - Price
    - Availability
    """,
    url="https://example.com/product",
    monitor=True,
)

await robot.schedule({
    "runEvery": 1,
    "runEveryUnit": "DAYS",
})

latest_run = await robot.get_latest_run()

if latest_run:
    diff = await robot.get_run_diff(
        latest_run["id"],
        format="markdown",
    )

    print(diff)
```

For a workflow-based extraction, the same monitoring flow can be used:

```python
robot = await (
    extractor
    .create("Product Monitor")
    .navigate("https://example.com/product")
    .capture_text({
        "Name": "h1",
        "Price": ".price",
        "Availability": ".availability",
    })
    .monitor_changes()
)

await robot.schedule({
    "runEvery": 1,
    "runEveryUnit": "DAYS",
})
```

The difference is only how the robot is created. Once you have a `Robot`, the monitoring-related APIs are the same.

---

## Monitoring with the Robot API

Monitoring uses the standard `Robot` API, so you can combine it with other robot operations.

### Run a robot

```python
run = await robot.run()
```

### Get run history

```python
runs = await robot.get_runs()
```

### Get a specific run

```python
run = await robot.get_run(run_id)
```

### Get the latest run

```python
latest_run = await robot.get_latest_run()
```

### Get changes

```python
diff = await robot.get_run_diff(run_id)
```

### Schedule the robot

```python
await robot.schedule({
    "runEvery": 1,
    "runEveryUnit": "DAYS",
})
```

### Remove the schedule

```python
await robot.unschedule()
```

### Add a webhook

```python
await robot.add_webhook({
    "url": "https://example.com/webhook",
})
```

---

## Monitoring vs. Scheduling

Monitoring and scheduling serve different purposes:

| Feature     | Purpose                                    |
| ----------- | ------------------------------------------ |
| Monitoring  | Compare results between runs               |
| Scheduling  | Automatically run a robot periodically     |
| Webhooks    | Send run events to an external application |
| Run history | Inspect previous executions                |
| Run diff    | Retrieve changes between runs              |

You can use them independently or together.

For example, a robot can have monitoring enabled but be run manually:

```python
robot = await extractor.extract(
    prompt="Extract the product price",
    url="https://example.com/product",
    monitor=True,
)

await robot.run()
```

Or you can combine monitoring with scheduling for continuous monitoring:

```python
await robot.schedule({
    "runEvery": 1,
    "runEveryUnit": "DAYS",
})
```

---

## Monitoring Workflow

A typical monitoring workflow looks like this:

```text
Create robot
     ↓
Enable monitoring
     ↓
Run robot
     ↓
Run robot again
     ↓
Compare runs
     ↓
Retrieve changes
```

For continuous monitoring:

```text
Create robot
     ↓
Enable monitoring
     ↓
Schedule robot
     ↓
Maxun runs periodically
     ↓
Compare successive runs
     ↓
Retrieve changes
     ↓
Optionally receive run events through webhooks
```

Monitoring is available across **AI Mode Extract, Recorder / Workflow Mode Extract, and Scrape**, while **Crawl monitoring is available through Maxun Cloud**.
