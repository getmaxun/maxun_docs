---
id: tools
title: Tools
sidebar_position: 2
---

# Tools

The Maxun MCP Server provides tools allowing you to list robots, run them, and retrieve their results.

## Setup

### Environment Variables

| Variable | Description | Required |
|---|---|---|
| MCP_API_KEY | Your Maxun API key for authentication | Yes |
| BACKEND_URL | The Maxun backend URL (defaults to http://localhost:8080) | No |
| NODE_ENV | Environment mode (set to 'production' to disable logging) | No |

## How to Use

Instead of calling tools directly, you interact with the MCP server by giving natural language prompts to your LLM. The LLM will automatically use the appropriate tools based on your request.

### Example Prompts

#### Getting Started
```
"Show me all my robots"
"List all available robots"
"What robots do I have?"
```
*These prompts will trigger the `list_robots` tool*

#### Running Robots
```
"Run robot [robot-id]"
"Execute my web scraping robot with ID abc123"
"Start the robot abc123 and wait for results"
"Run robot abc123 but don't wait for completion"
```
*These prompts will trigger the `run_robot` tool*

#### Getting Robot Information
```
"Tell me about robot [robot-id]"
"Show me details for robot abc123"
"What does robot abc123 do?"
```
*These prompts will trigger the `get_robot` tool*

#### Checking Run History
```
"Show me all runs for robot [robot-id]"
"What are the recent runs for robot abc123?"
"List the execution history for robot abc123"
```
*These prompts will trigger the `get_robot_runs` tool*

#### Getting Specific Run Details
```
"Show me details for run [run-id] of robot [robot-id]"
"What happened in run xyz789 for robot abc123?"
"Get the results from run xyz789"
```
*These prompts will trigger the `get_run_details` tool*

#### Performance Analysis
```
"Give me a performance summary for robot [robot-id]"
"How well is robot abc123 performing?"
"Show me success rates and data extraction stats for robot abc123"
"Analyze the performance of robot abc123"
```
*These prompts will trigger the `get_robot_summary` tool*

## Common Workflows

### Workflow 1: First Time Setup
1. **"Show me all my robots"** - See what robots are available
2. **"Tell me about robot [robot-id]"** - Understand what a specific robot does
3. **"Run robot [robot-id]"** - Execute the robot and get results

### Workflow 2: Monitoring and Analysis
1. **"Show me all runs for robot [robot-id]"** - Check execution history
2. **"Give me a performance summary for robot [robot-id]"** - Analyze success rates
3. **"Show me details for the latest run"** - Check recent results

### Workflow 3: Debugging Failed Runs
1. **"Show me all runs for robot [robot-id]"** - Find failed runs
2. **"Show me details for run [failed-run-id]"** - Investigate the failure
3. **"Run robot [robot-id] again"** - Retry the execution

### Workflow 4: Asynchronous Execution
1. **"Run robot [robot-id] but don't wait for completion"** - Start execution
2. **"Check the status of run [run-id]"** - Monitor progress
3. **"Get results for run [run-id] when it's done"** - Retrieve final results

## Available Tools Reference

| Tool | Purpose | Triggered By |
|---|---|---|
| `list_robots` | Get all available robots | "Show me all robots", "List my robots" |
| `get_robot` | Get robot details | "Tell me about robot X", "Show robot details" |
| `run_robot` | Execute a robot | "Run robot X", "Execute robot X" |
| `get_robot_runs` | Get run history | "Show runs for robot X", "List executions" |
| `get_run_details` | Get specific run info | "Show run details", "What happened in run X" |
| `get_robot_summary` | Get performance stats | "Performance summary", "How is robot X doing" |

## Tips for Better Prompts

- **Be specific**: Include robot IDs or run IDs when you know them
- **Use natural language**: The LLM understands conversational requests
- **Combine requests**: "Run robot abc123 and then show me a performance summary"
- **Ask follow-up questions**: "What was the error in that failed run?"
- **Request specific data**: "Show me only the successful runs from last week"

## Error Handling

When something goes wrong, you'll receive clear error messages. Common issues include:

- **Invalid IDs**: "Robot with ID abc123 not found"
- **Authentication**: "API key is invalid or missing"
- **Network issues**: "Unable to connect to Maxun backend"
- **Execution failures**: "Robot run failed due to timeout"

Simply ask follow-up questions like "Why did that fail?" or "How can I fix this?" for more help.