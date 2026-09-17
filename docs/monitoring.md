---
id: monitoring
title: Monitoring
sidebar_position: 6
---

# Monitoring

Monitoring lets you track a website over time and get notified when it changes. You can monitor an entire website, or just a specific part of it. It works with **Extract**, **Scrape**, and **Crawl** robots, and is available through the no-code dashboard, the SDK, the CLI, and the API.

Every time a monitored robot runs, its output is compared against the previous run, so you can see exactly what's different.

## What can be monitored

What you're monitoring depends on the robot type:

* **Extract** - monitor specific parts of a page: text, lists, or screenshots.
* **Scrape** - monitor the entire page, captured in whichever output formats you've configured, including screenshots.
* **Crawl** - monitor an entire website as it crawls across pages.

Screenshot comparison is a **Cloud-only** feature and is not available in the open-source (OSS) version. Crawl monitoring is also **Cloud-only**. All other content formats are supported on both Cloud and OSS.

## Enabling monitoring

You can turn monitoring on in two places:

1. **At creation time** - when creating a robot, check the monitoring checkbox in the creation flow.
2. **From robot settings** - open an existing robot's settings and enable monitoring there. This is also where you can turn it off.

## Viewing changes

Once monitoring is enabled, changes are shown in the **Runs** tab for each individual run.

When a run contains changes compared to the previous run, a **Changed** button will appear next to that run. Click **Changed** to view exactly what changed between the two runs.

## AI Mode

Instead of just comparing raw output, you can enable AI Mode and describe what you actually care about in plain language. This is useful when you don't want to be notified about every change - only specific ones that matter to you.

For example, instead of monitoring every value on a page, you could prompt:

> "Tell me when births increase to 200 today"

This works across all monitor types (Extract, Scrape, and Crawl) and uses AI to evaluate each run against your prompt, rather than doing a plain diff.

## Scheduling

Monitored robots can be scheduled to run automatically at whatever interval you need, so you don't have to trigger runs manually to catch changes. See [Scheduling](./robot-schedule) for details on setting up recurring runs.

## Alerts

When monitoring detects a change, you can enable email alerts from the **Monitoring** section in your Robot settings. After enabling monitoring, turn on **Email Alerts** and optionally enter the email address you want to receive alerts at.

If the email field is left empty, alerts will be sent to the email address associated with your account.

Email alerts are a **Cloud-only** feature and are not available in OSS.

## Availability

| Interface           | Supported |
| ------------------- | --------- |
| Dashboard (No-Code) | ✅         |
| SDK                 | ✅         |
| CLI                 | ✅         |
| API                 | ✅         |
