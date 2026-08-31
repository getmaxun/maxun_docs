---
id: robot-api
title: Robot API
sidebar_position: 2
---

### 1. Request: Get All Robots
- Request type: GET
- Route: `/api/robots`
- Description: Retrieve a list of all robots.

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
- Description: Retrieve a robot by its ID.

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

### 3. Request: Duplicate a Robot
- Request type: POST
- Route: `/api/robots/{id}/duplicate`
- Description: Duplicate an existing robot to run it on a different URL with the same structure.

#### Parameters

| Name | Description |
|---|---|
| id (required) string | The ID of the robot to duplicate.

#### Request Body

| Name | Description |
|---|---|
| targetUrl (required) string | The new URL to target in the duplicated robot.

#### Responses

| Code | Description | Media Type 
|---|---|---|
| 201 | Robot duplicated successfully. | application/json |

Example Value Schema
```
{
  "statusCode": 201,
  "messageCode": "success",
  "robot": {
    "id": "e4b3c2d1-0a9b-8c7d-6e5f-4g3h2i1j0k9l",
    "name": "HackerNews (show)",
    "createdAt": 1748765980000,
    "inputParameters": [
      {
        "type": "string",
        "name": "originUrl",
        "label": "Origin URL",
        "required": true,
        "defaultValue": "https://news.ycombinator.com/show"
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
  "message": "Robot with ID not found."
}
```
| Code | Description | Media Type 
|---|---|---|
| 500 | Internal server error. | application/json |

### 4. Request: Schedule Recurring Runs For A Robot
- Request type: POST
- Route: `/api/robots/{id}/schedule`
- Description: Create or replace a recurring schedule for a robot. The robot will run automatically based on the provided frequency. Re-posting to this endpoint replaces any existing schedule.

#### Parameters

| Name | Description |
|---|---|
| id (required) string | The ID of the robot to schedule.

#### Request Body

| Name | Description |
|---|---|
| runEvery (required) integer | How often the robot runs, in units of `runEveryUnit`. |
| runEveryUnit (required) string | The schedule unit. Accepted values: `MINUTES`, `HOURS`, `DAYS`, `WEEKS`, `MONTHS`. |
| startFrom (required) string | The day to start from. Accepted values: `SUNDAY`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`. |
| atTimeStart (required) string | Start time in `HH:MM` 24-hour format. |
| atTimeEnd (required) string | End time in `HH:MM` 24-hour format. |
| timezone (required) string | IANA timezone name, such as `UTC` or `Asia/Kolkata`. |
| dayOfMonth string | Day of the month. Used only when `runEveryUnit` is `MONTHS`. |

Example Request Body
```
{
  "runEvery": 6,
  "runEveryUnit": "HOURS",
  "startFrom": "MONDAY",
  "atTimeStart": "09:00",
  "atTimeEnd": "17:00",
  "timezone": "UTC"
}
```

#### Responses

| Code | Description | Media Type 
|---|---|---|
| 200 | Schedule created successfully. | application/json |

Example Value Schema
```
{
  "statusCode": 200,
  "messageCode": "success",
  "schedule": {
    "runEvery": 6,
    "runEveryUnit": "HOURS",
    "startFrom": "MONDAY",
    "atTimeStart": "09:00",
    "atTimeEnd": "17:00",
    "timezone": "UTC",
    "cronExpression": "0 9-17/6 * * *",
    "nextRunAt": "2025-06-02T09:00:00.000Z"
  }
}
```
| Code | Description | Media Type 
|---|---|---|
| 400 | Invalid schedule parameters. | application/json |

Example Value Schema
```
{
  "statusCode": 400,
  "messageCode": "bad_request",
  "message": "Invalid schedule parameters.",
  "field": "runEveryUnit"
}
```
| Code | Description | Media Type 
|---|---|---|
| 401 | Unauthorized access. | application/json |

Example Value Schema
```
{
  "statusCode": 401,
  "messageCode": "error",
  "message": "Unauthorized"
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
  "message": "Robot with ID not found."
}
```
| Code | Description | Media Type 
|---|---|---|
| 500 | Error scheduling robot. | application/json |

Example Value Schema
```
{
  "statusCode": 500,
  "messageCode": "error",
  "message": "Failed to schedule robot"
}
```

### 5. Request: Get A Robot's Schedule
- Request type: GET
- Route: `/api/robots/{id}/schedule`
- Description: Retrieve the current recurring schedule for a robot, or `null` if no schedule is set.

#### Parameters

| Name | Description |
|---|---|
| id (required) string | The ID of the robot.

#### Responses

| Code | Description | Media Type 
|---|---|---|
| 200 | The robot's schedule. | application/json |

Example Value Schema
```
{
  "statusCode": 200,
  "messageCode": "success",
  "schedule": {
    "runEvery": 6,
    "runEveryUnit": "HOURS",
    "startFrom": "MONDAY",
    "atTimeStart": "09:00",
    "atTimeEnd": "17:00",
    "timezone": "UTC",
    "cronExpression": "0 9-17/6 * * *",
    "nextRunAt": "2025-06-02T09:00:00.000Z"
  }
}
```
| Code | Description | Media Type 
|---|---|---|
| 401 | Unauthorized access. | application/json |

Example Value Schema
```
{
  "statusCode": 401,
  "messageCode": "error",
  "message": "Unauthorized"
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
  "message": "Robot with ID not found."
}
```
| Code | Description | Media Type 
|---|---|---|
| 500 | Error retrieving schedule. | application/json |

Example Value Schema
```
{
  "statusCode": 500,
  "messageCode": "error",
  "message": "Failed to retrieve schedule"
}
```

### 6. Request: Delete A Robot's Schedule
- Request type: DELETE
- Route: `/api/robots/{id}/schedule`
- Description: Cancel a robot's recurring schedule. This endpoint succeeds even if the robot has no schedule.

#### Parameters

| Name | Description |
|---|---|
| id (required) string | The ID of the robot.

#### Responses

| Code | Description | Media Type 
|---|---|---|
| 200 | Schedule deleted successfully. | application/json |

Example Value Schema
```
{
  "statusCode": 200,
  "messageCode": "success",
  "message": "Schedule deleted successfully"
}
```
| Code | Description | Media Type 
|---|---|---|
| 401 | Unauthorized access. | application/json |

Example Value Schema
```
{
  "statusCode": 401,
  "messageCode": "error",
  "message": "Unauthorized"
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
  "message": "Robot with ID not found."
}
```
| Code | Description | Media Type 
|---|---|---|
| 500 | Error deleting schedule. | application/json |

Example Value Schema
```
{
  "statusCode": 500,
  "messageCode": "error",
  "message": "Failed to delete schedule"
}
```
