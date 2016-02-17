'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _Actions = require('../Actions');

var _execSteps = require('./execSteps');

var _execSteps2 = _interopRequireDefault(_execSteps);

function describeTransitions(createHistory) {
  describe('a synchronous transition hook', function () {
    var history = undefined,
        unlisten = undefined,
        unlistenBefore = undefined;
    beforeEach(function () {
      history = createHistory();
    });

    afterEach(function () {
      if (unlistenBefore) unlistenBefore();

      if (unlisten) unlisten();
    });

    it('receives the next location', function (done) {
      var steps = [function () {
        history.push({
          pathname: '/home',
          search: '?the=query',
          state: { the: 'state' }
        });
      }, function (location) {
        _expect2['default'](nextLocation).toBe(location);
      }];

      var nextLocation = undefined;
      unlistenBefore = history.listenBefore(function (location) {
        nextLocation = location;
      });

      unlisten = history.listen(_execSteps2['default'](steps, done));
    });
  });

  describe('an asynchronous transition hook', function () {
    var history = undefined,
        unlisten = undefined,
        unlistenBefore = undefined;
    beforeEach(function () {
      history = createHistory();
    });

    afterEach(function () {
      if (unlistenBefore) unlistenBefore();

      if (unlisten) unlisten();
    });

    it('receives the next location', function (done) {
      var steps = [function () {
        history.push({
          pathname: '/home',
          search: '?the=query',
          state: { the: 'state' }
        });
      }, function (location) {
        _expect2['default'](nextLocation).toBe(location);
      }];

      var nextLocation = undefined;
      unlistenBefore = history.listenBefore(function (location, callback) {
        nextLocation = location;
        setTimeout(callback);
      });

      unlisten = history.listen(_execSteps2['default'](steps, done));
    });
  });

  describe('when the user confirms a transition', function () {
    var confirmationMessage = undefined,
        location = undefined,
        history = undefined,
        unlisten = undefined,
        unlistenBefore = undefined;
    beforeEach(function () {
      location = null;
      confirmationMessage = 'Are you sure?';

      history = createHistory({
        getUserConfirmation: function getUserConfirmation(message, callback) {
          _expect2['default'](message).toBe(confirmationMessage);
          callback(true);
        }
      });

      unlistenBefore = history.listenBefore(function () {
        return confirmationMessage;
      });

      unlisten = history.listen(function (loc) {
        location = loc;
      });
    });

    afterEach(function () {
      if (unlistenBefore) unlistenBefore();

      if (unlisten) unlisten();
    });

    it('updates the location', function () {
      var prevLocation = location;
      history.push({
        pathname: '/home',
        search: '?the=query',
        state: { the: 'state' }
      });
      _expect2['default'](prevLocation).toNotBe(location);

      _assert2['default'](location);
      _expect2['default'](location.pathname).toEqual('/home');
      _expect2['default'](location.search).toEqual('?the=query');
      _expect2['default'](location.state).toEqual({ the: 'state' });
      _expect2['default'](location.action).toEqual(_Actions.PUSH);
      _assert2['default'](location.key);
    });
  });

  describe('when the user cancels a transition', function () {
    var confirmationMessage = undefined,
        location = undefined,
        history = undefined,
        unlisten = undefined,
        unlistenBefore = undefined;
    beforeEach(function () {
      location = null;
      confirmationMessage = 'Are you sure?';

      history = createHistory({
        getUserConfirmation: function getUserConfirmation(message, callback) {
          _expect2['default'](message).toBe(confirmationMessage);
          callback(false);
        }
      });

      unlistenBefore = history.listenBefore(function () {
        return confirmationMessage;
      });

      unlisten = history.listen(function (loc) {
        location = loc;
      });
    });

    afterEach(function () {
      if (unlistenBefore) unlistenBefore();

      if (unlisten) unlisten();
    });

    it('does not update the location', function () {
      var prevLocation = location;
      history.push('/home');
      _expect2['default'](prevLocation).toBe(location);
    });
  });

  describe('when the transition hook cancels a transition', function () {
    var location = undefined,
        history = undefined,
        unlisten = undefined,
        unlistenBefore = undefined;
    beforeEach(function () {
      location = null;

      history = createHistory();

      unlistenBefore = history.listenBefore(function () {
        return false;
      });

      unlisten = history.listen(function (loc) {
        location = loc;
      });
    });

    afterEach(function () {
      if (unlistenBefore) unlistenBefore();

      if (unlisten) unlisten();
    });

    it('does not update the location', function () {
      var prevLocation = location;
      history.push('/home');
      _expect2['default'](prevLocation).toBe(location);
    });
  });
}

exports['default'] = describeTransitions;
module.exports = exports['default'];