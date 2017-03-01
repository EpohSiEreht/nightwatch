// Assign an object of commands with various tests
const testCommands = {
    verifyTitle: function(pageTitle) {
        return this.assert.title(pageTitle);
    },

    verifyNavBarText: function(text) {
        var that = this;

        return text.forEach(function(result, i) {
            that.assert.containsText(`@navbarText${i}`, result);
        });
    },

};

module.exports = {
    // List your commands objects in the commands array
    commands: [testCommands],
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