'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _Actions = require('../Actions');

var _useBasename = require('../useBasename');

var _useBasename2 = _interopRequireDefault(_useBasename);

var _execSteps = require('./execSteps');

var _execSteps2 = _interopRequireDefault(_execSteps);

function stripHash(path) {
  return path.replace(/^#/, '');
}

function describeBasename(createHistory) {
  describe('basename handling', function () {
    var history = undefined,
        unlisten = undefined;
    beforeEach(function () {
      history = _useBasename2['default'](createHistory)({
        basename: '/base/url'
      });
    });

    afterEach(function () {
      if (unlisten) unlisten();
    });

    describe('in pushState', function () {
      it('works', function (done) {
        var steps = [function (location) {
          _expect2['default'](location.pathname).toEqual('/');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.POP);
          _expect2['default'](location.basename).toEqual('');

          history.pushState({ the: 'state' }, '/home');
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual({ the: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.PUSH);
          _expect2['default'](location.basename).toEqual('/base/url');
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });
    });

    describe('in push', function () {
      it('works with string', function (done) {
        var steps = [function (location) {
          _expect2['default'](location.pathname).toEqual('/');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.POP);
          _expect2['default'](location.basename).toEqual('');

          history.push('/home');
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.PUSH);
          _expect2['default'](location.basename).toEqual('/base/url');
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });

      it('works with object', function (done) {
        var steps = [function (location) {
          _expect2['default'](location.pathname).toEqual('/');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.POP);
          _expect2['default'](location.basename).toEqual('');

          history.push({
            pathname: '/home',
            state: { the: 'state' }
          });
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual({ the: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.PUSH);
          _expect2['default'](location.basename).toEqual('/base/url');

          history.push(_extends({}, location, {
            pathname: '/foo'
          }));
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/foo');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual({ the: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.PUSH);
          _expect2['default'](location.basename).toEqual('/base/url');
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });
    });

    describe('in replaceState', function () {
      it('works', function (done) {
        var steps = [function (location) {
          _expect2['default'](location.pathname).toEqual('/');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.POP);
          _expect2['default'](location.basename).toEqual('');

          history.replaceState({ the: 'state' }, '/home');
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual({ the: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.REPLACE);
          _expect2['default'](location.basename).toEqual('/base/url');
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });
    });

    describe('in replace', function () {
      it('works with string', function (done) {
        var steps = [function (location) {
          _expect2['default'](location.pathname).toEqual('/');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.POP);
          _expect2['default'](location.basename).toEqual('');

          history.replace('/home');
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.REPLACE);
          _expect2['default'](location.basename).toEqual('/base/url');
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });

      it('works with object', function (done) {
        var steps = [function (location) {
          _expect2['default'](location.pathname).toEqual('/');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.POP);
          _expect2['default'](location.basename).toEqual('');

          history.replace({
            pathname: '/home',
            state: { the: 'state' }
          });
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual({ the: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.REPLACE);
          _expect2['default'](location.basename).toEqual('/base/url');

          history.replace(_extends({}, location, {
            pathname: '/foo'
          }));
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/foo');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual({ the: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.REPLACE);
          _expect2['default'](location.basename).toEqual('/base/url');
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });
    });

    describe('in createPath', function () {
      it('works', function () {
        _expect2['default'](history.createPath('/the/path')).toEqual('/base/url/the/path');
      });
    });

    describe('in createHref', function () {
      it('works', function () {
        _expect2['default'](stripHash(history.createHref('/the/path'))).toEqual('/base/url/the/path');
      });
    });

    describe('in createLocation', function () {
      it('works with string', function () {
        var location = history.createLocation('/the/path');

        _expect2['default'](location.pathname).toEqual('/the/path');
        _expect2['default'](location.basename).toEqual('/base/url');
      });

      it('works with object without query', function () {
        var location = history.createLocation({
          pathname: '/the/path'
        });

        _expect2['default'](location.pathname).toEqual('/the/path');
        _expect2['default'](location.basename).toEqual('/base/url');
      });
    });
  });

  describe('basename through <base href>', function () {
    var history = undefined,
        unlisten = undefined,
        base = undefined;

    before('add base element', function () {
      base = document.createElement('base');
      base.href = '/base/url';
      document.head.appendChild(base);
    });

    beforeEach(function () {
      history = _useBasename2['default'](createHistory)();
    });

    describe('in createPath', function () {
      it('works', function () {
        _expect2['default'](history.createPath('/the/path')).toEqual('/base/url/the/path');
      });
    });

    describe('in createHref', function () {
      it('works', function () {
        _expect2['default'](stripHash(history.createHref('/the/path'))).toEqual('/base/url/the/path');
      });
    });

    describe('in push', function () {
      it('works', function (done) {
        var steps = [function (location) {
          _expect2['default'](location.pathname).toEqual('/');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.POP);
          _expect2['default'](location.basename).toEqual('');

          history.push({
            pathname: '/home',
            state: { the: 'state' }
          });
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.state).toEqual({ the: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.PUSH);
          _expect2['default'](location.basename).toEqual('/base/url');
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });
    });

    afterEach(function () {
      if (unlisten) unlisten();
    });

    after(function () {
      document.head.removeChild(base);
    });
  });
}

exports['default'] = describeBasename;
module.exports = exports['default'];