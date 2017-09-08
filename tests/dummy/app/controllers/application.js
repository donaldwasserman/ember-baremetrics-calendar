import Ember from 'ember';


const {Controller, computed} = Ember;
export default Controller.extend({
  dateRangeQuery: {
    start_time: moment()
      .startOf('day')
      .subtract(1, 'month')
      .format('YYYY-MM-DD'),

    end_time: moment()
      .endOf('day')
      .format('YYYY-MM-DD')
  },

  filters: {
    startDate: moment()
      .startOf('day')
      .subtract(1, 'month'),
    endDate: moment().endOf('day')
  },

  presets: computed(function() {
    return [
      {
        label: 'Today',
        start: moment().startOf('day'),
        end: moment().endOf('day')
      },
      {
        label: 'Last week',
        start: moment()
          .subtract(1, 'week')
          .startOf('week'),
        end: moment()
          .subtract(1, 'week')
          .endOf('week')
      },
      {
        label: 'Last month',
        start: moment()
          .subtract(1, 'month')
          .startOf('month'),
        end: moment()
          .subtract(1, 'month')
          .endOf('month')
      }
    ];
  }),
});
