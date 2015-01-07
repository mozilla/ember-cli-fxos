# Ember-cli-fxos

This is an [ember-cli](http://www.ember-cli.com/) add-on for creating FireFox OS applications. 

## Installation
If you are using Ember CLI >= 0.1.5:

```
ember install:addon ember-cli-fxos
```

If you are using Ember CLI < 0.1.5:

```
npm install ember-cli-fxos --save-dev
```

## Creating Your Manifest File
Every FireFox OS application requires a [manifest file](https://developer.mozilla.org/en-US/Apps/Build/Manifest) in the root of your project.

If you are using Ember CLI >= 0.1.5, the manifest file has already been created for you. If you are using an older version of Ember CLI, you can generate this file with the following command:

```
ember g fxos-manifest
```

This will create a `manifest.webapp` file in your application's /public directory. Any values that start with `@@` (e.g. `@@appName`) will be pulled from your `package.json` at build time.
