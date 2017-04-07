import moment from 'moment';
import Ember from 'ember';

export default Ember.Component.extend({

  device: Ember.inject.service(),

  hovered: null,

  mouseEnter() {
    this.set('hovered', true);
  },

  mouseLeave() {
    this.set('hovered', false);
  },

  deleteButtonVisible: Ember.computed('hovered', function() {
    return this.get('device.isTouch') || this.get('hovered');
  }),

  lastTimeSince: Ember.computed('event.lastTime', function() {
    const now = moment(Date.now());
    const lastTime = this.get('event.lastTime');
    const duration = moment.duration(lastTime.diff(now));

    return duration.humanize(true);
  }),

  actions: {

    deleteEvent() {
      this.get('onDeleteEvent')(this.get('event'));
    }

  }
});
