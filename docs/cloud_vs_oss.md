---
id: cloud-vs-oss
title: Maxun Cloud vs Self-Hosted Open Source
sidebar_position: 15
sidebar_label: Cloud vs Open Source
---

Maxun is available in two ways: **Maxun Cloud** and **Self-Hosted Open Source**.

Both provide the core Maxun platform for turning websites into structured data  -  including extraction, crawling, scraping, search, monitoring, APIs, SDKs, CLI, and MCP.

The difference is what happens when you need to run those workflows **reliably at scale**.

**Maxun Cloud adds managed browser infrastructure, anti-bot capabilities, advanced extraction, pre-built robots, collaboration, and operational features  -  so you can focus on what data you want rather than running the infrastructure required to collect it.**

Self-hosting gives you complete control over the infrastructure and is ideal when you want to run Maxun yourself, customize the deployment, or bring your own proxies and infrastructure.

## At a Glance

| Capability                                | Maxun Cloud |     Self-Hosted Open Source    |
| :---------------------------------------- | :---------: | :----------------------------: |
| Core extraction, scraping & crawling      |      ✅      |                ✅               |
| API, SDK & CLI                            |      ✅      |                ✅               |
| MCP                                       |      ✅      |                ✅               |
| Search                                    |      ✅      |                ✅               |
| Monitoring                                |      ✅      |                ✅               |
| Document extraction                       |      ✅      |                ✅               |
| Deep Extraction                           |      ✅      |                ❌               |
| Advanced AI features                    |      ✅      |                 -                |
| Extract behind login                      |      ✅ Managed Chrome Extension | ✅ Manual login via Recorder Mode |
| Automatic adaptation to website changes   |      ✅      |                ❌               |
| Managed stealth & anti-bot infrastructure |      ✅      |                ❌ Bring Your Own Proxy |
| Automatic proxy rotation                  |      ✅      |                ❌               |
| Captcha bypass                            |      ✅      |                ❌               |
| Pre-trained Auto Robots                   |      ✅      |                ❌               |
| Long-running extraction infrastructure    |      ✅      | Depends on your infrastructure |
| Teams & collaboration                     |      ✅      |                ❌               |
| Managed notifications                     |      ✅      |                ❌               |
| Priority support                          |      ✅      |                ❌               |

## What You Get With Maxun Cloud

### Managed infrastructure for difficult websites

Cloud is designed for extraction workloads where simply running a browser is not enough.

Maxun Cloud manages the infrastructure needed to run browser-based extraction reliably, including:

* **Stealth enabled by default** to reduce blocking on websites with bot detection
* **Automatic proxy rotation**
* **Managed anti-bot infrastructure**
* **Captcha bypass**
* Long-running extraction jobs
* Infrastructure that scales with your workloads

You don't need to source proxies, configure browser infrastructure, or build your own system for handling websites that actively try to block automation.

With self-hosting, you control this infrastructure yourself. You can bring your own proxy and configure your own stealth and deployment setup.

> **In short:** Cloud handles the infrastructure required to make extraction work reliably. Self-hosting gives you the tools to build and operate that infrastructure yourself.

[Learn more about Stealth →](/stealth)
[Learn more about BYOP →](/byop)

## Advanced Extraction

Cloud also unlocks extraction capabilities that are not available in the open-source edition.

### Deep Extraction

**Deep Extraction** lets a robot automatically follow items from a list or search page into their individual detail pages and extract data from both.

For example:

```text
Product listing
    ↓
Product 1 → details
Product 2 → details
Product 3 → details
...
    ↓
Complete structured dataset
```

This is useful for product catalogs, business directories, job boards, marketplaces, and other websites where the data you need is spread across listing and detail pages.

Deep Extraction is available exclusively in Maxun Cloud.

[Learn more about Deep Extraction →](/deep-extraction)

### Automatic adaptation

Cloud can automatically adapt extraction when a website's layout or structure changes.

Self-hosted Maxun also supports retraining extract robots, allowing you to update a robot when the website changes.

The difference is that Cloud provides the managed adaptive extraction experience, while self-hosted deployments give you the tools to retrain and maintain your robots yourself.

### Extract behind login

Maxun Cloud provides a managed Chrome Extension for securely sharing an authenticated browser session with Maxun.

This lets you authenticate to a website in your own browser and share the session with Maxun without manually entering or exposing your credentials to the platform. This is particularly useful for extracting data from authenticated websites while keeping the login flow simple.

With Self-Hosted Maxun, authenticated extraction uses the standard Recorder Mode flow. You manually log in through the recorder and the authenticated session is used for the robot.

Cloud is therefore better suited to recurring or production authenticated extraction where you want a managed login and session-sharing experience.

## Pre-Built Robots

Maxun Cloud includes pre-trained Auto Robots for common websites and data sources.

Instead of creating an extraction workflow from scratch, you can use an existing robot and start collecting data immediately.

Self-hosted deployments do not include the Cloud Auto Robot library.

## AI-Powered Extraction

Both editions support core AI capabilities, but Cloud provides additional advanced AI functionality and managed infrastructure.

With Cloud, you can use AI to handle more complex extraction workflows without having to configure and operate the underlying AI and browser infrastructure yourself.

Self-hosted deployments give you control over the AI setup and can be configured with your own LLM provider.

## Monitoring

Both Cloud and Self-Hosted Maxun support monitoring for supported extraction workflows.

Maxun Cloud additionally supports Crawl Monitoring, allowing you to monitor entire websites and automatically detect changes across crawled pages.

Cloud also provides email alerts when monitored data changes.

Self-hosted Maxun currently does not include a built-in alerting system, so you can run monitoring workflows but must handle notifications yourself.

| Monitoring capability                      | Maxun Cloud | Self-Hosted Open Source |
| :----------------------------------------- | :---------: | :---------------------: |
| Full page monitoring (Scrape)              |      ✅      |            ✅            |
| Specific data monitoring (Extract)         |      ✅      |            ✅            |
| Prompt monitoring (AI Extract)             |      ✅      |            ✅            |
| Website / multiple-page monitoring (Crawl) |      ✅      |            ❌            |
| Alerts                                     |      ✅      |            ❌            |


## Collaboration & Teams

Maxun Cloud is built for teams as well as individual users.

Cloud provides:

* Multiple workspaces
* Shared robots and runs
* Team members and roles
* Admin, Member, and Viewer permissions
* Shared API configuration
* Centralized usage across a team

Self-hosted Maxun is primarily designed around your own deployment and infrastructure. You are responsible for implementing additional organization-level infrastructure and access controls around your deployment.

[Learn more about Teams →](/teams-management)

## Integrations


Maxun integrates with both data tools and AI development frameworks.

Available integrations include:

| Integration       | What it enables                                                    |
| :---------------- | :----------------------------------------------------------------- |
| **Google Sheets** | Sync extracted data directly into Google Sheets                    |
| **n8n**           | Send extracted data directly into n8n workflows                    |
| **Airtable**      | Sync extracted data directly into an Airtable Base                 |
| **LangChain**     | Build AI-powered web scraping chains and agents with the Maxun SDK |
| **LangGraph**     | Build stateful, multi-step AI workflows with Maxun                 |
| **Vercel AI SDK** | Integrate Maxun into React and Next.js AI applications             |
| **OpenAI SDK**    | Use Maxun for web data retrieval through OpenAI function calling   |
| **Mastra**        | Build AI agent workflows with Maxun                                |
| **LlamaIndex**    | Build RAG applications using Maxun                                 |
| **OpenClaw**      | List and run Maxun robots from messaging apps                      |
| **Claude Code**   | List and run Maxun robots directly from your terminal              |

Cloud additionally provides managed integrations and infrastructure around these workflows, while self-hosting lets you control how everything is deployed and connected.

## What Self-Hosting Gives You

Self-hosting is not a limited version of Maxun. The open-source edition contains the core Maxun platform and gives you complete control over how it runs.

You can:

* Run Maxun on your own infrastructure
* Use the dashboard, API, SDK, CLI, and MCP
* Scrape, crawl, extract, search, and monitor websites
* Configure your own LLM provider
* Bring your own proxy infrastructure
* Customize the deployment
* Keep your data and infrastructure under your control

The trade-off is that **you operate the infrastructure yourself**.

That means you are responsible for things such as proxy configuration, scaling, browser infrastructure, anti-bot handling, deployment, monitoring, and operational reliability.

[Learn more about Self-Hosting →](/self-host)

## Which Should You Use?

### Choose Maxun Cloud if you want to:

* Start extracting data without managing infrastructure
* Extract from websites with bot detection
* Run extraction at scale
* Use automatic proxy rotation and managed anti-bot infrastructure
* Use Stealth without configuring it yourself
* Use Deep Extraction
* Use pre-trained Auto Robots
* Build more advanced AI extraction workflows
* Run long-running extraction jobs
* Monitor websites and receive managed notifications
* Collaborate with a team
* Centralized workspace management
* Get priority support

### Choose Self-Hosted Open Source if you want to:

* Run Maxun on your own infrastructure
* Have complete control over deployment and data
* Customize Maxun for your environment
* Bring your own proxy infrastructure
* Configure your own LLM providers
* Operate Maxun entirely within your own infrastructure
* Contribute to and extend the open-source project

## The Simple Difference

**Maxun Cloud is Maxun with the infrastructure and advanced capabilities managed for you.**

**Self-Hosted Open Source gives you the core Maxun platform and complete control over how you run it.**

Both let you turn websites into structured data. Cloud is designed for users who want to **focus on the data and workflows**, while self-hosting is designed for users who want to **own and operate the infrastructure themselves**.
