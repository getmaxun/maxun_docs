---
id: runs
title: "Robot Runs: Manual, Scheduled & API"
description: "A run is one execution of a Maxun robot. Trigger runs manually, on a schedule or via API, SDK, CLI and MCP, then view and export the results."
sidebar_label: "Runs"
sidebar_position: 4
---

# Runs

Runs are the core functionality of Maxun robots. Each run represents a complete cycle where the robot performs its tasks based on the configuration and training provided by the user at the time of robot creation. A successful run contains all the extracted data, fulfilling the primary objective of the robot.

## Execution Options

Robot runs can be initiated in three different ways:

**1. Manual Runs**: Users can run a robot directly from Maxun dashboard.

**2. Scheduled Runs**: Automate runs by scheduling them to execute at specific times or intervals. 

**3. API Runs**: Trigger runs programmatically via API calls, enabling integration with external systems.

## Ways to Run a Robot

| Where | How |
|---|---|
| Dashboard | Click **Run** on any robot |
| Schedule | Set an interval in the robot's [schedule settings](/robot-schedule) |
| REST API | `POST /api/robots/{id}/runs` ([Run API](/api/run-api)) |
| Node.js SDK | `const result = await robot.run();` ([Robot Management](/sdk/node-sdk/sdk-robot)) |
| Python SDK | `result = await robot.run()` ([Robot Management](/sdk/python-sdk/sdk-robot)) |
| CLI | `maxun run <robot-id>` ([Running Robots](/cli/cli-run)) |
| MCP | Ask your AI client to run a robot with the `run_robot` tool ([MCP Tools](/mcp/tools)) |

## Viewing and Exporting Results

Every run is saved with its extracted data. From the dashboard you can view a run's output and export it as CSV or JSON. You can also send results automatically to [webhooks](/api/webhooks), [Google Sheets](/integrations/gsheet), [Airtable](/integrations/airtable) or [n8n](/integrations/n8n).

To get alerts when the data changes between runs, turn on [Monitoring](/monitoring).