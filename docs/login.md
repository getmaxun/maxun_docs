---
id: extract-login
title: Extract Behind Login
sidebar_position: 7
---

With Maxun, it is possible to extract data behind logins. All you need to do is enter your username/email and password. We strongly recommend extracting public data with your Maxun robots - not data requiring login.

## How to extract behind login?
1. Enter credentials while training the robot.
2. Perform an action to extract data. See supported robot actions here: <a href="/robot/robot-actions">Robot Actions.</a>
3. Credentials entered while robot training are securely encrypted and stored for future logins.
4. For each run, the robot will enter the stored credentials and login to perform the action specified.

## Can my account be flagged/deleted?
Maybe. We do not recommend scraping data that requires logging in on websites that have strong bot detection and can block your accounts.
Using your personal account for data extraction can result in it being flagged, due to IP address changes.

> Despite this, if you want to extract data behind login, we recommend using Maxun locally, rather than the cloud version. 

## Coming Soon
1. Cookie support for supported websites.
2. 2FA and MFA support for better automation.

## Demo Tutorial
<iframe width="560" height="315" src="https://www.youtube.com/embed/_-n6OFQI_x4?si=zpnJJQnXQEUM9VwH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
