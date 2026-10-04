---
id: sdk-document
title: "Python: Extract Data From PDFs & Documents"
description: "Extract fields from PDFs and other documents, or convert them to Markdown, HTML and links, with the Maxun Python SDK."
sidebar_label: "Document"
sidebar_position: 6
---

# Document

Document robots read files instead of web pages. They can:

- **Extract** specific data from a file, described in plain English.
- **Parse** a file into Markdown, HTML, a list of links or a summary.

Supported files: PDF, DOCX, XLSX, CSV, JPG and PNG.

## Extract

Upload a file and describe the data you want:

```python
robot = await maxun.documents.extract(
    "Invoice reader",
    "./invoice.pdf",
    "Invoice number, vendor name, date and total amount",
)

result = await robot.run()
print(result.document_data)
```

```python
{
    "invoice_number": "INV-2025-0042",
    "vendor_name": "Acme Corp",
    "date": "2025-03-14",
    "total_amount": 4250
}
```

The fields you get back follow your prompt.

## Parse

Convert a file into text formats:

```python
robot = await maxun.documents.parse(
    "Annual report",
    "./report.docx",
    formats=["markdown", "summary"],
)

result = await robot.run()

print(result.markdown)
print(result.summary)
```

| Format | Read it from |
|---|---|
| `markdown` | `result.markdown` |
| `html` | `result.html` |
| `links` | `result.links` |
| `summary` | `result.summary` |

Leave out `formats` to get all four.

## Passing the file

Pass a path, or the file's bytes. With bytes, add `file_name` so Maxun knows the file type:

```python
with open("invoice.pdf", "rb") as f:
    data = f.read()

robot = await maxun.documents.extract(
    "Invoice reader",
    data,
    "Invoice number and total",
    file_name="invoice.pdf",
)
```

## Running again

A document robot keeps its file, so you can run it again later. Find it by name:

```python
robot = await maxun.robots.find("Invoice reader")
result = await robot.run()
```

List all document robots with `await maxun.documents.list()`.

:::note
Document robot names must be unique. Creating one with a name that already exists raises `ConflictError`.
:::

## LLM settings (self-hosted)

`documents.extract` and the `summary` format use an LLM. On Maxun Cloud this is handled for you. On self-hosted Maxun, pass one:

```python
robot = await maxun.documents.extract(
    "Invoice reader",
    "./invoice.pdf",
    "Invoice number and total",
    llm_provider="openai",           # "anthropic", "openai" or "ollama"
    llm_api_key="your-llm-api-key",
    llm_model="gpt-4o-mini",         # optional
)
```

## Complete example

```python
import asyncio

from dotenv import load_dotenv
from maxun import Maxun

load_dotenv()


async def main():
    async with Maxun() as maxun:
        # Pull the key fields out of an offer letter
        extractor = await maxun.documents.extract(
            "Offer letter fields",
            "./offer-letter.pdf",
            "Student name, university, course title and start date",
        )
        print((await extractor.run()).document_data)

        # Convert the same letter to Markdown with a summary
        parser = await maxun.documents.parse(
            "Offer letter text",
            "./offer-letter.pdf",
            formats=["markdown", "summary"],
        )
        result = await parser.run()
        print(result.summary)
        print(result.markdown)


asyncio.run(main())
```

See [Robot Management](./sdk-robot) to schedule document robots or add webhooks.