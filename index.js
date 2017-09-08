/* jshint node: true */
'use strict';

var path = require('path'),
    Funnel = require('broccoli-funnel'),
    MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-baremetrics-calendar',

  included(app) {
    this._super.included.apply(this, arguments);

    var options = app.options.baremetricsCalendar || {};

    var isFastBoot = process.env.EMBER_CLI_FASTBOOT === 'true';
    if (!isFastBoot) {
      this.import('vendor/Calendar.js')
    }
    if (options.includeStyles !== false) {
      this.import('vendor/calendar.css');
    }
  },
  afterInstall() {
    return this.addPackageToProject('BaremetricsCalendar');
  },
  treeForVendor(vendorTree) {
    var BareMetricsTree = new Funnel(path.join(this.project.root, 'node_modules', 'BaremetricsCalendar'), {
      files: ['public/js/Calendar.js', 'public/css/application.js']
    });

    return new MergeTrees([vendorTree, BareMetricsTree]);
  }
};
