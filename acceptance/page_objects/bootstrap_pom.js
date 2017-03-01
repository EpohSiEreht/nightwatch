const testCommands = {
    verifyTitle: function(pageTitle) {
        return this.assert.title(pageTitle);
    },
};

module.exports = {
    commands: [testCommands],
    url: function() {
        return 'http://getbootstrap.com/css/';
    },
    elements:{
        buttonHover: {
            selector: '.client-src-views-frame-view-___frame-view__frameViewContainer a'
        },

    }
};