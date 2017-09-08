/* eslint node: true */
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
      this.import('vendor/moment.js');
      this.import('vendor/Calendar.js');
    }



    if (options.includeStyles !== false) {
      this.import('vendor/application.css');
    }
  },

  treeForVendor(vendorTree) {
    let BareMetricsTree = new Funnel(path.join(this.project.root, 'node_modules', 'BaremetricsCalendar', 'public', 'js'));

    let MomentTree = new Funnel(path.join(this.project.root, 'node_modules', 'moment'), {
      files: ['moment.js'],
    });

    let trees = [BareMetricsTree, MomentTree];
    if (vendorTree) {
      trees.push(vendorTree);
    }

    return new MergeTrees(trees);
  },

  treeForStyles(vendorTree) {
    console.log('styles');
    let styleTree = new Funnel(path.join(this.project.root, 'node_modules', 'BaremetricsCalendar', 'public', 'css'));

    let trees = [styleTree];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    return styleTree;
  }
};
