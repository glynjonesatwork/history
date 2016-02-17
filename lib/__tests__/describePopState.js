'use strict';

exports.__esModule = true;
function describePopState(createHistory) {
  describe('when a listenBefore hook is added', function () {
    var history = undefined,
        unlisten = undefined;

    beforeEach(function () {
      history = createHistory();
      history.push('/home');
    });

    afterEach(function () {
      if (unlisten) unlisten();
    });

    it('is called when browser navigation is used', function (done) {
      unlisten = history.listenBefore(function () {
        done();
      });

      window.history.back();
    });
  });

  describe('when a deprecated transition hook is added', function () {
    var history = undefined,
        listener = undefined;

    beforeEach(function () {
      history = createHistory();
      history.push('/home');
    });

    afterEach(function () {
      history.unregisterTransitionHook(listener);
    });

    it('is called when browser navigation is used', function (done) {
      listener = function () {
        done();
      };

      history.registerTransitionHook(listener);

      window.history.back();
    });
  });
}

exports['default'] = describePopState;
module.exports = exports['default'];