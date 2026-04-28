---
id: scrape
title: Scrape
---

# Scrape

Scrape lets you convert any webpage into **clean HTML**, **LLM-ready Markdown**, and **screenshots**.
Just provide a URL, choose your output format, and Maxun handles the rest.

## How It Works

1. Enter the URL you want to scrape.  
2. Choose your output format  
   - **HTML**  
   - **Markdown**
   - **Text**
   - **Links**
   - **Visible part screenshot**
   - **Full page screenshot**
3. Optionally add a **Smart Query** prompt (see below).
4. Run the robot.  

**Batch scraping** is coming soon, allowing you to process multiple URLs in a single run.

## When to Use Scrape
- Fast content extraction  
- Clean HTML or Markdown for an LLM  

If you need logins, interactions, pagination, or element-level data capture, use **Extract** instead.

---

## Smart Queries

Smart Queries let you attach an optional **natural language prompt** to a scrape robot. After the page is scraped, an LLM analyzes the page content and returns an answer to your prompt — without any extra setup.

### How to Add a Smart Query

When creating a scrape robot, enter your instructions in the **Smart Queries** field:

> *Example: "Click the 'Login' button and extract the user profile data."*  
> *Example: "Navigate to the pricing page and list all plan names and prices."*  
> *Example: "Find the company's latest blog post title and publication date."*

The result is returned in the run output as `promptResult`.

### Output

When a Smart Query is configured, the run result includes an additional `promptResult` field alongside the usual `markdown`, `html`, etc.:

```json
{
  "markdown": "...",
  "html": "...",
  "promptResult": "The pricing plans are: Starter ($9/mo), Growth ($29/mo), Pro ($99/mo)."
}
```

---

## Using with SDK

Scrape is available through the <a href="/category/sdk">Maxun SDK</a> for programmatic usage and integration into your applications.

## Using with CLI

```bash
# Basic scrape
maxun robots scrape https://example.com -f markdown

# Scrape with a Smart Query prompt
maxun robots scrape https://example.com \
  -f markdown \
  -p "List all the pricing plans and their monthly costs"
```
