---
id: crawl-configuration
title: Configuration
sidebar_position: 2
---

# Crawl Configuration

Configure how your crawl robot discovers and scrapes pages from a website.


## Basic Configuration

**Robot Name**
- Custom name for your crawl robot

**Starting URL**
- The webpage where the crawl begins
- Must be a valid, accessible URL
- All discovered pages will be relative to this starting point

**Max Pages to Crawl**
- Maximum number of pages to crawl
- Pages are discovered and crawled in order of relevance
- Recommended: Start with 10-20 pages to test your configuration

## Advanced Options

### Crawl Scope

Choose how broadly the robot should crawl from your starting URL:

**Domain Mode**
- Crawls only pages on the exact same domain
- Example: Starting at `blog.example.com` stays on `blog.example.com`
- Best for: Focused crawls on a specific subdomain

**Subdomain Mode**
- Crawls the domain and all its subdomains
- Example: Starting at `example.com` includes `blog.example.com`, `shop.example.com`, etc.
- Best for: Comprehensive site crawls across multiple sections

**Path Mode**
- Crawls only pages under the same path as the starting URL
- Example: Starting at `example.com/blog/` stays within `/blog/` path
- Best for: Crawling specific sections like documentation or blog categories

### Max Depth

**Maximum Crawl Depth**
- Controls how many "levels" deep from the starting URL the crawler should go
- Each click or navigation from one page to another counts as one level
- Higher depth values discover more pages but increase crawl time

### URL Filtering
>**Note:** This feature is currently in development and not fully enforced.

**Include Paths**
- Regex patterns for URLs to include in your crawl
- Only URLs matching these patterns will be crawled
- Leave empty to include all URLs within your scope
- Example: `/blog/[0-9]{4}/.*` for dated blog posts

**Exclude Paths**
- Regex patterns for URLs to exclude from your crawl
- URLs matching these patterns will be skipped
- Example: `.*/admin/.*` to skip admin pages
- Useful for avoiding login pages, tag pages, or duplicate content

**Pattern Tips:**
- Patterns use JavaScript regular expressions (regex)
- The `.*` matches any characters (wildcard)
- Use `\\.` to match literal dots in URLs
- Patterns are case-sensitive by default

### Discovery Options

**Use Sitemap**
- When enabled, fetches and parses the website's sitemap.xml
- Automatically follows nested sitemaps
- Recommended for sites with well-maintained sitemaps

**Follow Links**
- When enabled, extracts all links from each visited page
- Crawls pages that match your scope and filters
- Recommended when sitemap is incomplete or unavailable

**Best Practice**: Enable both options for comprehensive discovery. The robot will combine URLs from both sources and remove duplicates.

### Robots.txt Compliance
When enabled, the crawler respects robots.txt directives. Recommended for ethical crawling of third-party websites. By default enabled.

## Example Configurations

**Simple Blog Crawl**
```javascript
{
  mode: 'path',
  limit: 50,
  useSitemap: true,
  followLinks: true
}
```

**Filtered Blog Crawl (Advanced)**
```javascript
{
  mode: 'path',
  limit: 50,
  includePaths: ['/blog/[0-9]{4}/.*'],
  excludePaths: ['.*/tag/.*', '.*/author/.*'],
  useSitemap: true,
  followLinks: true
}
```

**Full Site Crawl**
```javascript
{
  mode: 'subdomain',
  limit: 100,
  excludePaths: ['.*/admin/.*', '.*/login.*'],
  useSitemap: true,
  followLinks: true
}
```

**Documentation Crawl**
```javascript
{
  mode: 'path',
  limit: 200,
  useSitemap: true,
  followLinks: false
}
```
