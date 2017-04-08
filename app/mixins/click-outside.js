import Ember from 'ember';

const bound = function(fnName) {
  return Ember.computed(fnName, function() {
    return this.get(fnName).bind(this);
  });
};

export default Ember.Mixin.create({

  clickOutside() {

  },

  clickHandler: bound('outsideClickHandler'),

  outsideClickHandler(e) {
    const element = this.get('element');
    const $target = Ember.$(e.target);
    const isInside = $target.closest(element).length === 1;

    if (!isInside) {
      this.clickOutside(e);
    }
  },

  addClickOutsideListener() {
    const clickHandler = this.get('clickHandler');
    Ember.$(window).on('click touchstart', clickHandler);
  },

  removeClickOutsideListener() {
    const clickHandler = this.get('clickHandler');
    Ember.$(window).off('click touchstart', clickHandler);
  }
});
