import Ember from 'ember';
import moment from 'moment';

const { isBlank } = Ember;

export default Ember.Controller.extend({

  lastTimeValue: '',

  duplicateEvents: Ember.computed('lastTimeValue', 'model', function() {
    const title = this.get('lastTimeValue');
    const model = this.get('model');

    return model.filter((event) => event.get('title').toUpperCase() === title.toUpperCase());
  }),

  noDuplicateEvent: Ember.computed.empty('duplicateEvents'),

  filteredEventsByTitle: Ember.computed('lastTimeValue', 'model.[]', function() {
    const titleFilter = this.get('lastTimeValue');
    const events = this.get('model');

    if (isBlank(titleFilter)) {
      return events;
    } else {
      const upperCasedTitleFilter = titleFilter.toUpperCase();
      return events.filter((event) => event.get('title').toUpperCase().indexOf(upperCasedTitleFilter) !== -1);
    }
  }),

  actions: {

    addEvent() {
      const lastTimeValue = this.get('lastTimeValue');

      if (isBlank(lastTimeValue)) {
        this.set('warning', 'Please enter something you did');
        return;
      }

      if (this.get('noDuplicateEvent')) {
        this.get('store').createRecord('local-storage-event', {
          title: lastTimeValue,
          lastTimes: Ember.A([ moment() ])
        })
        .save()
        .then(() => this.set('lastTimeValue', ''));

      } else {

        Ember.RSVP.Promise.all(
          this.get('duplicateEvents').map((event) => {
            event.get('lastTimes').pushObject(moment());
            return event.save();
          })
        )
        .then(() => this.set('lastTimeValue', ''));
      }
    },

    deleteEvent(event) {
      event.destroyRecord();
    },

    displayInfo() {
      this.set('displayInfo', true);
    },

    hideInfo() {
      this.set('displayInfo', false);
    }

  }
});
