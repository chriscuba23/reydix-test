Setup and Execution instructions:

In order to install Nightwatch please refer to: https://nightwatchjs.org/guide/quickstarts/create-and-run-a-nightwatch-test.html
In order to run mobile app testing with Nightwatch please refer to: https://github.com/nightwatchjs/mobile-helper-tool

Once you have the configuration file ready edit the following parameters to match the apk

          app: `${__dirname}/LoginRegisterApp.apk`,
          appPackage: 'com.loginregister.app',
          appActivity: 'com.loginregister.app.MainActivity',

In order to run the test you have to have the following packages that act as dependencies from npm:

https://www.npmjs.com/package/@faker-js/faker
&
https://www.npmjs.com/package/moment

In any case I am also adding the package.json and nightwatch.conf.js files for extra help

After that you can do a fresh install of the dependencies using "npm ci"

To run the test go to your root folder and run "node nightwatch -e app.android.emulator .\reydix-android.js"

Desired capabilities of Appium session are found on the repo in file "reydix.appiumsession"

Generated test report is found in file "app.android.emulator_1696430101575.html" which is also on the repo

Scenarios covered:

1. Succesful registration
2. Succesful login
3. Succesful logout
4. Unsuccesful login
5. Burger menu assertions
6. Functionality of Demographics and Add Event



