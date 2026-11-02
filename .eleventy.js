import fs from "fs";
import siteEn from "./src/_data/site.json" with { type: "json" };
import siteZh from "./src/_data/site-zh.json" with { type: "json" };

const systemTags = new Set(["all", "nav", "post", "posts", "blog", "en", "zh"]);

function assetVersion() {
  return siteEn.assetVersion || "1";
}

function cacheBustStaticUrl(url) {
  const value = String(url || "").trim();
  if (!value.startsWith("/static/")) return value;
  if (/\?[&]?v=/.test(value)) return value;
  return `${value}?v=${assetVersion()}`;
}

function isPostIndexable(data, inputPath) {
  if (data.noindex === true) return false;
  if (data.featured === true) return true;
  if (data.generated === true) return false;
  const filePath = inputPath || "";
  if (/-\d{13}-\d+\.md$/i.test(filePath)) return false;
  const title = data.title || "";
  if (/官方权威|站群|SEO优化|友链|跨境流量|全攻略|不二之选|业界领先/.test(title)) return false;
  // 本站 pillar 白名单（px- 前缀 = 编辑精选）
  if (/\/(?:posts|posts-zh)\/px-[a-z0-9-]+\.md$/i.test(filePath)) return true;
  return false;
}

export default function (eleventyConfig) {
  eleventyConfig.ignores.add("CONTENT-LINK-RULES.md");

  // 构建时从友链后台拉取中文侧友链（失败则空，不阻塞构建）
  eleventyConfig.addGlobalData("friendLinksZh", async () => {
    try {
      const r = await fetch("https://abc.youlian-cn.com/api/links?site=perfectxml-com", {
        headers: { "User-Agent": "eleventy-build" },
        signal: AbortSignal.timeout(8000)
      });
      const j = await r.json();
      return (j.items || []).map((i) => ({ title: i.title, url: i.url }));
    } catch (e) {
      return [];
    }
  });

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "src/static": "static" });
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  eleventyConfig.addFilter("assetUrl", cacheBustStaticUrl);
  eleventyConfig.addFilter("readableDate", (d) => {
    if (!d) return "";
    return (d instanceof Date ? d : new Date(d)).toISOString().slice(0, 10);
  });
  eleventyConfig.addFilter("htmlDateString", (d) => {
    if (!d) return "";
    return (d instanceof Date ? d : new Date(d)).toISOString().slice(0, 10);
  });
  eleventyConfig.addFilter("limit", (arr, n) => (Array.isArray(arr) ? arr.slice(0, n) : []));

  eleventyConfig.addTransform("cache-bust-static-assets", function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    const version = assetVersion();
    return content.replace(
      /\/static\/[^"'\s<>]+\.(?:svg|jpg|png|webp)(?![^"']*[?&]v=)/g,
      (path) => `${path}?v=${version}`
    );
  });

  const postsEn = (api) => api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date);
  const postsZh = (api) => api.getFilteredByGlob("src/posts-zh/*.md").sort((a, b) => b.date - a.date);
  const idx = (items) => items.filter((it) => isPostIndexable(it.data, it.inputPath));

  eleventyConfig.addCollection("postsEn", (api) => postsEn(api));
  eleventyConfig.addCollection("postsZh", (api) => postsZh(api));
  eleventyConfig.addCollection("indexableEn", (api) => idx(postsEn(api)));
  eleventyConfig.addCollection("indexableZh", (api) => idx(postsZh(api)));

  eleventyConfig.addGlobalData("eleventyComputed", {
    noindex: (data) => {
      if (data.noindex === true) return true;
      const inputPath = data.page?.inputPath || "";
      if (!inputPath.includes("/posts") ) return false;
      if (inputPath.endsWith("/posts/index.njk") || inputPath.endsWith("/posts-zh/index.njk")) return false;
      return !isPostIndexable(data, inputPath);
    },
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
}

