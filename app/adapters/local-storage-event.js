import LSAdapter from 'ember-localstorage-adapter';
import ENV from 'last-time/config/environment';

export default LSAdapter.extend({
  namespace: ENV.environment === 'test' ? 'local-storage-event-test': 'local-storage-event'
});
