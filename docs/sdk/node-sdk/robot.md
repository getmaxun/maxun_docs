---
id: sdk-robot
title: Robot Management
sidebar_position: 8
---

# Robot Management

Every `maxun.scrape(...)`, `maxun.extract(...)`, `maxun.crawl(...)`, `maxun.search(...)` and `maxun.documents...` call returns a **robot**. A robot is saved on your account. You can run it, schedule it, get notified when it finishes and look back at earlier runs.

## Finding robots

```javascript
const all = await maxun.robots.list();              // every robot
const crawlers = await maxun.robots.list('crawl');  // one type
const scrapers = await maxun.scrape.list();         // same thing, per type

const robot = await maxun.robots.get('robot-id');
const pricing = await maxun.robots.find('Pricing page');   // by exact name
```

A robot prints as its id, name and type:

```javascript
console.log(await maxun.robots.list());
// [
//   { id: 'a2e3af0f-fd5b-45cc-b2d0-83e7e5aaf5b3', name: 'Pricing page', type: 'scrape' },
//   { id: '76f3e1c2-9b1a-4c8e-8f0e-2d1c5b7a9e44', name: 'Bookstore', type: 'extract' }
// ]
```

Types are `scrape`, `extract`, `crawl`, `search`, `doc-extract` and `doc-parse`.

Read more about a robot from its properties:

| Property | Description |
|---|---|
| `robot.id` | The robot's id |
| `robot.name` | The robot's name |
| `robot.type` | `scrape`, `extract`, `crawl`, `search`, `doc-extract` or `doc-parse` |
| `robot.url` | The page the robot starts on |
| `robot.formats` | The robot's output formats |
| `robot.isMonitoring` | Whether [monitoring](./sdk-monitoring) is on |
| `robot.getData()` | The full robot record from Maxun |

## Running a robot

```javascript
const result = await robot.run();
```

`run()` waits until the run finishes and returns the result. If the run fails or is aborted, it throws `RunFailedError`.

The result contains the run id, the status and only the outputs the robot produced:

```javascript
console.log(result);
// {
//   runId: 'b05cea93-31d1-4a17-9e6c-e278b4e4abf3',
//   status: 'success',
//   markdown: '# Example Domain\n\n…'
// }
```

Read outputs as properties:

| Property | Filled by |
|---|---|
| `result.runId`, `result.status` | Every run |
| `result.markdown`, `.html`, `.text`, `.links`, `.summary` | Scrape and document parse robots |
| `result.smartQueryResult` | Scrape robots with Smart Queries |
| `result.textData` | `captureText` |
| `result.listData` | `captureList` and prompt extraction |
| `result.crawlData` | Crawl robots, one entry per page |
| `result.searchData` | Search robots |
| `result.documentData` | Document extract robots |
| `result.screenshots` | Screenshot formats and `captureScreenshot` |
| `result.hasChanges`, `.changedFormats` | Robots with [monitoring](./sdk-monitoring) on |

A property for an output the run didn't produce is `undefined` or empty, so it is always safe to read.

### Run options

```javascript
await robot.run({ formats: ['markdown', 'html'] });          // different formats, this run only
await robot.run({ smartQueries: 'Which plan has SSO?' });    // a question, this run only (scrape)
await robot.run({ timeout: 600000 });                        // stop waiting after 10 minutes
```

`timeout` is in milliseconds. The run keeps going on Maxun after `run()` stops waiting. Read it later with `getLatestRun()`.

## Run history

```javascript
const runs = await robot.getRuns();       // newest first
const latest = await robot.getLatestRun();
const run = await robot.getRun('run-id');
```

A run prints as a short summary:

```javascript
console.log(await robot.getRuns());
// [
//   {
//     id: '3faaa1cd-5c3a-4b7e-a0a1-27c8f0b1f9d2',
//     runId: 'bdae3b5a-8f2e-4d71-9c55-0e6f3a2b1c48',
//     robotId: '2c56ce3b-1d9e-4f6a-8b3c-7e5d4a2f1b90',
//     name: 'Pricing page',
//     status: 'success',
//     startedAt: '2026-10-01T00:46:25Z',
//     finishedAt: '2026-10-01T00:47:14Z'
//   }
// ]
```

Times are in UTC (`finishedAt` is `null` while a run is still going). `status` is `queued`, `running`, `success`, `failed`, `aborting` or `aborted`.

Get a run's output with `run.result`. This works for every run, including scheduled ones:

```javascript
const run = await robot.getLatestRun();
if (run?.status === 'success') {
  console.log(run.result.markdown);
}
```

### Aborting a run

```javascript
await robot.abort('run-id');
```

## Scheduling

Run a robot automatically:

```javascript
// Every 6 hours
await robot.schedule({ runEvery: 6, runEveryUnit: 'HOURS' });

// Every day at 9:00 in Kolkata time
await robot.schedule({ runEvery: 1, runEveryUnit: 'DAYS', atTimeStart: '09:00', timezone: 'Asia/Kolkata' });

// Every Monday at 9:00
await robot.schedule({ runEvery: 1, runEveryUnit: 'WEEKS', startFrom: 'MONDAY', atTimeStart: '09:00' });

// On the 1st of every month at 6:30
await robot.schedule({ runEvery: 1, runEveryUnit: 'MONTHS', dayOfMonth: 1, atTimeStart: '06:30' });
```

| Option | Description |
|---|---|
| `runEvery` | How many units between runs |
| `runEveryUnit` | `MINUTES`, `HOURS`, `DAYS`, `WEEKS` or `MONTHS` |
| `timezone` | An IANA time zone, such as `'America/New_York'`. Defaults to `'UTC'` |
| `atTimeStart` | Time of day as `'HH:MM'` for daily, weekly and monthly schedules |
| `atTimeEnd` | Optional end of the time window, as `'HH:MM'` |
| `startFrom` | Day of the week for weekly schedules, such as `'MONDAY'` |
| `dayOfMonth` | Day of the month for monthly schedules |

Check or remove the schedule:

```javascript
const schedule = await robot.getSchedule();
if (schedule) {
  console.log('Next run:', schedule.nextRunAt);
} else {
  console.log('Not scheduled');
}

await robot.unschedule();
```

`getSchedule()` returns `null` when the robot has no schedule.

## Webhooks

Get an HTTP POST to your server every time a run finishes:

```javascript
await robot.addWebhook('https://your-app.com/hooks/maxun');
```

Only failed runs, with more retries:

```javascript
await robot.addWebhook('https://your-app.com/hooks/maxun-alerts', {
  events: ['run_failed'],
  retryAttempts: 5,
});
```

| Option | Default | Description |
|---|---|---|
| `events` | both | `run_completed`, `run_failed` |
| `retryAttempts` | `3` | How many times to retry a failed delivery |
| `retryDelay` | `5` | Seconds before the first retry. The wait grows with each retry |
| `timeout` | `30` | Seconds to wait for your server to respond |

Adding a URL that is already registered updates it instead of adding a duplicate.

```javascript
const hooks = await robot.getWebhooks();                               // [] if none
await robot.removeWebhook('https://your-app.com/hooks/maxun-alerts');  // by URL or id
await robot.removeWebhooks();                                          // remove all
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

```javascript
await robot.rename('Pricing page (EU)');
await robot.setListLimit(25);           // item limit of a list, crawl or search robot
const copy = await robot.duplicate('https://example.com/eu/pricing');   // same robot, different URL
await robot.refresh();                  // reload the robot from Maxun
```

## Deleting robots

```javascript
await robot.delete();
await maxun.robots.delete('robot-id');
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

```javascript
import { ConflictError } from 'maxun-sdk';

let robot;
try {
  robot = await maxun.scrape('Pricing page', 'https://example.com/pricing');
} catch (error) {
  if (!(error instanceof ConflictError)) throw error;
  robot = await maxun.robots.find('Pricing page');
}
```

## Complete example

```javascript
import 'dotenv/config';
import { Maxun, RunFailedError } from 'maxun-sdk';

const maxun = new Maxun();

const robot = await maxun
  .extract('Hacker News front page', 'https://news.ycombinator.com')
  .captureList({ selector: 'tr.athing', maxItems: 30 })
  .build();

// Check it works
try {
  const result = await robot.run();
  console.log(`${result.listData.length} stories`);
} catch (error) {
  if (error instanceof RunFailedError) {
    console.error('Run failed:', error.message);
    process.exit(1);
  }
  throw error;
}

// Then run it every morning and get notified
await robot.schedule({ runEvery: 1, runEveryUnit: 'DAYS', atTimeStart: '08:00' });
await robot.addWebhook('https://your-app.com/hooks/maxun');

const schedule = await robot.getSchedule();
console.log('Next run:', schedule?.nextRunAt);
```

## Errors

| Error | When |
|---|---|
| `AuthenticationError` | The API key is missing or invalid |
| `NotFoundError` | The robot or run does not exist |
| `ConflictError` | A robot with that name already exists with different settings |
| `ValidationError` | Maxun rejected the input |
| `RunFailedError` | A run failed or was aborted |

All of them extend `MaxunError`, which has `statusCode` and `details`.