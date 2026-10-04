---
id: faq-robot
title: "Maxun FAQ: Pricing, Robots, API, Logins & More"
description: "Answers to common Maxun questions: pricing and credits, free trial, robot types, pagination, logins, CAPTCHAs, API and SDKs, MCP, self-hosting and limitations."
sidebar_label: "FAQs"
sidebar_position: 16
---

<head>
  <script type="application/ld+json">
    {`{"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": "What is Maxun?", "acceptedAnswer": {"@type": "Answer", "text": "Maxun is an open-source web data platform that turns any website into clean, structured data for your apps, workflows and AI agents. You can scrape, crawl, extract, search and monitor the web through the REST API, Node.js and Python SDKs, CLI and MCP server, or through a no-code dashboard where anyone can build robots by clicking on a page or describing what they need in plain English."}}, {"@type": "Question", "name": "Who is Maxun for?", "acceptedAnswer": {"@type": "Answer", "text": "Maxun is built for both developers and non-technical teams. Developers and AI engineers use the API, SDKs, CLI and MCP server to power products and agents. Growth, operations and research teams use the no-code dashboard to build and schedule robots without writing code. Both work on the same platform, so teams can hand work back and forth."}}, {"@type": "Question", "name": "What can I build with Maxun?", "acceptedAnswer": {"@type": "Answer", "text": "Teams use Maxun for price and competitor monitoring, lead generation, market research, RAG pipelines, AI agents that need live web data, real estate and job aggregators, review tracking and content aggregation. If the data is on a website, you can turn it into a dataset, a scheduled feed or an API."}}, {"@type": "Question", "name": "How does Maxun work?", "acceptedAnswer": {"@type": "Answer", "text": "You tell Maxun what data you want by clicking elements in the recorder, describing it in plain English with AI Mode, starting from a pre-built auto robot, or writing code with the API or SDK. Maxun runs a real browser, handles JavaScript, pagination, infinite scroll and logins, and returns clean data. Every robot can run on demand or on a schedule, with results delivered by webhook, export or integration."}}, {"@type": "Question", "name": "What is a robot?", "acceptedAnswer": {"@type": "Answer", "text": "A robot is a reusable automation that collects web data for you. There are several types: Scrape turns a page into Markdown, HTML, text, links or screenshots; Crawl covers an entire website; Extract pulls structured rows such as products or listings; Search finds and optionally scrapes pages for a query; and Document robots extract data from or convert files such as PDFs. Every robot has adjustable inputs, like the URL, that you can change each time it runs. See Robots Overview to pick the right one."}}, {"@type": "Question", "name": "Which robot type should I use?", "acceptedAnswer": {"@type": "Answer", "text": "Use Scrape for the content of a single page, Crawl for many pages or a whole site, Extract for structured rows like prices or listings, Search to find pages for a query, and Document robots for PDFs and other files. Add Monitoring to any Scrape, Crawl or Extract robot to track changes."}}, {"@type": "Question", "name": "Is Maxun available on the cloud?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Maxun Cloud is the fully managed version, available at app.maxun.dev. There's nothing to install or maintain."}}, {"@type": "Question", "name": "Is Maxun open source?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Maxun is open source under the AGPLv3 license. The code is on GitHub, where you can view, modify, self-host and contribute to it."}}, {"@type": "Question", "name": "What is the difference between Maxun Cloud and the open-source version?", "acceptedAnswer": {"@type": "Answer", "text": "Both include Scrape, Crawl, Extract, Search, Monitoring, the API, SDKs, webhooks and extraction behind login. Maxun Cloud adds managed anti-bot infrastructure with CAPTCHA bypass and automatic proxy rotation, Deep Extraction, automatic adaptation to website changes, auto robots, advanced AI features, unlimited workspaces, email notifications, SAML SSO and priority support, with no servers to maintain. See the full Cloud vs Open Source comparison."}}, {"@type": "Question", "name": "How do I get started?", "acceptedAnswer": {"@type": "Answer", "text": "Sign up at app.maxun.dev/register and start your 7-day free trial. Create your first robot from a pre-built auto robot, by clicking on the data you want with the recorder, by describing it in plain English with AI Mode, or with the API and SDKs. Then run it on demand or schedule it. Most new users set up their first robot in about 5 minutes. See the Quickstart."}}, {"@type": "Question", "name": "Can I try Maxun for free?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Maxun Cloud comes with a 7-day free trial with full access to every feature, and no credit card is required. Use it to build robots, test the API and run real extractions on your own target websites before choosing a plan. You can also self-host the open-source edition for free on your own infrastructure."}}, {"@type": "Question", "name": "How much does Maxun cost?", "acceptedAnswer": {"@type": "Answer", "text": "Maxun Cloud has four plans, priced in USD: Starter is $19/month for 3,500 credits and 1 user with basic support. Growth is $99/month for 100,000 credits and 5 users with standard support. Pro is $399/month for 350,000 credits and 10 users with priority support. Premium has custom pricing, credits and users, with priority support and an SLA. A 7-day free trial is available with no credit card required."}}, {"@type": "Question", "name": "Which plan is right for me?", "acceptedAnswer": {"@type": "Answer", "text": "Starter is for individuals and small projects. Growth is for teams running regular extractions and monitoring. Pro is for high-volume pipelines and production workloads. Premium offers custom credits, users and data retention, an SLA, a dedicated account manager, custom integrations and fully managed onboarding."}}, {"@type": "Question", "name": "What is included in every plan?", "acceptedAnswer": {"@type": "Answer", "text": "Every plan includes Scrape, Crawl, Extract, Search and Monitoring, API access, SDKs, CLI and MCP, webhooks, scheduled runs, extraction behind login, stealth mode, and CSV and JSON exports. Higher plans add more credits, more team members, advanced stealth mode and faster support."}}, {"@type": "Question", "name": "What is a credit?", "acceptedAnswer": {"@type": "Answer", "text": "Credits are how usage is measured on Maxun Cloud. Each plan includes a set number of credits per billing cycle. Scrape: 1 credit per page. Scrape with Smart Queries: +2 credits per run. Crawl: 1 credit per page. Extract (Recorder Mode): 1 credit per 4 rows. Extract (AI Mode): 1 credit per 3 rows. Screenshot: 1 credit per screenshot. Search: 1 credit per 5 results. Search + Scrape: 1 credit per result. For example, extracting 50 products in Recorder Mode uses 12.5 credits, scraping 100 pages to Markdown uses 100 credits, and monitoring 50 pages daily with a scrape robot uses about 1,500 credits per month."}}, {"@type": "Question", "name": "Do unused credits roll over?", "acceptedAnswer": {"@type": "Answer", "text": "Unused credits usually do not carry over to the next billing cycle. However, if you upgrade your plan before your current cycle ends, your unused credits are added to your new plan's credits and remain available for the duration of your upgraded plan."}}, {"@type": "Question", "name": "Am I charged for failed requests?", "acceptedAnswer": {"@type": "Answer", "text": "No. You only pay for successful requests. If a request fails, no credits are deducted."}}, {"@type": "Question", "name": "How does billing work?", "acceptedAnswer": {"@type": "Answer", "text": "Plans are billed monthly or yearly, and credits reset at the start of each billing cycle. All prices are in USD."}}, {"@type": "Question", "name": "Do you offer refunds?", "acceptedAnswer": {"@type": "Answer", "text": "We do not offer refunds for subscription fees. The 7-day free trial lets you test all features before committing to a paid plan. If you have any issues or concerns about your subscription, contact support@maxun.dev."}}, {"@type": "Question", "name": "Do you offer custom or enterprise plans?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. The Premium plan includes custom credit and user limits, custom data retention, advanced stealth mode, fully managed onboarding and setup, priority support with an SLA, a dedicated account manager and custom integrations. For large or complex projects, our team can also run fully managed data collection for you. Contact sales for a quote."}}, {"@type": "Question", "name": "Is self-hosting free?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. The open-source edition is free under the AGPLv3 license. You only pay for your own infrastructure. See Self-Host Maxun."}}, {"@type": "Question", "name": "What sites does Maxun work on?", "acceptedAnswer": {"@type": "Answer", "text": "Maxun is designed to work on any website. There are billions of websites out there (and hundreds are created every day). We do our best to adapt to almost every possible website - that being said there are always unique scenarios that arise, often due to inaccessible code or non-standard practices on certain sites."}}, {"@type": "Question", "name": "Can I extract structured data from any website?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. You can extract prices, contact details, listings, job posts, reviews, product specs and almost anything else visible on a page. Point and click on the data with Recorder Mode, or describe it in natural language with AI Mode."}}, {"@type": "Question", "name": "Does Maxun work on JavaScript-heavy and dynamic websites?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Maxun runs a real browser, so it fully renders single-page apps built with React, Vue, Angular and other frameworks. It also handles infinite scroll, load more buttons, pagination, clicks and form inputs."}}, {"@type": "Question", "name": "My robot needs pagination and scrolling. Can Maxun handle this?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Maxun supports several pagination methods to accommodate different website designs: Click on \\"next\\" to navigate to the next page: This method involves clicking a button or link that clearly indicates the next page, such as a \\"Next\\" button or an arrow pointing to the right. Click on \\"load more\\" to load more items: This method involves clicking a button that loads more items onto the current page without navigating to a separate page. Scroll down to load more items: This method involves scrolling down the page to trigger the loading of more items. This is common on websites with infinite scrolling. Scroll up to load more items: Similar to scrolling down, this method involves scrolling up to load more items. This is less common but can be found on some websites. No more items to load: This option indicates that there are no more items to load on the current page or in the entire list."}}, {"@type": "Question", "name": "Can my robot fill out a form or perform an action before extracting data?", "acceptedAnswer": {"@type": "Answer", "text": "Definitely! Your robot can: Open a webpage. Log in. Click on buttons. Fill out a form. Select from a dropdown menu, radios, checkboxes, dates, times, etc. Extract structured data from a webpage into a spreadsheet. Take screenshots."}}, {"@type": "Question", "name": "Can my robot log in to websites?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. On Maxun Cloud, the Maxun Chrome extension securely reuses your existing logged-in browser session, so you never share your username or password with Maxun. Self-hosted robots can use encrypted, locally stored credentials. See Extract Behind Login."}}, {"@type": "Question", "name": "Can I extract data from an iFrame?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. From Maxun 0.0.6 onwards, data inside iFrames can be extracted."}}, {"@type": "Question", "name": "Can I extract data from Shadow DOM?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. From Maxun 0.0.6 onwards, data inside Shadow DOM can be extracted."}}, {"@type": "Question", "name": "Can I extract data from a list page and each item's detail page?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Deep Extraction captures a list and then visits each item's detail page to collect more data, all in one robot. It's available on Maxun Cloud."}}, {"@type": "Question", "name": "Can I reuse a robot on similar pages?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Duplicate a robot with a new URL to extract the same data from other pages with the same structure, without training a new robot. This lets you bulk-extract data from thousands of pages."}}, {"@type": "Question", "name": "What happens when a website changes its layout?", "acceptedAnswer": {"@type": "Answer", "text": "On Maxun Cloud, robots automatically adapt to most website layout and structure changes, so your data keeps flowing without rewriting anything. On the open-source edition, you can retrain a robot with point and click in minutes."}}, {"@type": "Question", "name": "What formats can Maxun return data in?", "acceptedAnswer": {"@type": "Answer", "text": "Scrape and Crawl robots return clean Markdown optimized for LLMs, as well as HTML, plain text, links, AI summaries and screenshots. Extract robots return structured rows you can get as JSON through the API or webhooks, export as CSV or JSON, or send to Google Sheets and Airtable."}}, {"@type": "Question", "name": "Can Maxun extract data from PDFs and documents?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Document robots extract specific fields from, or convert, PDF, CSV, XLSX, DOCX, JPG and PNG files up to 10 MB into Markdown, HTML, links or a summary. Document robots are in beta."}}, {"@type": "Question", "name": "Can I download files using Maxun?", "acceptedAnswer": {"@type": "Answer", "text": "Maxun is primarily designed to extract text data, but this is a part of our roadmap. Currently, you can extract URLs of files, such as: Image URLs: When training a robot, you can capture image URLs by clicking on the image and selecting \\"URL.\\" This gives you a list of image URLs that you can download manually or with other tools. File links: Similarly, you can capture the URLs of other types of files, such as PDFs or documents, by selecting the link or element that points to the file."}}, {"@type": "Question", "name": "Can I monitor websites for changes?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Schedule any robot to run hourly, daily or on a custom interval and turn on Monitoring. Each run is compared with the previous one so you can see exactly what changed in prices, stock, listings or content. On Maxun Cloud, you can also get email alerts."}}, {"@type": "Question", "name": "Can I use Maxun for large-scale data collection?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Maxun can extract from thousands of pages at once and supports long-running tasks, making it suitable for large datasets, extensive market research and high-volume pipelines. Plans scale up to 350,000 credits per month, and Premium plans offer custom limits. For complex needs, our team also runs fully managed data collection."}}, {"@type": "Question", "name": "Can I use Maxun if I don't write code?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Alongside the API and SDKs, Maxun has a no-code dashboard. Build a robot in minutes by clicking on the data you want, describing it in plain English, or starting from a pre-built auto robot, then schedule it and export the results."}}, {"@type": "Question", "name": "What APIs and SDKs are available?", "acceptedAnswer": {"@type": "Answer", "text": "Maxun provides a REST API, official SDKs for Node.js/TypeScript and Python, a CLI for terminal workflows, an MCP server for AI agents, and webhooks for real-time delivery."}}, {"@type": "Question", "name": "How do I authenticate API requests?", "acceptedAnswer": {"@type": "Answer", "text": "Generate an API key in the Maxun dashboard and send it in the x-api-key header. On Maxun Cloud, the base URL is https://app.maxun.dev and all endpoints live under /api, for example GET /api/robots. See API Key & Authentication."}}, {"@type": "Question", "name": "Does Maxun work with AI agents and MCP?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Maxun has an MCP server, so agents in Claude, Cursor, Windsurf, Cline and other MCP-compatible tools can run your robots and get results through natural language. See MCP Setup and MCP Tools. There is also a Claude Code skill."}}, {"@type": "Question", "name": "Which integrations does Maxun support?", "acceptedAnswer": {"@type": "Answer", "text": "Maxun sends data to Google Sheets, Airtable, n8n and any URL via webhooks. For AI apps, it works with LangChain, LangGraph, LlamaIndex, Mastra, the OpenAI SDK, the Vercel AI SDK, Claude Code and OpenClaw."}}, {"@type": "Question", "name": "How do I get results without polling the API?", "acceptedAnswer": {"@type": "Answer", "text": "Use webhooks. Maxun sends a POST request with the run's data to your URL as soon as a run finishes, and also when a run fails."}}, {"@type": "Question", "name": "What do I need to self-host Maxun?", "acceptedAnswer": {"@type": "Answer", "text": "The quickest way is Docker Compose, which runs everything for you. For a local development setup you need Node.js 18+, PostgreSQL and MinIO. For production with your own domain and HTTPS, see the production self-hosting guide."}}, {"@type": "Question", "name": "Is web scraping legal?", "acceptedAnswer": {"@type": "Answer", "text": "Collecting publicly available data is legal in many jurisdictions, but it depends on the data, the website's terms and how you use it. We recommend reviewing each website's terms of service, avoiding personal data without a lawful basis under laws such as GDPR, and scraping at a reasonable rate. This is not legal advice; consult a lawyer for your specific use case."}}, {"@type": "Question", "name": "How does Maxun ensure ethical data collection?", "acceptedAnswer": {"@type": "Answer", "text": "Maxun is built for responsible use. We encourage collecting publicly available information, checking each website's terms of service, and using rate limiting so extractions don't overwhelm websites."}}, {"@type": "Question", "name": "Does Maxun store my passwords?", "acceptedAnswer": {"@type": "Answer", "text": "No, not on Maxun Cloud. The password-free login flow uses the Maxun Chrome extension to sync your existing browser session, so no passwords are shared or stored. On self-hosted installations, credentials entered while training a robot are encrypted and stored locally on your own instance. See Extract Behind Login."}}, {"@type": "Question", "name": "Can my account be flagged when scraping behind a login?", "acceptedAnswer": {"@type": "Answer", "text": "Possibly. IP address changes and automated logins can trigger security checks on some websites. Use Maxun Cloud with the Chrome extension for authenticated extraction, avoid automated logins on sensitive websites, and never use critical personal accounts for scraping."}}, {"@type": "Question", "name": "Can Maxun solve CAPTCHAs?", "acceptedAnswer": {"@type": "Answer", "text": "Maxun Cloud solves several types of CAPTCHA (such as reCAPTCHA and hCaptcha), but not custom CAPTCHAs. CAPTCHA bypass is not supported in the open-source edition."}}, {"@type": "Question", "name": "What about websites running A/B tests?", "acceptedAnswer": {"@type": "Answer", "text": "If a website is running an A/B test and the robot encounters a different version of the page than the one it was trained on, it might either fail or collect incorrect information. While the robot can adapt to certain differences, it may not handle all variations effectively."}}, {"@type": "Question", "name": "What about websites with very strong bot detection?", "acceptedAnswer": {"@type": "Answer", "text": "Maxun Cloud bypasses bot detection effectively with stealth mode and managed proxies. For the open-source edition, bring your own proxies. However, if your robot needs to log into a website, there is a higher chance of runs failing because: The same user is accessing the account from different IP addresses (your local IP and Maxun's IPs). High run frequency by the robot can appear suspicious. As a result, robots that require login credentials are more likely to be flagged. Running login robots less frequently can reduce the flagging rate. See Stealth for more ways to avoid blocks."}}, {"@type": "Question", "name": "I have more questions!", "acceptedAnswer": {"@type": "Answer", "text": "We're here to help! Write to us at support@maxun.dev, or open an issue on GitHub."}}]}`}
  </script>
</head>

# Frequently Asked Questions

Answers to common questions about Maxun: what it is, pricing and credits, robots, the API and SDKs, self-hosting, security and known limitations. Can't find your answer? Email support@maxun.dev.

**Jump to:** [General](#general) · [Pricing & Billing](#pricing--billing) · [Robots & Data Extraction](#robots--data-extraction) · [API, SDK & AI Agents](#api-sdk--ai-agents) · [Legal & Security](#legal--security) · [Limitations](#limitations) · [Support](#support)

## General

### What is Maxun?
Maxun is an open-source web data platform that turns any website into clean, structured data for your apps, workflows and AI agents. You can scrape, crawl, extract, search and monitor the web through the [REST API](/category/api-reference), [Node.js and Python SDKs](/category/sdk), [CLI](/category/cli) and [MCP server](/mcp/setup), or through a no-code dashboard where anyone can build robots by clicking on a page or describing what they need in plain English.

### Who is Maxun for?
Maxun is built for both developers and non-technical teams. Developers and AI engineers use the API, SDKs, CLI and MCP server to power products and agents. Growth, operations and research teams use the no-code dashboard to build and schedule robots without writing code. Both work on the same platform, so teams can hand work back and forth.

### What can I build with Maxun?
Teams use Maxun for [price and competitor monitoring](/usecases/ecommerce_automation), [lead generation](/usecases/lead_generation), [market research](/usecases/market_research), RAG pipelines, AI agents that need live web data, [real estate](/usecases/real_estate) and job aggregators, review tracking and [content aggregation](/usecases/content_aggregation). If the data is on a website, you can turn it into a dataset, a scheduled feed or an API.

### How does Maxun work?
You tell Maxun what data you want by clicking elements in the recorder, describing it in plain English with AI Mode, starting from a pre-built auto robot, or writing code with the API or SDK. Maxun runs a real browser, handles JavaScript, pagination, infinite scroll and logins, and returns clean data. Every robot can run on demand or on a [schedule](/robot-schedule), with results delivered by [webhook](/api/webhooks), export or [integration](/category/integrations).

### What is a robot?
A robot is a reusable automation that collects web data for you. There are several types: **Scrape** turns a page into Markdown, HTML, text, links or screenshots; **Crawl** covers an entire website; **Extract** pulls structured rows such as products or listings; **Search** finds and optionally scrapes pages for a query; and **Document** robots extract data from or convert files such as PDFs. Every robot has adjustable inputs, like the URL, that you can change each time it runs. See [Robots Overview](/robot/robots) to pick the right one.

### Which robot type should I use?
Use [Scrape](/robot/scrape) for the content of a single page, [Crawl](/robot/crawl) for many pages or a whole site, [Extract](/category/extract) for structured rows like prices or listings, [Search](/robot/search/search-introduction) to find pages for a query, and [Document](/robot/document) robots for PDFs and other files. Add [Monitoring](/monitoring) to any Scrape, Crawl or Extract robot to track changes.

### Is Maxun available on the cloud?
Yes. Maxun Cloud is the fully managed version, available at [app.maxun.dev](https://app.maxun.dev). There's nothing to install or maintain.

### Is Maxun open source?
Yes. Maxun is open source under the AGPLv3 license. The code is on [GitHub](https://github.com/getmaxun/maxun), where you can view, modify, self-host and contribute to it.

### What is the difference between Maxun Cloud and the open-source version?
Both include Scrape, Crawl, Extract, Search, Monitoring, the API, SDKs, webhooks and extraction behind login. Maxun Cloud adds managed anti-bot infrastructure with CAPTCHA bypass and automatic proxy rotation, [Deep Extraction](/deep-extraction), automatic adaptation to website changes, auto robots, advanced AI features, unlimited workspaces, email notifications, SAML SSO and priority support, with no servers to maintain. See the full [Cloud vs Open Source](/cloud-vs-oss) comparison.

### How do I get started?
Sign up at [app.maxun.dev/register](https://app.maxun.dev/register) and start your 7-day free trial. Create your first robot from a pre-built auto robot, by clicking on the data you want with the recorder, by describing it in plain English with AI Mode, or with the API and SDKs. Then run it on demand or schedule it. Most new users set up their first robot in about 5 minutes. See the [Quickstart](/quickstart).

## Pricing & Billing

### Can I try Maxun for free?
Yes. Maxun Cloud comes with a 7-day free trial with full access to every feature, and no credit card is required. Use it to build robots, test the API and run real extractions on your own target websites before choosing a plan. You can also [self-host](/category/self-host) the open-source edition for free on your own infrastructure.

### How much does Maxun cost?
Maxun Cloud has four plans. All prices are in USD.

| Plan | Price | Credits per month | Users | Support |
|---|---|---|---|---|
| Starter | $19/month | 3,500 | 1 | Basic |
| Growth | $99/month | 100,000 | 5 | Standard |
| Pro | $399/month | 350,000 | 10 | Priority |
| Premium | Custom | Custom | Custom | Priority with SLA |

See [maxun.dev/pricing](https://maxun.dev/pricing) for the latest plans.

### Which plan is right for me?
Starter is for individuals and small projects. Growth is for teams running regular extractions and monitoring. Pro is for high-volume pipelines and production workloads. Premium offers custom credits, users and data retention, an SLA, a dedicated account manager, custom integrations and fully managed onboarding.

### What is included in every plan?
Every plan includes Scrape, Crawl, Extract, Search and Monitoring, API access, SDKs, CLI and MCP, webhooks, scheduled runs, extraction behind login, stealth mode, and CSV and JSON exports. Higher plans add more credits, more team members, advanced stealth mode and faster support.

### What is a credit?
Credits are how usage is measured on Maxun Cloud. Each plan includes a set number of credits per billing cycle.

| Operation | Cost |
|---|---|
| Scrape | 1 credit per page |
| Scrape with Smart Queries | +2 credits per run |
| Crawl | 1 credit per page |
| Extract (Recorder Mode) | 1 credit per 4 rows |
| Extract (AI Mode) | 1 credit per 3 rows |
| Screenshot | 1 credit per screenshot |
| Search | 1 credit per 5 results |
| Search + Scrape | 1 credit per result |

For example, extracting 50 products in Recorder Mode uses 12.5 credits, scraping 100 pages to Markdown uses 100 credits, and monitoring 50 pages daily with a scrape robot uses about 1,500 credits per month.

### Do unused credits roll over?
Unused credits usually do not carry over to the next billing cycle. However, if you upgrade your plan before your current cycle ends, your unused credits are added to your new plan's credits and remain available for the duration of your upgraded plan.

### Am I charged for failed requests?
No. You only pay for successful requests. If a request fails, no credits are deducted.

### How does billing work?
Plans are billed monthly or yearly, and credits reset at the start of each billing cycle. All prices are in USD.

### Do you offer refunds?
We do not offer refunds for subscription fees. The 7-day free trial lets you test all features before committing to a paid plan. If you have any issues or concerns about your subscription, contact support@maxun.dev.

### Do you offer custom or enterprise plans?
Yes. The Premium plan includes custom credit and user limits, custom data retention, advanced stealth mode, fully managed onboarding and setup, priority support with an SLA, a dedicated account manager and custom integrations. For large or complex projects, our team can also run fully managed data collection for you. [Contact sales](https://maxun.dev/talk-to-sales) for a quote.

### Is self-hosting free?
Yes. The open-source edition is free under the AGPLv3 license. You only pay for your own infrastructure. See [Self-Host Maxun](/category/self-host).

## Robots & Data Extraction

### What sites does Maxun work on?
Maxun is designed to work on any website. There are billions of websites out there (and hundreds are created every day). We do our best to adapt to almost every possible website - that being said there are always unique scenarios that arise, often due to inaccessible code or non-standard practices on certain sites.

### Can I extract structured data from any website?
Yes. You can extract prices, contact details, listings, job posts, reviews, product specs and almost anything else visible on a page. Point and click on the data with [Recorder Mode](/robot/extract/robot-actions), or describe it in natural language with [AI Mode](/robot/extract/llm-extraction).

### Does Maxun work on JavaScript-heavy and dynamic websites?
Yes. Maxun runs a real browser, so it fully renders single-page apps built with React, Vue, Angular and other frameworks. It also handles infinite scroll, load more buttons, pagination, clicks and form inputs.

### My robot needs pagination and scrolling. Can Maxun handle this?
Yes. Maxun supports several pagination methods to accommodate different website designs:
1. **Click on "next" to navigate to the next page**: This method involves clicking a button or link that clearly indicates the next page, such as a "Next" button or an arrow pointing to the right.
2. **Click on "load more" to load more items**: This method involves clicking a button that loads more items onto the current page without navigating to a separate page.
3. **Scroll down to load more items**: This method involves scrolling down the page to trigger the loading of more items. This is common on websites with infinite scrolling.
4. **Scroll up to load more items**: Similar to scrolling down, this method involves scrolling up to load more items. This is less common but can be found on some websites.
5. **No more items to load**: This option indicates that there are no more items to load on the current page or in the entire list.

### Can my robot fill out a form or perform an action before extracting data?
Definitely! Your robot can:
- Open a webpage
- Log in
- Click on buttons
- Fill out a form
- Select from a dropdown menu, radios, checkboxes, dates, times, etc.
- Extract structured data from a webpage into a spreadsheet
- Take screenshots

### Can my robot log in to websites?
Yes. On Maxun Cloud, the Maxun Chrome extension securely reuses your existing logged-in browser session, so you never share your username or password with Maxun. Self-hosted robots can use encrypted, locally stored credentials. See [Extract Behind Login](/extract-login).

### Can I extract data from an iFrame?
Yes. From Maxun 0.0.6 onwards, data inside iFrames can be extracted.

### Can I extract data from Shadow DOM?
Yes. From Maxun 0.0.6 onwards, data inside Shadow DOM can be extracted.

### Can I extract data from a list page and each item's detail page?
Yes. [Deep Extraction](/deep-extraction) captures a list and then visits each item's detail page to collect more data, all in one robot. It's available on Maxun Cloud.

### Can I reuse a robot on similar pages?
Yes. [Duplicate a robot](/robot/extract/robot-duplicate) with a new URL to extract the same data from other pages with the same structure, without training a new robot. This lets you bulk-extract data from thousands of pages.

### What happens when a website changes its layout?
On Maxun Cloud, robots automatically adapt to most website layout and structure changes, so your data keeps flowing without rewriting anything. On the open-source edition, you can [retrain a robot](/robot/extract/robot-retrain) with point and click in minutes.

### What formats can Maxun return data in?
Scrape and Crawl robots return clean Markdown optimized for LLMs, as well as HTML, plain text, links, AI summaries and screenshots. Extract robots return structured rows you can get as JSON through the API or webhooks, export as CSV or JSON, or send to [Google Sheets](/integrations/gsheet) and [Airtable](/integrations/airtable).

### Can Maxun extract data from PDFs and documents?
Yes. [Document robots](/robot/document) extract specific fields from, or convert, PDF, CSV, XLSX, DOCX, JPG and PNG files up to 10 MB into Markdown, HTML, links or a summary. Document robots are in beta.

### Can I download files using Maxun?
Maxun is primarily designed to extract text data, but this is a part of our roadmap.
Currently, you can extract `URLs` of files, such as:

1. **Image URLs**: When training a robot, you can capture image URLs by clicking on the image and selecting "URL." This gives you a list of image URLs that you can download manually or with other tools.
2. **File links**: Similarly, you can capture the URLs of other types of files, such as PDFs or documents, by selecting the link or element that points to the file.

### Can I monitor websites for changes?
Yes. [Schedule](/robot-schedule) any robot to run hourly, daily or on a custom interval and turn on [Monitoring](/monitoring). Each run is compared with the previous one so you can see exactly what changed in prices, stock, listings or content. On Maxun Cloud, you can also get email alerts.

### Can I use Maxun for large-scale data collection?
Yes. Maxun can extract from thousands of pages at once and supports long-running tasks, making it suitable for large datasets, extensive market research and high-volume pipelines. Plans scale up to 350,000 credits per month, and Premium plans offer custom limits. For complex needs, our team also runs fully managed data collection.

### Can I use Maxun if I don't write code?
Yes. Alongside the API and SDKs, Maxun has a no-code dashboard. Build a robot in minutes by clicking on the data you want, describing it in plain English, or starting from a pre-built auto robot, then schedule it and export the results.

## API, SDK & AI Agents

### What APIs and SDKs are available?
Maxun provides a [REST API](/category/api-reference), official SDKs for [Node.js/TypeScript](/sdk/node-sdk/sdk-overview) and [Python](/sdk/python-sdk/sdk-overview), a [CLI](/cli/cli-overview) for terminal workflows, an [MCP server](/mcp/setup) for AI agents, and [webhooks](/api/webhooks) for real-time delivery.

### How do I authenticate API requests?
Generate an API key in the Maxun dashboard and send it in the `x-api-key` header. On Maxun Cloud, the base URL is `https://app.maxun.dev` and all endpoints live under `/api`, for example `GET /api/robots`. See [API Key & Authentication](/api/api).

### Does Maxun work with AI agents and MCP?
Yes. Maxun has an MCP server, so agents in Claude, Cursor, Windsurf, Cline and other MCP-compatible tools can run your robots and get results through natural language. See [MCP Setup](/mcp/setup) and [MCP Tools](/mcp/tools). There is also a [Claude Code skill](/integrations/claude-code).

### Which integrations does Maxun support?
Maxun sends data to [Google Sheets](/integrations/gsheet), [Airtable](/integrations/airtable), [n8n](/integrations/n8n) and any URL via [webhooks](/api/webhooks). For AI apps, it works with [LangChain](/integrations/langchain), [LangGraph](/integrations/langgraph), [LlamaIndex](/integrations/llamaindex), [Mastra](/integrations/mastra), the [OpenAI SDK](/integrations/openai), the [Vercel AI SDK](/integrations/vercel-ai-sdk), [Claude Code](/integrations/claude-code) and [OpenClaw](/integrations/openclaw).

### How do I get results without polling the API?
Use [webhooks](/api/webhooks). Maxun sends a POST request with the run's data to your URL as soon as a run finishes, and also when a run fails.

### What do I need to self-host Maxun?
The quickest way is [Docker Compose](/installation/docker), which runs everything for you. For a [local development setup](/installation/local) you need Node.js 18+, PostgreSQL and MinIO. For production with your own domain and HTTPS, see the [production self-hosting guide](/self-host).

## Legal & Security

### Is web scraping legal?
Collecting publicly available data is legal in many jurisdictions, but it depends on the data, the website's terms and how you use it. We recommend reviewing each website's terms of service, avoiding personal data without a lawful basis under laws such as GDPR, and scraping at a reasonable rate. This is not legal advice; consult a lawyer for your specific use case.

### How does Maxun ensure ethical data collection?
Maxun is built for responsible use. We encourage collecting publicly available information, checking each website's terms of service, and using rate limiting so extractions don't overwhelm websites.

### Does Maxun store my passwords?
No, not on Maxun Cloud. The password-free login flow uses the Maxun Chrome extension to sync your existing browser session, so no passwords are shared or stored. On self-hosted installations, credentials entered while training a robot are encrypted and stored locally on your own instance. See [Extract Behind Login](/extract-login).

### Can my account be flagged when scraping behind a login?
Possibly. IP address changes and automated logins can trigger security checks on some websites. Use Maxun Cloud with the Chrome extension for authenticated extraction, avoid automated logins on sensitive websites, and never use critical personal accounts for scraping.

## Limitations

### Can Maxun solve CAPTCHAs?
Maxun Cloud solves several types of CAPTCHA (such as reCAPTCHA and hCaptcha), but not custom CAPTCHAs. CAPTCHA bypass is not supported in the open-source edition.

### What about websites running A/B tests?
If a website is running an A/B test and the robot encounters a different version of the page than the one it was trained on, it might either fail or collect incorrect information. While the robot can adapt to certain differences, it may not handle all variations effectively.

### What about websites with very strong bot detection?
Maxun Cloud bypasses bot detection effectively with stealth mode and managed proxies. For the open-source edition, [bring your own proxies](/byop).
However, if your robot needs to log into a website, there is a higher chance of runs failing because:
1. The same user is accessing the account from different IP addresses (your local IP and Maxun's IPs).
2. High run frequency by the robot can appear suspicious.

As a result, robots that require login credentials are more likely to be flagged. Running login robots less frequently can reduce the flagging rate. See [Stealth](/stealth) for more ways to avoid blocks.

## Support

### I have more questions!
We're here to help! Write to us at support@maxun.dev, or open an issue on [GitHub](https://github.com/getmaxun/maxun/issues).