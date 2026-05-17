---
id: sdk-document
title: Document
sidebar_position: 5
---

# Document

Work with PDF documents — extract specific fields or convert to Markdown, HTML, and links.

## Extract

Upload a PDF and describe what you want. Maxun creates a reusable robot that extracts those fields from any similar document.

```python
import asyncio, os
from dotenv import load_dotenv
from maxun import Client, Config

load_dotenv()
client = Client(Config(api_key=os.environ['MAXUN_API_KEY']))

result = await client.create_document_extract_robot(
    file='./invoice.pdf',
    prompt='Extract invoice number, vendor name, and total amount',
    robot_name='Invoice Extractor',
)

robot_id = result.get('robotId')
run = await client.execute_robot(robot_id)
print(run['data']['documentData'])
# { 'invoice_number': 'INV-2025-0042', 'vendor_name': 'Acme Corp', 'total_amount': 4250 }
```

---

## Parse

Convert a PDF into Markdown, HTML, or a list of links.

```python
result = await client.create_document_parse_robot(
    file='./report.pdf',
    output_formats=['markdown', 'html', 'links'],
    robot_name='Report Parser',
)

# Output is available straight away after creation
parsed = result.get('parsedOutput', {})
print(parsed.get('markdown'))
print(parsed.get('links'))
```

### Running Again

```python
robot_id = result.get('robotId')
run = await client.execute_robot(robot_id)
print(run['data']['markdown'])
print(run['data']['links'])
```

---

## Scheduling

```python
await client.schedule_robot(robot_id, {
    'runEvery': 1,
    'runEveryUnit': 'DAYS',
    'timezone': 'UTC',
    'atTimeStart': '08:00',
    'startFrom': 'MONDAY',
})
```

---

## Complete Example

```python
import asyncio, os
from dotenv import load_dotenv
from maxun import Client, Config

load_dotenv()

async def main():
    client = Client(Config(
        api_key=os.environ['MAXUN_API_KEY'],
        base_url=os.environ.get('MAXUN_BASE_URL'),
    ))

    # Pull specific fields from a PDF
    result = await client.create_document_extract_robot(
        file='./offer-letter.pdf',
        prompt='Extract student name, university, course title, and start date',
        robot_name='Offer Letter Extractor',
    )
    run = await client.execute_robot(result.get('robotId'))
    print(run['data']['documentData'])

    # Or convert the whole document to Markdown
    parse_result = await client.create_document_parse_robot(
        file='./offer-letter.pdf',
        output_formats=['markdown'],
        robot_name='Offer Letter Parser',
    )
    print(parse_result['parsedOutput']['markdown'])

asyncio.run(main())
```
