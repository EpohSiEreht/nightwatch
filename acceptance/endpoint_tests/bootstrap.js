// Require static data that can be injected into your test functions
const bootstrap = require('../static_data/bootstrap_data');

module.exports = {
    // List your tests here
    'Check Page Title' : (browser) => {
        browser
            .url(bootstrap.url)
            .assert.title(bootstrap.title)
            .end();
    },

    'Check Page Title using Page Object Model' : (browser) => {
        // Page object models can be utilized by declaring browser.page.file_name.js in the page_objects directory
        const bootstrapPage = browser.page.bootstrap_pom();

        bootstrapPage
            .navigate()
            .verifyTitle(bootstrap.title);

        browser.end();
    }
};