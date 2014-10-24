/*jshint browserify: true, -W014 */
'use strict';
var axn = require('axn');
module.exports = createStore;

function createStore(emptyValue, prepare) {
  var action = axn();
  var state = emptyValue;
  function store(value) {
    if (value !== undefined) {
      state = (
        value === null
        ? emptyValue
        : (prepare ? prepare(value) : value)
      );
      action(state);
    }
    return state;
  }
  store.listen = action.listen.bind(action);
  store.unlisten = action.unlisten.bind(action);
  store.isEmpty = () => (state === emptyValue);
  return store;
}