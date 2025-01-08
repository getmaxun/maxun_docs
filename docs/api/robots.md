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

### 2. Get Robot By ID
- Route: `GET /api/robots/{id}`
- This route can be used to fetch information about a particular robot based on the unique id provided as a parameter.
- For example, if the user wants to fetch data about a particular robot, they can get the robot's id from the **Robot Settings** option in the robots page. The output data on running would be as follows.

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