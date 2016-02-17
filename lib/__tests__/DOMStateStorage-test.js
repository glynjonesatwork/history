'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _DOMStateStorage = require('../DOMStateStorage');

describe('dom state storage', function () {
    it('saves and reads state data', function () {
        _DOMStateStorage.saveState('key1', { id: 1 });
        _expect2['default'](_DOMStateStorage.readState('key1')).toEqual({ id: 1 });

        _DOMStateStorage.saveState('key1', null);
        _expect2['default'](_DOMStateStorage.readState('key1')).toEqual(null);

        _DOMStateStorage.saveState('key2', { id: 2 });
        _expect2['default'](_DOMStateStorage.readState('key2')).toEqual({ id: 2 });

        _expect2['default'](_DOMStateStorage.readState('key3')).toEqual(null);
    });
});