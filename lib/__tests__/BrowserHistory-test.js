'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _DOMUtils = require('../DOMUtils');

var _createBrowserHistory = require('../createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

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

var _describeHashSupport = require('./describeHashSupport');

var _describeHashSupport2 = _interopRequireDefault(_describeHashSupport);

var _describeBasename = require('./describeBasename');

var _describeBasename2 = _interopRequireDefault(_describeBasename);

var _describeQueries = require('./describeQueries');

var _describeQueries2 = _interopRequireDefault(_describeQueries);

var _describeGo = require('./describeGo');

var _describeGo2 = _interopRequireDefault(_describeGo);

describe('browser history', function () {
  beforeEach(function () {
    window.history.replaceState(null, null, '/');
  });

  if (_DOMUtils.supportsHistory()) {
    _describeInitialLocation2['default'](_createBrowserHistory2['default']);
    _describeTransitions2['default'](_createBrowserHistory2['default']);
    _describePushState2['default'](_createBrowserHistory2['default']);
    _describePush2['default'](_createBrowserHistory2['default']);
    _describeReplaceState2['default'](_createBrowserHistory2['default']);
    _describeReplace2['default'](_createBrowserHistory2['default']);
    _describePopState2['default'](_createBrowserHistory2['default']);
    _describeHashSupport2['default'](_createBrowserHistory2['default']);
    _describeBasename2['default'](_createBrowserHistory2['default']);
    _describeQueries2['default'](_createBrowserHistory2['default']);
    _describeGo2['default'](_createBrowserHistory2['default']);
  } else {
    describe.skip(null, function () {
      _describeInitialLocation2['default'](_createBrowserHistory2['default']);
      _describeTransitions2['default'](_createBrowserHistory2['default']);
      _describePushState2['default'](_createBrowserHistory2['default']);
      _describePush2['default'](_createBrowserHistory2['default']);
      _describeReplaceState2['default'](_createBrowserHistory2['default']);
      _describeReplace2['default'](_createBrowserHistory2['default']);
      _describePopState2['default'](_createBrowserHistory2['default']);
      _describeHashSupport2['default'](_createBrowserHistory2['default']);
      _describeBasename2['default'](_createBrowserHistory2['default']);
      _describeQueries2['default'](_createBrowserHistory2['default']);
      _describeGo2['default'](_createBrowserHistory2['default']);
    });
  }
});