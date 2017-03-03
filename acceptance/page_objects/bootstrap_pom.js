"use strict";
var customCommands = {
    nthTypeSelector: function(elementName, i, browser) {
        // Lets you dynamically selector the nth-of-type without having to write down every instance of the element in the page object model selector list
        var element = browser.elements[elementName.slice(1)];
        return element.selector + `:nth-of-type(${i+1})`;
    },
    addChildEl: function(elementName, childEl, browser) {
        // Lets you grab the selector class/id and concatenate a child css selector
        var element = browser.elements[elementName.slice(1)];
        // If elementName isn't in @elementSelector format, just return the elementName
        if(element === undefined) {
            return elementName + ' ' + childEl;
        }
        return element.selector + ' ' + childEl;
    }
};

// Assign an object of commands with various tests
const testCommands = {
    verifyTitle: (pageTitle, browser) => { browser.assert.title(pageTitle) },

    verifyNavBarText: (text, browser) => {
        return text.forEach((result, i) => {
            browser.assert.containsText(`@navbarText${i}`, result);
        });
    },

};

module.exports = {
    // List your commands objects in the commands array
    commands: [customCommands, testCommands],
    // This url will let nightwatch know where to navigate() using the page object model
    url: function() {
        return 'http://getbootstrap.com';
    },
    // List your css selectors within the element key
    elements: {
        navbarText0: {
            selector: '.navbar-header a'
        },
        navbarText1: {
            selector: '.nav.navbar-nav li:nth-of-type(1) a'
        },
        navbarText2: {
            selector: '.nav.navbar-nav li:nth-of-type(2) a'
        },
        navbarText3: {
            selector: '.nav.navbar-nav li:nth-of-type(3) a'
        },
        navbarText4: {
            selector: '.nav.navbar-nav li:nth-of-type(4) a'
        },
        navbarText5: {
            selector: '.nav.navbar-nav li:nth-of-type(5) a'
        },
        navbarText6: {
            selector: '.nav.navbar-nav.navbar-right li:nth-of-type(1) a'
        },
        navbarText7: {
            selector: '.nav.navbar-nav.navbar-right li:nth-of-type(2) a'
        },
        navbarText8: {
            selector: '.nav.navbar-nav.navbar-right li:nth-of-type(3) a'
        },

    }
};