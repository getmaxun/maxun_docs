---
id: llm-extraction
title: AI Mode
sidebar_position: 2
---

# AI Mode

> Note: AI Mode is currently in Beta. 

AI Mode uses LLMs to automatically create Extract robots from natural language prompts. Simply describe what data you want, and Maxun builds the robot for you.

## How It Works

1. **Enter URL**: Provide the webpage URL you want to extract data from.

2. **Write Prompt**: Describe what data you want to extract in natural language. Be specific about the fields and quantity.
   - Example: "Extract first 20 product names and prices"
   - Example: "Get company names, descriptions, and batch information"
   - Example: "Extract article headlines, authors, and publication dates"

3. **Select LLM Provider**: Choose your preferred AI provider based on your needs.
> Note: This option is available only in open source. Maxun Cloud automatically uses the right LLM for the task.
   - **Ollama**: Best for local/offline use, no costs, no API key needed
   - **Anthropic Claude**: Best for accuracy and complex extractions (recommended)
   - **OpenAI GPT**: Good balance of speed and accuracy

4. **Create Robot**: Click "Create & Run Robot" and Maxun will automatically build and run the robot based on your prompt.

## LLM Providers

**Ollama (Local)**
- Runs on your machine
- No API key required
- Model: `llama3.2-vision`
- Optional: Specify custom Ollama base URL
- Note: If running via Docker, set `OLLAMA_BASE_URL=http://host.docker.internal:11434` to access your host's Ollama instance.

**Anthropic Claude**
- Cloud-based (requires API key)
- Model: `claude-3-5-sonnet-20241022`
- Recommended for best results
- Get your API key from: <a href="https://console.anthropic.com/">Anthropic Console</a>

**OpenAI GPT**
- Cloud-based (requires API key)
- Model: `gpt-4-vision-preview`
- Get your API key from: <a href="https://platform.openai.com/api-keys">OpenAI Platform</a>

### Setting API Keys

**For Maxun Cloud**
When you select Anthropic Claude or OpenAI GPT as your provider, an API key field will appear. Enter your API key in this field before creating the robot.

**For Self-Hosted**
Set the API keys as environment variables before starting Maxun:
```bash
ANTHROPIC_API_KEY=your-anthropic-key
OPENAI_API_KEY=your-openai-key
```

See <a href="/installation/environment_variables">Environment Variables</a> for more details.

## ✅ When to Use AI Mode

1. You want to quickly extract list data from a single page
2. You want to avoid learning the Recorder interface
3. You're extracting common patterns (products, articles, listings)

## ❌ When Not to Use AI Mode

1. You need multi-step workflows (logins, navigation between pages)
2. You need form submissions before extraction
3. You need to extract from multiple different page types
4. You need conditional logic or data transformations

For these use cases, use Recorder Mode to create Extract robots manually.

## Using with SDK

AI Mode is also available through the <a href="/sdk/sdk-extract">Maxun SDK</a> for programmatic robot creation.

## Writing Effective Prompts

For guidance on writing effective LLM extraction prompts, see <a href="/llm-prompts">LLM Extraction Prompts</a>.
