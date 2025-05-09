const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    // Add date formatting filter
    eleventyConfig.addFilter("date", function(date) {
        return DateTime.fromJSDate(date).toFormat("MMMM d, yyyy");
    });

    // Add global data
    eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());

    // Add getYear filter
    eleventyConfig.addFilter("getYear", function(date) {
        if (date === "now") {
            return new Date().getFullYear();
        }
        return new Date(date).getFullYear();
    });

    // Add posts collection
    eleventyConfig.addCollection("posts", function (collectionApi) {
        return collectionApi.getFilteredByTag("post").reverse();
    });

    // Copy CSS files
    eleventyConfig.addPassthroughCopy("*.css");
  
    return {
        dir: {
            input: ".",
            output: "_site",
            includes: "_includes",
            layouts: "_includes",
        },
        passthroughFileCopy: true,
        templateFormats: ["njk", "md"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
    };
};
  