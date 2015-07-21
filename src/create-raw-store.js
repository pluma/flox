/*jshint browserify: true, -W014 */
'use strict';
var axn = require('axn');

module.exports = function createRawStore(
  emptyValue=null,
  prepare=(v => v),
  isEmpty=((v, emptyValue) => v === emptyValue)
) {
  var action = axn();
  var emptyAction = axn();
  var state = emptyValue;
  function store(value) {
    if (value !== undefined) {
      state = value === null ? emptyValue : prepare(value);
      action(state);
      emptyAction(isEmpty(state, emptyValue));
    }
    return state;
  }
  store.listen = ::action.listen;
  store.unlisten = ::action.unlisten;
  store.isEmpty = () => isEmpty(state, emptyValue);
  store.isEmpty.listen = ::emptyAction.listen;
  store.isEmpty.unlisten = ::emptyAction.unlisten;
  store.toJSON = () => state && state.toJSON ? state.toJSON() : state;
  return store;
};