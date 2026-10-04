---
id: robot-duplicate
title: "Duplicate a Robot to Scrape Similar Pages in Bulk"
description: "Reuse a trained robot on other pages with the same structure. Duplicate it with a new URL to bulk-extract data from thousands of pages without retraining."
sidebar_label: "Duplication"
sidebar_position: 3
---

# Robot Duplication

Robot duplication is useful to extract data from pages with the <b>same structure without training a new robot!</b>

Robot duplication is only available for <a href="/robot/extract/robot-actions">Extract Recorder Mode</a>.

## When to Duplicate a Robot
1. The new page has the same structure as the existing page.
2. You want to extract the same data as the existing page.

Example: If you've created a robot for <a href="https://www.producthunt.com/topics/chrome-extensions">producthunt.com/topics/chrome-extensions</a>, you can duplicate it to scrape similar pages like <a href="https://www.producthunt.com/topics/sports">producthunt.com/topics/sports</a> without training a robot from scratch.

Using robot duplication, you can bulk extract the same data from thousands of pages of the same website, without writing code.

## When Not to Duplicate a Robot
1. The new page does not have the same structure as the existing page.
2. You don't want to extract the same data as the existing page even if the pages are structurally the same.

Example: If you've created a robot for <a href="https://www.producthunt.com/topics/chrome-extensions">producthunt.com/topics/chrome-extensions</a>, you should not duplicate it to scrape pages like <a href="https://github.com">github.com</a>.
If you do so, you will get no data.

## Duplicate With the API, CLI or SDK

You can also duplicate robots programmatically:

- **REST API:** `POST /api/robots/{id}/duplicate` with a `targetUrl` in the body. See [Robot API](/api/robot-api).
- **CLI:** `maxun robots duplicate <robot-id> --url <new-url>`. See [CLI Robots](/cli/cli-robots).
- **Node.js SDK:** `const copy = await robot.duplicate('https://example.com/eu/pricing');`
- **Python SDK:** `copy = await robot.duplicate("https://example.com/eu/pricing")`

## See Robot Duplication In Action
<iframe width="560" height="315" src="https://www.youtube.com/embed/fdW8VPcAsN8?si=wqynEzmy9IbOsciG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
