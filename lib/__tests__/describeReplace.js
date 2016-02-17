'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _Actions = require('../Actions');

var _execSteps = require('./execSteps');

var _execSteps2 = _interopRequireDefault(_execSteps);

function describeReplace(createHistory) {
  describe('replace', function () {
    var history = undefined,
        unlisten = undefined;
    beforeEach(function () {
      history = createHistory();
    });

    afterEach(function () {
      if (unlisten) unlisten();
    });

    describe('with a path string', function () {
      it('calls change listeners with the new location', function (done) {
        var steps = [function (location) {
          _expect2['default'](location.pathname).toEqual('/');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.POP);

          history.replace('/home?the=query');
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('?the=query');
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.REPLACE);
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });
    });

    describe('with a path object', function () {
      it('calls change listeners with the new location', function (done) {
        var steps = [function (location) {
          _expect2['default'](location.pathname).toEqual('/');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.POP);

          history.replace({
            pathname: '/home',
            search: '?the=query',
            state: { the: 'state' }
          });
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('?the=query');
          _expect2['default'](location.state).toEqual({ the: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.REPLACE);
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });

      it('correctly merges with old location', function (done) {
        var oldLocation = undefined;

        var steps = [function (location) {
          _expect2['default'](location.pathname).toEqual('/');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.POP);

          oldLocation = location;

          history.replace(_extends({}, location, {
            search: '?the=query',
            state: { the: 'state' }
          }));
        }, function (location) {
          _expect2['default'](location.pathname).toEqual(oldLocation.pathname);
          _expect2['default'](location.search).toEqual('?the=query');
          _expect2['default'](location.state).toEqual({ the: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.REPLACE);
          _expect2['default'](location.key).toNotEqual(oldLocation.key);
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });
    });
  });
}

exports['default'] = describeReplace;
module.exports = exports['default'];