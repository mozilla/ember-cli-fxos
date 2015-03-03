'use strict';

var parseAuthor = require('parse-author');

module.exports = function(authorData) {
  var developerInfo = {};
  if (typeof authorData === 'string') {
      developerInfo = parseAuthor(authorData);
  } else if (typeof authorData === 'object') {
      developerInfo = authorData;
  }
  return developerInfo;
};
