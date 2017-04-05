import Ember from 'ember';
import moment from 'moment';

const { isBlank } = Ember;

export default Ember.Controller.extend({

  lastTimeValue: '',

  duplicateEvents: Ember.computed('lastTimeValue', 'model', function() {
    const title = this.get('lastTimeValue');
    const model = this.get('model');

    return model.filter((event) => event.get('title') === title);
  }),

  noDuplicateEvent: Ember.computed.empty('duplicateEvents'),

  actions: {

    addEvent() {
      const store = this.get('store');
      const lastTimeValue = this.get('lastTimeValue');

      if (isBlank(lastTimeValue)) {
        this.set('warning', 'Please enter something you did');
        return;
      }

      if (this.get('noDuplicateEvent')) {
        const event = store.createRecord('event', {
          title: lastTimeValue,
          lastTimes: Ember.A([ moment() ])
        });

        this.get('model').pushObject(event);
        this.set('lastTimeValue', '');

      } else {
        this.get('duplicateEvents').forEach((event)  => event.get('lastTimes').pushObject(moment()));
        this.set('lastTimeValue', '');
      }
    }

  }
});