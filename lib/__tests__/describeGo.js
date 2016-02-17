'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _Actions = require('../Actions');

var _execSteps = require('./execSteps');

var _execSteps2 = _interopRequireDefault(_execSteps);

function describeGo(createHistory) {
  describe('go', function () {
    var history = undefined,
        unlisten = undefined;
    beforeEach(function () {
      history = createHistory();
    });

    afterEach(function () {
      if (unlisten) unlisten();
    });

    describe('back', function () {
      it('calls change listeners with the previous location', function (done) {
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
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });
    });

    describe('forward', function () {
      it('calls change listeners with the next location', function (done) {
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
          _expect2['default'](location.state).toEqual({ the: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.POP);
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });
    });
  });
}

exports['default'] = describeGo;
module.exports = exports['default'];