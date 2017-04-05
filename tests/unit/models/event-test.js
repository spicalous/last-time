import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';
import moment from 'moment';

moduleForModel('event', 'Unit | Model | event', {
  // Specify the other units that are required for this test.
  needs: []
});

test('retrieves the most recent time', function(assert) {
  const first = moment();
  const second = first.add(1, 's');

  let model = this.subject({
    lastTimes: Ember.A([ first, second ])
  });

  assert.strictEqual(model.get('mostRecentTime').valueOf(), second.valueOf());
});

test('retrieves the most recent time', function(assert) {
  const first = moment();
  const second = first.subtract(1, 's');

  let model = this.subject({
    lastTimes: Ember.A([ first, second ])
  });

  assert.strictEqual(model.get('mostRecentTime').valueOf(), first.valueOf());
});
