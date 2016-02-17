'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _createHistory = require('../createHistory');

var _createHistory2 = _interopRequireDefault(_createHistory);

var _createLocation = require('../createLocation');

var _createLocation2 = _interopRequireDefault(_createLocation);

var _Actions = require('../Actions');

describe('a location', function () {
  it('knows its pathname', function () {
    var location = _createLocation2['default']('/home?the=query#the-hash');
    _expect2['default'](location.pathname).toEqual('/home');
  });

  it('knows its search string', function () {
    var location = _createLocation2['default']('/home?the=query#the-hash');
    _expect2['default'](location.search).toEqual('?the=query');
  });

  it('knows its hash', function () {
    var location = _createLocation2['default']('/home?the=query#the-hash');
    _expect2['default'](location.hash).toEqual('#the-hash');
  });

  it('compensates if the location is fully qualified', function () {
    var location = _createLocation2['default']('https://example.com/home');
    _expect2['default'](location.pathname).toEqual('/home');
  });

  it('does not strip URL-like strings in the query', function () {
    var location = _createLocation2['default']('/home?redirect=https://example.com/');
    _expect2['default'](location.pathname).toEqual('/home');
    _expect2['default'](location.search).toEqual('?redirect=https://example.com/');
  });

  it('has null state by default', function () {
    var location = _createLocation2['default']();
    _expect2['default'](location.state).toBe(null);
  });

  it('uses pop navigation by default', function () {
    var location = _createLocation2['default']();
    _expect2['default'](location.action).toBe(_Actions.POP);
  });

  it('has a null key by default', function () {
    var location = _createLocation2['default']();
    _expect2['default'](location.key).toBe(null);
  });

  describe('created by a history object', function () {
    var history = undefined;
    beforeEach(function () {
      history = _createHistory2['default']();
    });

    it('has a key by default', function () {
      var location = history.createLocation();
      _expect2['default'](location.key).toExist();
    });
  });
});

describe('creating a location with an object', function () {
  it('puts the pathname, search, and hash in the proper order', function () {
    var location = _createLocation2['default']({
      pathname: '/the/path',
      search: '?the=query',
      hash: '#the-hash'
    });

    _expect2['default'](location.pathname).toEqual('/the/path');
    _expect2['default'](location.search).toEqual('?the=query');
    _expect2['default'](location.hash).toEqual('#the-hash');
  });
});