---
id: open-source-api
title: "Open Source API: Robots, Runs & Schedules for Self-Hosted Maxun"
description: "REST API for self-hosted Maxun: list, get and duplicate robots, schedule them, run them and fetch their extracted data."
sidebar_label: "Open Source API"
sidebar_position: 3
---

# Open Source API

This is the REST API of self-hosted (open source) Maxun.

## Base URL and authentication

```
<BACKEND_URL>/api
```

`BACKEND_URL` defaults to `http://localhost:8080`. Send your [API key](/api/api) in the `x-api-key` header.

```bash
curl http://localhost:8080/api/robots \
  -H "x-api-key: YOUR_API_KEY"
```

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/robots` | [Get all robots](#1-request-get-all-robots) |
| `GET` | `/api/robots/{id}` | [Get a robot by ID](#2-request-get-robot-by-id) |
| `POST` | `/api/robots/{id}/duplicate` | [Duplicate a robot with a new target URL](#3-request-duplicate-a-robot) |
| `POST` | `/api/robots/{id}/schedule` | [Schedule recurring runs for a robot](#4-request-schedule-recurring-runs-for-a-robot) |
| `GET` | `/api/robots/{id}/schedule` | [Get a robot's schedule](#5-request-get-a-robots-schedule) |
| `DELETE` | `/api/robots/{id}/schedule` | [Delete a robot's schedule](#6-request-delete-a-robots-schedule) |
| `GET` | `/api/robots/{id}/runs` | [Get all runs for a robot](#1-request-get-all-runs-for-a-robot) |
| `POST` | `/api/robots/{id}/runs` | [Run a robot](#2-request-run-a-robot-by-id) |
| `GET` | `/api/robots/{id}/runs/{runId}` | [Get a specific run and its data](#3-request-get-a-specific-run-by-id-for-a-robot) |

For long-running robots, use [Webhooks](/api/webhooks) to receive results instead of polling.

## Robots

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

## Runs

### 1. Request: Get All Runs For A Robot
- Request type: GET
- Route: `/api/robots/{id}/runs`
- Description: Retrieve all runs associated with a specific robot.

#### Parameters

| Name | Description |
|---|---|
| id (required) string | The ID of the robot.

#### Responses

| Code | Description | Media Type 
|---|---|---|
| 200 | A list of runs for the robot.| application/json |

```
{
  "statusCode": 200,
  "messageCode": "success",
  "runs": {
    "totalCount": 2,
    "items": [
      {
        "id": "a4389317-fcfc-4006-8fc0-a31b290daf41",
        "status": "success",
        "name": "10 post link tree",
        "robotId": "0a3acb0f-4928-483b-8610-35049efa90fd",
        "startedAt": "6/1/2025, 2:27:06 pm",
        "finishedAt": "6/1/2025, 2:27:24 pm",
        "runId": "b9b4cba1-40b4-4947-a7d0-6194d277d0b7",
        "runByUserId": 8,
        "runByScheduleId": null,
        "runByAPI": null,
        "data": [
          {
            "Label 1": "Linktree’s 2023 Creator Report: : How to Navigate Attention Overload and Break Through the Noise",
            "Label 2": "27 September, 5 mins"
          },
          {
            "Label 1": "Here’s what we were linking to on Linktree in 2022",
            "Label 2": "08 December, 5 mins"
          },
          {
            "Label 1": "A beginner’s guide to the creator economy",
            "Label 2": "01 July, 5 mins"
          },
          {
            "Label 1": "A beginner’s guide to the Metaverse and steps to join",
            "Label 2": "20 June, 10 mins"
          },
          {
            "Label 1": "How to support the growing Black winemaking industry in the U.S.",
            "Label 2": "09 February, 7 mins"
          },
          {
            "Label 1": "It’s year of the tiger! Here are your 2022 horoscopes for the Lunar New Year",
            "Label 2": "01 February, 8 mins"
          },
          {
            "Label 1": "How to declutter, get organized and make this year your most productive one yet",
            "Label 2": "27 January, 7 mins"
          },
          {
            "Label 1": "12 free social media management tools for every creator",
            "Label 2": "17 January, 12 mins"
          },
          {
            "Label 1": "Our predictions for 2022",
            "Label 2": "23 December, 10 mins"
          },
          {
            "Label 1": "Female athletes are leading the future of NIL sponsorships",
            "Label 2": "06 December, 7 mins"
          }
        ],
        "screenshot": null
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
  "message": "Failed to retrieve runs"
}
```

### 2. Request: Run A Robot By ID
- Request type: POST
- Route: `/api/robots/{id}/runs`
- Description: When you need to execute a robot and retrieve the data it captures, you can use this endpoint to initiate a new run. 

We now offer two methods for retrieving a run's details once it is finished:
1. **Webhooks (Recommended)**: For real-time notifications, we strongly recommend using webhooks. You can configure a webhook to receive an immediate notification as soon as your robot run is complete, along with its details. Learn more about setting up and using webhooks <a href="/api/webhooks">here</a>
2. **Long Polling**: Alternatively, you can continue to poll the GET endpoint to retrieve a run's details. While functional, this method requires you to periodically check the endpoint until the run is marked as finished.

We encourage you to leverage our webhook support for a more efficient and responsive integration.


#### Parameters

| Name | Description |
|---|---|
| id (required) string | The ID of the robot to run.

#### Responses

| Code | Description | Media Type 
|---|---|---|
| 200 | Robot run started successfully. | application/json |

Example Value Schema
```
{
  "statusCode": 200,
  "messageCode": "success",
  "run": {
    "id": "1ffbc139-6b16-4164-a61e-d4813c300a66",
    "status": "success",
    "name": "10 post link tree",
    "robotId": "0a3acb0f-4928-483b-8610-35049efa90fd",
    "startedAt": "8/1/2025, 12:04:24 am",
    "finishedAt": "8/1/2025, 12:04:40 am",
    "runId": "748a9995-9749-4bf1-a235-88dc61c2dd85",
    "runByUserId": null,
    "runByScheduleId": null,
    "runByAPI": true,
    "data": [
      {
        "Label 1": "Linktree’s 2023 Creator Report: : How to Navigate Attention Overload and Break Through the Noise",
        "Label 2": "27 September, 5 mins"
      },
      {
        "Label 1": "Here’s what we were linking to on Linktree in 2022",
        "Label 2": "08 December, 5 mins"
      },
      {
        "Label 1": "A beginner’s guide to the creator economy",
        "Label 2": "01 July, 5 mins"
      },
      {
        "Label 1": "A beginner’s guide to the Metaverse and steps to join",
        "Label 2": "20 June, 10 mins"
      },
      {
        "Label 1": "How to support the growing Black winemaking industry in the U.S.",
        "Label 2": "09 February, 7 mins"
      },
      {
        "Label 1": "It’s year of the tiger! Here are your 2022 horoscopes for the Lunar New Year",
        "Label 2": "01 February, 8 mins"
      },
      {
        "Label 1": "How to declutter, get organized and make this year your most productive one yet",
        "Label 2": "27 January, 7 mins"
      },
      {
        "Label 1": "12 free social media management tools for every creator",
        "Label 2": "17 January, 12 mins"
      },
      {
        "Label 1": "Our predictions for 2022",
        "Label 2": "23 December, 10 mins"
      },
      {
        "Label 1": "Female athletes are leading the future of NIL sponsorships",
        "Label 2": "06 December, 7 mins"
      }
    ],
    "screenshot": null
  }
}
```
| Code | Description | Media Type 
|---|---|---|
| 401 | Unauthorized access. | application/json |

Example Value Schema
```
{
  "ok": false,
  "error": "Unauthorized"
}
```
| Code | Description | Media Type 
|---|---|---|
| 500 | Error running robot.| application/json |

Example Value Schema
```
{
  "statusCode": 500,
  "messageCode": "error",
  "message": "Failed to run robot"
}
```

### 3. Request: Get A Specific Run By ID For A Robot
- Request type: GET
- Route: `/api/robots/{id}/runs/{runId}`
- Description: Retrieve details of a specific run by its ID.

#### Parameters

| Name | Description |
|---|---|
| id (required) string | The ID of the robot.
| runId (required) string | The ID of the run.

#### Responses

| Code | Description | Media Type 
|---|---|---|
| 200 | Run details.| application/json |

Example Value Schema
```
{
  "statusCode": 200,
  "messageCode": "success",
  "run": {
    "id": "1ffbc139-6b16-4164-a61e-d4813c300a66",
    "status": "success",
    "name": "10 post link tree",
    "robotId": "0a3acb0f-4928-483b-8610-35049efa90fd",
    "startedAt": "8/1/2025, 12:04:24 am",
    "finishedAt": "8/1/2025, 12:04:40 am",
    "runId": "748a9995-9749-4bf1-a235-88dc61c2dd85",
    "runByUserId": null,
    "runByScheduleId": null,
    "runByAPI": true,
    "data": [
      {
        "Label 1": "Linktree’s 2023 Creator Report: : How to Navigate Attention Overload and Break Through the Noise",
        "Label 2": "27 September, 5 mins"
      },
      {
        "Label 1": "Here’s what we were linking to on Linktree in 2022",
        "Label 2": "08 December, 5 mins"
      },
      {
        "Label 1": "A beginner’s guide to the creator economy",
        "Label 2": "01 July, 5 mins"
      },
      {
        "Label 1": "A beginner’s guide to the Metaverse and steps to join",
        "Label 2": "20 June, 10 mins"
      },
      {
        "Label 1": "How to support the growing Black winemaking industry in the U.S.",
        "Label 2": "09 February, 7 mins"
      },
      {
        "Label 1": "It’s year of the tiger! Here are your 2022 horoscopes for the Lunar New Year",
        "Label 2": "01 February, 8 mins"
      },
      {
        "Label 1": "How to declutter, get organized and make this year your most productive one yet",
        "Label 2": "27 January, 7 mins"
      },
      {
        "Label 1": "12 free social media management tools for every creator",
        "Label 2": "17 January, 12 mins"
      },
      {
        "Label 1": "Our predictions for 2022",
        "Label 2": "23 December, 10 mins"
      },
      {
        "Label 1": "Female athletes are leading the future of NIL sponsorships",
        "Label 2": "06 December, 7 mins"
      }
    ],
    "screenshot": null
  }
}
```
| Code | Description | Media Type 
|---|---|---|
| 404 | Run not found. | application/json |

Example Value Schema
```
{
  "statusCode": 404,
  "messageCode": "not_found",
  "message": "Run with id not found."
}
```
