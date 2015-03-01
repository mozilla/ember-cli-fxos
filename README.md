# Ember-cli-fxos

This is an [Ember CLI](http://www.ember-cli.com/) add-on for creating FireFox OS applications. 

## Installation
From the root of your Ember CLI project:

```
ember install:addon ember-cli-fxos
```

## Configuration
### Manifest File
Every FireFox OS application requires a [manifest file](https://developer.mozilla.org/en-US/Apps/Build/Manifest) in the root of your project.

After installing the addon, you'll see a `manifest.webapp` file was created in your application's /public directory. Any values that start with `@@` (e.g. `@@appName`) will be pulled from your `package.json` at build time. Reference the MDN link above for additional information on configuring your manifest file.

## Validation
After running `ember build`, your final manifest file will be compiled into the /dist directory. To validate the manifest file and check for any errors or warnings, run:

`ember fxos:validate`

*Note: The [module performing validation](https://github.com/mozilla/firefox-app-validator-manifest) is still a work in progress. It may not catch all errors. Please do file bugs as you encounter them.*
