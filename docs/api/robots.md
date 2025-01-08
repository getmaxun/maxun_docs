---
id: robot-api
title: Robot API
sidebar_position: 2
---

### 1. Request: Get All Robots
- Request type: GET
- Route: `/api/robots`

#### Parameters
No parameters

#### Responses

| Code | Description | Media Type 
|---|---|---|
| 200 | A list of robots. | application/json |

Example Value Schema
```
{
  "statusCode": 200,
  "messageCode": "success",
  "robots": {
    "totalCount": 2,
    "items": [
      {
        "id": "0a3acb0f-4928-483b-8610-35049efa90fd",
        "name": "100 Blog Posts",
        "createdAt": 1748765979000,
        "inputParameters": [
          {
            "type": "string",
            "name": "originUrl",
            "label": "Origin URL",
            "required": true,
            "defaultValue": "https://linktr.ee/blog/trends/"
          }
        ]
      },
      {
        "id": "9d458b00-e9dd-4799-b5f2-0166565d2af3",
        "name": "HackerNews",
        "createdAt": 1748765979219,
        "inputParameters": [
          {
            "type": "string",
            "name": "originUrl",
            "label": "Origin URL",
            "required": true,
            "defaultValue": "https://news.ycombinator.com/"
          }
        ]
      }
    ]
  }
}
```
| Code | Description | Media Type 
|---|---|---|
| 500 | Error retrieving robots. | application/json |

Example Value Schema
```
{
  "statusCode": 500,
  "messageCode": "error",
  "message": "Failed to retrieve robots"
}
```

### 2. Request: Get Robot By ID
- Request type: GET
- Route: `GET /api/robots/{id}`

#### Parameters

| Name | Description |
|---|---|
| id (required) string | The ID of the robot to retrieve.


#### Responses

| Code | Description | Media Type 
|---|---|---|
| 200 | Robot details.| application/json |

Example Value Schema
```
{
  "statusCode": 200,
  "messageCode": "success",
  "robot": {
    "id": "0a3acb0f-4928-483b-8610-35049efa90fd",
    "name": "10 post link tree",
    "createdAt": 1748765979000,
    "inputParameters": [
      {
        "type": "string",
        "name": "originUrl",
        "label": "Origin URL",
        "required": true,
        "defaultValue": "https://linktr.ee/blog/trends/"
      }
    ]
  }
}
```
| Code | Description | Media Type 
|---|---|---|
| 404 | Robot not found. | application/json |

Example Value Schema
```
{
  "statusCode": 404,
  "messageCode": "not_found",
  "message": "Recording with ID not found."
}
```