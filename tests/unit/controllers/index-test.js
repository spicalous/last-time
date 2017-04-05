import { assert } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';
import Ember from 'ember';

describe('Unit | Controller | index', function() {

  setupTest('controller:index', {
    needs: ['model:event']
  });

  it('sets a warning message when input is empty', function() {
    let controller = this.subject();
    controller.send('addEvent');

    assert.strictEqual(controller.get('warning'), 'Please enter something you did');
  });

  it('adds the event to the model', function() {
    let controller = this.subject();
    controller.set('model', Ember.A([]));

    Ember.run(() => {
      controller.set('lastTimeValue', 'An event title');
      controller.send('addEvent');

      assert.strictEqual(controller.get('model.firstObject.title'), 'An event title');
      assert.strictEqual(controller.get('model.length'), 1);
    });
  });

  it('it adds the event to the model if its new', function() {
    let controller = this.subject();
    controller.set('model', Ember.A([]));

    Ember.run(() => {
      controller.set('lastTimeValue', 'The first event title');
      controller.send('addEvent');
      controller.set('lastTimeValue', 'The second event title');
      controller.send('addEvent');

      assert.strictEqual(controller.get('model.length'), 2);
      assert.strictEqual(controller.get('model').objectAt(0).get('title'), 'The first event title');
      assert.strictEqual(controller.get('model').objectAt(1).get('title'), 'The second event title');
    });
  });

  it('removed the lastTimeValue on a new event', function() {
    let controller = this.subject();
    controller.set('model', Ember.A([]));

    Ember.run(() => {
      controller.set('lastTimeValue', 'The first event title');
      controller.send('addEvent');

      assert.strictEqual(controller.get('lastTimeValue'), '');
    });
  });

  it('updates the last time if the event exists', function() {
    let controller = this.subject();
    controller.set('model', Ember.A([]));

    Ember.run(() => {
      controller.set('lastTimeValue', 'Event title that will be duplicated');
      controller.send('addEvent');
      controller.set('lastTimeValue', 'Event title that will be duplicated');
      controller.send('addEvent');

      assert.strictEqual(controller.get('model.length'), 1);
      assert.strictEqual(controller.get('model.firstObject.title'), 'Event title that will be duplicated');
      assert.strictEqual(controller.get('model.firstObject.lastTimes.length'), 2);
      assert.strictEqual(controller.get('lastTimeValue'), '');
    });
  });

});
