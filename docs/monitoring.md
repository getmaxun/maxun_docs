---
id: monitoring
title: Monitoring
sidebar_position: 6
---

# Monitoring

Monitoring lets you track a website over time and get notified when it changes — whether you care about the entire page or just a specific section of it. It works with **Extract**, **Scrape**, and **Crawl** robots, and is available through the no-code dashboard, the SDK, the CLI, and the API.

Every time a monitored robot runs, its output is compared against the previous run. If anything changed, that run is flagged so you can see exactly what's different.

## What can be monitored

Support varies slightly by robot type:

| Robot type | Text | Lists | Screenshots |
|---|---|---|---|
| Extract | ✅ | ✅ | ✅ (Cloud only) |
| Scrape | ✅ | ✅ | ✅ (Cloud only) |
| Crawl | ✅ | ✅ | ✅ (Cloud only) |

Screenshot comparison is a Cloud-only feature and is not available in the open-source (OSS) version. All other content formats are supported on both Cloud and OSS.

## Enabling monitoring

You can turn monitoring on in two places:

1. **At creation time** — when creating a robot, check the monitoring checkbox in the creation flow.
2. **From robot settings** — open an existing robot's settings and enable monitoring there. This is also where you can turn it off, or configure alerts once it's on.

## AI Mode

Instead of just comparing raw output, you can enable AI Mode and describe what you actually care about in plain language. This is useful when you don't want to be notified about every change — only specific ones that matter to you.

For example, instead of monitoring every value on a page, you could prompt:

> "Tell me when births increase to 200 today"

This works across all monitor types (Extract, Scrape, and Crawl) and uses AI to evaluate each run against your prompt, rather than doing a plain diff.

## Scheduling

Monitored robots can be scheduled to run automatically at whatever interval you need, so you don't have to trigger runs manually to catch changes. See [Scheduling](./scheduling) for details on setting up recurring runs.

## Alerts

When monitoring detects a change, you can be notified by email. Email alerts are a **Cloud-only** feature and are not available in OSS.

To set this up, enable monitoring in robot settings, then turn on email alerts and provide the address you'd like notifications sent to.

## Availability

| Interface | Supported |
|---|---|
| Dashboard (no-code) | ✅ |
| SDK | ✅ |
| CLI | ✅ |
| API | ✅ |