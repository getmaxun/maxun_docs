---
id: sdk-document
title: Document
sidebar_position: 6
---

# Document

Document robots read files instead of web pages. They can:

- **Extract** specific data from a file, described in plain English.
- **Parse** a file into Markdown, HTML, a list of links or a summary.

Supported files: PDF, DOCX, XLSX, CSV, JPG and PNG.

## Extract

Upload a file and describe the data you want:

```javascript
const robot = await maxun.documents.extract(
  'Invoice reader',
  './invoice.pdf',
  'Invoice number, vendor name, date and total amount',
);

const result = await robot.run();
console.log(result.documentData);
```

```javascript
{
  invoice_number: 'INV-2025-0042',
  vendor_name: 'Acme Corp',
  date: '2025-03-14',
  total_amount: 4250
}
```

The fields you get back follow your prompt.

## Parse

Convert a file into text formats:

```javascript
const robot = await maxun.documents.parse('Annual report', './report.docx', {
  formats: ['markdown', 'summary'],
});

const result = await robot.run();

console.log(result.markdown);
console.log(result.summary);
```

| Format | Read it from |
|---|---|
| `markdown` | `result.markdown` |
| `html` | `result.html` |
| `links` | `result.links` |
| `summary` | `result.summary` |

Leave out `formats` to get all four.

## Passing the file

Pass a path, or a `Buffer`. With a buffer, add `fileName` so Maxun knows the file type:

```javascript
import { readFile } from 'node:fs/promises';

const data = await readFile('invoice.pdf');

const robot = await maxun.documents.extract('Invoice reader', data, 'Invoice number and total', {
  fileName: 'invoice.pdf',
});
```

## Running again

A document robot keeps its file, so you can run it again later. Find it by name:

```javascript
const robot = await maxun.robots.find('Invoice reader');
const result = await robot.run();
```

List all document robots with `await maxun.documents.list()`.

:::note
Document robot names must be unique. Creating one with a name that already exists throws `ConflictError`.
:::

## LLM settings (self-hosted)

`documents.extract` and the `summary` format use an LLM. On Maxun Cloud this is handled for you. On self-hosted Maxun, pass one:

```javascript
const robot = await maxun.documents.extract('Invoice reader', './invoice.pdf', 'Invoice number and total', {
  llmProvider: 'openai',           // 'anthropic', 'openai' or 'ollama'
  llmApiKey: 'your-llm-api-key',
  llmModel: 'gpt-4o-mini',         // optional
});
```

## Complete example

```javascript
import 'dotenv/config';
import { Maxun } from 'maxun-sdk';

const maxun = new Maxun();

// Pull the key fields out of an offer letter
const extractor = await maxun.documents.extract(
  'Offer letter fields',
  './offer-letter.pdf',
  'Student name, university, course title and start date',
);
console.log((await extractor.run()).documentData);

// Convert the same letter to Markdown with a summary
const parser = await maxun.documents.parse('Offer letter text', './offer-letter.pdf', {
  formats: ['markdown', 'summary'],
});
const result = await parser.run();
console.log(result.summary);
console.log(result.markdown);
```

See [Robot Management](./sdk-robot) to schedule document robots or add webhooks.