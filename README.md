# Ember-cli-ffos

This is an [ember-cli](http://www.ember-cli.com/) add-on for creating FireFox OS applications. 

## Installation
From the root of your ember-cli project, run:

```
npm install ember-cli-ffos --save-dev
```

## Creating Your Manifest File
Every FireFox OS application requires a [manifest file](https://developer.mozilla.org/en-US/Apps/Build/Manifest) in the root of your project. You can generate this file with the following command:

```
ember g ffos-manifest
```

This will create a `manifest.webapp` file in your application's /public directory. Any values that start with `@@` (e.g. `@@appName`) will be pulled from your `package.json` at build time.
