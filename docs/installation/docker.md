---
sidebar_position: 1
---

# Docker Compose

This guide will help you install and run Maxun with Docker Compose. Docker Compose is a tool that helps you define and share multi-container applications. You don't need to install each dependency used by Maxun separately as Docker Compose will automatically do it for you.

## Prerequisites

| Software    | Download Link                                                                 |
|-------------|-------------------------------------------------------------------------------|
| Docker Desktop | [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)                           |



## Installation Steps
1. Create a root folder for your project (e.g. 'maxun')
2. Create a file named `.env` in the root folder of the project
3. Copy all content of <a href="https://github.com/getmaxun/maxun/blob/master/ENVEXAMPLE">example env file</a> to your `.env` file.

4. Create a file named `docker-compose.yml` in the root folder of the project 
5. Copy all content from <a href="https://github.com/getmaxun/maxun/blob/develop/docker-compose.yml">project's docker-compose.yml</a> to your `docker-compose.yml` file.
6. Run

```
docker-compose up -d
```

![Docker Compose successful start](docker.png)

You can access the frontend at `PUBLIC_URL` (eg: http://localhost:5173/) and backend at `BACKEND_URL` (eg: http://localhost:8080/)

To set the `PUBLIC_URL` & `BACKEND_URL` environment variables, refer <a href="/environment_variables">Environment Variables</a> section.