---
id: sdk-document
title: Document
sidebar_position: 6
---

# Document

Process documents with the Maxun Python SDK. You can:

* Extract structured data from documents using a natural language prompt.
* Convert documents into Markdown or HTML.
* Generate summaries.
* Extract links from documents.
* Run document robots again or schedule them for later.

Supported document formats include PDF, CSV, XLSX, JPG, PNG, and DOCX.

## Extract

Upload a document and describe the information you want to extract. Maxun creates a reusable robot that can process the document.

```python id="l6l38m"
import os

from dotenv import load_dotenv
from maxun import Client, Config

load_dotenv()

client = Client(Config(api_key=os.environ["MAXUN_API_KEY"]))

result = await client.create_document_extract_robot(
    file="./invoice.pdf",
    prompt="Extract invoice number, vendor name, and total amount",
    robot_name="Invoice Extractor",
)

robot_id = result.get("robotId")

run = await client.execute_robot(robot_id)

print(run["data"]["documentData"])
```

Example output:

```python id="78zx2o"
{
    "invoice_number": "INV-2025-0042",
    "vendor_name": "Acme Corp",
    "total_amount": 4250
}
```

The extracted fields depend on the prompt you provide.

## Parse

Convert a document into one or more supported output formats:

* `markdown` - Convert the document into Markdown.
* `html` - Convert the document into HTML.
* `summary` - Generate a summary of the document.
* `links` - Extract links from the document.

```python id="8jbr4j"
result = await client.create_document_parse_robot(
    file="./report.pdf",
    output_formats=["markdown", "html", "summary", "links"],
    robot_name="Report Parser",
)

parsed = result.get("parsedOutput", {})

print(parsed.get("markdown"))
print(parsed.get("html"))
print(parsed.get("summary"))
print(parsed.get("links"))
```

You can request only the formats you need:

```python id="9h8x4k"
result = await client.create_document_parse_robot(
    file="./report.pdf",
    output_formats=["summary"],
    robot_name="Report Summary",
)

print(result["parsedOutput"]["summary"])
```

### Running Again

Once the document robot has been created, you can run it again using its robot ID:

```python id="ifhoht"
robot_id = result.get("robotId")

run = await client.execute_robot(robot_id)

print(run["data"]["markdown"])
print(run["data"]["html"])
print(run["data"]["summary"])
print(run["data"]["links"])
```

The available output depends on the formats configured when the robot was created.

## Scheduling

Document robots can be scheduled using the `Client` API.

```python id="aq45hl"
await client.schedule_robot(
    robot_id,
    {
        "runEvery": 1,
        "runEveryUnit": "DAYS",
        "timezone": "UTC",
        "atTimeStart": "08:00",
        "startFrom": "MONDAY",
    },
)
```

For more scheduling options and robot management features, see [Robot Management](/sdk/python-sdk/sdk-robot).

## Complete Example

```python id="qwni0j"
import asyncio
import os

from dotenv import load_dotenv
from maxun import Client, Config

load_dotenv()


async def main():
    client = Client(
        Config(
            api_key=os.environ["MAXUN_API_KEY"],
            base_url=os.environ.get("MAXUN_BASE_URL"),
        )
    )

    # Extract specific fields from a PDF
    extract_result = await client.create_document_extract_robot(
        file="./offer-letter.pdf",
        prompt="Extract student name, university, course title, and start date",
        robot_name="Offer Letter Extractor",
    )

    extract_run = await client.execute_robot(
        extract_result.get("robotId")
    )

    print(extract_run["data"]["documentData"])

    # Convert the document to Markdown and generate a summary
    parse_result = await client.create_document_parse_robot(
        file="./offer-letter.pdf",
        output_formats=["markdown", "summary"],
        robot_name="Offer Letter Parser",
    )

    print(parse_result["parsedOutput"]["markdown"])
    print(parse_result["parsedOutput"]["summary"])


asyncio.run(main())
```
