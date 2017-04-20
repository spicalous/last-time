import { assert } from 'chai';
import { describe, it } from 'mocha';
import { setupModelTest } from 'ember-mocha';

describe('Unit | Model | local storage event', function() {
  setupModelTest('local-storage-event', {
    // Specify the other units that are required for this test.
      needs: []
  });

  // Replace this with your real tests.
  it('exists', function() {
    let model = this.subject();
    assert.ok(model);
  });
});
