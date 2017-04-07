import Ember from 'ember';

export default Ember.Service.extend({

  isTouch: window.Modernizr.touchevents

});
