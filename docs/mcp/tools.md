---
id: tools
title: "Maxun MCP Tools Reference"
description: "Every tool the Maxun MCP server exposes to AI agents: scrape pages, crawl sites, search the web, build AI extraction agents, and run and monitor your robots."
sidebar_label: "Tools"
sidebar_position: 2
---

# MCP Tools

The Maxun MCP Server gives your AI client two kinds of tools:

- **One-shot tools** that do the work for you: scrape a page, crawl a site, search the web, or describe the data you want and let an AI agent extract it. No robot needs to exist first.
- **Robot and run tools** to list, run and inspect the robots you already have, including ones built in Recorder Mode in the dashboard.

Every tool is available on both [Maxun Cloud](https://app.maxun.dev) and self-hosted (OSS) Maxun, with the small differences noted below.

## Available Tools

| Tool | What it does |
|---|---|
| [`maxun_scrape`](#maxun_scrape) | Turn one page into markdown, HTML, text, links, a summary or screenshots, and answer questions about it |
| [`maxun_crawl`](#maxun_crawl) | Crawl a website and return the content of every page |
| [`maxun_search`](#maxun_search) | Search the web and return results, optionally scraping each one |
| [`maxun_agent`](#maxun_agent) | Describe the data you want; Maxun's AI builds an extraction robot and runs it |
| [`maxun_list_robots`](#maxun_list_robots) | List the robots in your account |
| [`maxun_get_robot`](#maxun_get_robot) | Get a robot's details |
| [`maxun_run_robot`](#maxun_run_robot) | Run a robot and return the data it extracts |
| [`maxun_get_robot_runs`](#maxun_get_robot_runs) | List a robot's runs |
| [`maxun_get_run`](#maxun_get_run) | Get a run's status and output |
| [`maxun_cancel_run`](#maxun_cancel_run) | Cancel a queued or running run |
| [`maxun_get_run_diff`](#maxun_get_run_diff) | See what changed since the previous run |
| [`maxun_get_robot_summary`](#maxun_get_robot_summary) | Run counts, success rate and data totals for a robot |

:::info Recorder Mode
Robots that record your clicks in a browser (Recorder Mode) are built in the dashboard. Once built, you can run them, and read and monitor their results, with the robot and run tools.
:::

:::note Renamed tools
All tools now start with `maxun_`. If you allow-listed tools by name in your client, update the names: `list_robots` → `maxun_list_robots`, `get_robot` → `maxun_get_robot`, `run_robot` → `maxun_run_robot`, `get_robot_runs` → `maxun_get_robot_runs`, `get_run_details` → `maxun_get_run`, `get_robot_summary` → `maxun_get_robot_summary`.
:::

## How to Use

You talk to your AI client in plain language and it picks the tool. Some examples:

| You say | Tool used |
|---|---|
| "Get me the pricing page of linear.app as markdown" | `maxun_scrape` |
| "What does the Pro plan cost on https://example.com/pricing?" | `maxun_scrape` with `smart_queries` |
| "Crawl the docs at docs.example.com, only pages under /api/" | `maxun_crawl` |
| "Find the 5 most recent articles about web scraping regulation this week" | `maxun_search` |
| "Get the name, price and rating of the first 20 laptops on bestbuy.com" | `maxun_agent` |
| "Run my Amazon price scraper" | `maxun_list_robots` → `maxun_run_robot` |
| "What changed on the last run of my competitor monitor?" | `maxun_get_robot_runs` → `maxun_get_run_diff` |

### Robots are saved for you

`maxun_scrape`, `maxun_crawl`, `maxun_search` and `maxun_agent` save the robot they build in your account. You can see it in the dashboard, run it again, schedule it, or turn on [monitoring](/monitoring) for it.

Scrape, crawl and search robots are named after their target, like `MCP Scrape: example.com/pricing [3fa2b1c9]`. Calling the tool again with the same arguments reuses that robot instead of creating a new one, so repeated calls build up one run history. Pass `robot_name` to choose the name yourself.

:::tip Plan limits
Saved robots count toward your plan's robot limit, and each run uses credits, just like robots you create in the dashboard or through the API.
:::

### Long-running work

Tools wait for the run to finish and return the data. Crawls and large extractions can take several minutes, which is longer than some clients wait for a tool. For those, pass `wait: false`: the tool returns a run ID straight away, and your AI client can call `maxun_get_run` later to fetch the result.

```
"Start a crawl of docs.example.com in the background, then check on it in a few minutes"
```

---

## One-shot Tools

### `maxun_scrape`

Scrapes a single page. Returns the page content as text blocks your AI client can read directly, plus any links, screenshots and smart-query answers.

| Parameter | Required | Description |
|---|---|---|
| `url` | Yes | The page to scrape |
| `formats` | No | Any of `markdown`, `html`, `text`, `links`, `summary`, `screenshot-visible`, `screenshot-fullpage`. Default `["markdown"]` |
| `smart_queries` | No | Questions to answer from the page, e.g. `"What is the price of the Pro plan?"` |
| `robot_name` | No | Name for the saved robot |

On self-hosted Maxun, `summary` and `smart_queries` need an [LLM configured for the MCP server](/mcp/setup#4-optional-configure-an-llm).

### `maxun_crawl`

Crawls a website from a start URL and returns every page it finds.

| Parameter | Required | Description |
|---|---|---|
| `url` | Yes | Where to start |
| `limit` | No | Maximum pages (default 50) |
| `max_depth` | No | How many links deep to go (default 3) |
| `mode` | No | `domain` (default), `subdomain` (also crawl subdomains) or `path` (only under the start URL's path) |
| `include_paths` | No | Only crawl paths matching these patterns, e.g. `["/docs/"]` |
| `exclude_paths` | No | Skip paths matching these patterns, e.g. `["/blog/"]` |
| `use_sitemap` | No | Find pages from `sitemap.xml` (default `true`) |
| `follow_links` | No | Find pages by following links (default `true`) |
| `respect_robots` | No | Obey `robots.txt` (default `true`) |
| `formats` | No | Output formats per page. Default `["markdown"]` |
| `wait` | No | Wait for the crawl to finish (default `true`). See [Long-running work](#long-running-work) |
| `robot_name` | No | Name for the saved robot |

Learn more about crawl options in [Crawl](/robot/crawl).

### `maxun_search`

Searches the web.

| Parameter | Required | Description |
|---|---|---|
| `query` | Yes | The search query |
| `mode` | No | `discover` (default) returns titles, URLs and snippets. `scrape` also scrapes each result page |
| `limit` | No | Maximum results (default 10) |
| `time_range` | No | `day`, `week`, `month` or `year` |
| `formats` | No | In `scrape` mode, output formats per result. Default `["markdown"]` |
| `robot_name` | No | Name for the saved robot |

### `maxun_agent`

Describe the data you want and Maxun's AI builds an extraction robot for it, the same as [AI Mode](/robot/extract/llm-extraction) in the dashboard. It then runs it and returns structured rows. Leave out `url` and the agent finds the right website itself.

| Parameter | Required | Description |
|---|---|---|
| `prompt` | Yes | What to extract, at least 15 characters. E.g. `"Get the name, price and rating of the first 20 laptops"` |
| `url` | No | Where to start. Leave it out to let the agent find the site |
| `robot_name` | No | Name for the saved robot |
| `run` | No | Run the robot once built (default `true`). Set `false` to only build it |
| `deep_extraction` | No | **Cloud only.** Follow each item to its detail page for more fields ([Deep Extraction](/deep-extraction), paid plans) |
| `wait` | No | **Cloud only.** When running, wait for the run to finish (default `true`) |

Building takes a minute or two. The robot is saved, so next time ask your AI client to run it with `maxun_run_robot` instead of building it again.

On self-hosted Maxun, `maxun_agent` uses the LLM you [configure for the MCP server](/mcp/setup#4-optional-configure-an-llm).

---

## Robot and Run Tools

### `maxun_list_robots`

Lists the robots in your account (on Cloud, the team's robots when you [connect with a team](/mcp/setup#use-a-teams-robots)) with their ID and name. Your AI client uses this to turn a robot's name into its ID, so you can refer to robots by name.

### `maxun_get_robot`

| Parameter | Required | Description |
|---|---|---|
| `robot_id` | Yes | The robot ID |

### `maxun_run_robot`

Runs a robot or agent and returns its data. Waits up to 30 minutes on Cloud.

| Parameter | Required | Description |
|---|---|---|
| `robot_id` | Yes | The robot ID |
| `formats` | No | Override the output formats of a scrape, crawl or search robot |
| `params` | No | **Cloud only.** Input parameters for the robot's workflow |
| `wait` | No | Wait for the run to finish (default `true`) |

### `maxun_get_robot_runs`

Lists a robot's runs with their ID, status and timestamps.

| Parameter | Required | Description |
|---|---|---|
| `robot_id` | Yes | The robot ID |
| `limit` | No | **Cloud only.** Maximum runs (default 20, max 100) |

### `maxun_get_run`

Gets a run's status, and once it has finished, all of its data.

| Parameter | Required | Description |
|---|---|---|
| `run_id` | Yes | The run ID |
| `robot_id` | Self-hosted only | The robot the run belongs to |

### `maxun_cancel_run`

Cancels a queued or running run.

| Parameter | Required | Description |
|---|---|---|
| `run_id` | Yes | The run ID |
| `robot_id` | Self-hosted only | The robot the run belongs to |

### `maxun_get_run_diff`

For robots with [monitoring](/monitoring), shows what changed between a run and the previous successful run.

| Parameter | Required | Description |
|---|---|---|
| `run_id` | Yes | The run ID |
| `robot_id` | Self-hosted only | The robot the run belongs to |
| `format` | No | Only show changes for one format, e.g. `markdown` or `captured-list` |

### `maxun_get_robot_summary`

Total, successful and failed runs, success rate, and how much data the robot has extracted.

| Parameter | Required | Description |
|---|---|---|
| `robot_id` | Yes | The robot ID |

---

## Common Workflows

### Research a topic
```
"Search for the latest news about EU AI Act enforcement this month, scrape the top 5 results and summarize them"
```
`maxun_search` (scrape mode) → your AI client summarizes the pages.

### Build a reusable extractor
1. **"Get all job titles, locations and salaries from https://example.com/careers"** — `maxun_agent` builds and runs a robot
2. **"Run the careers robot again"** — `maxun_run_robot` reuses it
3. Schedule it or turn on monitoring in the dashboard

### Watch a page for changes
1. **"Scrape https://example.com/pricing"** — `maxun_scrape` saves a robot
2. Turn on monitoring for it in the dashboard, or scrape it again later
3. **"What changed on the pricing page since last time?"** — `maxun_get_robot_runs` → `maxun_get_run_diff`

### Debug a failed run
1. **"Show me the runs for robot [name]"** — find the failed run
2. **"Get the details of run [run-id]"** — see the error
3. **"Run robot [name] again"** — retry

---

## Tips for Better Prompts

- **Give the URL when you know it.** `maxun_scrape` is the fastest way to read one page.
- **Be specific with `maxun_agent`.** Name the fields you want and how many items, e.g. "name, price, rating and URL of the first 50 products".
- **Skip robot IDs.** Refer to robots by name; your AI client will look them up.
- **Use background runs for big crawls**, then ask your client to check on them.

## Error Handling

Errors from Maxun are returned to your AI client with the reason, so it can explain them or fix its request.

| Error | Cause |
|---|---|
| `Robot not found` | The robot ID doesn't exist or belongs to another account or team |
| `API key is invalid` | Check your key in the Maxun Dashboard |
| `Permission denied` | Your team role can view robots but not run them |
| `Robot limit reached` / `Insufficient credits` | Your plan's limits were reached |
| `A robot named "…" already exists` | Pick a different `robot_name` |
| `The agent could not be built` | The agent couldn't work out how to extract that data; rephrase the prompt or give a `url` |
| `maxun_agent needs an LLM` | Self-hosted: configure an LLM for the MCP server |
| `Run failed` | The robot hit an error during extraction; check the run details |
| `Execution timeout` | The run didn't finish within 30 minutes; use `wait: false` and poll with `maxun_get_run` |
