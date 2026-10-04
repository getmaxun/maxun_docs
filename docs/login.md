---
id: extract-login
title: "Scrape Data Behind a Login Without Sharing Passwords"
description: "Extract data from logged-in pages securely. Use the Maxun Chrome extension to reuse your session on Cloud, or encrypted credentials when self-hosting."
sidebar_label: "Extract Behind Login"
sidebar_position: 12
---

# Extract Behind Login

Maxun lets you extract data that sits behind authenticated (logged-in) pages, such as dashboards, customer portals and member areas, — **without compromising account security**.

We support a **password-free, extension-based login flow on Maxun Cloud**.

---

## Secure, Password-Free Login (Recommended)

You do NOT need to share your username or password with Maxun.

Instead, authentication is handled securely through the <a href="https://chromewebstore.google.com/detail/maxun-session-sync/poljedlhjgoempmkkfahecniimlejgdh">Maxun Chrome Extension</a>, allowing you to extract data behind login using your own active browser session.

### How Password-Free Login Works

1. Install the <a href="https://chromewebstore.google.com/detail/maxun-session-sync/poljedlhjgoempmkkfahecniimlejgdh">Maxun Chrome Extension</a>.
2. Open the extension and connect your Maxun account by adding your API key from the Maxun dashboard.
3. Log in to the target website normally in your browser.
4. Click **Sync** in the extension to share the authenticated session with Maxun Cloud.

### Why This Is Safer

* ✅ No passwords are ever shared or stored
* ✅ Uses your real browser session and cookies
* ✅ Reduces account flagging risk compared to automated logins

> ⚠️ **This extension-based login flow is available exclusively on Maxun Cloud.** Support for 2FA/MFA logins is coming soon.

### Demo: Password-Free Login

<iframe width="560" height="315" src="https://www.youtube.com/embed/brGQOdKbj6E?si=60yrWAEXC3BymhaH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
---

## OSS Extract Robots: Credential-Based Login

For **OSS (self-hosted) extract robots**, the original login-based approach is still supported.

### How Credential-Based Login Works

1. Enter your username/email and password while training the robot.
2. Perform the required actions to reach the data (see supported actions in [Recorder Mode](/robot/extract/robot-actions)).
3. Credentials entered during training are **encrypted and stored locally**.
4. On each run, the robot automatically logs in using the stored credentials and performs the extraction.

---

## Can my account be flagged or blocked?

Possibly.

We strongly discourage scraping private or restricted data from websites with strict bot-detection policies.

Risks include:

* IP address changes triggering security checks
* Automated login behavior raising flags
* Personal accounts being rate-limited or suspended

### Our Recommendation

* ✅ Use **Maxun Cloud + Chrome Extension** for authenticated extraction
* ⚠️ Avoid automated logins on sensitive websites
* ⚠️ Never use critical personal accounts for scraping

---
### Demo: Credential-Based Login

<iframe width="560" height="315" src="https://www.youtube.com/embed/_-n6OFQI_x4?si=zpnJJQnXQEUM9VwH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
