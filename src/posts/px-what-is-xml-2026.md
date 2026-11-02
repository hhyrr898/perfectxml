---
layout: article.njk
title: "What Is XML? A Developer's Guide to the Format That Won't Go Away"
description: "XML remains a foundational data format in 2026. Learn what XML is, where it's still used in config files, SOAP, document formats, and enterprise syste"
date: 2026-11-02
featured: true
permalink: /blog/px-what-is-xml-2026/
---

The Extensible Markup Language (XML) 1.0 became a World Wide Web Consortium Recommendation on February 10, 1998, establishing a text-based format for structuring data with custom tags. This guide clarifies the mechanics and enduring relevance of this decades-old standard, enabling you to confidently define custom markup elements and structure data hierarchically in your own applications.

Despite the subsequent release of XML 1.1 on February 4, 2004, version 1.0 remains the dominant specification across modern systems. At its core, the format provides a strict yet flexible framework where developers are not restricted to a predefined vocabulary. Instead, you craft the schema to fit your specific domain requirements. This self-describing capability is precisely why XML persists in configuration files, web services, and enterprise document formats long after the introduction of seemingly simpler alternatives. By breaking down the syntax and structural rules, this walkthrough demystifies how tags encapsulate data, nest elements, and enforce the well-formedness required by parsers. You will move beyond abstract definitions to see exactly how a markup language operates in practice, giving you the foundational knowledge to read, write, and troubleshoot XML documents wherever they appear in your stack.

```xml
<book isbn="978-0131103627">
  <title>The C Programming Language</title>
  <author>Kernighan and Ritchie</author>
  <year>1988</year>
</book>
```

Unlike HTML, which has a fixed set of tags, XML has no predefined vocabulary. You invent elements like `<book>` or `<invoice>` as needed. This extensibility is why XML became a universal data interchange format in the late 1990s and 2000s. It is also why developers still run into it today, even if they rarely choose it for new projects.

## Where XML Still Lives in 2026

### Configuration Files

Many tools and platforms still use XML for configuration. Maven's `pom.xml`, Android's layout and manifest files, and Microsoft's MSBuild project files are all XML. These formats predate the JSON/YAML boom and remain stable because changing them would break countless existing projects. If you work with Java enterprise stacks or Android development, you will edit XML configs regularly.

### SOAP and Web Services

SOAP (Simple Object Access Protocol) is built entirely on XML. Despite the rise of REST and GraphQL, SOAP remains entrenched in banking, insurance, healthcare, and government systems. The WS-* standards (WS-Security, WS-ReliableMessaging) are XML-based and are still required for many B2B integrations. When you integrate with a legacy payment gateway or a government tax API, chances are you will parse a SOAP envelope.

### Document Formats

Office Open XML (DOCX, XLSX, PPTX) and OpenDocument (ODT, ODS) are ZIP archives containing XML files. If you have ever unzipped a DOCX to inspect its contents, you have seen XML. PDF/A-3 and EPUB also rely on XML for metadata and structure. Even HTML5, while not XML, shares its markup heritage; XHTML was an XML serialization of HTML.

### Enterprise Systems

Enterprise application integration (EAI) and message queues often use XML for message schemas. XSD (XML Schema Definition) provides strong typing and validation, which JSON Schema has only partially caught up with in certain toolchains. SAP, Oracle Fusion, and IBM WebSphere environments still exchange XML payloads. In data pipelines, XML remains common for B2B EDI alternatives like UBL (Universal Business Language) and OAGIS.

## Why Developers Still Meet XML in 2026

The short answer is inertia, interoperability, and tooling maturity. XML has a rich ecosystem of parsers, validators, and transformation tools (XSLT, XPath, XQuery) that have been battle-tested for decades. Regulated industries value the strict validation that XSD provides. And many systems simply cannot be rewritten overnight.

I still remember the first time I had to debug a SOAP fault at 2 a.m. The stack trace pointed to an unexpected namespace prefix, and I had no idea what `xmlns:ns2` meant. That experience taught me that XML's verbosity is both a blessing and a curse: it is explicit, but it is also easy to get wrong. Today, I keep a mental checklist for XML work: validate against the schema, watch namespaces, and never assume well-formedness.

Another reason XML persists is its support for mixed content (text interleaved with markup), which JSON handles awkwardly. Documentation formats like DITA and DocBook rely on this. If you work with technical publishing or content management, XML is still the backbone.

### A Comparison: XML vs. JSON vs. YAML

| Feature | XML | JSON | YAML |
|--------|-----|------|------|
| Verbosity | High | Medium | Low |
| Schema validation | XSD (mature) | JSON Schema (growing) | No standard schema |
| Namespaces | Yes | No | No |
| Mixed content | Yes | No | No |
| Comments | Yes | No | Yes |
| Parsing speed | Slower | Faster | Slower than JSON |
| Human readability | Moderate | High | Very high |
| Transformation | XSLT, XPath | jq, custom | Limited |

This table explains why XML remains in niches where namespaces, schema rigor, or mixed content matter.

### Four Practical Steps to Work with XML Today

1. **Validate early.** Always parse XML against its XSD or DTD before processing. Use tools like `xmllint` or your language's validator to catch structural errors.
2. **Handle namespaces explicitly.** XML namespaces prevent element name collisions. When parsing, always resolve prefixes to URIs rather than relying on literal prefixes.
3. **Use secure parsers.** Disable external entity resolution (XXE attacks) by setting `FEATURE_SECURE_PROCESSING` or equivalent in your parser.
4. **Transform with XSLT when needed.** For reporting or data conversion, XSLT 3.0 (W3C Recommendation, June 8, 2017) is still a powerful tool. Check the official spec for advanced features.

## FAQ

### Is XML dead?

No. It is less dominant for new API development, but it remains critical in enterprise integration, document formats, and configuration. The W3C still maintains XML standards, and major platforms continue to support it.

### Should I use XML or JSON for my next project?

For most web APIs, JSON is simpler and more efficient. Choose XML when you need strong schema validation, namespaces, mixed content, or when integrating with systems that already speak XML.

### Why does SOAP still use XML?

SOAP was designed around XML for its extensibility and WS-* security standards. Many industries built their infrastructure on it, and replacing it would require coordinated changes across thousands of systems.

### How can I avoid security issues with XML?

Always disable external entity processing (XXE) and limit entity expansion. Use well-maintained parsers and validate input against a strict schema. Check the official OWASP guidance for XML security.

## Final Thoughts

XML is not fashionable, but it is reliable. In 2026, you will encounter it in build files, SOAP envelopes, DOCX documents, and enterprise message queues. Understanding its strengths and quirks makes you a more effective developer, even if you never write a new XML schema from scratch. Keep a validator handy, respect namespaces, and you will do fine.
