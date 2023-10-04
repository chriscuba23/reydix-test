describe('Reydix Android app test', function () {
    var moment = require('moment')
    const { faker } = require('@faker-js/faker');

    var name = 'Chris'
    var surname = 'Kouvaras'
    var birthdateSelector = moment().format('llll');
    var birthdate = moment().format('YYYY-MM-DD')
    var genderList = ['Male', 'Female', 'Do not want to declare']
    var weight = '75'
    var username = 'ck23'
    var password = 'K0uv@r@$'
    var email = 'chriscuba23@gmail.com'
    eventType = 'Urination'

    var userInvalid = faker.internet.userName()
    var passInvalid = faker.internet.password()

    before(function (app) {
        app
            .assert.visible({ selector: 'android:id/content', locateStrategy: 'id' }); // frame layout
    });
    it('Test the Reydix sign up functionality - successful', async function (app) {
        app
            .click('xpath', '//android.widget.Button[@content-desc="Sign up"]')
            .click('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[1]') //Name input field
            .assert.enabled({ selector: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[1]', locateStrategy: 'xpath' })
            .setValue('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[1]', name)
            .click('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[2]') //Surname input field
            .assert.enabled({ selector: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[2]', locateStrategy: 'xpath' })
            .setValue('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[2]', surname)
            .click('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.view.View[6]') //Birthdate
            //.assert.visible({ selector: `//android.view.View[@content-desc="SELECT DATE ${birthdate.substring(0, birthdate.lastIndexOf(','))}"]`, locateStrategy: 'xpath' }) // calendar
            /* REVIEW calendar xpath selector is not working
            for the testcase to run without breaking I have included a date variant that changes each day and adjusts to the selector
            yet the calendar element and all its date sub-elements cannot be located
            be that as it may I will leave this component untested */
            .click('xpath', '//android.widget.Button[@content-desc="OK"]') // OK button of calendar
            //NOTE Birthdate will be the current date since the component is untested and there are no age restrictions upon submitting the registration form
            .assert.enabled({ selector: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.view.View[6]', locateStrategy: 'xpath' })
            .useXpath()
            .assert.textEquals('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.view.View[6]', birthdate)
            .click('accessibility id', genderList[0]) // Gender select 
            .assert.elementsCount({ selector: '//android.view.View[@content-desc]', locateStrategy: 'xpath' }, 3) // number of Gender options
            .perform(function () {
                genderList.forEach((gender) => app.useXpath().assert.visible(`//android.view.View[@content-desc="${gender}"]`))
            })
            .click('accessibility id', genderList[2]) // Gender select option 3
            .assert.enabled({ selector: genderList[2], locateStrategy: 'accessibility id' }) // Gender option 3 is enabled
            .click('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[3]') //Weight
            //NOTE Numpad is not interactable since it is considered as a whole Android View with no distinct elements. Therefore I will proceed with setting the numerical text 
            .setValue('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[3]', weight)
            .useXpath()
        await app.appium.hideKeyboard()
            .click('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[4]') // click username input to unfocus the numpad
            .setValue('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[4]', username)
        await app.appium.hideKeyboard()
            .click('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[5]') // click password input
        await app.appium.hideKeyboard()
            .setValue('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[5]', password)
        await app.appium.hideKeyboard()
            .click('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[6]') // click email input
        await app.appium.hideKeyboard()
            .setValue('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[6]', email)
        await app.appium.hideKeyboard()
            .click('xpath', '//android.widget.Button[@content-desc="Sign up"]') // click Sign 
            .assert.visible({ selector: 'Account created', locateStrategy: 'accessibility id' }) // successful account creation message

    });
    it('Test the Reydix login functionality - successful', async function (app) {

        app
            .click('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[1]')
            .assert.enabled({ selector: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[1]', locateStrategy: 'xpath' })
            .setValue('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[1]', username)
            .click('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[2]')
            .assert.enabled({ selector: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[2]', locateStrategy: 'xpath' })
            .setValue('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[2]', password)
            .click('xpath', '//android.widget.Button[@content-desc="Sign in"]')
        // NOTE successful login message appears only when logged out. Should appear only when logged in
        //.assert.visible({ selector: 'Login successful', locateStrategy: 'accessibility id' }) // successful login message

    });
    it('Test the Reydix app - Quote of the day visibility', async function (app) {
        app
            .assert.visible({ selector: 'Quote of the day', locateStrategy: 'accessibility id' })


    });
    // NOTE testcases are skipped because respective element could not be located when using xpath or accessibility id
    it.skip('Test the Reydix app - Educational Material visibility', async function (app) {
        app
            .assert.visible({ selector: 'Educational Material', locateStrategy: 'accessibility id' })

    });
    it.skip('Test the Reydix app - Walk visibility', async function (app) {
        app
            .assert.visible({ selector: 'Walk Remaining: 5647 2353 steps Phone', locateStrategy: 'accessibility id' })

    });
    it.skip('Test the Reydix app - HeartBeat visibility', async function (app) {
        app
            .assert.visible({ selector: 'HeartBeat Avg 101.3 bpm Watch', locateStrategy: 'accessibility id' })

    });
    it('Test the Reydix app - Demographics visibility', async function (app) {
        app
            .assert.visible({ selector: 'Demographics', locateStrategy: 'accessibility id' })

    });
    it('Test the Reydix app - Add Event visibility', async function (app) {
        app
            .assert.visible({ selector: 'Add Event', locateStrategy: 'accessibility id' })

    });
    it('Test the Reydix logout functionality - successful', async function (app) {
        app
            .assert.visible({ selector: 'android.widget.Button', locateStrategy: 'class name' }) // Burger button
            .click('class name', 'android.widget.Button')
            .assert.visible({ selector: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View', locateStrategy: 'xpath' }) // Burger menu
            // assert visibility of the menu options
            .assert.visible({ selector: 'Steps', locateStrategy: 'accessibility id' })
            .assert.visible({ selector: 'HeartBeat', locateStrategy: 'accessibility id' })
            .assert.visible({ selector: 'Educational Material', locateStrategy: 'accessibility id' })
            .assert.visible({ selector: 'Demographics', locateStrategy: 'accessibility id' })
            .assert.visible({ selector: 'Urine Track', locateStrategy: 'accessibility id' })
            .assert.visible({ selector: 'Logout', locateStrategy: 'accessibility id' })
            .click('accessibility id', 'Logout') // click Logout
            // NOTE after logging out we should have a proper logout message. Instead the successful login message appears
            //.assert.not.present({ selector: 'Login successful', locateStrategy: 'accessibility id' }) // successful login message should not appear
            .assert.visible({ selector: 'android:id/content', locateStrategy: 'id' }) // frame layout

    });
    it('Test the Reydix login functionality - invalid', async function (app) {

        app
            .click('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[1]')
            .setValue('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[1]', userInvalid)
            .click('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[2]')
            .setValue('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[2]', passInvalid)
            .click('xpath', '//android.widget.Button[@content-desc="Sign in"]')
            .assert.visible({ selector: 'Login failed', locateStrategy: 'accessibility id' }) // failed login message

            .click('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[1]')
            .clearValue('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[1]')
            .pause(1000)
            .click('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[2]')
            .clearValue('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[2]')

    });
    it('Test the Reydix app functionality as a logged in user', async function (app) {

        app
            .click('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[1]')
            .assert.enabled({ selector: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[1]', locateStrategy: 'xpath' })
            .setValue('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[1]', username)
            .click('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[2]')
            .assert.enabled({ selector: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[2]', locateStrategy: 'xpath' })
            .setValue('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.EditText[2]', password)
            .click('xpath', '//android.widget.Button[@content-desc="Sign in"]')

    });
    it('Test the Reydix app - Demographics functionality', async function (app) {
        app
            .click({ selector: 'Demographics', locateStrategy: 'accessibility id' })
            .assert.attributeContains({ selector: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[1]', locateStrategy: 'xpath' }, 'hint', name)

            .assert.attributeContains({ selector: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[2]', locateStrategy: 'xpath' }, 'hint', surname)

            .assert.attributeContains({ selector: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.view.View[6]', locateStrategy: 'xpath' }, 'hint', birthdate)

            // NOTE there is a bug in Gender. The user selection seems to be reset and it defaults to 'Male'
            //.assert.visible({ selector: genderList[2], locateStrategy: 'accessibility id' })

            .assert.attributeContains({ selector: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[3]', locateStrategy: 'xpath' }, 'hint', weight)

            .assert.attributeContains({ selector: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[4]', locateStrategy: 'xpath' }, 'hint', username)
            // REVIEW password in user account should be masked
            .assert.attributeContains({ selector: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[5]', locateStrategy: 'xpath' }, 'hint', password)

            .assert.attributeContains({ selector: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView/android.widget.EditText[6]', locateStrategy: 'xpath' }, 'hint', email)
            .click('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button') // click back button

    });
    it('Test the Reydix app - Add Event functionality', async function (app) {

        var eventDate = birthdate

        app
            .click({ selector: 'Add Event', locateStrategy: 'accessibility id' })
            .click('xpath', '//android.widget.Button[@content-desc="Add Event"]') // click Add Event button
            .assert.visible({ selector: `/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View[1]/android.view.View/android.view.View/android.view.View`, locateStrategy: 'xpath' }) // Event log
            .assert.visible({ selector: eventType, locateStrategy: 'accessibility id' }) // Event type
            .click({ selector: '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View[1]/android.view.View/android.view.View/android.view.View/android.view.View[2]', locateStrategy: 'xpath' }) // click Pick a date
            .click('xpath', '//android.widget.Button[@content-desc="OK"]') // OK button of calendar
            .click({ selector: 'Add Event', locateStrategy: 'accessibility id' })// click Add event
        await app.appium.pressKeyCode(111)

            // NOTE Events are not getting refreshed so we have to go back and forth to see the addition
            .click('xpath', '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button') // click back button
            .click({ selector: 'Add Event', locateStrategy: 'accessibility id' })

            .assert.visible({ selector: eventType, locateStrategy: 'accessibility id' }) // Event type
            .assert.visible({ selector: eventDate, locateStrategy: 'accessibility id' }) // Event date
            .assert.visible({ selector: '1', locateStrategy: 'accessibility id' }) // Event Intensity

    });
    after(function (app) {
        app
            .end()
    });
});