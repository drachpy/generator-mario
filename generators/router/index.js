'use strict';
var utils = require('../utils');
var DirBase = require('../dir-base');
var pathVerification = require('../path-verification');
var path = require('path');

var controller = {};

module.exports = DirBase.extend({
  constructor: function (/*args, options*/) {
    DirBase.apply(this, arguments);
    this.option('controller', {alias:'c',desc: 'specify a controller name to use with the router (they have to be in the same directory)'});
  },
  initializing: function () {
    this.controller = this.options.controller || this.options.c;
    if(!this.controller) {
      this.composeWith('aowp-marionette:controller', {options: {directory: this.options.directory}, args: [this.name]});
      controller.name = this.name;
    } else {
      this.options.controller = utils.truncateBasePath(this.options.controller);
      controller = path.parse(this.options.controller);
      pathVerification.verifyPath(controller.dir, controller.name, utils.type.controller);
    }
  },
  writing: function () {
    var ecma = this.config.get('ecma');
    var sourceDir = 'es5/';
    if (ecma === 6) {
      sourceDir = 'es6/';
    }
    this.fs.copyTpl(
      this.templatePath(sourceDir + '_router.js'),
      this.destinationPath(utils.fileNameWithPath(this.options.directory, this.name, utils.type.router)),
      {
        name: this.name,
        controllerPath: utils.amd(controller.name, utils.type.controller, controller.dir),
        controllerName: utils.className(controller.name, utils.type.controller)
      }
    );
  }
});
