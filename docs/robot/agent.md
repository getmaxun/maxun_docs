---
id: agent
title: "Agents: Web Data Extraction From a Prompt on Maxun Cloud"
description: "Describe the data you want and a Maxun Cloud agent finds the page, applies the site's search, filters and sorting, and builds a robot that runs on a schedule."
sidebar_label: "Agent"
sidebar_position: 2
---

# Agent

An agent builds an Extract robot from a description of the data you want. Write a prompt such as "the 5 cheapest men's tank tops, with name, price and product URL", optionally add a URL, and the agent works out where the data is, sets up the page and saves a robot that collects it.

> **Note:** Agents are available on [Maxun Cloud](https://app.maxun.dev). The self-hosted open-source edition has [AI Mode](/robot/extract/llm-extraction), which extracts from one page you enter. See [Agent vs AI Mode](/robot/agent-vs-ai-mode) for how they differ.

The robot an agent saves reads the data with selectors on every run, so runs are fast and predictable. Agents run, schedule and monitor like any other robot.

## Create an agent

1. Open **Robots → Create Robot → Extract** and switch to **AI Mode**.
2. **Prompt**: describe the data, the fields you want, how many items, and any ranking or filter. For example:
   - "The 10 newest remote backend jobs with title, company and salary"
   - "Pricing plans with name, monthly price and included features"
   - "The 5 best-selling wireless mice under $50 with name, price and rating"
3. **Website URL** (optional): where to start. Leave it out and the agent finds the site.
4. Click **Create and run**. The agent builds the robot, runs it once and opens the results.

You can also create agents from the [Cloud API](/api/cloud-api#agents), the [SDK](/sdk/node-sdk/sdk-extract) and the [CLI](/cli/cli-robots).

## What an agent does

1. **Finds the page.** With a URL, it starts there. Without one, it searches the web and picks the result that best matches the request; a prompt that needs several sites gets one robot that reads each of them. If the starting page doesn't hold the data, it follows the one link on the same site that most likely leads to it (e.g. *Pricing*, *All products*).
2. **Understands the request.** The prompt becomes a specification: the fields, how many items, any ranking ("cheapest", "newest", "best-selling"), filters, and a question to answer.
3. **Sets up the page.** It waits for the content to finish loading and closes cookie banners and pop-ups with the least-consenting choice. It then applies the site's own search, filters, view options and sort controls ("under $50", "size M", "yearly billing", "cheapest first"). Each setting is kept only if the page actually changed, and is replayed on every run.
4. **Extracts and builds.** The model points to where each value appears on the page. Values that aren't on the page are dropped. The examples become selectors, which are checked by running the real scraper. When the page doesn't hold enough items, the robot follows the site's pagination.
5. **Checks the result.** The robot's rows are checked against the request: item count, every field filled, no duplicates, real links, price range and sort order. The agent is marked *ok*, *partial* (usable, with the gaps listed) or *failed*.

## Every run

- The robot loads the page, repeats the setup steps and reads the data with selectors.
- If the prompt asked a question ("which plans include SSO?"), the run's answer is built from that run's rows only. You get it with the run's results in the app, the API and MCP.
- When a filter or sort couldn't be applied on the site, the answer applies it to the data instead. The data is never presented as filtered when it wasn't.
- When the site's layout changes, Maxun Cloud adapts the robot automatically.

## Detail pages

Turn on [Deep Extraction](/deep-extraction) to have the agent follow each item in the list to its own page and extract details from there too.

## What agents don't do

- **Sign in.** For pages behind a login, share a logged-in session with the managed Chrome extension.
- **Confirm an age or accept optional cookies.** These are reported, not bypassed.
- **Invent data.** Values the page doesn't show are dropped; when something can't be found, the agent says so.

## Writing effective prompts

Name the fields you want, how many items, and any ranking or filter. For more examples, see <a href="/llm-prompts">LLM Extraction Prompts</a>.
