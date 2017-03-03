#Nightwatch Overview

Nightwatch.js is an easy to use Node.js based End-to-End (E2E) testing solution for browser based apps and websites. It uses the powerful W3C WebDriver API to perform commands and assertions on DOM elements.

### - Structure
```
├──/acceptance/            # Automated acceptance tests
│   ├──/endpoint_tests/    # Create your nightwatch tests here
│   ├──/page_objects/      # Page Object folder to store functions and selectors
│   ├──/reports/           # Detailed logs of your tests
│   ├──/static_data/       # Static data that can be injected into test functions
│
├──/nightwatch.conf.js             # Extra configuration settings for nightwatch
├──/nightwatch.json                # Default settings for Nigthwatch
```

### - Installation Requirements

#### 1) Make sure you have Java Runtime Environment (JRE) installed

You can check by typing
`
java -version
`
into your terminal and you should see your version number if you have Java installed.

> Don't have Java installed? [Click here to install Java SE Runtime Environment 7+](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)

#### 2) `cd` into this project folder

#### 3) Install npm packages

```sh
npm install
```

> <small>**Note 1**: While the Nightwatch docs instruct to install _globally_ (`-g`),
I have set it as a devDependencies _locally_ to the project
and listed it _explicitly_ in `package.json` </small>

> <small>**Note 2**: In order test in the browser, you must have the browser drivers downloaded
and installed into the project folder. However, I chose to install them (Chrome and Firefox) as npm packages and
_explicitly_ referenced them in nightwatch.json for convenience.</small>


### - How To Run Your Test

```shell
$ npm test    # Run acceptance tests with Nightwatch
```

### - Test Format
```angular2html
// Tests are written in Promise-like syntax
module.exports = {
    'Test Description' : (browser) => {
        browser
            .url("Type in the page URL here")
            .waitForElementVisible('body')
            .assert.title("Type of the expected page title here") 
            .end(); // ends this specific test
    },
}
```

### - Page Object Model
The Page Objects methodology is a popular pattern to write end-to-end tests by wrapping the pages or page fragments of a web app into objects.

#### Benefits
1. Allows you to create reusable functions

2. Allows your tests to be more readable

3. You can define element selectors in the Page Object and reference them with the Webdriver API methods

4. Webdriver API calls can be converted into custom page object commands to create reusable page interaction flows for use in test cases


#### Limitations
1. The Page Object Model page is not fully ES6 compatible because "this" is referenced dynamically in ES6.

2. You do not have immediate access to dynamic CSS selectors, but you can create custom commands to implement them.

3. Looping requires you to either have each of the :nth-of-type selector explicitly declared in the Page Object elements or you can use a custom dynamic selector to iterate through the element. In addition, you must already know how many instances of the element exist in the DOM.


### - How To Write Tests With Page Object Model
```angular2html
// acceptance/endpoint_tests/bootstrap.js

module.exports = {
    'Test Description' : (browser) => {
        const pageObject = browser.page.page_object_file_name();
        
        pageObject
            .navigate() // navigates the default url 
            .waitForElementVisible('body')
            .verifyTitle('Page Title Here', pageObject); // Use the method from the Page Object
            
        browser.end(); // ends this specific test
    },
};

// NOTE: .verifyTitle method inject the pageObject to bypass the limitations
// of ES6's "this" reference. This way we can use ES6 in the Page Object Model
// and still reference Webdriver API methods.
```

```angular2html
// acceptance/page_objects/bootstrap_pom.js

const testCommands = {
    verifyTitle: (pageTitle, browser) => { 
        return browser.assert.title(pageTitle) 
    },
};

// NOTE 1: browser is the pageObject that was injected so that we can have
// access to the Webdriver API methods.

module.exports = {
    // List your commands objects in the commands array
    commands: [customCommands, testCommands],
    
    // This url will let nightwatch know where to navigate() using the page object model
    url: function() {
        return 'http://getbootstrap.com';
    },
    
    // List your css selectors within the element object
    elements: {
        navbarSelector: {
            selector: '.navbar-header a' 
        },
    }
};
// NOTE 2: You can use reference the element selectors by typing '@navbarSelector' 
// in the Webdriver API methods that require a css selector in the testCommands functions

```

### - Configuration
```angular2html
// In nightwatch.json
{
    "src_folders": ["acceptance/endpoint_tests/"],  // Points nightwatch to test files you want to run
    "page_objects_path" : "acceptance/page_objects/",  // References the page_objects file location

    "output_folder": "acceptance/reports", // Outputs the reports into this directory
    
    "selenium": {  
        "start_process": true,
        "server_path": "node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.1.0.jar",
        "host": "127.0.0.1",
        "port": 4444,
        "log_path": "acceptance/reports", // Outputs the selenium logs into this directory
        "cli_args": {
            "webdriver.chrome.driver": "node_modules/chromedriver/lib/chromedriver/chromedriver", // Allows selenium to test using Chrome
            "webdriver.gecko.profile" : "node_modules/geckodriver/geckodriver" // Allows selenium to test using Firefox
        }
    },
    
    "live_output" : true, // Displays live test output as it runs
    "test_workers": {  
        "enabled": true, // Enables for parallel testing with several browsers
        "workers": "auto"
    },
    
    "test_settings": {
        "default": {
            "launch_url": "http://getbootstrap.com/",  // Reference to the default page
            "selenium_port": 4444,
            "selenium_host": "localhost",
            "skip_testcases_on_fail": false, 
            "silent": true,
            "screenshots" : {
                "enabled" : false,
                "on_failure":false,
                "path" : "test/acceptance/reports/screenshots/" // Outputs visual screenshots of test errors into this directory
            },
            "globals": {
                "waitForConditionTimeout": 5000 // Creates a default timeout for methods that require time duration
            },
            "desiredCapabilities": {
                "browserName" : "chrome" // Sets the default browser to Chrome
            }
        },
        "firefox": { // Settings for Firefox browser testings
            "desiredCapabilities": {
                "browserName": "firefox",
                "marionette": true,
                "javascriptEnabled": true
            }
        }
    }
}

```

```angular2html
// In package.json
{
  "scripts": {
    "test": "./node_modules/.bin/nightwatch -e default,firefox"
  },
}
// NOTE: "-e default,firefox" enables parallel testing (remove if you just want to test using the default browser)
```


### - References

1. http://nightwatchjs.org/api

2. https://joecod.es/page-objects-in-nightwatch-js/

3. http://matthewroach.me/ui-testing-with-nightwatch-js-page-objects/
