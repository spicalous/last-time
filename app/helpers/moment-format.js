import Ember from 'ember';
import moment from 'moment';

export function momentFormat(params/*, hash*/) {
  const momentObject = moment.isMoment(params[0]) ? params[0] : moment(params[0]);
  const format = params[1] || "MMMM Do YYYY - HH:mm:ss";

  return momentObject.format(format);
}

export default Ember.Helper.helper(momentFormat);
