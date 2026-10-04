---
id: robot-actions
title: "Recorder Mode: Point-and-Click Web Data Extraction"
description: "Record your actions in a browser and Maxun turns them into a reusable extraction robot. Capture lists, text and screenshots with pagination, without code."
sidebar_label: "Recorder Mode"
sidebar_position: 2
---

# Recorder Mode

Recorder Mode lets you record your actions into a workflow. Show the Recorder what you want to capture, and a robot will watch and learn.

Recorder Mode is the most precise way to build an Extract robot. Use it when you need exact fields, multi-step flows, logins, form filling or pagination. Robots built in Recorder Mode can also be [duplicated](/robot/extract/robot-duplicate) for similar pages and [retrained](/robot/extract/robot-retrain) when a site changes.

Depending on the use case, a robot should be configured to perform any of the following actions.

## 1. Capture List
Capture List should be used to capture bulk data. Example: Extract products from <a href="https://producthunt.com">producthunt.com</a>. Capture List involves four steps:
1. Select the product/item to capture.
2. Select fields inside the selected product/item.
3. Show the robot how to handle pagination.
4. Set a limit, i.e. the number of items to capture.

Supported pagination types:
- **Click "Next"** to move to the next page
- **Click "Load more"** to load more items on the same page
- **Scroll down** for infinite scrolling pages
- **Scroll up** for pages that load items upwards
- **No more items**, when everything is on one page

Check out this video to understand how to create a robot with capture list

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZXGQEwQN7yI?si=PaNzVTbWn9z4Vh0E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


## 2. Capture Text
Capture Text should be used to extract specific text content. Useful to get individual data and when you do not want to bulk scrape.

Check out this video to understand how to create a robot with capture text
<iframe width="560" height="315" src="https://www.youtube.com/embed/ZXGQEwQN7yI?si=k-etTEyhx_a9yFOr&amp;start=275" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## 3. Capture Screenshot
Capture Screenshot should be used to extract screenshots of websites. Currently supported screenshots include:
1. Full page screenshots
2. Visible section screenshots

Check out this video to understand how to create a robot with capture screenshot
<iframe width="560" height="315" src="https://www.youtube.com/embed/ZXGQEwQN7yI?si=Lqlu94nDl1CWBwPc&amp;start=195" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## What Recorder Mode Supports

- Clicking buttons and links
- Filling out forms, dropdowns, radio buttons, checkboxes, dates and times
- Logging in to websites (see [Extract Behind Login](/extract-login))
- Extracting data inside iFrames and Shadow DOM
- Capturing image and file URLs

## Using with SDK

The same capture actions are available in code through the <a href="/category/sdk">Maxun SDK</a>, using CSS selectors:

```javascript
const robot = await maxun.extract('Products', 'https://shop.example.com')
  .captureList({ selector: 'article.product_pod', maxItems: 20 })
  .build();
```

See [Node.js Extract](/sdk/node-sdk/sdk-extract) and [Python Extract](/sdk/python-sdk/sdk-extract) for the full builder API.