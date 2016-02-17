'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _Actions = require('../Actions');

var _createMemoryHistory = require('../createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

function describeInitialLocation(createHistory) {
  describe('location has key on initial pop', function () {
    var unlisten = undefined,
        history = undefined;
    beforeEach(function () {
      history = createHistory();
    });

    afterEach(function () {
      if (unlisten) unlisten();
    });

    it('replaces state if location key is missing', function (done) {
      unlisten = history.listen(function (location) {
        try {
          _expect2['default'](location.action).toEqual(_Actions.POP);
          _expect2['default'](location.key).toNotEqual(null);
          _expect2['default'](location.state).toEqual(null);
          done();
        } catch (error) {
          done(error);
        }
      });
    });

    it('emits POP with current location key', function (done) {
      // set initial state, this is needed because all implementations gets state from different places
      history.push({
        pathname: '/',
        state: { initial: 'state' }
      });

      // now create history for testing if initial POP event has location.key
      history = createHistory();

      unlisten = history.listen(function (location) {
        try {
          _expect2['default'](location.action).toEqual(_Actions.POP);
          _expect2['default'](location.key).toNotEqual(null);

          if (createHistory === _createMemoryHistory2['default']) {
            // MemoryHistory does not share state storage between
            // instances, so we can't expect the state to be there.
            _expect2['default'](location.state).toEqual(null);
          } else {
            _expect2['default'](location.state).toEqual({ initial: 'state' });
          }

          done();
        } catch (error) {
          done(error);
        }
      });
    });
  });
}

exports['default'] = describeInitialLocation;
module.exports = exports['default'];