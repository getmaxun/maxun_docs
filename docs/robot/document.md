---
id: document
title: Document
---

# Document

Maxun can work with documents in two ways — pull out specific data fields, or convert the whole document into a clean format.

> Note: Document robots is in beta.

### Supported Files

Document robots accept **PDF**, **CSV**, and **XLSX** files, up to **10 MB**. For multi-sheet XLSX files, each sheet is treated as a separate page.

## Extract

Upload a PDF, CSV, or XLSX file and tell Maxun what information you want from it. Maxun figures out the structure automatically and saves it as a reusable robot — so you can run it on new documents any time.


### How It Works

1. Upload a sample document (PDF, CSV, or XLSX).
2. Describe what you want to extract (e.g. *"invoice number, vendor name, and total amount"*).
3. Maxun creates a robot that can extract those fields from any similar document.
4. Run the robot whenever you have a new file to process.

### ✅ When to Use Extract

- You need specific fields from documents like invoices, contracts, or offer letters.
- You receive the same type of document repeatedly and want to automate processing it.

---

## Parse

Upload a PDF, CSV, or XLSX file and convert it into clean Markdown, HTML, a list of links, or an AI-generated summary. No configuration needed — just pick your format and run.


### How It Works

1. Upload a document (PDF, CSV, or XLSX).
2. Choose your output format — Markdown, HTML, Links, or Summary.
3. Maxun converts the document and makes it available for every run.

### Output Formats

- **Markdown** — The full document as clean, readable Markdown. Great for feeding into AI tools.
- **HTML** — The document as structured HTML.
- **Links** — Every URL found in the document, deduplicated.
- **Summary** — A concise, AI-generated summary of the document. Requires an LLM provider (Ollama, Anthropic, or an OpenAI-compatible provider), configured when you create the robot.

> Note: The Summary format uses your configured LLM. For Ollama it runs locally with no key; for hosted providers you must supply an API key when creating the robot, or set `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` in your server environment.

### ✅ When to Use Parse

- You want to feed a document into an AI tool or pipeline.
- You need the content of a document in a readable, structured format.

---

## Using with SDK

Both robot types are available through the <a href="/category/sdk">Maxun SDK</a>.

## Using with CLI

```bash
# Extract specific fields from a PDF, CSV, or XLSX file
maxun robots doc-extract invoice.pdf \
  --prompt "Extract invoice number, vendor name, and total amount" \
  --name "Invoice Extractor"

# Convert a document to Markdown, HTML, links, and a summary
maxun robots doc-parse report.pdf \
  --formats "markdown,html,links,summary" \
  --name "Report Parser"

# Parse a spreadsheet
maxun robots doc-parse data.xlsx \
  --formats "markdown" \
  --name "Spreadsheet Parser"
```
