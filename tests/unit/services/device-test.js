import { assert } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Service | device', function() {

  setupTest('service:device', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  it('exists', function() {
    let service = this.subject();
    assert.ok(service);
  });

});
