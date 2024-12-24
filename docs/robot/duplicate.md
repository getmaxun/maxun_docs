---
id: robot-duplicate
title: Robot Duplication
sidebar_position: 3
---

Robot duplication is useful to extract data from pages with the <b>same structure without training a new robot!</b>

### When to duplicate a robot?
1. The new page has the same structure as the existing page.
2. You want to extract the same data as the existing page.

Example: If you've created a robot for <a href="https://www.producthunt.com/topics/chrome-extensions">producthunt.com/topics/chrome-extensions</a>, you can duplicate it to scrape similar pages like <a href="https://www.producthunt.com/topics/sports">producthunt.com/topics/sports</a> without training a robot from scratch.

Using robot duplication, you can bulk extract same data from thousands of pages of the same website, without writing code.

### When to not duplicate a robot?
1. The new page does not have the same structure as the existing page.
2. You don't want to extract the same data as the existing page even if the pages are structurally same.

Example: If you've created a robot for <a href="https://www.producthunt.com/topics/chrome-extensions">producthunt.com/topics/chrome-extensions</a>, you should not duplicate it to scrape pages like <a href="https://github.com">github.com</a>.
If you do so, you will get no data.

### See Robot Duplication In Action
<iframe width="560" height="315" src="https://www.youtube.com/embed/fdW8VPcAsN8?si=wqynEzmy9IbOsciG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>