import moment from 'moment';
import Ember from 'ember';

export default Ember.Component.extend({

  lastTimeSince: Ember.computed('event.lastTime', function() {
    const now = moment(Date.now());
    const lastTime = this.get('event.lastTime');
    const duration = moment.duration(lastTime.diff(now));

    return duration.humanize(true);
  })

});
