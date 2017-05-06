import { assert } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { setupTest } from 'ember-mocha';
import MockLocalStorage from 'last-time/tests/helpers/mock-local-storage';
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

    let controller, mockLocalStorage;

    beforeEach(function() {
      mockLocalStorage = MockLocalStorage.mock();
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
      mockLocalStorage.restore();
    });

    it('removes the lastTimeValue when adding a new event', function() {
      assert.strictEqual(controller.get('lastTimeValue'), '');
    });

  });

  describe('multiple events', function() {

    let controller;

    beforeEach(function() {
      controller = this.subject({
        model: Ember.A([
          Ember.Object.create({ title: 'First event', lastTimes: Ember.A([1]), save() { } }),
          Ember.Object.create({ title: 'Second event', lastTimes: Ember.A([2]), save() { } }),
          Ember.Object.create({ title: 'Third event', lastTimes: Ember.A([3]), save() { } }),
          Ember.Object.create({ title: 'Fourth event', lastTimes: Ember.A([4]), save() { } }),
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

    it('adds an event time if the event already exists', function() {
      controller.set('lastTimeValue', 'First event');
      Ember.run(() => controller.send('addEvent'));

      assert.strictEqual(controller.get('model.firstObject.lastTimes.length'), 2);
    });

  });
});
