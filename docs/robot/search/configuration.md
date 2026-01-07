---
id: search-configuration
title: Configuration
sidebar_position: 2
---

# Search Configuration

Configure how your search robot queries and processes search results.

<!-- ![Search Configuration Settings](search_config.png) -->

## Search Query

**Query**
- Enter your search terms in natural language
- Same as you would type in a search engine
- Be specific for better results
- Example: "Latest AI Breakthroughs 2025"

## Result Limits

**Limit**
- Maximum number of search results to process
- Results are returned in order of search engine ranking
- Typical range: 5-50 results

> **Note:** The actual number of results may be lower if fewer results are available for your query.

## Search Mode

Choose how deeply you want to process search results:

**Discover Mode**
- Returns only search result metadata
- Use when you need URLs and descriptions

**Scrape Mode**
- Navigates to each result page and extracts full content
- Use when you need complete page content

<!-- ![Mode Comparison](mode_comparison.png) -->

## Time Filters

Filter search results by when they were published or indexed.

**Time Range Options:**
- **Day**: Results from the last 24 hours
- **Week**: Results from the last 7 days
- **Month**: Results from the last 30 days
- **Year**: Results from the last 12 months
- **All time**: No time restriction (default)

Great for finding recent news, fresh content, or timely information.

## Example Configurations

**Quick Research (Discover Mode)**
```javascript
{
  query: "react performance optimization",
  limit: 10,
  mode: 'discover',
  filters: {
    timeRange: 'year'
  }
}
```

**Deep Content Analysis (Scrape Mode)**
```javascript
{
  query: "machine learning tutorials",
  limit: 20,
  mode: 'scrape',
  filters: {
    timeRange: 'month'
  }
}
```

**Breaking News Monitoring**
```javascript
{
  query: "artificial intelligence regulations",
  limit: 15,
  mode: 'scrape',
  filters: {
    timeRange: 'day'
  }
}
```

**Competitive Research**
```javascript
{
  query: "best crm software for startups",
  limit: 30,
  mode: 'scrape',
  filters: {
    timeRange: 'year'
  }
}
```

## Tips for Better Results

**Write Clear Queries**
- Be specific about what you're looking for
- Include relevant keywords and context
- Use quotes for exact phrases

**Choose the Right Mode**
- Use discover mode for URL collection and quick research
- Use scrape mode when you need full content for AI processing or analysis

**Apply Time Filters**
- Use recent time filters for news and trending topics
- Use longer time ranges for evergreen content and comprehensive research

**Set Appropriate Limits**
- Start with smaller limits (5-10) to test your query
- Increase limits for comprehensive research
