import { describe, it, beforeEach, afterEach } from 'mocha';
import { assert } from 'chai';
import startApp from 'last-time/tests/helpers/start-app';
import destroyApp from 'last-time/tests/helpers/destroy-app';
import MockLocalStorage from 'last-time/tests/helpers/mock-local-storage';

describe('Acceptance | index', function() {
  let application, mockLocalStorage;

  beforeEach(function() {
    application = startApp();
    mockLocalStorage = MockLocalStorage.mock();
  });

  afterEach(function() {
    mockLocalStorage.restore();
    destroyApp(application);
  });

  it('adds a new event', function(done) {
    visit('/');
    fillIn('input#last-time-input', 'My new event');
    triggerEvent('form', 'submit');

    return andThen(() => {
      assert.strictEqual(find('.event-item .event-item_text').text().trim(), 'My new event a few seconds ago');
      done();
    });
  });

  it('adds a new event if it does not exist already', function(done) {
    visit('/');
    fillIn('input#last-time-input', 'My new event');
    triggerEvent('form', 'submit');
    fillIn('input#last-time-input', 'My second new event');
    triggerEvent('form', 'submit');

    return andThen(() => {
      assert.lengthOf(find('.event-item'), 2);
      done();
    });
  });

  it('removes events', function(done) {
    visit('/');
    fillIn('input#last-time-input', 'My new event');
    triggerEvent('form', 'submit');
    triggerEvent('.event-item', 'mouseover');
    click('.event-item button[aria-label="Delete event"]');
    click('.event-item button[aria-label="Confirm delete"]');

    return andThen(() => {
      assert.lengthOf(find('.event-item'), 0);
      done();
    });
  });

});
