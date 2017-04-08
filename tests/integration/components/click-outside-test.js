import { assert } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

describe('Integration | Component | click outside', function() {

  setupComponentTest('click-outside', {
    integration: true
  });

  describe('smoke test', function() {

    let assertionCount;

    beforeEach(function() {
      assertionCount = 0;
    });

    afterEach(function() {
      assert.strictEqual(assertionCount, 1);
    });

    //TODO Make this test pass!
    it.skip('click outside', function() {
      this.set('didClickOutside', function() {
        assert.ok('`didClickOutside` fired only once');
        assertionCount++;
      });

      this.render(hbs`
        <div class="outside">Somewhere, over the rainbow...</div>
        {{#click-outside action=(action didClickOutside)}}
          <div class="inside">We're in</div>
        {{/click-outside}}
      `);

      // It's important to fire the actions in the next run loop. Failing to do so
      // would make the outside click not to fire. The reason for this is more
      // often than not the component is rendered as a result of some user
      // interaction, mainly a click. If the component attached the outside click
      // event handler in the same loop, the handler would catch the event and send
      // the action immediately.
      Ember.run.next(()=> {
        this.$('.inside').click();
        this.$('.outside').click();
      });
    });

  });
});
