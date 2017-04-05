import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:index', 'Unit | Controller | index', {
   needs: ['model:event']
});

test('it sets a warning message when input is empty', function(assert) {
  let controller = this.subject();
  controller.send('addEvent');

  assert.strictEqual(controller.get('warning'), 'Please enter something you did');
});

test('it adds the event to the model', function(assert) {
  let controller = this.subject();
  controller.set('model', Ember.A([]));

  Ember.run(() => {
    controller.set('lastTimeValue', 'An event title');
    controller.send('addEvent');

    assert.strictEqual(controller.get('model.firstObject.title'), 'An event title');
    assert.strictEqual(controller.get('model.length'), 1);
  });
});

test('it adds the event to the model if its new', function(assert) {
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

test('it removed the lastTimeValue on a new event', function(assert) {
  let controller = this.subject();
  controller.set('model', Ember.A([]));

  Ember.run(() => {
    controller.set('lastTimeValue', 'The first event title');
    controller.send('addEvent');

    assert.strictEqual(controller.get('lastTimeValue'), '');
  });
});

test('it updates the last time if the event exists', function(assert) {
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

