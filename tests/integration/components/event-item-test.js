import { assert } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

describe('Integration | Component | event item', function() {

  setupComponentTest('event-item', {
    integration: true
  });

  describe('humanised time', function() {

    const fakeNow = 10000000000;
    let originalNow;

    beforeEach(function() {
      originalNow = Date.now;
      Date.now = function() { return fakeNow; };
    });

    afterEach(function() {
      Date.now = originalNow;
    });

    [
      { expected: 'a few seconds ago', lastTime: fakeNow - (1000 * 44) },
      { expected: 'a minute ago',      lastTime: fakeNow - (1000 * 45) },
      { expected: 'a minute ago',      lastTime: fakeNow - (1000 * 89) },
      { expected: '2 minutes ago',     lastTime: fakeNow - (1000 * 90) },
      { expected: '44 minutes ago',    lastTime: fakeNow - (1000 * 60 * 44) },
      { expected: 'an hour ago',       lastTime: fakeNow - (1000 * 60 * 45) },
      { expected: 'an hour ago',       lastTime: fakeNow - (1000 * 60 * 89) },
      { expected: '2 hours ago',       lastTime: fakeNow - (1000 * 60 * 90) },
      { expected: '21 hours ago',      lastTime: fakeNow - (1000 * 60 * 60 * 21) },
      { expected: 'a day ago',         lastTime: fakeNow - (1000 * 60 * 60 * 22) },
      { expected: '25 days ago',       lastTime: fakeNow - (1000 * 60 * 60 * 24 * 25) },
      { expected: 'a month ago',       lastTime: fakeNow - (1000 * 60 * 60 * 24 * 26) },
      { expected: '2 months ago',      lastTime: fakeNow - (1000 * 60 * 60 * 24 * 46) },
      { expected: '10 months ago',     lastTime: fakeNow - (1000 * 60 * 60 * 24 * 319) },
      { expected: 'a year ago',        lastTime: fakeNow - (1000 * 60 * 60 * 24 * 320) },
      { expected: '2 years ago',       lastTime: fakeNow - (1000 * 60 * 60 * 24 * 548) }
    ].forEach(function(scenario) {

      it('returns the correctly formatted time when the last time is ' + scenario.expected, function() {
        this.set('event', {
          title: 'An event title',
          lastTime: moment(scenario.lastTime)
        });
        this.render(hbs`{{event-item event=event}}`);

        assert.strictEqual(this.$().text().trim(), 'An event title ' + scenario.expected);
      });

    });
  });
});
