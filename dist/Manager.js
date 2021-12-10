'use strict';

class Manager extends Map {
	/**
	 * @param {Array<[K, V]>} @optional
	 */
	constructor(data) {
		super(data);
		/**
		 * @type {boolean}
		 */
		this.frozen = false;
		/**
		 * @type {K[]}
		 */
		this.frozenKeys = [];
		/**
		 * @type {boolean}
		 */
		this.sealed = false;
		/**
		 * @type {K[]}
		 */
		this.sealedKeys = [];
		/**
		 * @type {boolean}
		 */
		this.stricted = false;
	};
	/**
	 * @param {string}
	 * @return {undefined}
	 * @private
	 */
	_handleError(message) {
		if (this.stricted) throw new Error(message);
	};
	/**
	 * @param {Array<any | any[]>}
	 * @return {any[]}
	 * @private
	 */
	_handleSpread(data) {
		if (Array.isArray(data[0])) return data[0];
		return data;
	};
	/**
	 * @return {this}
	 */
	freeze() {
		this.frozen = true;
		return this;
	};
	/**
	 * @param {K}
	 * @return {this}
	 */
	freezeKey(key) {
		this.frozenKeys.push(key);
		return this;
	};
	/**
	 * @param {Array<K | K[]>}
	 * @return {this}
	 */
	freezeKeys(...keys) {
		keys = this._handleSpread(keys);
		keys.forEach(elm => this.frozenKeys.push(elm));
		return this;
	};
	/**
	 * @return {this}
	 */
	unfreeze() {
		this.frozen = false;
		return this;
	};
	/**
	 * @param {K}
	 * @return {this}
	 */
	unfreezeKey(key) {
		this.frozenKeys = this.frozenKeys.filter(elm => elm !== key);
		return this;
	};
	/**
	 * @param {Array<K | K[]>}
	 * @return {this}
	 */
	unfreezeKeys(...keys) {
		keys = this._handleSpread(keys);
		this.frozenKeys = this.frozenKeys.filter(elm => !keys.includes(elm));
		return this;
	};
	/**
	 * @return {this}
	 */
	seal() {
		this.sealed = true;
		return this;
	};
	/**
	 * @param {K}
	 * @return {this}
	 */
	sealKey(key) {
		this.sealedKeys.push(key);
		return this;
	};
	/**
	 * @param {Array<K | K[]>}
	 * @return {this}
	 */
	sealKeys(...keys) {
		keys = this._handleSpread(keys);
		keys.forEach(elm => this.sealedKeys.push(elm));
		return this;
	};
	/**
	 * @return {this}
	 */
	unseal() {
		this.sealed = false;
		return this;
	};
	/**
	 * @param {K}
	 * @return {this}
	 */
	unsealKey(key) {
		this.sealedKeys = this.sealedKeys.filter(elm => elm !== key);
		return this;
	};
	/**
	 * @param {Array<K | K[]>}
	 * @return {this}
	 */
	unsealKeys(...keys) {
		keys = this._handleSpread(keys);
		this.sealedKeys = this.sealedKeys.filter(elm => !keys.includes(elm));
		return this;
	};
	/**
	 * @return {this}
	 */
	strict() {
		this.stricted = true;
		return this;
	};
	/**
	 * @return {this}
	 */
	unstrict() {
		this.stricted = false;
		return this;
	};
	/**
	 * @return {Array<[K, V]>}
	 */
	array() {
		return Array.from(this.entries());
	};
	/**
	 * @return {K[]}
	 */
	keyArray() {
		return Array.from(this.keys());
	};
	/**
	 * @return {V[]}
	 */
	valueArray() {
		return Array.from(this.values());
	};
	/**
	 * @param {Array<[K, V]>} @optional
	 * @return {Manager}
	 */
	clone(data) {
		const clone = new Manager(this.array());
		if (data) clone.setAll(data);
		return clone;
	};
	/**
	 * @return {this}
	 * @override
	 */
	clear() {
		if (this.sealed) return this._handleError('This manager is sealed.');
		if (this.frozen) return this._handleError('This manager is frozen.');
		if (this.sealedKeys.some(elm => this.keyArray().includes(elm))) return this
			._handleError('Some keys is sealed.');
		if (this.frozenKeys.some(elm => this.keyArray().includes(elm))) return this
			._handleError('Some keys is frozen.');
		super.clear();
		return this;
	};
	/**
	 * @param {K}
	 * @return {boolean}
	 * @override
	 */
	delete(key) {
		if (this.sealed) return this._handleError('This manager is sealed.');
		if (this.frozen) return this._handleError('This manager is sealed.')
		if (this.sealedKeys.includes(key)) return this
			._handleError(`This key: ${key} is sealed.`);
		if (this.frozenKeys.includes(key)) return this
			._handleError(`This key: ${key} is frozen.`);
		return super.delete(key);
	};
	/**
	 * @param {K[]}
	 * @return {this}
	 */
	deleteAll(...keys) {
		if (this.sealed) return this._handleError('This manager is sealed.');
		if (this.frozen) return this._handleError('This manager is frozen.');
		keys = this._handleSpread(keys);
		keys.forEach(elm => {
			if (this.sealedKeys.includes(elm)) return this
				._handleError(`This key: ${elm} is sealed.`);
			if (this.frozenKeys.includes(elm)) return this
				._handleError(`This key: ${elm} is frozen.`);
			this.delete(elm);
		});
		return this;
	};
	/**
	 * @param {K[]}
	 * @return {Array<V | undefined>}
	 */
	getAll(...keys) {
		if (!keys) keys = this.array();
		keys = this._handleSpread(keys);
		return keys.map(elm => this.get(elm));
	};
	/**
	 * @param {K}
	 * @param {?V}
	 * @return {this}
	 * @override
	 */
	set(key, val) {
		if (this.frozen) return this._handleError('This manager is frozen.');
		if (this.frozenKeys.includes(key)) return this
			._handleError(`This key: ${key} is frozen.`);
		return super.set(key, val);
	};
	/**
	 * @param {Array<[K, V]>}
	 * @return {this}
	 */
	setAll(data) {
		if (this.frozen) return this._handleError('This manager is frozen.');
		data.forEach(elm => {
			if (this.frozenKeys.includes(elm[0])) return this
				._handleError(`This key: ${elm[0]} is frozen.`);
			this.set(elm[0], elm[1]);
		});
		return this;
	};
	/**
	 * @param {K[]}
	 * @return {boolean}
	 */
	hasAll(...keys) {
		keys = this._handleSpread(keys);
		return keys.every(elm => this.has(elm));
	};
	/**
	 * @param {K[]}
	 * @return {boolean}
	 */
	hasAny(...keys) {
		keys = this._handleSpread(keys);
		return keys.some(elm => this.has(elm));
	};
	/**
	 * @param {V}
	 * @return {K}
	 */
	keyOf(val){
		return this.findKey(v => v === val);
	};
	/**
	 * @param {Array<Manager<K, V> | Manager<K, V>[]>}
	 * @return {Manager<K, V>}
	 */
	concat(...managers) {
		managers = this._handleSpread(managers);
		let data = [];
		managers.forEach(manager => {
			manager.forEach((val, key) => {
				if (!this.has(key)) data.push([key, val]);
			});
		});
		return this.clone(data);
	};
	/**
	 * @param {Manager<K, V>}
	 * @return {Manager<K, V>}
	 */
	difference(manager) {
		return this.filter((_, key) => !manager.has(key))
			.concat(manager.filter((_, key) => !this.has(key)));
	};
	/**
	 * @param {Manager<K, V>}
	 * @return {Manager<K, V>}
	 */
	intersect(manager) {
		return this.filter((_, key) => manager.has(key));
	};
	/**
	 * @param {Manager<K, V>}
	 * @return {Manager<K, V>}
	 */
	equals(manager) {
		return this.every((val, key) => manager.get(key) === val);
	};
	/**
	 * @param {number} @optional
	 * @return {V}
	 */
	at(index = 0) {
		if (index < 0) {
			index *= -1;
			return this.array().reverse()[index - 1][1];
		} else {
			return this.array()[index][1];
		};
	};
	/**
	 * @param {number} @optional
	 * @return {K}
	 */
	keyAt(index = 0) {
		if (index < 0) {
			index *= -1;
			return this.array().reverse()[index -1][0];
		} else {
			return this.array()[index - 1][0];
		};
	};
	/**
	 * @return {V}
	 */
	first() {
		return this.array()[0][1];
	};
	/**
	 * @return {K}
	 */
	firstKey() {
		return this.array()[0][0];
	};
	/**
	 * @return {V}
	 */
	last() {
		return this.array().reverse()[0][1];
	};
	/**
	 * @return {K}
	 */
	lastKey() {
		return this.array().reverse()[0][0];
	};
	/**
	 * @return {V}
	 */
	random() {
		const array = this.array();
		const random = Math.floor(Math.random() * array.length);
		return array[random][1];
	};
	/**
	 * @return {K}
	 */
	randomKey() {
		const array = this.array();
		const random = Math.floor(Math.random() * array.length);
		return array[random][0];
	};
	/**
	 * @param {K}
	 * @param {Array<K | K[]>} @optional
	 * @return {this}
	 */
	fill(source, ...target) {
		target = target ? this._handleSpread(target) : this.keyArray();
		if (this.sealed) return this._handleError('This manager is sealed.');
		if (this.frozen) return this._handleError('This manager is frozen.');
		const sourceVal = this.get(source);
		transformed.forEach(elm => {
			if (this.sealedKeys.includes(elm)) return this
				._handleError(`This key: ${elm} is sealed.`);
			if (this.frozenKeys.includes(elm)) return this
				._handleError(`This key: ${elm} is frozen.`);
			this.set(elm, sourceVal);
		});
		return this;
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {this}
	 */
	deleteBy(fn, thisArg) {
		if (this.sealed) return this._handleError('This manager is sealed.');
		if (this.frozen) return this._handleError('This manager is frozen.');
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		return this.forEach((val, key) => {
			if (this.sealedKeys.includes(key)) return this
				._handleError(`This key: ${key} is sealed.`);
			if (this.frozenKeys.includes(key)) return this
				._handleError(`This key: ${key} is frozen.`);
			if (fn(val, key, this)) this.delete(key);
		});
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {boolean}
	 */
	every(fn, thisArg) {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		let result = 0;
		this.forEach((val, key) => {
			if (!fn(val, key, this)) result ++;
		});
		return result > 0 ? false : true;
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {Manager<K, V>}
	 */
	filter(fn, thisArg) {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		const clone = new Manager();
		this.forEach((val, key) => {
			if (fn(val, key, this)) clone.set(key, val); 
		});
		return clone;
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {V}
	 */
	find(fn, thisArg) {
		return this.filter(fn, thisArg).first();
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {K}
	 */
	findKey(fn, thisArg) {
		return this.filter(fn, thisArg).firstKey();
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {Manager<K, T>}
	 */
	flatMap(fn, thisArg) {
		const managers = this.map(fn, thisArg);
		return new Manager().concat(managers);
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {this}
	 */
	forEach(fn, thisArg) {
		super.forEach(fn, thisArg);
		return this;
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {any[]}
	 */
	map(fn, thisArg) {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		let result = [];
		this.forEach((val, key) => result.push(fn(val, key, this)));
		return result;
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {Manager<K, V>}
	 */
	mapValues(fn, thisArg) {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		const clone = this.clone();
		return clone.forEach((val, key) => clone.set(key, fn(val, key, this)));
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {Manager<K, V>[]}
	 */
	partition(fn, thisArg) {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		const managers = [new Manager(), new Manager()];
		this.forEach((val, key) => {
			if (fn(val, key, this)) managers[0].set(key, val);
			else managers[1].set(key, val);
		});
		return managers;
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {any}
	 */
	reduce(fn, init) {
		let acc;
		if (init) {
			acc = init;
			this.forEach((val, key) => acc = fn(acc, val, key, this));
		} else {
			let first = true;
			this.forEach((val, key) => {
				if (first) {
					acc = val;
					first = false;
				} else {
					acc = fn(acc, val, key, this);
				};
			});
		};
		return acc;
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {boolean}
	 */
	some(fn, thisArg) {
		return Boolean(this.find(fn, thisArg));
	};
	/**
	 * @param {Function}
	 * @return {this}
	 */
	sort(fn = (a, b) => Number(a > b) || Number(a === b) - 1) {
		if (this.sealed) return this._handleError('This manager is sealed.');
		if (this.frozen) return this._handleError('This manager is frozen.');
		if (this.sealedKeys.some(elm => this.keyArray().includes(elm))) return this
			._handleError(`Some keys is sealed.`);
		if (this.frozenKeys.some(elm => this.keyArray().includes(elm))) return this
			._handleError(`Some keys is frozen.`);
		const array = this.array();
		array.sort((first, second) => fn(first[1], second[1], first[0], second[0]));
		this.clear();
		this.setAll(array);
		return this;
	};
	/**
	 * @param {Function}
	 * @return {Manager<K, V>}
	 */
	sorted(fn = (a, b) => Number(a > b) || Number(a === b) - 1) {
		const array = this.array();
		array.sort((first, second) => fn(first[1], second[1], first[0], second[0]));
		return new Manager(array);
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {number}
	 */
	sweep(fn, thisArg) {
		if (this.sealed) return this._handleError('This manager is sealed.');
		if (this.frozen) return this._handleError('This manager is frozen.');
		if (this.sealedKeys.some(elm => this.keyArray().includes(elm))) return this
			._handleError(`Some keys is sealed.`);
		if (this.frozenKeys.some(elm => this.keyArray().includes(elm))) return this
			._handleError(`Some keys is frozen.`);
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		let result = 0;
		this.forEach((val, key) => {
			if (fn(val, key, this)) {
				this.delete(key);
				result ++;
			};
		});
		return result;
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {this}
	 */
	tap(fn, thisArg) {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		fn(this);
		return this;
	};
	/**
	 * @return {Object}
	 */
	toJSON() {
		let result = {};
		this.array().forEach(elm => result[elm[0]] = elm[1]);
		return result;
	};
	/**
	 * @param {any}
	 * @return {boolean}
	 */
	static isManager(managerLike) {
		return managerLike instanceof Manager;
	};
};

module.exports = Manager;