---
sidebar_position: 2
---

# Local Setup

This guide will help you install and run Maxun on your local system.

## Prerequisites

| Software    | Download Link                                                                 |
|-------------|-------------------------------------------------------------------------------|
| Node.js (18 or above)     | [Download Node.js](https://nodejs.org/en/download/)                           |
| PostgreSQL  | [Download PostgreSQL](https://www.postgresql.org/download/)                   |
| MinIO       | [Download MinIO](https://min.io/download)                                     |
| Redis       | [Download Redis](https://redis.io/download)                                   |

## Environment Setup

1. Create a `.env` file in the project root folder
2. Copy the content from the <a href="https://github.com/getmaxun/maxun/blob/master/ENVEXAMPLE">example env file</a> to your `.env`
3. Ensure you have the prerequisites installed on your system.
4. Run the commands below

```
git clone https://github.com/getmaxun/maxun

# change directory to the project root
cd maxun

# install dependencies
npm install

# change directory to maxun-core to install dependencies
cd maxun-core 
npm install

# get back to the root directory
cd ..

# make sure playwright is properly initialized
npx playwright install
npx playwright install-deps

# get back to the root directory
cd ..

# start frontend and backend together
npm run start
```

You can access the frontend at http://localhost:5173/ and backend at http://localhost:8080/