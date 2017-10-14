/* eslint node: true */
'use strict';

const path = require('path'),
    Funnel = require('broccoli-funnel'),
    MergeTrees = require('broccoli-merge-trees'),
    map = require('broccoli-stew').map;;

// For ember-cli < 2.7 findHost doesnt exist so we backport from that version
// for earlier version of ember-cli.
// https://github.com/ember-cli/ember-cli/blame/16e4492c9ebf3348eb0f31df17215810674dbdf6/lib/models/addon.js#L533
function findHostShim() {
  let current = this;
  let app;
  do {
    app = current.app || app;
  } while (current.parent.parent && (current = current.parent));
  return app;
}


module.exports = {
  name: 'ember-baremetrics-calendar',

  included() {
    this._super.included.apply(this, arguments);
    this._super.included.apply(this, arguments);

    let findHost = this._findHost || findHostShim;
    let app = findHost.call(this);

    var options = app.options.baremetricsCalendar || {};

    var isFastBoot = process.env.EMBER_CLI_FASTBOOT === 'true';

    if (!isFastBoot) {
      app.import('vendor/moment.js');
      app.import('vendor/Calendar.js');
    }

    if (options.includeStyles !== false) {
      app.import('vendor/ember-baremetrics-calendar/application.css');
    }
  },

  treeForVendor(vendorTree) {

    let BareMetricsTree = new Funnel(path.join(this.project.root, 'node_modules', 'BaremetricsCalendar', 'public', 'js'));

    let MomentTree = new Funnel(path.join(this.project.root, 'node_modules', 'moment'), {
      files: ['moment.js'],
    });

    let styleTree = new Funnel(path.join(this.project.root, 'node_modules', 'BaremetricsCalendar', 'public', 'css'), {
      destDir: 'ember-baremetrics-calendar'
    });

    let trees = [BareMetricsTree, MomentTree, styleTree];
    if (vendorTree) {
      trees.push(vendorTree);
    }

    return new MergeTrees(trees);
  }
};
