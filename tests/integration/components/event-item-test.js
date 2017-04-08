import { assert } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import Ember from 'ember';

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

        assert.strictEqual(this.$('.event-item_text').text().trim(), 'An event title ' + scenario.expected);
      });

    });
  });

  describe('on a touch device', function() {

    let stubDeviceService;

    beforeEach(function() {
      stubDeviceService = Ember.Service.extend({ isTouch: true });
      this.register('service:device', stubDeviceService);
      this.inject.service('device');
      this.set('event', {
        title: 'An event title',
        lastTime: moment()
      });
      this.render(hbs`{{event-item event=event}}`);
    });

    it('always displays the delete button', function() {
      assert.strictEqual(this.$('button.close').length, 1);
    });

  });

  describe('an event-item component', function() {

    beforeEach(function() {
      this.set('event', {
        title: 'An event title',
        lastTime: moment()
      });
      this.render(hbs`{{event-item event=event}}`);
    });

    it('does not display the delete button by default', function() {
      assert.strictEqual(this.$('button.close').length, 0);
    });

    describe('on hover', function() {

      beforeEach(function() {
        this.$('div').trigger('mouseover');
      });

      it('displays the delete button', function() {
        assert.strictEqual(this.$('button.close').length, 1);
      });

      describe('clicking the delete button', function() {

        beforeEach(function() {
          this.$('button.close').click();
        });

        it('displays the delete confirm button when the delete button is clicked', function() {
          assert.strictEqual(this.$('.close-confirm').length, 1);
        });

        describe('and then clicking outside the delete button', function() {

          beforeEach(function() {
            this.$('div').click();
          });

          // TODO: Make this test pass!
          it.skip('hides the delete confirm button when clicked outside', function() {
            assert.strictEqual(this.$('.close-confirm').length, 0);
          });

        });
      });

      describe('hovering out after hovering in', function() {

        beforeEach(function() {
          this.$('div').trigger('mouseleave');
        });

        it('hides the delete button', function() {
          assert.strictEqual(this.$('button.close').length, 0);
        });

      });
    });

    describe('ensure assert', function() {

      let assertionCount;

      beforeEach(function() {
        assertionCount = 0;
      });

      afterEach(function() {
        assert.strictEqual(assertionCount, 1);
      });

      it('passes the event to the delete handler', function() {
        this.set('deleteAssert', (actual) => {
          assert.deepEqual(actual, this.get('event'));
          assertionCount++;
        });
        this.render(hbs`{{event-item event=event onDeleteEvent=deleteAssert}}`);

        this.$('div').trigger('mouseover');
        this.$('button.close').click();
        this.$('.close-confirm button').click();
      });

    });
  });
});
