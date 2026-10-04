---
title: "Stealth Mode: Avoid Bot Detection When Scraping"
description: "Stealth mode makes Maxun's browser activity look human to reduce blocking on sites with bot detection. On by default in Cloud; use BYOP when self-hosting."
sidebar_label: "Stealth"
sidebar_position: 9
slug: /stealth
---

# Stealth
Stealth mode helps your automations run more reliably on websites that use bot detection or anti-scraping mechanisms.

When enabled, Stealth applies additional techniques to make browser activity appear more human-like and reduce the chances of being blocked.


## Maxun Cloud

- Stealth is enabled by default. No configuration is needed. Simply create your robot.

## Maxun OSS

If you are self-hosting, you can configure your own stealth setup using a <a href="/byop">Bring Your Own Proxy (BYOP)</a> approach.

Please refer to the <a href="/byop">BYOP</a> section for configuration details and recommendations.

## Other Ways to Avoid Getting Blocked

- **Use Maxun Cloud for heavily protected sites.** Cloud includes managed anti-bot infrastructure, automatic proxy rotation and CAPTCHA bypass. See <a href="/cloud-vs-oss">Cloud vs Open Source</a>.
- **Bring your own proxies when self-hosting.** Residential or location-specific proxies reduce blocks. See <a href="/byop">BYOP</a>.
- **Schedule runs at a reasonable frequency.** Very frequent runs can look suspicious, especially for robots that log in.
- **Use dedicated accounts for login robots.** See <a href="/extract-login">Extract Behind Login</a>.

For known limitations such as custom CAPTCHAs and A/B-tested pages, see the <a href="/faq-robot">FAQ</a>.