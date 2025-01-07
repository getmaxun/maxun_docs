---
id: robot-routes
title: Robot Routes
sidebar_position: 2
---

Robot routes let users fetch data for all robots or a specific robot by ID, depending on the need. The tasks these routes handle are outlined below:

### 1. Get All Robots
- Route: `GET /api/robots`
- This route enables the user to get information of all the existing robots in the database.
- For example, if the user has 2 robots in the database and wants to get their information such as the name or the url enetered, they can use the route to fetch data in json format as shown below.

```
{
  "statusCode": 200,
  "messageCode": "success",
  "robots": {
    "totalCount": 2,
    "items": [
      {
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
      },
      {
        "id": "9d458b00-e9dd-4799-b5f2-0166565d2af3",
        "name": "40 datapoints HackerNews",
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