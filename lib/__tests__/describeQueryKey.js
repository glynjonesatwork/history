'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _Actions = require('../Actions');

var _execSteps = require('./execSteps');

var _execSteps2 = _interopRequireDefault(_execSteps);

function describeQueryKey(createHistory) {
  describe('when the user does not want to persist a state', function () {
    var history = undefined,
        unlisten = undefined;
    beforeEach(function () {
      history = createHistory({ queryKey: false });
    });

    afterEach(function () {
      if (unlisten) unlisten();
    });

    it('forgets state across transitions', function (done) {
      var steps = [function (location) {
        _expect2['default'](location.pathname).toEqual('/');
        _expect2['default'](location.search).toEqual('');
        _expect2['default'](location.state).toEqual(null);
        _expect2['default'](location.action).toEqual(_Actions.POP);

        history.push('/home?the=query');
      }, function (location) {
        _expect2['default'](location.pathname).toEqual('/home');
        _expect2['default'](location.search).toEqual('?the=query');
        _expect2['default'](location.state).toEqual(null);
        _expect2['default'](location.action).toEqual(_Actions.PUSH);

        history.goBack();
      }, function (location) {
        _expect2['default'](location.pathname).toEqual('/');
        _expect2['default'](location.search).toEqual('');
        _expect2['default'](location.state).toEqual(null);
        _expect2['default'](location.action).toEqual(_Actions.POP);

        history.goForward();
      }, function (location) {
        _expect2['default'](location.pathname).toEqual('/home');
        _expect2['default'](location.search).toEqual('?the=query');
        _expect2['default'](location.state).toEqual(null); // State is missing.
        _expect2['default'](location.action).toEqual(_Actions.POP);
      }];

      unlisten = history.listen(_execSteps2['default'](steps, done));
    });
  });

  describe('when the user wants to persist state', function () {
    var history = undefined,
        unlisten = undefined;
    beforeEach(function () {
      history = createHistory({ queryKey: 'a' });
    });

    afterEach(function () {
      if (unlisten) unlisten();
    });

    it('remembers state across transitions', function (done) {
      var steps = [function (location) {
        _expect2['default'](location.pathname).toEqual('/');
        _expect2['default'](location.search).toEqual('');
        _expect2['default'](location.state).toEqual(null);
        _expect2['default'](location.action).toEqual(_Actions.POP);

        history.push({
          pathname: '/home',
          search: '?the=query',
          state: { the: 'state' }
        });
      }, function (location) {
        _expect2['default'](location.pathname).toEqual('/home');
        _expect2['default'](location.search).toEqual('?the=query');
        _expect2['default'](location.state).toEqual({ the: 'state' });
        _expect2['default'](location.action).toEqual(_Actions.PUSH);

        history.goBack();
      }, function (location) {
        _expect2['default'](location.pathname).toEqual('/');
        _expect2['default'](location.search).toEqual('');
        _expect2['default'](location.state).toEqual(null);
        _expect2['default'](location.action).toEqual(_Actions.POP);

        history.goForward();
      }, function (location) {
        _expect2['default'](location.pathname).toEqual('/home');
        _expect2['default'](location.search).toEqual('?the=query');
        _expect2['default'](location.state).toEqual({ the: 'state' }); // State is present.
        _expect2['default'](location.action).toEqual(_Actions.POP);
      }];

      unlisten = history.listen(_execSteps2['default'](steps, done));
    });
  });
}

exports['default'] = describeQueryKey;
module.exports = exports['default'];