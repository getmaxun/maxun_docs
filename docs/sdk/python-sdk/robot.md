---
id: sdk-robot
title: Robot Management
sidebar_position: 4
---

# Robot Management

Manage robot execution, runs, schedules, webhooks, updates, and lifecycle through the SDK.

A `Robot` is returned when you create or retrieve a robot through the SDK.

## Running Robots

### Immediate Execution

Run a robot immediately:

```python id="6q2x1a"
result = await robot.run()

print(result["data"])
```

### With Options

Pass execution options as a dictionary:

```python id="9c7v3p"
result = await robot.run({
    "timeout": 60000,
    "webhook": {
        "url": "https://your-api.com/notify",
        "events": ["run.completed"],
    },
})
```

The SDK supports the following execution options:

* `timeout` - Request timeout in milliseconds.
* `params` - Parameters passed to the robot execution.
* `webhook` - Webhook configuration for the execution.

For example:

```python id="2xj5sk"
result = await robot.run({
    "params": {
        "product_id": "12345",
    },
    "timeout": 60000,
})
```

### Run Result

The result depends on the robot type and workflow being executed.

```python id="f8n2qk"
{
    "status": "success",
    "runId": "run-123",
    "data": {
        # Robot-specific output
    }
}
```

## Execution History

### Get All Runs

```python id="3d8m1v"
runs = await robot.get_runs()

for run in runs:
    print(f"Run {run['id']}: {run['status']}")
```

### Get Specific Run

```python id="7h4p2n"
run = await robot.get_run("run-id")

print(run)
```

### Get Latest Run

```python id="5k9w2r"
latest_run = await robot.get_latest_run()

if latest_run:
    print(latest_run)
```

`get_latest_run()` returns `None` when the robot has no runs.

## Aborting Runs

Abort a running robot execution using its run ID:

```python id="1m6x8q"
await robot.abort("run-id")
```

## Scheduling

Schedules are passed as a dictionary to `robot.schedule()`.

### Basic Scheduling

```python id="8v3j5m"
await robot.schedule({
    "runEvery": 6,
    "runEveryUnit": "HOURS",
})
```

### With Timezone

```python id="4p7n2x"
await robot.schedule({
    "runEvery": 1,
    "runEveryUnit": "DAYS",
    "timezone": "America/New_York",
})
```

### Time Windows

You can include additional scheduling configuration supported by Maxun:

```python id="0r5k8c"
await robot.schedule({
    "runEvery": 1,
    "runEveryUnit": "HOURS",
    "timezone": "America/New_York",
    "startTime": "09:00",
    "endTime": "17:00",
})
```

Common time units include:

* `MINUTES`
* `HOURS`
* `DAYS`
* `WEEKS`
* `MONTHS`

### Remove Schedule

Remove the robot's schedule:

```python id="6b2m9x"
await robot.unschedule()
```

You can also inspect the current schedule:

```python id="7q4v1k"
schedule = robot.get_schedule()

print(schedule)
```

## Webhooks

Webhooks can be attached to a robot to receive notifications for robot events.

### Add Webhook

```python id="3n8p5r"
await robot.add_webhook({
    "url": "https://your-api.com/webhook",
    "events": ["run.completed", "run.failed"],
})
```

Supported events include:

* `run.started`
* `run.completed`
* `run.failed`

If `events` is omitted, Maxun defaults to:

```python
["run.completed", "run.failed"]
```

### Get Webhooks

```python id="9x2m6v"
webhooks = robot.get_webhooks()

print(webhooks)
```

### Remove Webhooks

Remove all webhooks configured for the robot:

```python id="5r7k3p"
await robot.remove_webhooks()
```

## Updating Robots

Update robot properties by passing a dictionary:

```python id="2v8n4m"
await robot.update({
    "name": "New Robot Name",
})
```

The `update()` method sends the provided fields to the Maxun API.

After updating a robot, its local data is updated automatically.

### Refresh Robot Data

Fetch the latest robot data from Maxun:

```python id="8k5q1x"
await robot.refresh()

print(robot.get_data())
```

## Updating List Limits

For robots containing a `scrapeList`, `crawl`, or `search` action with a configured limit, you can update the limit without resending the entire workflow:

```python id="4m9p2v"
await robot.set_list_limit(100)
```

This updates the first matching list limit in the robot workflow.

## Duplicating Robots

Create a copy of a robot for a different target URL:

```python id="7x3k6n"
new_robot = await robot.duplicate(
    "https://example.com/new-page"
)

print(new_robot.id)
print(new_robot.name)
```

The returned value is a new `Robot` instance.

## Deleting Robots

Delete a robot:

```python id="1q8v5m"
await robot.delete()
```

This permanently removes the robot.

## Robot Properties

Access basic robot information through properties and `get_data()`:

```python id="6n4r9x"
print(robot.id)
print(robot.name)

data = robot.get_data()

print(data)
```

`robot.id` and `robot.name` are read directly from the robot's metadata.

The complete robot data returned by `get_data()` depends on the robot type and configuration.

## Complete Example

```python id="3p7m2k"
from maxun import Extract, Config

extractor = Extract(
    Config(api_key="your-api-key")
)

# Create robot
robot = await (
    extractor
    .create("Daily Price Monitor")
    .navigate("https://example.com/products")
    .capture_list({
        "selector": ".product",
        "maxItems": 50,
    })
)

# Run once to test
test_run = await robot.run()

print("Test run:", test_run["status"])

# Schedule daily execution
await robot.schedule({
    "runEvery": 1,
    "runEveryUnit": "DAYS",
    "timezone": "America/New_York",
    "startTime": "08:00",
})

# Add webhook
await robot.add_webhook({
    "url": "https://your-api.com/price-changes",
    "events": ["run.completed"],
})

print(f"Robot {robot.id} is now scheduled")
```

## Error Handling

SDK operations raise an exception when the API request fails.

```python id="8m2q6v"
try:
    result = await robot.run()
    print("Success:", result["data"])
except Exception as error:
    print("Robot failed:", str(error))
```

For API-specific errors, you can catch `MaxunError`:

```python id="5x9n3k"
from maxun import MaxunError

try:
    result = await robot.run()
except MaxunError as error:
    print("Error:", str(error))
    print("Status:", error.status_code)
```
