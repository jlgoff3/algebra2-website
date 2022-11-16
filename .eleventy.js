const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const {
  fortawesomeFreeRegularPlugin,
} = require("@vidhill/fortawesome-free-regular-11ty-shortcode");
const mathjaxPlugin = require("eleventy-plugin-mathjax");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const slugify = require("slugify");

const { DateTime } = require("luxon");

const linkAfterHeader = markdownItAnchor.permalink.linkAfterHeader({
  class: "anchor",
  symbol: "<span hidden>#</span>",
  style: "aria-labelledby",
});

const markdownItAnchorOptions = {
  level: [1, 2, 3],
  slugify: (str) =>
    slugify(str, {
      lower: true,
      strict: true,
      remove: /["]/g,
    }),
  tabIndex: false,
  permalink(slug, opts, state, idx) {
    state.tokens.splice(
      idx,
      0,
      Object.assign(new state.Token("div_open", "div", 1), {
        // Add class "header-wrapper [h1 or h2 or h3]"
        attrs: [["class", `heading-wrapper ${state.tokens[idx].tag}`]],
        block: true,
      })
    );

    state.tokens.splice(
      idx + 4,
      0,
      Object.assign(new state.Token("div_close", "div", -1), {
        block: true,
      })
    );

    linkAfterHeader(slug, opts, state, idx + 1);
  },
};

/* Markdown Overrides */
let markdownLibrary = markdownIt({
  html: true,
}).use(markdownItAnchor, markdownItAnchorOptions);

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("md", markdownLibrary);
  eleventyConfig.addPlugin(mathjaxPlugin);
  eleventyConfig.addPlugin(fortawesomeFreeRegularPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addLayoutAlias("page", "layouts/page");
  eleventyConfig.addLayoutAlias("article", "layouts/article");

  eleventyConfig.addPassthroughCopy("./src/assets/icons");
  eleventyConfig.addPassthroughCopy("./src/assets/sprite.svg");
  eleventyConfig.addPassthroughCopy({
    "node_modules/svg-icon-sprite/dist/svg-icon-sprite.js":
      "assets/svg-icon-sprite.js",
  });
  eleventyConfig.addPassthroughCopy("./src/assets/social-image.jpg");

  eleventyConfig.addNunjucksAsyncShortcode(
    "image",
    require("./src/_11ty/imageShortcode").imageShortcode
  );

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: "Europe/Paris",
    })
      .setLocale("en")
      .toLocaleString(DateTime.DATE_FULL);
  });

  eleventyConfig.addFilter("slug", (str) => {
    if (!str) {
      return;
    }

    return slugify(str, {
      lower: true,
      strict: true,
      remove: /["]/g,
    });
  });

  /* Creating a collection of blogposts by filtering based on folder and filetype */
  eleventyConfig.addCollection("blog", (collectionApi) => {
    return collectionApi.getFilteredByGlob("./src/blog/*.md").reverse();
  });
  eleventyConfig.addCollection(
    "categoryList",
    require("./src/_11ty/getCategoryList")
  );
  eleventyConfig.addCollection(
    "categories",
    require("./src/_11ty/createCategories")
  );

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
    excerpt_alias: "excerpt",
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
  };
};
