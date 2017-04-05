import { assert } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
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

  describe('humanised time', function() {

    let originalNow;

    beforeEach(function() {
      originalNow = Date.now;
      Date.now = function() { return 10000000000; };
    });

    afterEach(function() {
      Date.now = originalNow;
    });

    [
      { expected: 'a few seconds ago', lastTime: 10000000000 - (1000 * 44) },
      { expected: 'a minute ago',      lastTime: 10000000000 - (1000 * 45) },
      { expected: 'a minute ago',      lastTime: 10000000000 - (1000 * 89) },
      { expected: '2 minutes ago',     lastTime: 10000000000 - (1000 * 90) },
      { expected: '44 minutes ago',    lastTime: 10000000000 - (1000 * 60 * 44) },
      { expected: 'an hour ago',       lastTime: 10000000000 - (1000 * 60 * 45) },
      { expected: 'an hour ago',       lastTime: 10000000000 - (1000 * 60 * 89) },
      { expected: '2 hours ago',       lastTime: 10000000000 - (1000 * 60 * 90) },
      { expected: '21 hours ago',      lastTime: 10000000000 - (1000 * 60 * 60 * 21) },
      { expected: 'a day ago',         lastTime: 10000000000 - (1000 * 60 * 60 * 22) },
      { expected: '25 days ago',       lastTime: 10000000000 - (1000 * 60 * 60 * 24 * 25) },
      { expected: 'a month ago',       lastTime: 10000000000 - (1000 * 60 * 60 * 24 * 26) },
      { expected: '2 months ago',      lastTime: 10000000000 - (1000 * 60 * 60 * 24 * 46) },
      { expected: '10 months ago',     lastTime: 10000000000 - (1000 * 60 * 60 * 24 * 319) },
      { expected: 'a year ago',        lastTime: 10000000000 - (1000 * 60 * 60 * 24 * 320) },
      { expected: '2 years ago',       lastTime: 10000000000 - (1000 * 60 * 60 * 24 * 548) }
    ].forEach(function(scenario) {

      it('returns the correctly formatted time when the last time is ' + scenario.expected, function() {
        let model = this.subject({
          lastTimes: Ember.A([ moment(scenario.lastTime) ])
        });

        assert.strictEqual(model.get('lastTimeSince'), scenario.expected);
      });

    });

  });
});
