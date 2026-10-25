---
id: agent
title: "Agents: Web Data Extraction From a Prompt on Maxun Cloud"
description: "Describe the data you want and a Maxun Cloud agent finds the page, applies the site's search, filters and sorting, and builds a robot that runs on a schedule."
sidebar_label: "Agent"
sidebar_position: 2
---

# Agent

Agent turns a natural-language request into a reusable data extraction robot. Describe what you want, such as *“Find the 5 cheapest men's tank tops, with name, price, and product URL,”* and optionally provide a starting URL. The agent discovers where the data lives, navigates and configures the website, and builds a robot to collect the information you asked for.

**Autonomous setup, reusable extraction**: The agent handles the discovery and configuration needed to create the robot. Once created, the robot can run repeatedly without requiring an LLM call on every run, making ongoing extraction fast, predictable, and cost-efficient.

> **Note:** Agents are available on [Maxun Cloud](https://app.maxun.dev). The self-hosted open-source edition offers [AI Mode](/robot/extract/llm-extraction), which extracts data from a single page you specify. See [Agent vs AI Mode](/robot/agent-vs-ai-mode) for a comparison.

## Create an agent

1. Open Robots → Create Robot → switch to **Agent** tab.
2. Describe what you need: Specify the data, fields, item count, and any filters or ranking criteria. For example:
   - “The 10 newest remote backend jobs with title, company, and salary”
   - “Pricing plans with name, monthly price, and included features”
   - “The 5 best-selling wireless mice under $50 with name, price, and rating”
3. Add a website URL (optional): Provide a starting point, or let the agent discover the relevant website itself.
4. Run the agent: The agent finds and configures the relevant pages, builds the robot, runs it, and displays the results.

You can also create agents through the [Cloud API](/api/cloud-api#agents), [SDK](/sdk/node-sdk/sdk-extract), [MCP](/mcp/tools.md) and [CLI](/cli/cli-robots).

## What the agent does

1. **Discovers the relevant data.** Starting from your URL or searching the web, the agent identifies the pages most likely to contain the information you need. It can follow relevant links, work across multiple sites, and use pagination when necessary.

2. **Understands your intent.** It translates your request into specific fields, item counts, filters, ranking criteria, and questions to answer. For example, “the cheapest options under $50” defines both a price constraint and a ranking.

3. **Prepares the website.** The agent handles loading states, dismisses cookie banners and pop-ups, and uses the site's search, filters, sorting, and view controls to narrow down the results. These steps are saved as part of the robot's workflow.

4. **Builds a reusable robot.** Maxun identifies the requested information, creates the extraction workflow, and validates it against the actual page. If more items are needed, the robot can navigate the site's pagination to collect them.

5. **Validates the results.** Maxun checks the extracted data against your request, including fields, item counts, duplicates, links, price constraints, and sorting where applicable. 

## Every run

Once the robot has been created, it can be run on demand, scheduled, or monitored like any other Maxun robot.

- **Fast, cost-efficient extraction.** The robot reuses its saved workflow instead of asking an LLM to rediscover and rebuild the extraction process on every run.
- **Answers grounded in extracted data.** If you ask a question, such as “Which plans include SSO?”, the answer is based on the data collected during that run and is available alongside the results through the app, API, and MCP.
- **Transparent filtering.** If a website's filters or sorting controls cannot be applied, Maxun can apply the criteria to the extracted data instead, without misrepresenting how the results were obtained.
- **Resilience to website changes.** Maxun Cloud can automatically adapt robots when a site's layout changes.

## Extract details from individual pages

Enable [Deep Extraction](/deep-extraction) to let the agent follow individual items to their detail pages and extract additional information. This is useful when listing pages contain only basic information and the fields you need are available on each item's own page.


## What agents don't do

- **Sign in.** For pages behind a login, share a logged-in session with the managed Chrome extension.
- **Confirm an age or accept optional cookies.** These are reported, not bypassed.
- **Invent data.** Values the page doesn't show are dropped; when something can't be found, the agent says so.

## Writing effective prompts

Name the fields you want, how many items, and any ranking or filter. For more examples, see <a href="/llm-prompts">LLM Extraction Prompts</a>.
