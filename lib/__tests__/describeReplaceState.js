'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _Actions = require('../Actions');

var _execSteps = require('./execSteps');

var _execSteps2 = _interopRequireDefault(_execSteps);

function describeReplaceState(createHistory) {
  describe('replaceState', function () {
    var history = undefined,
        unlisten = undefined;
    beforeEach(function () {
      history = createHistory();
    });

    afterEach(function () {
      if (unlisten) unlisten();
    });

    it('calls change listeners with the new location', function (done) {
      var steps = [function (location) {
        _expect2['default'](location.pathname).toEqual('/');
        _expect2['default'](location.search).toEqual('');
        _expect2['default'](location.state).toEqual(null);
        _expect2['default'](location.action).toEqual(_Actions.POP);

        history.replaceState({ the: 'state' }, '/home?the=query');
      }, function (location) {
        _expect2['default'](location.pathname).toEqual('/home');
        _expect2['default'](location.search).toEqual('?the=query');
        _expect2['default'](location.state).toEqual({ the: 'state' });
        _expect2['default'](location.action).toEqual(_Actions.REPLACE);
      }];

      unlisten = history.listen(_execSteps2['default'](steps, done));
    });
  });
}

exports['default'] = describeReplaceState;
module.exports = exports['default'];