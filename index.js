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
      app.import('vendor/Calendar.js')
    }

    if (options.includeStyles !== false) {
      app.import('vendor/calendar.css');
    }
  },

  treeForVendor(vendorTree) {
    console.log(path.dirname(this.project.root, 'node_modules', 'BaremetricsCalendar', 'public'));
    let BareMetricsTree = new Funnel(path.join(this.project.root, 'node_modules', 'BaremetricsCalendar', 'public'), {
      files: ['js/Calendar.js']
    });

    let trees = [BareMetricsTree];
    if (vendorTree) {
      trees.push(vendorTree);
    }

    return new MergeTrees([vendorTree, BareMetricsTree]);
  }
};
