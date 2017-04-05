import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({

  title: DS.attr('string'),

  lastTimes: DS.attr(),

  mostRecentTime: Ember.computed('lastTimes.[]', function() {
    const lastTimes = this.get('lastTimes').slice();
    return lastTimes.sort((a, b) => a - b).pop();
  })

});
