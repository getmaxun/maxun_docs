---
sidebar_position: 1
---

# Docker

This guide will help you install and run Maxun on your system.

## Prerequisites

| Software    | Download Link                                                                 |
|-------------|-------------------------------------------------------------------------------|
| Docker Desktop | [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)                           |



## Installation Steps
1. Create a root folder for your project (e.g. 'maxun')
2. Create a file named .env in the root folder of the project
3. Copy all content of <a href="https://github.com/getmaxun/maxun/blob/master/ENVEXAMPLE">example env file</a> to your `.env` file.

4. Copy the <a href="https://github.com/getmaxun/maxun/blob/develop/docker-compose.yml">docker-compose.yml</a> file in the root folder of the project
5. Run:

```
docker-compose up -d
```

You can access the frontend at http://localhost:5173/ and backend at http://localhost:8080/