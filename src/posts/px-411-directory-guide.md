---
layout: article.njk
title: "The Revived PerfectXML 411 Directory: Your Guide to Data Format Resources"
description: "A walkthrough of the newly revived PerfectXML 411 directory, covering its contents, curation process, and practical usage for XML, JSON, YAML, and oth"
date: 2026-11-02
featured: true
permalink: /blog/px-411-directory-guide/
---

PerfectXML's 411 directory, first launched in 2000, began as a simple, hand-maintained list of links for XML tools, specs, and tutorials. This guide solves the persistent problem of finding reliable, current resources for data formats. After reading, you will be able to use the revived directory to quickly locate vetted tools, specifications, and tutorials for XML, JSON, YAML, and other structured data standards, saving you time and ensuring accuracy.

Now revived in 2026, the directory has been transformed from a static list into a dynamic, searchable resource. It is not a comprehensive link dump; it is a professionally maintained catalog with strict editorial oversight to ensure every entry is relevant and current. The scope has expanded beyond its original XML focus to include essential resources for JSON and YAML, providing a centralized and trustworthy point of reference for developers navigating the modern data landscape.

The directory currently contains over 600 entries across eight categories: specifications, schema languages, parsers and processors, validation tools, transformation engines, query languages, serialization libraries, and learning resources. Each entry includes a title, a one-line description, the format(s) it applies to, a stability indicator, and the date it was last reviewed. We do not host the resources themselves; we point to them. The directory is available as a static HTML page and as a JSON feed for programmatic access.

I have been using the old 411 directory since my early days of wrestling with DTDs, and reviving it felt like restoring a familiar tool rather than inventing something new. The goal is simple: help you find the right spec or library without wading through search results that mix 2010 blog posts with official documentation.

## What the Directory Contains

The entries are organized into categories that reflect the practical work of developers and data engineers. Here is a breakdown of what you will find:

- **Specifications**: Official standards from W3C, IETF, OASIS, and ISO. Examples include the XML 1.0 Recommendation, JSON RFC 8259, YAML 1.2.2, and XSD 1.1. Each spec entry notes its status (e.g., Recommendation, Proposed Standard) and whether it is actively maintained.
- **Schema languages**: DTD, XSD, RELAX NG, Schematron, and JSON Schema. Entries include links to the official schema definitions and to validation tools that support them.
- **Parsers and processors**: Libraries for parsing and generating XML, JSON, and YAML in various programming languages. We list both mainstream and niche options, with notes on compliance and performance characteristics where known.
- **Validation tools**: Command-line validators, online validators, and IDE plugins. We indicate whether a tool supports XML Schema 1.0 or 1.1, JSON Schema draft versions, and YAML 1.2.
- **Transformation engines**: XSLT 1.0, 2.0, and 3.0 processors, as well as JSON-to-JSON transformation tools like Jolt and JSONata.
- **Query languages**: XPath, XQuery, JSONPath, and JMESPath. Each entry links to the specification and to at least one implementation.
- **Serialization libraries**: Libraries for converting between formats, such as XML-to-JSON and JSON-to-YAML. We note edge cases like attribute handling and number precision.
- **Learning resources**: Tutorials, books, and reference guides that are stable and well-regarded. We avoid link rot by reviewing these entries quarterly.

The directory does not include forums, Q&A sites, or personal blogs unless they are the canonical source for a specification or tool. This keeps the signal-to-noise ratio high.

## How Entries Are Curated

Curation is the core of the revived 411. Every entry goes through a review process before it is added, and existing entries are re-checked on a schedule. The process has four steps:

1. **Submission and triage**: Anyone can submit a resource via the directory's suggestion form. The editor (currently me) reviews the submission to confirm it fits the scope: it must relate to XML, JSON, YAML, or a closely related data format, and it must be a stable, authoritative source. Marketing pages, dead links, and redundant entries are rejected.
2. **Verification against primary sources**: For specifications, we check the official standards body site. For tools and libraries, we check the project's repository or official documentation. If a claim about compliance (e.g., "supports XSD 1.1") is not clearly stated, we mark it as "check the official spec" or omit the claim.
3. **Metadata assignment**: Each entry gets a format tag (XML, JSON, YAML, or multiple), a category, a stability indicator (stable, evolving, or legacy), and a last-reviewed date. Stability is based on whether the resource is actively maintained and whether its underlying specification is stable.
4. **Scheduled re-review**: Entries are re-reviewed every six months, or immediately if a major specification update occurs (e.g., a new JSON Schema draft). Broken links are fixed or the entry is removed. This schedule is published in the directory's changelog.

The curation policy is deliberately conservative. We do not list every parser ever written; we list the ones that are documented, maintained, and used in practice. If you are looking for a specific library that is not listed, it may be because it lacks clear documentation or has not been updated in years.

## How to Use the Directory

Using the 411 directory is straightforward, whether you prefer browsing or querying. Here is a comparison of the two main access methods:

| Method | Best for | How it works |
|--------|----------|--------------|
| Web interface | Quick browsing, discovery | Browse by category or use the search box. Filters let you narrow by format (XML, JSON, YAML) and stability. |
| JSON feed | Automation, integration | Fetch the feed at `/411/feed.json`. Each entry includes id, title, description, format tags, category, stability, and last-reviewed date. You can filter and sort locally. |

The web interface is static HTML with a small amount of JavaScript for search and filtering. It works without JavaScript if you browse by category. The JSON feed is generated from the same source data, so it is always in sync.

For practical use, I recommend the following approach:

- If you need a specification, go directly to the Specifications category and check the status. For XML, start with the XML 1.0 Recommendation; for JSON, RFC 8259; for YAML, the YAML 1.2.2 spec.
- If you need a parser, filter by your programming language and format. The description will tell you if the parser is conformant to a specific spec version. If it does not, check the official spec and the parser's documentation.
- If you need a validation tool, look for the schema language you use (XSD, JSON Schema, etc.) and confirm the supported draft or version.
- For transformation, check whether the engine supports the version of XSLT or XQuery you need. XSLT 3.0 support is not universal, so the stability indicator helps.

The directory also includes a "recently reviewed" section on the homepage, which lists entries updated in the last 30 days. This is useful for spotting new additions or changes in stability.

## Maintaining and Contributing

The revived directory is a living resource, and contributions are welcome. If you find a broken link or an outdated entry, use the suggestion form to report it. If you want to add a resource, provide the official URL and a brief justification. I review submissions weekly. The curation policy is documented in a separate page, and the changelog records every addition, removal, and update.

One thing to note: the directory does not aim to be exhaustive. It aims to be reliable. If a resource is not listed, it may still be useful, but it has not met the curation criteria. I would rather have 600 entries I can trust than 6,000 I cannot.

## FAQ

**Q: Is the 411 directory only for XML?**
A: No. It covers XML, JSON, YAML, and related formats such as JSON Schema, XSD, and RELAX NG. The name is historical; the scope is modern data formats.

**Q: How often are entries updated?**
A: Each entry is re-reviewed every six months, or sooner if a major specification changes. The last-reviewed date is shown for every entry.

**Q: Can I access the directory programmatically?**
A: Yes. A JSON feed is available at `/411/feed.json`. It contains the same data as the web interface, including format tags and stability indicators.

**Q: What does "check the official spec" mean in an entry?**
A: It means the entry makes a claim about compliance or behavior that we could not verify from the primary source. In such cases, we recommend consulting the official specification or the tool's documentation before relying on that claim.
