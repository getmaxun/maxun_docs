---
id: faq-robot
title: FAQs
sidebar_position: 10
---
### What sites does Maxun work on?
Maxun is designed to work on any website. There are billions of websites out there (and hundreds are created everyday). We do our best to adapt to almost every possible website - that being said there are always unique scenarios that arise, often due to inaccessible code or non-standard practices on certain sites.

### My Robot Needs Pagination and Scrolling. Can Maxun handle this?
Yes. Refer the section: <a href="">Pagination and Scrolling.</a>

### Can my robot login to websites?
Yes. Refer this section: <a href="">Extract behind login.</a>

### Can I extract data from an iFrame?
Yes. Maxun 0.0.6 onwards data inside iFrame can be extracted.

### Can I extract data from Shadow DOM?
Yes. Maxun 0.0.6 onwards data inside Shadow DOM can be extracted.

### Can I download files using Browse AI?
Maxun is primarily designed to extract text data, but this is a part of our roadmap.
Currently, you can extract `URLs` of files, such as:
1. Image URLs

When training a robot, you can easily capture image URLs by clicking on the image and selecting "URL." This allows you to collect a list of image URLs that you can then use to download the images manually or with other tools.

2. File Links

Similarly, you can capture the URLs of other types of files, such as PDFs or documents, by selecting the link or element that points to the direct file and using the appropriate capture action.

### Can my robot fill out a form or perform an action before extracting data?
Definitely! Your robot can:
- Open a webpage
- Log in
- Click on buttons
- Fill out a form
- Select from a dropdown menu, radios, checkboxes, dates, times, etc.
- Extract structured data from a webpage into a spreadsheet
- Take screenshots

## Robot FAQs
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