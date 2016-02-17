'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _describeHistory = require('./describeHistory');

var _describeHistory2 = _interopRequireDefault(_describeHistory);

function describeDOMHistory(createHistory, goCausesReload) {
  _describeHistory2['default'](createHistory, goCausesReload);
}

exports['default'] = describeDOMHistory;
module.exports = exports['default'];