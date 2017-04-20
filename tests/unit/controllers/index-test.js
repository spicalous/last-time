import { assert } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { setupTest } from 'ember-mocha';
import Ember from 'ember';

describe('Unit | Controller | index', function() {

  setupTest('controller:index', {
    needs: [
      'model:local-storage-event'
    ]
  });

  it('sets a warning message when input is empty', function() {
    let controller = this.subject();

    assert.notOk(controller.get('warning'));

    controller.send('addEvent');

    assert.strictEqual(controller.get('warning'), 'Please enter something you did');
  });

  describe('adding an event', function() {

    let controller, originalSetItem;

    beforeEach(function() {
      originalSetItem = window.setItem;
      window.localStorage.setItem = function() {};
      controller = this.subject({
        model: Ember.A([]),
        store: {
          createRecord() {
            return {
              save() {
                return {
                  then(cb) {
                    return cb();
                  }
                };
              }
            };
          }
        }
      });
      controller.set('lastTimeValue', 'An event title');
      controller.send('addEvent');
    });

    afterEach(function() {
      window.localStorage.setItem = originalSetItem;
    });

    it('removes the lastTimeValue when adding a new event', function() {
      assert.strictEqual(controller.get('lastTimeValue'), '');
    });

//    it('adds the event to the model', function() {
//      assert.strictEqual(controller.get('model.firstObject.title'), 'An event title');
//      assert.strictEqual(controller.get('model.length'), 1);
//    });

//    it('it adds the event to the model if it doesnt exist already', function() {
//      Ember.run(() => {
//        controller.set('lastTimeValue', 'The second event title');
//        controller.send('addEvent');
//
//        assert.strictEqual(controller.get('model.length'), 2);
//        assert.strictEqual(controller.get('model').objectAt(0).get('title'), 'An event title');
//        assert.strictEqual(controller.get('model').objectAt(1).get('title'), 'The second event title');
//      });
//    });

//    it('updates the last time if the event exists', function() {
//      Ember.run(() => {
//        controller.set('lastTimeValue', 'An event title');
//        controller.send('addEvent');
//
//        assert.strictEqual(controller.get('model.length'), 1);
//        assert.strictEqual(controller.get('model.firstObject.title'), 'An event title');
//        assert.strictEqual(controller.get('model.firstObject.lastTimes.length'), 2);
//        assert.strictEqual(controller.get('lastTimeValue'), '');
//      });
//    });

  });

  describe('multiple events', function() {

    let controller;

    beforeEach(function() {
      controller = this.subject({
        model: Ember.A([
          Ember.Object.create({ title: 'First event', lastTimes: Ember.A([1]) }),
          Ember.Object.create({ title: 'Second event', lastTimes: Ember.A([2]) }),
          Ember.Object.create({ title: 'Third event', lastTimes: Ember.A([3]) }),
          Ember.Object.create({ title: 'Fourth event', lastTimes: Ember.A([4]) }),
        ])
      });
    });

    it('filters the events based on the lastTimeValue', function() {
      controller.set('lastTimeValue', 'First');

      assert.strictEqual(controller.get('filteredEventsByTitle.length'), 1);
    });

    it('filters the events and is case insensitive', function() {
      controller.set('lastTimeValue', 'first');

      assert.strictEqual(controller.get('filteredEventsByTitle.length'), 1);
    });

//    it('deleting an event removes it from the model', function() {
//      assert.strictEqual(controller.get('model.length'), 4);
//      const firstEvent = controller.get('model.firstObject');
//      Ember.run(() => controller.send('deleteEvent', firstEvent));
//
//      assert.strictEqual(controller.get('model.length'), 3);
//    });

  });
});
