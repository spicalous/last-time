import { assert } from 'chai';
import { describe, it } from 'mocha';
import { momentFormat } from 'last-time/helpers/moment-format';
import moment from "moment";

describe('Unit | Helper | moment format', function() {

  it('formats the moment object with the default format', function() {
    let result = momentFormat([ moment("1992-09-12") ]);
    assert.strictEqual(result, "September 12th 1992 - 00:00:00");
  });

  it('formats the moment object with specified format', function() {
    let result = momentFormat([ moment("1992-09-12"), "ddd, hA" ]);
    assert.strictEqual(result, "Sat, 12AM");
  });

});

