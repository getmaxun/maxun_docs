---
id: sdk-robot
title: Robot Management
sidebar_position: 4
---

# Robot Management

Run, schedule, and manage robot lifecycle through the SDK.

## Running Robots

### Immediate Execution

```javascript
const result = await robot.run();
console.log(result.data);
```

### With Options

```javascript
const result = await robot.run({
  waitForCompletion: true,
  timeout: 60000,
  webhook: {
    url: 'https://your-api.com/notify'
  }
});
```

### Run Result

```javascript
{
  status: 'success',
  runId: 'run-123',
  data: {
    // For Extract robots
    textData: { ... },
    listData: [ ... ],

    // For Scrape robots
    markdown: '...',
    html: '...'
  },
  screenshots: [ ... ]
}
```

## Execution History

### Get All Runs

```javascript
const runs = await robot.getRuns();

runs.forEach(run => {
  console.log(`Run ${run.id}: ${run.status}`);
});
```

### Get Specific Run

```javascript
const run = await robot.getRun('run-id');
```

### Get Latest Run

```javascript
const latestRun = await robot.getLatestRun();
```

## Aborting Runs

```javascript
await robot.abort('run-id');
```

## Scheduling

### Basic Scheduling

```javascript
await robot.schedule({
  runEvery: 6,
  runEveryUnit: 'HOURS'
});
```

Time units: `MINUTES`, `HOURS`, `DAYS`, `WEEKS`, `MONTHS`

### With Timezone

```javascript
await robot.schedule({
  runEvery: 1,
  runEveryUnit: 'DAYS',
  timezone: 'America/New_York'
});
```

### Time Windows

```javascript
await robot.schedule({
  runEvery: 1,
  runEveryUnit: 'HOURS',
  timezone: 'America/New_York',
  startTime: '09:00',
  endTime: '17:00'
});
```

### Remove Schedule

```javascript
await robot.unschedule();
```

## Webhooks

### Add Webhook

```javascript
await robot.addWebhook({
  url: 'https://your-api.com/webhook',
  events: ['run.completed', 'run.failed'],
  headers: {
    'Authorization': 'Bearer your-token'
  }
});
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

```javascript
await robot.removeWebhooks();
```

## Updating Robots

```javascript
await robot.update({
  name: 'New Robot Name',
  workflow: newWorkflow
});

await robot.refresh();
```

## Deleting Robots

```javascript
await robot.delete();
```

## Robot Properties

```javascript
console.log(robot.id);
console.log(robot.name);

const data = robot.getData();
console.log(data.robotType);
console.log(data.mode);
console.log(data.url);
```

## Complete Example

```javascript
import { Extract } from 'maxun-sdk';

const extractor = new Extract({
  apiKey: process.env.MAXUN_API_KEY
});

// Create robot
const robot = await extractor
  .create('Daily Price Monitor')
  .navigate('https://example.com/products')
  .captureList({
    selector: '.product',
    maxItems: 50
  });

// Run once to test
const testRun = await robot.run();
console.log('Test run:', testRun.status);

// Schedule daily execution
await robot.schedule({
  runEvery: 1,
  runEveryUnit: 'DAYS',
  timezone: 'America/New_York',
  startTime: '08:00'
});

// Add webhook
await robot.addWebhook({
  url: 'https://your-api.com/price-changes',
  events: ['run.completed'],
  headers: {
    'Authorization': 'Bearer secret-token'
  }
});

console.log(`Robot ${robot.id} is now scheduled`);
```

## Error Handling

```javascript
try {
  const result = await robot.run();
  console.log('Success:', result.data);
} catch (error) {
  console.error('Robot failed:', error.message);
  console.error('Status code:', error.statusCode);
}
```
