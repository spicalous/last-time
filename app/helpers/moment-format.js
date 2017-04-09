import Ember from 'ember';

export function momentFormat(params/*, hash*/) {
  const moment = params[0];
  const format = params[1] || "MMMM Do YYYY - HH:mm:ss";

  return moment.format(format);
}

export default Ember.Helper.helper(momentFormat);
