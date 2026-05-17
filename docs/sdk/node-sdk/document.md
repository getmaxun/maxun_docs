---
id: sdk-document
title: Document
sidebar_position: 5
---

# Document

Work with PDF documents — extract specific fields or convert to Markdown, HTML, and links.

## Extract

Upload a PDF and describe what you want. Maxun creates a reusable robot that extracts those fields from any similar document.

```javascript
import { Client } from 'maxun-sdk';

const client = new Client({
  apiKey: process.env.MAXUN_API_KEY,
  baseUrl: process.env.MAXUN_BASE_URL,
});

const { robot } = await client.createDocumentExtractRobot(
  './invoice.pdf',
  'Extract invoice number, vendor name, and total amount',
  { robotName: 'Invoice Extractor' }
);

const result = await client.executeRobot(robot.recording_meta.id);
console.log(result.data.documentData);
// { invoice_number: 'INV-2025-0042', vendor_name: 'Acme Corp', total_amount: 4250 }
```

---

## Parse

Convert a PDF into Markdown, HTML, or a list of links.

```javascript
const { robot, parsedOutput } = await client.createDocumentParseRobot(
  './report.pdf',
  ['markdown', 'html', 'links'],
  { robotName: 'Report Parser' }
);

// Output is available straight away after creation
console.log(parsedOutput.markdown);
console.log(parsedOutput.links);
```

### Running Again

```javascript
const result = await client.executeRobot(robot.recording_meta.id);
console.log(result.data.markdown);
console.log(result.data.links);
```

---

## Scheduling

```javascript
await client.scheduleRobot(robot.recording_meta.id, {
  runEvery: 1,
  runEveryUnit: 'DAYS',
  timezone: 'UTC',
  atTimeStart: '08:00',
  startFrom: 'MONDAY',
});
```

For full robot management see <a href="/sdk/node-sdk/sdk-robot">Robot Management</a>.

---

## Complete Example

```javascript
import 'dotenv/config';
import { Client } from 'maxun-sdk';

const client = new Client({
  apiKey: process.env.MAXUN_API_KEY,
  baseUrl: process.env.MAXUN_BASE_URL,
});

// Pull specific fields from a PDF
const { robot } = await client.createDocumentExtractRobot(
  './offer-letter.pdf',
  'Extract student name, university, course title, and start date',
  { robotName: 'Offer Letter Extractor' }
);
const result = await client.executeRobot(robot.recording_meta.id);
console.log(result.data.documentData);

// Or convert the whole document to Markdown
const { parsedOutput } = await client.createDocumentParseRobot(
  './offer-letter.pdf',
  ['markdown'],
  { robotName: 'Offer Letter Parser' }
);
console.log(parsedOutput.markdown);
```
