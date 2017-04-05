import DS from 'ember-data';
import Ember from 'ember';
import moment from 'moment';

export default DS.Model.extend({

  title: DS.attr('string'),

  lastTimes: DS.attr(),

  lastTime: Ember.computed('lastTimes.[]', function() {
    const lastTimes = this.get('lastTimes').slice();
    return lastTimes.sort((a, b) => a - b).pop();
  }),

  lastTimeSince: Ember.computed('lastTime', function() {
    const now = moment(Date.now());
    const lastTime = moment(this.get('lastTime'));
    const duration = moment.duration(lastTime.diff(now));

    return duration.humanize(true);
  })

});
