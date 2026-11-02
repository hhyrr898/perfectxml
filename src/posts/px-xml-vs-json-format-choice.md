---
layout: article.njk
title: "XML vs JSON for Config, APIs, and Documents: A Practical Comparison"
description: "A hands-on comparison of XML and JSON for configuration files, APIs, and documents, with a decision table and practical guidance from a veteran editor"
date: 2026-11-02
featured: true
permalink: /blog/px-xml-vs-json-format-choice/
---

My experience editing and writing about markup languages spans more than two decades, beginning when XML was the emerging standard. During that time, I have seen teams get bogged down in religious arguments over which format to use. This article cuts through that noise, offering a practical, first-person analysis based on real-world successes and failures. By the end, you will be equipped to confidently choose between XML and JSON for your specific configuration, API, and document needs.

We will move beyond a simple syntax comparison to evaluate each format's strengths and weaknesses in context. The analysis will cover three core domains—configuration files, API payloads, and document storage—assessing critical factors such as parsing speed, schema validation, human readability, and the maturity of supporting tooling. This grounded approach will provide the clarity needed to select the most effective and maintainable solution for your next project, moving the discussion from preference to pragmatism.

As of early 2025, the JSON specification is still defined by RFC 8259 (published December 2017), and XML remains governed by the W3C XML 1.0 Recommendation (Fifth Edition, November 2008). YAML 1.2.2 was published in October 2021. These are stable references you can rely on. I will not pretend that one format wins everywhere. Instead, I will walk through three common use cases and give you a decision table you can actually use.

## Configuration Files

When it comes to configuration, the format needs to be human-readable, easy to edit by hand, and ideally support comments. This is where XML and JSON diverge sharply.

XML has no native comment support in the data model, though you can use `<!-- -->` comments. However, XML's verbosity makes config files painful to read. A simple database connection string becomes a nested element soup. JSON is more compact, but it also lacks comments (RFC 8259 explicitly forbids them). That is why many teams have moved to YAML for config, even though YAML is not on trial here. Between XML and JSON for config, JSON is usually the lesser evil because it is shorter and maps directly to most languages' native data structures.

That said, XML has one advantage: schema validation. If you need to enforce structure with XSD, XML is the only game in town. I have seen large enterprises use XML configs precisely because they can validate them against a schema at build time. For small projects, JSON wins on simplicity.

### A Concrete Example

Consider a logging config. In XML:

```xml
<logging>
  <level>info</level>
  <appenders>
    <appender type="console">
      <pattern>%d %p %c - %m%n</pattern>
    </appender>
  </appenders>
</logging>
```

In JSON:

```json
{
  "logging": {
    "level": "info",
    "appenders": [
      { "type": "console", "pattern": "%d %p %c - %m%n" }
    ]
  }
}
```

The JSON is roughly half the lines and easier to parse visually. Neither supports comments, so if you need comments, consider YAML or JSON5 (check the official spec for JSON5 if you go that route).

## APIs

This is where JSON has largely won. REST APIs overwhelmingly use JSON as the default payload format. The reasons are practical: JSON maps directly to JavaScript objects, it is lightweight, and most HTTP clients handle it natively. XML APIs (SOAP, XML-RPC) still exist in legacy systems, but new development rarely chooses XML unless there is a specific need for WS-Security or schema-driven contracts.

However, XML has features JSON lacks: namespaces, attributes, and mixed content. If your API needs to represent documents with overlapping markup (like text with inline formatting), XML is better. For example, an API that returns a book chapter with footnotes, emphasis, and cross-references is awkward in JSON but natural in XML.

For typical CRUD APIs, JSON is the pragmatic choice. It is easier to debug, smaller on the wire, and has broad tooling support. I have seen teams try to use XML for a simple user API and regret it when every client needs an XML parser. Stick with JSON unless you have a concrete reason.

### Iterating on API Design: 4 Steps

If you are designing an API and debating the format, here is a sequence I recommend:

1. List your data shapes. Are they mostly flat records, or do you have deeply nested or mixed-content structures? Flat records favor JSON; mixed content favors XML.
2. Check client constraints. Do your consumers run in browsers, mobile apps, or legacy enterprise systems? JSON is native to browsers and mobile; XML may be required for SOAP-based integrations.
3. Consider schema and validation. Do you need strict contract enforcement with XSD, or is JSON Schema sufficient? JSON Schema is mature but does not cover everything XSD does (check the official spec for JSON Schema).
4. Prototype both. Write a small sample payload in each format and run it through your actual parsers. Measure size and parse time. This takes an hour and saves weeks of regret.

## Documents

When people say "documents," they usually mean structured content like articles, contracts, or technical manuals. This is XML's home turf. DocBook, TEI, DITA, and Office Open XML all use XML. The reason is mixed content: text interleaved with markup. JSON cannot represent mixed content cleanly because it is based on key-value pairs and arrays. You can hack it with arrays of text and objects, but it is ugly and lossy.

If you are storing documents that need to be rendered, queried with XPath, or transformed with XSLT, XML is the right tool. JSON is fine for document metadata or simple structured content, but not for the body text with inline formatting.

I have seen teams store HTML fragments in JSON strings and then struggle with escaping and querying. If your document has any inline markup, use XML. It is not glamorous, but it works.

## The Decision Table

Here is a comparison table I use when advising teams. It is not exhaustive, but it covers the common cases.

| Criterion | XML | JSON |
|-----------|-----|------|
| Human readability | Verbose, but clear | Compact, but no comments |
| Comments | Yes (via `<!-- -->`) | No (RFC 8259 forbids) |
| Schema validation | XSD, DTD, RELAX NG | JSON Schema (not as expressive) |
| Namespaces | Yes | No (keys must be unique) |
| Mixed content | Yes | Poorly supported |
| Browser support | Native via DOMParser | Native via JSON.parse |
| Payload size | Larger | Smaller |
| Tooling maturity | Very mature | Mature but less formal |
| Best for | Documents, legacy APIs, config with schema | REST APIs, config, simple data |

## FAQ

### Is JSON always better for APIs?

No. For most REST APIs, JSON is the pragmatic default because it is lighter and maps to common data structures. But if you need namespaces, attributes, or mixed content, XML is better. SOAP APIs still exist for good reasons in enterprise environments.

### Can I use XML for configuration files?

Yes, and some large systems do. The main advantage is schema validation with XSD. The downside is verbosity. If you need comments, XML supports them; JSON does not. But for simple configs, JSON is usually easier.

### Why not use YAML for everything?

YAML is great for config because it supports comments and is concise. But YAML has its own quirks (significant whitespace, complex parsing rules). For APIs, JSON is more predictable. For documents, XML is still the standard. YAML is a niche tool, not a universal replacement.

### What about performance?

JSON is generally faster to parse and smaller on the wire than XML. But the difference is often negligible compared to network latency. If you are parsing millions of documents, benchmark both. For typical web APIs, JSON wins on simplicity.

## Final Practical Advice

Do not treat this as a binary choice. Many systems use both: XML for document storage and JSON for API payloads. Pick the format that fits the data shape and the consumers. If you are unsure, start with JSON for APIs and config, and use XML when you need mixed content or strict schema validation. And always check the official spec before relying on edge-case behavior.
