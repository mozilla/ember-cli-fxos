# Ember-cli-fxos [![Build Status](https://secure.travis-ci.org/mozilla/ember-cli-fxos.png?branch=master)](http://travis-ci.org/mozilla/ember-cli-fxos)

This is an [Ember CLI](http://www.ember-cli.com/) add-on for creating FireFox OS applications.

## Installation
From the root of your Ember CLI project:

```
ember install:addon ember-cli-fxos
```

## Manifest File
Every FireFox OS application requires a [manifest file](https://developer.mozilla.org/en-US/Apps/Build/Manifest) in the root of your project.

This addon creates a `manifest.webapp` in your application's `/public` directory. Any values that start with `@@` (e.g. `@@appName`) will be pulled from your `package.json` at build time. Reference [MDN](https://developer.mozilla.org/en-US/Apps/Build/Manifest) for additional information on configuring your manifest file.

## Validation
After running `ember build`, your final manifest file will be compiled into the `/dist` directory. To validate the manifest file and check for any errors or warnings, run:

`ember fxos:validate`

*Note: The [module performing validation](https://github.com/mozilla/firefox-app-validator-manifest) is still a work in progress. It may not catch all errors. Please do file bugs as you encounter them.*

## Publishing to the Firefox Marketplace
Before you can publish to the Firefox Marketplace, you'll need to generate authentication credentials and place them in the `/config/fxos.js` file that was generated for you after install.

[Generate Development Keys](https://marketplace-dev.allizom.org/developers/api)
[Generate Production Keys](https://marketplace.firefox.com/developers/api)

Select 'command line' for the client type when generating your keys.

After adding your keypair to `/config/fxos.js`, you can publish to the Firefox Marketplace by running the following command:

`ember fxos:publish --url=<url-to-published-manifest-webapp-file> --environment=development`

`environment` can either be **`development`** or **`production`**. If you do not pass in this option, it will default to `development`.

The `url` option must be a published manifest file. This means you need to have deployed your application somewhere (i.e. github pages). If you don't want to pass in the `url` option each time you run the command, you can add a `publishedManifestUrl` property to your `/config/fxos.js` file. For example:

```javascript
module.exports = {
  development: {
    consumerKey: 'baz',
    consumerSecret: 'foo',
    environment: 'development',
    publishedManifestUrl: 'http://brittanystoroz.github.io/its-five-o-clock-somewhere/manifest.webapp'
  },
  production: {
    consumerKey: 'foo',
    consumerSecret: 'bar',
    environment: 'production'
  }
};
```
Then you can simply run `ember fxos:publish` in the future.
