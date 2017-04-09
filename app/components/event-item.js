import moment from 'moment';
import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['event-item'],

  device: Ember.inject.service(),

  hovered: null,

  mouseEnter() {
    this.set('hovered', true);
  },

  mouseLeave() {
    this.set('hovered', false);
  },

  deleteButtonVisible: Ember.computed('deleteConfirmButtonVisible', 'hovered', function() {
    return !this.get('deleteConfirmButtonVisible') && (this.get('device.isTouch') || this.get('hovered'));
  }),

  deleteConfirmButtonVisible: Ember.computed('deleteIntent', function() {
    return this.get('deleteIntent');
  }),

  lastTimeSince: Ember.computed('event.lastTime', function() {
    const now = moment(Date.now());
    const lastTime = this.get('event.lastTime');
    const duration = moment.duration(lastTime.diff(now));

    return duration.humanize(true);
  }),

  actions: {

    setExpanded(expanded) {
      this.set('expanded', expanded);
    },

    toggleExpanded() {
      this.toggleProperty('expanded');
    },

    deleteIntent(intent) {
      this.set('deleteIntent', intent);
    },

    deleteEvent() {
      this.get('onDeleteEvent')(this.get('event'));
    }

  }
});
