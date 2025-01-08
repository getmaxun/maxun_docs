---
id: faq-robot
title: Robot FAQs
sidebar_position: 1
---

> ℹ️ Maxun is designed to work on any website. Below are some limitations

### Captchas
1. We support solving several types of captcha in Maxun Cloud (e.g., ReCaptcha, hCaptcha), but not custom captcha.
2. Captcha bypass in not supported in Maxun Open Source. Contributions are welcome!

### A/B tests on websites
If a website is running an A/B test and the robot encounters a different version of the page than the one it was trained on, it might either fail or collect incorrect information. While the robot can adapt to certain differences, it may not handle all variations effectively.

### Very Strong Bot Detection
Maxun Cloud bypasses the bot detection effectively. For Maxun Open Source, you need to bring your own proxies. 
However, if your robot needs to log into a website, then there is a higher chance of runs failing because:
1. The same user is accessing the account from different IP addresses (your local IP and Maxun's IPs).
2. High run frequency by the robot can appear suspicious.
As a result, robots that require login credentials are more likely to be flagged.
Flagging rate might reduce when you robots are run at a high frequency locally.