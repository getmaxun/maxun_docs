---
id: llm-prompts
title: LLM Extraction Prompts
sidebar_position: 13
---

# Writing Effective LLM Extraction Prompts

This guide applies when using LLM-powered extraction, whether through the AI Mode or the SDK's LLM extraction feature.

### ✅ Do

**Be Specific About Fields**
- ✅ "Extract product names, prices, and ratings"
- ❌ "Extract product data"

**Specify Quantity**
- ✅ "Extract first 20 companies"
- ✅ "Get top 50 articles"
- ❌ "Extract some items"

**Use Clear Field Names**
- ✅ "Extract company name, website URL, and description"
- ❌ "Extract company info"

**Target List Data**
- ✅ "Extract all job postings with title, company, and location"
- ✅ "Get product listings with name and price"

### ❌ Don't

**Multi-Step Workflows**
- ❌ "Login and then extract data"
- ❌ "Click the button and extract results"

**Multiple Page Types**
- ❌ "Extract from homepage and product pages"
- ❌ "Get data from different sections"

**Conditional Logic**
- ❌ "Extract only products cheaper than $50"
- ❌ "Get articles published this week"

**Data Transformations**
- ❌ "Calculate the average price"
- ❌ "Convert prices to EUR"

**Single Item Extraction**
- ❌ "Get the CEO name"
- ❌ "Extract the main headline"

### ✅ When to Use LLM Extraction

1. You want to quickly extract list data from a single page
2. You want to avoid manually creating extraction selectors
3. You're extracting common patterns (products, articles, listings)

### ❌ When Not to Use LLM Extraction

1. You need multi-step workflows (logins, navigation between pages)
2. You need form submissions before extraction
3. You need to extract from multiple different page types
4. You need conditional logic or data transformations

For these use cases, use Recorder Mode or the SDK's manual extraction methods to create Extract robots.
