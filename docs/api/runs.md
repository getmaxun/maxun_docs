---
id: run-api
title: Run API
sidebar_position: 3
---

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
- Description: When you need to run a robot and get its captured data, you can use this endpoint to create a run for the robot. For now, you can poll the GET endpoint to retrieve a run's details as soon as it is finished. 

We are working on webhook support to notify you when a run is finished.


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