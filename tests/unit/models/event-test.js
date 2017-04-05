import { assert } from 'chai';
import { describe, it } from 'mocha';
import { setupModelTest } from 'ember-mocha';
import moment from 'moment';
import Ember from 'ember';

describe('Unit | Model | event', function() {

  setupModelTest('event', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  it('computes the most recent time', function() {
    const first = moment();
    const second = first.clone().add(1, 's');

    let model = this.subject({
      lastTimes: Ember.A([ first, second ])
    });

    assert.strictEqual(model.get('lastTime').valueOf(), second.valueOf());
  });

  it('computes the most recent time', function() {
    const first = moment();
    const second = first.clone().subtract(1, 's');

    let model = this.subject({
      lastTimes: Ember.A([ first, second ])
    });

    assert.strictEqual(model.get('lastTime').valueOf(), first.valueOf());
  });

});
