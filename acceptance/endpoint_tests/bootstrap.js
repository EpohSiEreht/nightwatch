"use strict";
// Require static data that can be injected into your test functions
const bootstrap = require('../static_data/bootstrap_data');

module.exports = {
    // List your tests here without Page Object Model
    'Check Page Title' : (browser) => {
        browser
            .url(bootstrap.url)
            .waitForElementVisible('body')
            .assert.title(bootstrap.title)
            .end();
    },

    'Check navbar text' : (browser) => {
        browser
            .url(bootstrap.url)
            .waitForElementVisible('body')
            .assert.containsText('.navbar-header a', bootstrap.navbarText[0])
            .assert.containsText('.nav.navbar-nav li:nth-of-type(1) a', bootstrap.navbarText[1])
            .assert.containsText('.nav.navbar-nav li:nth-of-type(2) a', bootstrap.navbarText[2])
            .assert.containsText('.nav.navbar-nav li:nth-of-type(3) a', bootstrap.navbarText[3])
            .assert.containsText('.nav.navbar-nav li:nth-of-type(4) a', bootstrap.navbarText[4])
            .assert.containsText('.nav.navbar-nav li:nth-of-type(5) a', bootstrap.navbarText[5])
            .assert.containsText('.nav.navbar-nav.navbar-right li:nth-of-type(1) a', bootstrap.navbarText[6])
            .assert.containsText('.nav.navbar-nav.navbar-right li:nth-of-type(2) a', bootstrap.navbarText[7])
            .assert.containsText('.nav.navbar-nav.navbar-right li:nth-of-type(3) a', bootstrap.navbarText[8])
            .end();
    },

    // List your tests here with Page Object Models
    'Check Page Title using Page Object Model' : (browser) => {
        // Page object models can be utilized by declaring browser.page.file_name.js in the page_objects directory
        const bootstrapPage = browser.page.bootstrap_pom();

        bootstrapPage
            .navigate()
            .waitForElementVisible('body')
            .verifyTitle(bootstrap.title, bootstrapPage);

        browser.end();
    },

    'Check navbar text using Page Object Model' : (browser) => {
        const bootstrapPage = browser.page.bootstrap_pom();

        bootstrapPage
            .navigate()
            .waitForElementVisible('body')
            .verifyNavBarText(bootstrap.navbarText, bootstrapPage);

        browser.end();
    },

};