---
id: document
title: Document
---

# Document

Maxun can work with PDF documents in two ways — pull out specific data fields, or convert the whole document into a clean format.

> Note: Document robots is in beta.

## Extract

Upload a PDF and tell Maxun what information you want from it. Maxun figures out the structure automatically and saves it as a reusable robot — so you can run it on new documents any time.


### How It Works

1. Upload a sample PDF.
2. Describe what you want to extract (e.g. *"invoice number, vendor name, and total amount"*).
3. Maxun creates a robot that can extract those fields from any similar document.
4. Run the robot whenever you have a new file to process.

### ✅ When to Use Extract

- You need specific fields from documents like invoices, contracts, or offer letters.
- You receive the same type of document repeatedly and want to automate processing it.

---

## Parse

Upload a PDF and convert it into clean Markdown, HTML, or a list of links. No configuration needed — just pick your format and run.


### How It Works

1. Upload a PDF.
2. Choose your output format — Markdown, HTML, or Links.
3. Maxun converts the document and makes it available for every run.

### Output Formats

- **Markdown** — The full document as clean, readable Markdown. Great for feeding into AI tools.
- **HTML** — The document as structured HTML.
- **Links** — Every URL found in the document, deduplicated.

### ✅ When to Use Parse

- You want to feed a PDF into an AI tool or pipeline.
- You need the content of a document in a readable, structured format.

---

## Using with SDK

Both robot types are available through the <a href="/category/sdk">Maxun SDK</a>.

## Using with CLI

```bash
# Extract specific fields from a PDF
maxun robots doc-extract invoice.pdf \
  --prompt "Extract invoice number, vendor name, and total amount" \
  --name "Invoice Extractor"

# Convert a PDF to Markdown, HTML, and links
maxun robots doc-parse report.pdf \
  --formats "markdown,html,links" \
  --name "Report Parser"
```
