'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _DOMUtils = require('../DOMUtils');

var _createHashHistory = require('../createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _describeInitialLocation = require('./describeInitialLocation');

var _describeInitialLocation2 = _interopRequireDefault(_describeInitialLocation);

var _describeTransitions = require('./describeTransitions');

var _describeTransitions2 = _interopRequireDefault(_describeTransitions);

var _describePushState = require('./describePushState');

var _describePushState2 = _interopRequireDefault(_describePushState);

var _describePush = require('./describePush');

var _describePush2 = _interopRequireDefault(_describePush);

var _describeReplaceState = require('./describeReplaceState');

var _describeReplaceState2 = _interopRequireDefault(_describeReplaceState);

var _describeReplace = require('./describeReplace');

var _describeReplace2 = _interopRequireDefault(_describeReplace);

var _describePopState = require('./describePopState');

var _describePopState2 = _interopRequireDefault(_describePopState);

var _describeQueryKey = require('./describeQueryKey');

var _describeQueryKey2 = _interopRequireDefault(_describeQueryKey);

var _describeBasename = require('./describeBasename');

var _describeBasename2 = _interopRequireDefault(_describeBasename);

var _describeQueries = require('./describeQueries');

var _describeQueries2 = _interopRequireDefault(_describeQueries);

var _describeGo = require('./describeGo');

var _describeGo2 = _interopRequireDefault(_describeGo);

describe('hash history', function () {
  beforeEach(function () {
    if (window.location.hash !== '') window.location.hash = '';
  });

  _describeInitialLocation2['default'](_createHashHistory2['default']);
  _describeTransitions2['default'](_createHashHistory2['default']);
  _describePushState2['default'](_createHashHistory2['default']);
  _describePush2['default'](_createHashHistory2['default']);
  _describeReplaceState2['default'](_createHashHistory2['default']);
  _describeReplace2['default'](_createHashHistory2['default']);
  _describeBasename2['default'](_createHashHistory2['default']);
  _describeQueries2['default'](_createHashHistory2['default']);

  if (_DOMUtils.supportsHistory()) {
    _describePopState2['default'](_createHashHistory2['default']);
  } else {
    describe.skip(null, function () {
      _describePopState2['default'](_createHashHistory2['default']);
    });
  }

  if (_DOMUtils.supportsHistory() && _DOMUtils.supportsGoWithoutReloadUsingHash()) {
    _describeGo2['default'](_createHashHistory2['default']);
    _describeQueryKey2['default'](_createHashHistory2['default']);
  } else {
    describe.skip(null, function () {
      _describeGo2['default'](_createHashHistory2['default']);
      _describeQueryKey2['default'](_createHashHistory2['default']);
    });
  }

  it('knows how to make hrefs', function () {
    var history = _createHashHistory2['default']();
    _expect2['default'](history.createHref('/a/path')).toEqual('#/a/path');
  });
});