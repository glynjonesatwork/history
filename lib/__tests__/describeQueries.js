'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _Actions = require('../Actions');

var _useQueries = require('../useQueries');

var _useQueries2 = _interopRequireDefault(_useQueries);

var _execSteps = require('./execSteps');

var _execSteps2 = _interopRequireDefault(_execSteps);

function stripHash(path) {
  return path.replace(/^#/, '');
}

function describeQueries(createHistory) {
  describe('default query serialization', function () {
    var history = undefined,
        unlisten = undefined;
    beforeEach(function () {
      history = _useQueries2['default'](createHistory)();
    });

    afterEach(function () {
      if (unlisten) unlisten();
    });

    describe('in pushState', function () {
      it('works', function (done) {
        var steps = [function (location) {
          _expect2['default'](location.pathname).toEqual('/');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.query).toEqual({});
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.POP);

          history.pushState({ the: 'state' }, '/home', { the: 'query value' });
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('?the=query+value');
          _expect2['default'](location.query).toEqual({ the: 'query value' });
          _expect2['default'](location.state).toEqual({ the: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.PUSH);
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });
    });

    describe('in push', function () {
      it('works', function (done) {
        var steps = [function (location) {
          _expect2['default'](location.pathname).toEqual('/');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.query).toEqual({});
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.POP);

          history.push({
            pathname: '/home',
            query: { the: 'query value' },
            state: { the: 'state' }
          });
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('?the=query+value');
          _expect2['default'](location.query).toEqual({ the: 'query value' });
          _expect2['default'](location.state).toEqual({ the: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.PUSH);

          history.push(_extends({}, location, {
            query: { other: 'query value' },
            state: { other: 'state' }
          }));
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('?other=query+value');
          _expect2['default'](location.query).toEqual({ other: 'query value' });
          _expect2['default'](location.state).toEqual({ other: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.PUSH);

          history.push(_extends({}, location, {
            query: {},
            state: { other: 'state' }
          }));
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.query).toEqual({});
          _expect2['default'](location.state).toEqual({ other: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.PUSH);
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });
    });

    describe('in replaceState', function () {
      it('works', function (done) {
        var steps = [function (location) {
          _expect2['default'](location.pathname).toEqual('/');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.query).toEqual({});
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.POP);

          history.replaceState({ the: 'state' }, '/home', { the: 'query value' });
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('?the=query+value');
          _expect2['default'](location.query).toEqual({ the: 'query value' });
          _expect2['default'](location.state).toEqual({ the: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.REPLACE);
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });
    });

    describe('in replace', function () {
      it('works', function (done) {
        var steps = [function (location) {
          _expect2['default'](location.pathname).toEqual('/');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.query).toEqual({});
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.POP);

          history.replace({
            pathname: '/home',
            query: { the: 'query value' },
            state: { the: 'state' }
          });
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('?the=query+value');
          _expect2['default'](location.query).toEqual({ the: 'query value' });
          _expect2['default'](location.state).toEqual({ the: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.REPLACE);

          history.replace(_extends({}, location, {
            query: { other: 'query value' },
            state: { other: 'state' }
          }));
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('?other=query+value');
          _expect2['default'](location.query).toEqual({ other: 'query value' });
          _expect2['default'](location.state).toEqual({ other: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.REPLACE);
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });
    });

    describe('in createPath', function () {
      it('works', function () {
        _expect2['default'](history.createPath({
          pathname: '/the/path',
          query: { the: 'query value' }
        })).toEqual('/the/path?the=query+value');
      });

      it('does not strip trailing slash', function () {
        _expect2['default'](history.createPath({
          pathname: '/the/path/',
          query: { the: 'query value' }
        })).toEqual('/the/path/?the=query+value');
      });

      it('works with deprecated query arg', function () {
        _expect2['default'](history.createPath('/the/path', { the: 'query value' })).toEqual('/the/path?the=query+value');
      });

      describe('when the path contains a hash', function () {
        it('puts the query before the hash', function () {
          _expect2['default'](history.createPath({
            pathname: '/the/path',
            hash: '#the-hash',
            query: { the: 'query value' }
          })).toEqual('/the/path?the=query+value#the-hash');
        });
      });

      describe('when there is already an existing search', function () {
        it('preserves the existing search', function () {
          _expect2['default'](history.createPath({
            pathname: '/the/path',
            search: '?a=one',
            query: { the: 'query value' }
          })).toEqual('/the/path?a=one&the=query+value');
        });
      });

      describe('in createLocation', function () {
        it('works with string', function () {
          var location = history.createLocation('/the/path?the=query');

          _expect2['default'](location.pathname).toEqual('/the/path');
          _expect2['default'](location.query).toEqual({ the: 'query' });
          _expect2['default'](location.search).toEqual('?the=query');
        });

        it('works with object with query', function () {
          var location = history.createLocation({
            pathname: '/the/path',
            query: { the: 'query' }
          });

          _expect2['default'](location.pathname).toEqual('/the/path');
          _expect2['default'](location.query).toEqual({ the: 'query' });
          _expect2['default'](location.search).toEqual('?the=query');
        });

        it('works with object without query', function () {
          var location = history.createLocation({
            pathname: '/the/path'
          });

          _expect2['default'](location.pathname).toEqual('/the/path');
          _expect2['default'](location.query).toEqual({});
          _expect2['default'](location.search).toEqual('');
        });

        it('works with explicit undefined values in query', function () {
          var location = history.createLocation({
            pathname: '/the/path',
            query: { the: undefined }
          });

          _expect2['default'](location.pathname).toEqual('/the/path');
          _expect2['default'](location.query).toEqual({ the: undefined });
          _expect2['default'](location.search).toEqual('');
        });
      });
    });

    describe('in createHref', function () {
      it('works', function () {
        _expect2['default'](stripHash(history.createHref({
          pathname: '/the/path',
          query: { the: 'query value' }
        }))).toEqual('/the/path?the=query+value');
      });

      it('works with deprecated query arg', function () {
        _expect2['default'](stripHash(history.createHref('/the/path', { the: 'query value' }))).toEqual('/the/path?the=query+value');
      });
    });
  });

  describe('custom query serialization', function () {
    var history = undefined,
        unlisten = undefined;
    beforeEach(function () {
      history = _useQueries2['default'](createHistory)({
        parseQueryString: function parseQueryString() {
          return 'PARSE_QUERY_STRING';
        },
        stringifyQuery: function stringifyQuery() {
          return 'STRINGIFY_QUERY';
        }
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
          _expect2['default'](location.query).toEqual('PARSE_QUERY_STRING');
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.POP);

          history.pushState({ the: 'state' }, '/home', { the: 'query' });
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('?STRINGIFY_QUERY');
          _expect2['default'](location.query).toEqual('PARSE_QUERY_STRING');
          _expect2['default'](location.state).toEqual({ the: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.PUSH);
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });
    });

    describe('in push', function () {
      it('works', function (done) {
        var steps = [function (location) {
          _expect2['default'](location.pathname).toEqual('/');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.query).toEqual('PARSE_QUERY_STRING');
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.POP);

          history.push({
            pathname: '/home',
            query: { the: 'query' },
            state: { the: 'state' }
          });
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('?STRINGIFY_QUERY');
          _expect2['default'](location.query).toEqual('PARSE_QUERY_STRING');
          _expect2['default'](location.state).toEqual({ the: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.PUSH);
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });
    });

    describe('in replaceState', function () {
      it('works', function (done) {
        var steps = [function (location) {
          _expect2['default'](location.pathname).toEqual('/');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.query).toEqual('PARSE_QUERY_STRING');
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.POP);

          history.replaceState({ the: 'state' }, '/home', { the: 'query' });
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('?STRINGIFY_QUERY');
          _expect2['default'](location.query).toEqual('PARSE_QUERY_STRING');
          _expect2['default'](location.state).toEqual({ the: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.REPLACE);
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });
    });

    describe('in replace', function () {
      it('works', function (done) {
        var steps = [function (location) {
          _expect2['default'](location.pathname).toEqual('/');
          _expect2['default'](location.search).toEqual('');
          _expect2['default'](location.query).toEqual('PARSE_QUERY_STRING');
          _expect2['default'](location.state).toEqual(null);
          _expect2['default'](location.action).toEqual(_Actions.POP);

          history.replace({
            pathname: '/home',
            query: { the: 'query' },
            state: { the: 'state' }
          });
        }, function (location) {
          _expect2['default'](location.pathname).toEqual('/home');
          _expect2['default'](location.search).toEqual('?STRINGIFY_QUERY');
          _expect2['default'](location.query).toEqual('PARSE_QUERY_STRING');
          _expect2['default'](location.state).toEqual({ the: 'state' });
          _expect2['default'](location.action).toEqual(_Actions.REPLACE);
        }];

        unlisten = history.listen(_execSteps2['default'](steps, done));
      });
    });

    describe('in createPath', function () {
      it('works', function () {
        _expect2['default'](history.createPath({
          pathname: '/the/path',
          query: { the: 'query' }
        })).toEqual('/the/path?STRINGIFY_QUERY');
      });

      it('does not strip trailing slash', function () {
        _expect2['default'](history.createPath({
          pathname: '/the/path/',
          query: { the: 'query' }
        })).toEqual('/the/path/?STRINGIFY_QUERY');
      });

      describe('when the path contains a hash', function () {
        it('puts the query before the hash', function () {
          _expect2['default'](history.createPath({
            pathname: '/the/path',
            hash: '#the-hash',
            query: { the: 'query' }
          })).toEqual('/the/path?STRINGIFY_QUERY#the-hash');
        });
      });

      describe('when there is already an existing search', function () {
        it('preserves the existing search', function () {
          _expect2['default'](history.createPath({
            pathname: '/the/path',
            search: '?a=one',
            query: { the: 'query' }
          })).toEqual('/the/path?a=one&STRINGIFY_QUERY');
        });
      });
    });

    describe('in createHref', function () {
      it('works', function () {
        _expect2['default'](stripHash(history.createHref({
          pathname: '/the/path',
          query: { the: 'query' }
        }))).toEqual('/the/path?STRINGIFY_QUERY');
      });
    });
  });
}

exports['default'] = describeQueries;
module.exports = exports['default'];