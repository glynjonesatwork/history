'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _Actions = require('../Actions');

var _execSteps = require('./execSteps');

var _execSteps2 = _interopRequireDefault(_execSteps);

function describeHashSupport(createHistory) {
  describe('when a URL with a hash is pushed', function () {
    var history = undefined,
        unlisten = undefined;
    beforeEach(function () {
      history = createHistory();
    });

    afterEach(function () {
      if (unlisten) unlisten();
    });

    it('preserves the hash', function (done) {
      var steps = [function (location) {
        _expect2['default'](location.pathname).toEqual('/');
        _expect2['default'](location.search).toEqual('');
        _expect2['default'](location.hash).toEqual('');
        _expect2['default'](location.state).toEqual(null);
        _expect2['default'](location.action).toEqual(_Actions.POP);

        history.push({
          pathname: '/home',
          search: '?the=query',
          hash: '#the-hash',
          state: { the: 'state' }
        });
      }, function (location) {
        _expect2['default'](location.pathname).toEqual('/home');
        _expect2['default'](location.search).toEqual('?the=query');
        _expect2['default'](location.hash).toEqual('#the-hash');
        _expect2['default'](location.state).toEqual({ the: 'state' });
        _expect2['default'](location.action).toEqual(_Actions.PUSH);
      }];

      unlisten = history.listen(_execSteps2['default'](steps, done));
    });

    it('does not convert PUSH to REPLACE if path does not change', function (done) {
      var steps = [function (location) {
        _expect2['default'](location.pathname).toEqual('/');
        _expect2['default'](location.search).toEqual('');
        _expect2['default'](location.hash).toEqual('');
        _expect2['default'](location.state).toEqual(null);
        _expect2['default'](location.action).toEqual(_Actions.POP);

        history.push('/#the-hash');
      }, function (location) {
        _expect2['default'](location.pathname).toEqual('/');
        _expect2['default'](location.search).toEqual('');
        _expect2['default'](location.hash).toEqual('#the-hash');
        _expect2['default'](location.state).toEqual(null);
        _expect2['default'](location.action).toEqual(_Actions.PUSH);
      }];

      unlisten = history.listen(_execSteps2['default'](steps, done));
    });
  });
}

exports['default'] = describeHashSupport;
module.exports = exports['default'];