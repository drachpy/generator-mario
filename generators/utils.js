'use strict';
var path = require('path');
var url = require('url');
var baseDir = 'app/scripts/apps/';
var _ = require('lodash');

//var delimiter = '-';
var hbsExt = '.hbs';
var testSuffix = 'test',
  templateSufix = 'template',
  _deliter = '-',
  _jsext = '.js';
var _fileNames = {
  model: 'model',
  collection: 'collection',
  itemview: 'item-view',
  collectionview: 'collection-view',
  compositeview: 'composite-view',
  layoutview: 'layout-view',
  controller: 'controller',
  router: 'router'
};

function fileName(name, type) {
  if(name.lastIndexOf(type) === -1) {
    return name + _deliter + type;
  }
  if(name.length < type.length) {
    return name + _deliter + type;
  }
  if(name.lastIndexOf(type) === (name.length - type.length)) {
    return name;
  }
  return name + _deliter + type;
}

function testName(name, type) {
  return fileName(name, type) + _deliter + testSuffix;
}

function testfileName(name, type) {
  return fileName(name, type) + _deliter + testSuffix;
}

function templatefileName(name, type) {
  return fileName(name, type) + _deliter + templateSufix + hbsExt;
}

function getCollectionFileName(name) {
  return fileName(name, _fileNames.collection);
}

function fileNameWithPath(directory, name, type) {
  return path.join(baseDir, directory, fileName(name, type) + _jsext);
}

function testWithPath(directory, name, type) {
  return path.join(baseDir, directory, testfileName(name, type) + _jsext);
}

function templateNameWithPath(directory, name, type) {
  var pathObject = path.parse(name);
  if(pathObject.ext.length > 0) {
    return url.resolve(baseDir + directory + '/', pathObject.base);
  }
  return url.resolve(baseDir + directory + '/', templatefileName(name, type));
}

/**
* creates relative AMD path from name and type
* @param {String} name The name
* @param {String} type The type saved in this.type
*/
function amd(name, type) {
  return './' + fileName(name, type);
}

function className(name, type) {
   if(name.lastIndexOf(type) === (name.length - type.length)) {
    name = name.substring(0, name.length - 1 - type.length);
  }
  return _.capitalize(_.camelCase(name + _.capitalize(_.camelCase(type))));
}

module.exports = {
  fileName: fileName,
  testName: testName,
  getCollectionFileName: getCollectionFileName,
  fileNameWithPath: fileNameWithPath,
  testNameWithPath: testWithPath,
  templateNameWithPath: templateNameWithPath,
  amd: amd,
  className: className,
  type: _fileNames
};