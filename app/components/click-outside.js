import Ember from 'ember';
import ClickOutside from '../mixins/click-outside';
import on from 'ember-evented/on';

export default Ember.Component.extend(ClickOutside, {

  clickOutside() {
    if (this.isDestroying || this.isDestroyed) {
      return;
    }

    this.sendAction();
  },

  _attachClickOutsideHandler: on('didInsertElement', function() {
    this._cancelOutsideListenerSetup = Ember.run.next(this, this.addClickOutsideListener);
  }),

  _removeClickOutsideHandler: on('willDestroyElement', function() {
    Ember.run.cancel(this._cancelOutsideListerSetup);
    this.removeClickOutsideListener();
  })

});
