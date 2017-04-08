import { assert } from 'chai';
import { describe, it } from 'mocha';
import Ember from 'ember';
import ClickOutsideMixin from 'last-time/mixins/click-outside';

describe('Unit | Mixin | click outside', function() {
  // Replace this with your real tests.
  it('works', function() {
    let ClickOutsideObject = Ember.Object.extend(ClickOutsideMixin);
    let subject = ClickOutsideObject.create();
    assert.ok(subject);
  });
});
