---
id: robot-actions
title: Recorder Mode
sidebar_position: 2
---

Recorder Mode lets you record your actions into a workflow. Show the Recorder what you want to capture, and a robot will watch and learn.

Depending on the use-case, a robot should be configured to perform any of the following actions.

### 1. Capture List
Capture List should be used to capture bulk data. Example: Extract products from <a href="https://producthunt.com">producthunt.com</a>. Capture List involves three steps:
1. Select the product/item to capture.
2. Select fields inside the selected product/item.
3. Show the robot how to handle pagination.
4. Set a limit, i.e number of items to capture. 

Check out this video to understand how to create a robot with capture list

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZXGQEwQN7yI?si=PaNzVTbWn9z4Vh0E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


### 2. Capture Text
Capture Text should be used to extract specific text content. Useful to get individual data and when you do not want to bulk scrape.

Check out this video to understand how to create a robot with capture text
<iframe width="560" height="315" src="https://www.youtube.com/embed/ZXGQEwQN7yI?si=k-etTEyhx_a9yFOr&amp;start=275" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### 3. Capture Screenshot
Capture Screenshot should be used to extract screenshots of websites. Currently supported screenshots include:
1. Full page screenshots
2. Visible section screenshots

Check out this video to understand how to create a robot with capture screenshot
<iframe width="560" height="315" src="https://www.youtube.com/embed/ZXGQEwQN7yI?si=Lqlu94nDl1CWBwPc&amp;start=195" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Using with SDK

Recorder Mode is also available through the <a href="/sdk/sdk-extract">Maxun SDK</a> for programmatic robot creation.