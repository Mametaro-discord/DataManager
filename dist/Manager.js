'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    /**
     * @param {Array<[K, V]>} @optional
     */
    function Manager(data) {
        var _this = _super.call(this, data) || this;
        /**
         * @type {boolean}
         */
        _this.frozen = false;
        /**
         * @type {K[]}
         */
        _this.frozenKeys = [];
        /**
         * @type {boolean}
         */
        _this.sealed = false;
        /**
         * @type {K[]}
         */
        _this.sealedKeys = [];
        /**
         * @type {boolean}
         */
        _this.stricted = false;
        return _this;
    }
    ;
    /**
     * @param {string}
     * @param {string} @optional TYPE
     * @return {void}
     * @private
     */
    Manager.prototype.handleError = function (message, type) {
        if (this.stricted)
            throw new Error(message);
        return type;
    };
    ;
    /**
     * @param {Array<any | any[]>}
     * @return {any[]}
     * @private
     */
    Manager.prototype.handleSpread = function (data) {
        if (Array.isArray(data[0]))
            return data[0];
        return data;
    };
    ;
    /**
     * @return {this}
     */
    Manager.prototype.freeze = function () {
        this.frozen = true;
        return this;
    };
    ;
    /**
     * @param {K}
     * @return {this}
     */
    Manager.prototype.freezeKey = function (key) {
        this.frozenKeys.push(key);
        return this;
    };
    ;
    /**
     * @param {Array<K | K[]>}
     * @return {this}
     */
    Manager.prototype.freezeKeys = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        var transformed = this.handleSpread(keys);
        transformed.forEach(function (elm) { return _this.frozenKeys.push(elm); });
        return this;
    };
    ;
    /**
     * @return {this}
     */
    Manager.prototype.unfreeze = function () {
        this.frozen = false;
        return this;
    };
    ;
    /**
     * @param {K}
     * @return {this}
     */
    Manager.prototype.unfreezeKey = function (key) {
        this.frozenKeys = this.frozenKeys.filter(function (elm) { return elm !== key; });
        return this;
    };
    ;
    /**
     * @param {Array<K | K[]>}
     * @return {this}
     */
    Manager.prototype.unfreezeKeys = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        var transformed = this.handleSpread(keys);
        this.frozenKeys = this.frozenKeys.filter(function (elm) { return !transformed.includes(elm); });
        return this;
    };
    ;
    /**
     * @return {this}
     */
    Manager.prototype.seal = function () {
        this.sealed = true;
        return this;
    };
    ;
    /**
     * @param {K}
     * @return {this}
     */
    Manager.prototype.sealKey = function (key) {
        this.sealedKeys.push(key);
        return this;
    };
    ;
    /**
     * @param {Array<K | K[]>}
     * @return {this}
     */
    Manager.prototype.sealKeys = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        var transformed = this.handleSpread(keys);
        transformed.forEach(function (elm) { return _this.sealedKeys.push(elm); });
        return this;
    };
    ;
    /**
     * @return {this}
     */
    Manager.prototype.unseal = function () {
        this.sealed = false;
        return this;
    };
    ;
    /**
     * @param {K}
     * @return {this}
     */
    Manager.prototype.unsealKey = function (key) {
        this.sealedKeys = this.sealedKeys.filter(function (elm) { return elm !== key; });
        return this;
    };
    ;
    /**
     * @param {Array<K | K[]>}
     * @return {this}
     */
    Manager.prototype.unsealKeys = function () {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        var transformed = this.handleSpread(keys);
        this.sealedKeys = this.sealedKeys.filter(function (elm) { return !transformed.includes(elm); });
        return this;
    };
    ;
    /**
     * @return {this}
     */
    Manager.prototype.strict = function () {
        this.stricted = true;
        return this;
    };
    ;
    /**
     * @return {this}
     */
    Manager.prototype.unstrict = function () {
        this.stricted = false;
        return this;
    };
    ;
    /**
     * @return {Array<[K, V]>}
     */
    Manager.prototype.array = function () {
        return Array.from(this.entries());
    };
    ;
    /**
     * @return {K[]}
     */
    Manager.prototype.keyArray = function () {
        return Array.from(this.keys());
    };
    ;
    /**
     * @return {V[]}
     */
    Manager.prototype.valueArray = function () {
        return Array.from(this.values());
    };
    ;
    /**
     * @param {Array<[K, V]>} @optional
     * @return {Manager}
     */
    Manager.prototype.clone = function (data) {
        var clone = new Manager(this.array());
        if (data)
            clone.setAll(data);
        return clone;
    };
    ;
    Manager.prototype.clear = function () {
        var _this = this;
        if (this.sealed)
            return this.handleError('This manager is sealed.', this);
        if (this.frozen)
            return this.handleError('This manager is frozen.', this);
        if (this.sealedKeys.some(function (elm) { return _this.keyArray().includes(elm); }))
            return this
                .handleError('Some keys is sealed.', this);
        if (this.frozenKeys.some(function (elm) { return _this.keyArray().includes(elm); }))
            return this
                .handleError('Some keys is frozen.', this);
        _super.prototype.clear.call(this);
        return this;
    };
    ;
    /**
     * @param {K}
     * @return {boolean}
     */
    Manager.prototype["delete"] = function (key) {
        if (this.sealed)
            return this.handleError('This manager is sealed.', false);
        if (this.frozen)
            return this.handleError('This manager is sealed.', false);
        if (this.sealedKeys.includes(key))
            return this
                .handleError("This key: " + key + " is sealed.", false);
        if (this.frozenKeys.includes(key))
            return this
                .handleError("This key: " + key + " is frozen.", false);
        return _super.prototype["delete"].call(this, key);
    };
    ;
    /**
     * @param {K[]}
     * @return {this}
     */
    Manager.prototype.deleteAll = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        if (this.sealed)
            return this.handleError('This manager is sealed.', this);
        if (this.frozen)
            return this.handleError('This manager is frozen.', this);
        var transformed = this.handleSpread(keys);
        transformed.forEach(function (elm) {
            if (_this.sealedKeys.includes(elm))
                _this
                    .handleError("This key: " + elm + " is sealed.", _this);
            if (_this.frozenKeys.includes(elm))
                _this
                    .handleError("This key: " + elm + " is frozen.", _this);
            _this["delete"](elm);
        });
        return this;
    };
    ;
    /**
     * @param {K[]}
     * @return {Array<V | undefined>}
     */
    Manager.prototype.getAll = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        keys = this.handleSpread(keys);
        return keys.map(function (elm) { return _this.get(elm); });
    };
    ;
    /**
     * @param {K}
     * @param {?V}
     * @return {this}
     */
    Manager.prototype.set = function (key, val) {
        if (this.frozen)
            return this.handleError('This manager is frozen.', this);
        if (this.frozenKeys.includes(key))
            return this
                .handleError("This key: " + key + " is frozen.", this);
        return _super.prototype.set.call(this, key, val);
    };
    ;
    /**
     * @param {Array<[K, V]>}
     * @return {this}
     */
    Manager.prototype.setAll = function (data) {
        var _this = this;
        if (this.frozen)
            return this.handleError('This manager is frozen.', this);
        data.forEach(function (elm) {
            if (_this.frozenKeys.includes(elm[0]))
                _this
                    .handleError("This key: " + elm[0] + " is frozen.", _this);
            _this.set(elm[0], elm[1]);
        });
        return this;
    };
    ;
    /**
     * @param {K[]}
     * @return {boolean}
     */
    Manager.prototype.hasAll = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        var transformedKeys = this.handleSpread(keys);
        return transformedKeys.every(function (elm) { return _this.has(elm); });
    };
    ;
    /**
     * @param {K[]}
     * @return {boolean}
     */
    Manager.prototype.hasAny = function () {
        var _this = this;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        var transformedKeys = this.handleSpread(keys);
        return transformedKeys.some(function (elm) { return _this.has(elm); });
    };
    ;
    /**
     * @param {V}
     * @return {K}
     */
    Manager.prototype.keyOf = function (val) {
        return this.findKey(function (v) { return v === val; });
    };
    ;
    /**
     * @param {Array<Manager<K, V> | Manager<K, V>[]>}
     * @return {Manager<K, V>}
     */
    Manager.prototype.concat = function () {
        var _this = this;
        var managers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            managers[_i] = arguments[_i];
        }
        var transformed = this.handleSpread(managers);
        var data = [];
        transformed.forEach(function (manager) {
            manager.forEach(function (val, key) {
                if (!_this.has(key))
                    data.push([key, val]);
            });
        });
        return this.clone(data);
    };
    ;
    /**
     * @param {Manager<K, V>}
     * @return {Manager<K, V>}
     */
    Manager.prototype.difference = function (manager) {
        var _this = this;
        return this.filter(function (_, key) { return !manager.has(key); })
            .concat(manager.filter(function (_, key) { return !_this.has(key); }));
    };
    ;
    /**
     * @param {Manager<K, V>}
     * @return {Manager<K, V>}
     */
    Manager.prototype.intersect = function (manager) {
        return this.filter(function (_, key) { return manager.has(key); });
    };
    ;
    /**
     * @param {Manager<K, V>}
     * @return {Manager<K, V>}
     */
    Manager.prototype.equals = function (manager) {
        return this.every(function (val, key) { return manager.get(key) === val; });
    };
    ;
    /**
     * @param {number} @optional
     * @return {V}
     */
    Manager.prototype.at = function (index) {
        if (index === void 0) { index = 0; }
        if (index < 0) {
            index *= -1;
            return this.array().reverse()[index - 1][1];
        }
        else {
            return this.array()[index][1];
        }
        ;
    };
    ;
    /**
     * @param {number} @optional
     * @return {K}
     */
    Manager.prototype.keyAt = function (index) {
        if (index === void 0) { index = 0; }
        if (index < 0) {
            index *= -1;
            return this.array().reverse()[index - 1][0];
        }
        else {
            return this.array()[index - 1][0];
        }
        ;
    };
    ;
    /**
     * @return {V}
     */
    Manager.prototype.first = function () {
        return this.array()[0][1];
    };
    ;
    /**
     * @return {K}
     */
    Manager.prototype.firstKey = function () {
        return this.array()[0][0];
    };
    ;
    /**
     * @return {V}
     */
    Manager.prototype.last = function () {
        return this.array().reverse()[0][1];
    };
    ;
    /**
     * @return {K}
     */
    Manager.prototype.lastKey = function () {
        return this.array().reverse()[0][0];
    };
    ;
    /**
     * @return {V}
     */
    Manager.prototype.random = function () {
        var array = this.array();
        var random = Math.floor(Math.random() * array.length);
        return array[random][1];
    };
    ;
    /**
     * @return {K}
     */
    Manager.prototype.randomKey = function () {
        var array = this.array();
        var random = Math.floor(Math.random() * array.length);
        return array[random][0];
    };
    ;
    /**
     * @param {K}
     * @param {Array<K | K[]>} @optional
     * @return {this}
     */
    Manager.prototype.fill = function (source) {
        var _this = this;
        var target = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            target[_i - 1] = arguments[_i];
        }
        var transformed = target ? this.handleSpread(target) : this.keyArray();
        if (this.sealed)
            return this.handleError('This manager is sealed.', this);
        if (this.frozen)
            return this.handleError('This manager is frozen.', this);
        var sourceVal = this.get(source);
        transformed.forEach(function (elm) {
            if (_this.sealedKeys.includes(elm))
                _this
                    .handleError("This key: " + elm + " is sealed.", _this);
            if (_this.frozenKeys.includes(elm))
                _this
                    .handleError("This key: " + elm + " is frozen.", _this);
            _this.set(elm, sourceVal);
        });
        return this;
    };
    ;
    /**
     * @param {Function}
     * @param {any} @optional
     * @return {this}
     */
    Manager.prototype.deleteBy = function (fn, thisArg) {
        var _this = this;
        if (this.sealed)
            return this.handleError('This manager is sealed.', this);
        if (this.frozen)
            return this.handleError('This manager is frozen.', this);
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        return this.forEach(function (val, key) {
            if (_this.sealedKeys.includes(key))
                _this
                    .handleError("This key: " + key + " is sealed.", _this);
            if (_this.frozenKeys.includes(key))
                _this
                    .handleError("This key: " + key + " is frozen.", _this);
            if (fn(val, key, _this))
                _this["delete"](key);
        });
    };
    ;
    /**
     * @param {Function}
     * @param {any} @optional
     * @return {boolean}
     */
    Manager.prototype.every = function (fn, thisArg) {
        var _this = this;
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        var result = 0;
        this.forEach(function (val, key) {
            if (!fn(val, key, _this))
                result++;
        });
        return result > 0 ? false : true;
    };
    ;
    /**
     * @param {Function}
     * @param {any} @optional
     * @return {Manager<K, V>}
     */
    Manager.prototype.filter = function (fn, thisArg) {
        var _this = this;
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        var clone = new Manager();
        this.forEach(function (val, key) {
            if (fn(val, key, _this))
                clone.set(key, val);
        });
        return clone;
    };
    ;
    /**
     * @param {Function}
     * @param {any} @optional
     * @return {V}
     */
    Manager.prototype.find = function (fn, thisArg) {
        return this.filter(fn, thisArg).first();
    };
    ;
    /**
     * @param {Function}
     * @param {any} @optional
     * @return {K}
     */
    Manager.prototype.findKey = function (fn, thisArg) {
        return this.filter(fn, thisArg).firstKey();
    };
    ;
    /**
     * @param {Function}
     * @param {any} @optional
     * @return {Manager<K, T>}
     */
    Manager.prototype.flatMap = function (fn, thisArg) {
        var _a;
        var managers = this.map(fn, thisArg);
        return (_a = new Manager()).concat.apply(_a, managers);
    };
    ;
    /**
     * @param {Function}
     * @param {any} @optional
     * @return {this}
     */
    Manager.prototype.forEach = function (fn, thisArg) {
        _super.prototype.forEach.call(this, fn, thisArg);
        return this;
    };
    ;
    /**
     * @param {Function}
     * @param {any} @optional
     * @return {any[]}
     */
    Manager.prototype.map = function (fn, thisArg) {
        var _this = this;
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        var result = [];
        this.forEach(function (val, key) { return result.push(fn(val, key, _this)); });
        return result;
    };
    ;
    /**
     * @param {Function}
     * @param {any} @optional
     * @return {Manager<K, V>}
     */
    Manager.prototype.mapValues = function (fn, thisArg) {
        var _this = this;
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        var clone = this.clone();
        return clone.forEach(function (val, key) { return clone.set(key, fn(val, key, _this)); });
    };
    ;
    /**
     * @param {Function}
     * @param {any} @optional
     * @return {Manager<K, V>[]}
     */
    Manager.prototype.partition = function (fn, thisArg) {
        var _this = this;
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        var managers = [new Manager(), new Manager()];
        this.forEach(function (val, key) {
            if (fn(val, key, _this))
                managers[0].set(key, val);
            else
                managers[1].set(key, val);
        });
        return managers;
    };
    ;
    /**
     * @param {Function}
     * @param {any} @optional
     * @return {any}
     */
    Manager.prototype.reduce = function (fn, init) {
        var _this = this;
        var acc;
        if (init) {
            acc = init;
            this.forEach(function (val, key) { return acc = fn(acc, val, key, _this); });
        }
        else {
            var first_1 = true;
            this.forEach(function (val, key) {
                if (first_1) {
                    acc = val;
                    first_1 = false;
                }
                else {
                    acc = fn(acc, val, key, _this);
                }
                ;
            });
        }
        ;
        return acc;
    };
    ;
    /**
     * @param {Function}
     * @param {any} @optional
     * @return {boolean}
     */
    Manager.prototype.some = function (fn, thisArg) {
        return Boolean(this.find(fn, thisArg));
    };
    ;
    /**
     * @param {Function}
     * @return {this}
     */
    Manager.prototype.sort = function (fn) {
        var _this = this;
        if (fn === void 0) { fn = function (a, b) { return Number(a > b) || Number(a === b) - 1; }; }
        if (this.sealed)
            return this.handleError('This manager is sealed.', this);
        if (this.frozen)
            return this.handleError('This manager is frozen.', this);
        if (this.sealedKeys.some(function (elm) { return _this.keyArray().includes(elm); }))
            return this
                .handleError("Some keys is sealed.", this);
        if (this.frozenKeys.some(function (elm) { return _this.keyArray().includes(elm); }))
            return this
                .handleError("Some keys is frozen.", this);
        var array = this.array();
        array.sort(function (first, second) { return fn(first[1], second[1], first[0], second[0]); });
        this.clear();
        this.setAll(array);
        return this;
    };
    ;
    /**
     * @param {Function}
     * @return {Manager<K, V>}
     */
    Manager.prototype.sorted = function (fn) {
        if (fn === void 0) { fn = function (a, b) { return Number(a > b) || Number(a === b) - 1; }; }
        var array = this.array();
        array.sort(function (first, second) { return fn(first[1], second[1], first[0], second[0]); });
        return new Manager(array);
    };
    ;
    /**
     * @param {Function}
     * @param {any} @optional
     * @return {number}
     */
    Manager.prototype.sweep = function (fn, thisArg) {
        var _this = this;
        if (this.sealed)
            return this.handleError('This manager is sealed.', -1);
        if (this.frozen)
            return this.handleError('This manager is frozen.', -1);
        if (this.sealedKeys.some(function (elm) { return _this.keyArray().includes(elm); }))
            return this
                .handleError("Some keys is sealed.", -1);
        if (this.frozenKeys.some(function (elm) { return _this.keyArray().includes(elm); }))
            return this
                .handleError("Some keys is frozen.", -1);
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        var result = 0;
        this.forEach(function (val, key) {
            if (fn(val, key, _this)) {
                _this["delete"](key);
                result++;
            }
            ;
        });
        return result;
    };
    ;
    /**
     * @param {Function}
     * @param {any} @optional
     * @return {this}
     */
    Manager.prototype.tap = function (fn, thisArg) {
        if (typeof thisArg !== 'undefined')
            fn = fn.bind(thisArg);
        fn(this);
        return this;
    };
    ;
    /**
     * @param {any}
     * @return {boolean}
     */
    Manager.isManager = function (managerLike) {
        return managerLike instanceof Manager;
    };
    ;
    return Manager;
}(Map));
exports["default"] = Manager;
;
