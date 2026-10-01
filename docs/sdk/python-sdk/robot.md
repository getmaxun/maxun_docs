---
id: sdk-robot
title: Robot Management
sidebar_position: 8
---

# Robot Management

Every `maxun.scrape(...)`, `maxun.extract(...)`, `maxun.crawl(...)`, `maxun.search(...)` and `maxun.documents...` call returns a **robot**. A robot is saved on your account. You can run it, schedule it, get notified when it finishes and look back at earlier runs.

## Finding robots

```python
robots = await maxun.robots.list()                # every robot
robots = await maxun.robots.list(type="crawl")    # one type
robots = await maxun.scrape.list()                # same thing, per type

robot = await maxun.robots.get("robot-id")
robot = await maxun.robots.find("Pricing page")   # by exact name
```

A robot prints as its id, name and type:

```python
>>> await maxun.robots.list()
[
    {"id": "a2e3af0f-fd5b-45cc-b2d0-83e7e5aaf5b3", "name": "Pricing page", "type": "scrape"},
    {"id": "76f3e1c2-9b1a-4c8e-8f0e-2d1c5b7a9e44", "name": "Bookstore", "type": "extract"}
]
```

Types are `scrape`, `extract`, `crawl`, `search`, `doc-extract` and `doc-parse`.

Read more about a robot from its attributes:

| Attribute | Description |
|---|---|
| `robot.id` | The robot's id |
| `robot.name` | The robot's name |
| `robot.type` | `scrape`, `extract`, `crawl`, `search`, `doc-extract` or `doc-parse` |
| `robot.url` | The page the robot starts on |
| `robot.formats` | The robot's output formats |
| `robot.is_monitoring` | Whether [monitoring](./sdk-monitoring) is on |
| `robot.get_data()` | The full robot record from Maxun |

## Running a robot

```python
result = await robot.run()
```

`run()` waits until the run finishes and returns the result. If the run fails or is aborted, it raises `RunFailedError`.

The result contains the run id, the status and only the outputs the robot produced:

```python
>>> result
{'runId': 'b05cea93-31d1-4a17-9e6c-e278b4e4abf3', 'status': 'success', 'markdown': '# Example Domain\n\n…'}
```

Read outputs as attributes:

| Attribute | Filled by |
|---|---|
| `result.run_id`, `result.status` | Every run |
| `result.markdown`, `.html`, `.text`, `.links`, `.summary` | Scrape and document parse robots |
| `result.smart_query_result` | Scrape robots with Smart Queries |
| `result.text_data` | `capture_text` |
| `result.list_data` | `capture_list` and prompt extraction |
| `result.crawl_data` | Crawl robots, one entry per page |
| `result.search_data` | Search robots |
| `result.document_data` | Document extract robots |
| `result.screenshots` | Screenshot formats and `capture_screenshot` |
| `result.has_changes`, `.changed_formats` | Robots with [monitoring](./sdk-monitoring) on |

An attribute for an output the run didn't produce is `None` or empty, so it is always safe to read.

### Run options

```python
result = await robot.run(formats=["markdown", "html"])          # different formats, this run only
result = await robot.run(smart_queries="Which plan has SSO?")   # a question, this run only (scrape)
result = await robot.run(timeout=600)                            # stop waiting after 600 seconds
```

With `timeout`, the run keeps going on Maxun after `run()` stops waiting. Read it later with `get_latest_run()`.

## Run history

```python
runs = await robot.get_runs()           # newest first
run = await robot.get_latest_run()
run = await robot.get_run("run-id")
```

A run prints as a short summary:

```python
>>> await robot.get_runs()
[
    {
        "id": "3faaa1cd-5c3a-4b7e-a0a1-27c8f0b1f9d2",
        "runId": "bdae3b5a-8f2e-4d71-9c55-0e6f3a2b1c48",
        "robotId": "2c56ce3b-1d9e-4f6a-8b3c-7e5d4a2f1b90",
        "name": "Pricing page",
        "status": "success",
        "startedAt": "2026-10-01T00:46:25Z",
        "finishedAt": "2026-10-01T00:47:14Z"
    }
]
```

Times are in UTC. `status` is `queued`, `running`, `success`, `failed`, `aborting` or `aborted`.

Get a run's output with `run.result`. This works for every run, including scheduled ones:

```python
run = await robot.get_latest_run()
if run.status == "success":
    print(run.result.markdown)
```

### Aborting a run

```python
await robot.abort("run-id")
```

## Scheduling

Run a robot automatically:

```python
# Every 6 hours
await robot.schedule(run_every=6, run_every_unit="HOURS")

# Every day at 9:00 in Kolkata time
await robot.schedule(run_every=1, run_every_unit="DAYS", at_time_start="09:00", timezone="Asia/Kolkata")

# Every Monday at 9:00
await robot.schedule(run_every=1, run_every_unit="WEEKS", start_from="MONDAY", at_time_start="09:00")

# On the 1st of every month at 6:30
await robot.schedule(run_every=1, run_every_unit="MONTHS", day_of_month=1, at_time_start="06:30")
```

| Option | Description |
|---|---|
| `run_every` | How many units between runs |
| `run_every_unit` | `MINUTES`, `HOURS`, `DAYS`, `WEEKS` or `MONTHS` |
| `timezone` | An IANA time zone, such as `"America/New_York"`. Defaults to `"UTC"` |
| `at_time_start` | Time of day as `"HH:MM"` for daily, weekly and monthly schedules |
| `at_time_end` | Optional end of the time window, as `"HH:MM"` |
| `start_from` | Day of the week for weekly schedules, such as `"MONDAY"` |
| `day_of_month` | Day of the month for monthly schedules |

Check or remove the schedule:

```python
schedule = await robot.get_schedule()
if schedule:
    print("Next run:", schedule["nextRunAt"])
else:
    print("Not scheduled")

await robot.unschedule()
```

`get_schedule()` returns `None` when the robot has no schedule.

## Webhooks

Get an HTTP POST to your server every time a run finishes:

```python
await robot.add_webhook("https://your-app.com/hooks/maxun")
```

Only failed runs, with more retries:

```python
await robot.add_webhook(
    "https://your-app.com/hooks/maxun-alerts",
    events=["run_failed"],
    retry_attempts=5,
)
```

| Option | Default | Description |
|---|---|---|
| `events` | both | `run_completed`, `run_failed` |
| `retry_attempts` | `3` | How many times to retry a failed delivery |
| `retry_delay` | `5` | Seconds before the first retry. The wait grows with each retry |
| `timeout` | `30` | Seconds to wait for your server to respond |

Adding a URL that is already registered updates it instead of adding a duplicate.

```python
hooks = await robot.get_webhooks()                                  # [] if none
await robot.remove_webhook("https://your-app.com/hooks/maxun-alerts")   # by URL or id
await robot.remove_webhooks()                                       # remove all
```

### Payload

```json
{
  "event_type": "run_completed",
  "timestamp": "2026-10-01T09:00:42.120Z",
  "webhook_id": "webhook_3f1c…",
  "data": {
    "robot_id": "2c56ce3b-…",
    "run_id": "bdae3b5a-…",
    "robot_name": "Pricing page",
    "status": "success",
    "started_at": "2026-10-01T09:00:03.551Z",
    "finished_at": "2026-10-01T09:00:41.904Z",
    "extracted_data": { "…": "…" }
  }
}
```

## Editing robots

```python
await robot.rename("Pricing page (EU)")
await robot.set_list_limit(25)          # item limit of a list, crawl or search robot
copy = await robot.duplicate("https://example.com/eu/pricing")   # same robot, different URL
await robot.refresh()                   # reload the robot from Maxun
```

## Deleting robots

```python
await robot.delete()
await maxun.robots.delete("robot-id")
```

## Reusing a robot name

Robot names identify robots in the dashboard. When you create a robot with a name that already exists:

| Robot | Same name |
|---|---|
| Scrape, crawl, prompt extract | Same settings: you get the existing robot. Different settings: `ConflictError` |
| Selector extract | Same URL: you get the existing robot, unchanged, even if your steps differ. The SDK warns you |
| Document | Always `ConflictError` |
| Search | Not checked: a new robot is created every time |

To reuse a robot, find it instead of creating it again:

```python
from maxun import ConflictError

try:
    robot = await maxun.scrape("Pricing page", "https://example.com/pricing")
except ConflictError:
    robot = await maxun.robots.find("Pricing page")
```

## Complete example

```python
import asyncio

from dotenv import load_dotenv
from maxun import Maxun, RunFailedError

load_dotenv()


async def main():
    async with Maxun() as maxun:
        robot = await (
            maxun.extract("Hacker News front page", "https://news.ycombinator.com")
            .capture_list("tr.athing", max_items=30)
            .build()
        )

        # Check it works
        try:
            result = await robot.run()
            print(f"{len(result.list_data)} stories")
        except RunFailedError as error:
            print("Run failed:", error)
            return

        # Then run it every morning and get notified
        await robot.schedule(run_every=1, run_every_unit="DAYS", at_time_start="08:00")
        await robot.add_webhook("https://your-app.com/hooks/maxun")

        schedule = await robot.get_schedule()
        print("Next run:", schedule["nextRunAt"])


asyncio.run(main())
```

## Errors

| Error | When |
|---|---|
| `AuthenticationError` | The API key is missing or invalid |
| `NotFoundError` | The robot or run does not exist |
| `ConflictError` | A robot with that name already exists with different settings |
| `ValidationError` | Maxun rejected the input |
| `RunFailedError` | A run failed or was aborted |

All of them are subclasses of `MaxunError`, which has `.status_code` and `.details`.