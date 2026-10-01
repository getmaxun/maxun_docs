---
id: sdk-monitoring
title: Monitoring
sidebar_position: 8
---

# Monitoring

Monitoring compares every run of a robot with its previous successful run, so you can tell when a page changes: a new price, a new job posting, an updated policy.

It works for **scrape**, **crawl** and **extract** robots (both prompt and selector robots).

## Turn on monitoring

Pass `monitor: true` when you create the robot:

```javascript
// Scrape: watch a page's content
await maxun.scrape('Pricing watch', 'https://example.com/pricing', { formats: ['text'], monitor: true });

// Crawl: watch every page of a site
await maxun.crawl('Docs watch', 'https://docs.example.com', { limit: 50, monitor: true });

// Extract with a prompt: watch specific data
await maxun.extract('Product watch', 'https://shop.example.com/product/42', {
  prompt: 'Product name, price and availability',
  monitor: true,
});

// Extract with selectors
await maxun
  .extract('Listings watch', 'https://shop.example.com/new', { monitor: true })
  .captureList({ selector: '.listing' })
  .build();
```

Or turn it on and off for an existing robot:

```javascript
await robot.setMonitoring(true);
await robot.setMonitoring(false);

console.log(robot.isMonitoring);
```

## Checking for changes

The first run is the baseline. From the second run on, the result says whether anything changed:

```javascript
const result = await robot.run();

if (result.hasChanges) {
  console.log('Changed:', result.changedFormats);
} else {
  console.log('No changes');
}
```

```javascript
console.log(result);
// {
//   runId: '9e1f…',
//   status: 'success',
//   text: '…',
//   hasChanges: true,
//   changedFormats: [ 'text' ]
// }
```

`hasChanges` and `changedFormats` only appear on robots with monitoring turned on.

| Robot | What is compared | `changedFormats` values |
|---|---|---|
| Scrape | The page's `text`, `markdown` and `html` | `text`, `markdown`, `html` |
| Crawl | Every page's `text`, `markdown` and `html`, matched by URL | `text`, `markdown`, `html` |
| Extract | The captured text and lists | `captured-text`, `captured-list` |

## Seeing what changed

`getRunDiff` returns the changes line by line:

```javascript
const diff = await robot.getRunDiff(result.runId);

for (const section of diff.diffs) {
  console.log('Format:', section.format);
  for (const change of section.changes) {
    if (change.added) console.log('+', change.value);
    else if (change.removed) console.log('-', change.value);
  }
}
```

```text
Format: text
- Pro plan: $49 / month
+ Pro plan: $59 / month
```

Limit the diff to one format with the second argument:

```javascript
const diff = await robot.getRunDiff(result.runId, 'markdown');
```

`getRunDiff` works for any run, including scheduled runs:

```javascript
const run = await robot.getLatestRun();
const diff = await robot.getRunDiff(run.runId);
```

### Crawl changes

For crawl robots you also get the pages that were added, removed or changed:

```javascript
const result = await robot.run();

if (result.hasChanges) {
  const pages = result.changedPages;
  console.log('New pages:', pages.added);
  console.log('Removed pages:', pages.removed);
  console.log('Changed pages:', pages.changed);
}
```

The same list is in `diff.pages`.

:::note
Crawl changes are computed by the SDK. `result.hasChanges` is filled in for runs started with `robot.run()`. For scheduled crawl runs, use `getRunDiff`. Webhooks and the Maxun dashboard don't show crawl changes.
:::

## Monitor on a schedule

Monitoring is most useful with a [schedule](./sdk-robot#scheduling) and a [webhook](./sdk-robot#webhooks): Maxun checks the page for you and calls your server after every run.

```javascript
const robot = await maxun.scrape('Pricing watch', 'https://example.com/pricing', {
  formats: ['text'],
  monitor: true,
});

await robot.run();   // first run: the baseline

await robot.schedule({ runEvery: 6, runEveryUnit: 'HOURS' });
await robot.addWebhook('https://your-app.com/hooks/pricing');
```

Later, check the latest scheduled run:

```javascript
const run = await robot.getLatestRun();
const diff = await robot.getRunDiff(run.runId);

if (diff.hasChanges) {
  await notifyTeam(diff);
}
```

## Complete example

```javascript
import 'dotenv/config';
import { Maxun } from 'maxun-sdk';

const maxun = new Maxun();

const robot = await maxun.extract('HN top stories watch', 'https://news.ycombinator.com', {
  prompt: 'Title and points of the top 10 stories',
  monitor: true,
});

await robot.run();                     // baseline
const result = await robot.run();      // compared with the baseline

if (!result.hasChanges) {
  console.log('Nothing changed');
} else {
  const diff = await robot.getRunDiff(result.runId);
  for (const section of diff.diffs) {
    for (const change of section.changes) {
      if (change.added || change.removed) {
        console.log(change.added ? '+' : '-', change.value);
      }
    }
  }
}
```