'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _createMemoryHistory = require('../createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

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

var _describeBasename = require('./describeBasename');

var _describeBasename2 = _interopRequireDefault(_describeBasename);

var _describeQueries = require('./describeQueries');

var _describeQueries2 = _interopRequireDefault(_describeQueries);

var _describeGo = require('./describeGo');

var _describeGo2 = _interopRequireDefault(_describeGo);

describe('memory history', function () {
      _describeInitialLocation2['default'](_createMemoryHistory2['default']);
      _describeTransitions2['default'](_createMemoryHistory2['default']);
      _describePushState2['default'](_createMemoryHistory2['default']);
      _describePush2['default'](_createMemoryHistory2['default']);
      _describeReplaceState2['default'](_createMemoryHistory2['default']);
      _describeReplace2['default'](_createMemoryHistory2['default']);
      _describeBasename2['default'](_createMemoryHistory2['default']);
      _describeQueries2['default'](_createMemoryHistory2['default']);
      _describeGo2['default'](_createMemoryHistory2['default']);

      describe('when using push in the middle of the stack', function () {
            it('clears rest of stack so the user cannot go forward', function () {
                  var history = _createMemoryHistory2['default']();

                  var location = undefined;
                  history.listen(function (loc) {
                        location = loc;
                  });

                  history.push({
                        pathname: '/1',
                        state: { id: 1 }
                  });
                  history.push({
                        pathname: '/2',
                        state: { id: 2 }
                  });
                  history.push({
                        pathname: '/3',
                        state: { id: 3 }
                  });
                  history.push({
                        pathname: '/4',
                        state: { id: 4 }
                  });

                  _expect2['default'](location.state).toEqual({ id: 4 });

                  history.go(-2);

                  _expect2['default'](location.state).toEqual({ id: 2 });

                  history.push({
                        pathname: '/5',
                        state: { id: 5 }
                  });

                  _expect2['default'](location.state).toEqual({ id: 5 });
                  _expect2['default'](location.pathname).toEqual('/5');

                  history.goBack();

                  _expect2['default'](location.state).toEqual({ id: 2 });

                  history.goForward();

                  _expect2['default'](location.state).toEqual({ id: 5 });
                  _expect2['default'](location.pathname).toEqual('/5');

                  // Mkae sure this doesn't do anything.
                  history.goForward();
                  _expect2['default'](location.state).toEqual({ id: 5 });
                  _expect2['default'](location.pathname).toEqual('/5');

                  history.goBack();
                  history.push({
                        pathname: '/6',
                        state: { id: 6 }
                  });

                  // Make sure this doesn't do anything.
                  history.goForward();
                  _expect2['default'](location.state).toEqual({ id: 6 });
                  _expect2['default'](location.pathname).toEqual('/6');

                  // Make sure this doesn't do anything.
                  history.go(-999);
                  _expect2['default'](location.state).toEqual({ id: 6 });
                  _expect2['default'](location.pathname).toEqual('/6');
            });
      });
});