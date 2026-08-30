---
id: sdk-robot
title: Robot Management
sidebar_position: 4
---

# Robot Management

Run, schedule, and manage robot lifecycle through the SDK.

## Running Robots

### Immediate Execution

```python
result = await robot.run()
print(result["data"])
```

### With Options

```python
result = await robot.run(
    wait_for_completion=True,
    timeout=60000,
    webhook={
        "url": "https://your-api.com/notify"
    },
)
```

### Run Result

```python
{
    "status": "success",
    "runId": "run-123",
    "data": {
        # For Extract robots
        "textData": {...},
        "listData": [...],

        # For Scrape robots
        "markdown": "...",
        "html": "..."
    },
    "screenshots": [...]
}
```

## Execution History

### Get All Runs

```python
runs = await robot.get_runs()

for run in runs:
    print(f"Run {run['id']}: {run['status']}")
```

### Get Specific Run

```python
run = await robot.get_run("run-id")
```

### Get Latest Run

```python
latest_run = await robot.get_latest_run()
```

## Aborting Runs

```python
await robot.abort("run-id")
```

## Scheduling

### Basic Scheduling

```python
await robot.schedule(
    run_every=6,
    run_every_unit="HOURS",
)
```

Time units: `MINUTES`, `HOURS`, `DAYS`, `WEEKS`, `MONTHS`

### With Timezone

```python
await robot.schedule(
    run_every=1,
    run_every_unit="DAYS",
    timezone="America/New_York",
)
```

### Time Windows

```python
await robot.schedule(
    run_every=1,
    run_every_unit="HOURS",
    timezone="America/New_York",
    start_time="09:00",
    end_time="17:00",
)
```

### Remove Schedule

```python
await robot.unschedule()
```

## Webhooks

### Add Webhook

```python
await robot.add_webhook(
    url="https://your-api.com/webhook",
    events=["run.completed", "run.failed"],
    headers={
        "Authorization": "Bearer your-token"
    },
)
```

Events: `run.started`, `run.completed`, `run.failed`

### Webhook Payload

```json
{
  "event": "run.completed",
  "robotId": "robot-123",
  "runId": "run-456",
  "status": "success",
  "data": {
    "textData": { ... },
    "listData": [ ... ]
  },
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### Remove Webhooks

```python
await robot.remove_webhooks()
```

## Updating Robots

```python
await robot.update(
    name="New Robot Name",
    workflow=new_workflow,
)

await robot.refresh()
```

## Deleting Robots

```python
await robot.delete()
```

## Robot Properties

```python
print(robot.id)
print(robot.name)

data = robot.get_data()
print(data["robotType"])
print(data["mode"])
print(data["url"])
```

## Complete Example

```python
from maxun import Extract, Config

extractor = Extract(Config(api_key="your-api-key"))

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
await robot.schedule(
    run_every=1,
    run_every_unit="DAYS",
    timezone="America/New_York",
    start_time="08:00",
)

# Add webhook
await robot.add_webhook(
    url="https://your-api.com/price-changes",
    events=["run.completed"],
    headers={
        "Authorization": "Bearer secret-token"
    },
)

print(f"Robot {robot.id} is now scheduled")
```

## Error Handling

```python
try:
    result = await robot.run()
    print("Success:", result["data"])
except Exception as error:
    print("Robot failed:", str(error))
```
