'use strict';

/**
 * @extend {Map}
 */
class DataManager extends Map {
	/**
	 * @param {Array<[any, any]>}
	 */
	constructor(data) {
		super(data);
		/**
		 * @type {boolean}
		 */
		this.frozen = false;
		/**
		 * @type {any[]}
		 */
		this.frozenKeys = [];
		/**
		 * @type {boolean}
		 */
		this.sealed = false;
		/**
		 * @type {any[]}
		 */
		this.sealedKeys = [];
	};
	/**
	 * @return {this}
	 */
	freeze() {
		this.frozen = true;
		return this;
	};
	/**
	 * @param {any}
	 * @return {this}
	 */
	freezeKey(key) {
		this.frozenKeys.push(key);
		return this;
	};
	/**
	 * @param {...any | any[]}
	 * @return {this}
	 */
	freezeKeys(...keys) {
		if (Array.isArray(keys[0])) keys = keys[0];
		keys.forEach(this.frozenKeys.push);
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
	 * @param {any}
	 * @return {this}
	 */
	unfreezeKey(key) {
		this.frozenKeys = this.frozenKeys.filter(elm => elm !== key);
		return this;
	};
	/**
	 * @param {...any | any[]}
	 * @return {this}
	 */
	unfreezeKeys(...keys) {
		if (Array.isArray(keys[0])) keys = keys[0];
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
	 * @param {any}
	 * @return {this}
	 */
	sealKey(key) {
		this.sealed.push(key);
		return this;
	};
	/**
	 * @param {...any | any[]}
	 * @return {this}
	 */
	sealKeys(...keys) {
		if (Array.isArray(keys[0])) keys = keys[0];
		keys.forEach(this.sealed.push);
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
	 * @param {any}
	 * @return {this}
	 */
	unsealKey(key) {
		this.sealed = this.sealed.filter(elm => elm !== key);
		return this;
	};
	/**
	 * @param {...any | any[]}
	 * @return {this}
	 */
	unsealKeys(...keys) {
		if (Array.isArray(keys[0])) keys = keys[0]
		this.sealed = this.sealed.filter(elm => !keys.includes(elm));
		return this;
	};
	/**
	 * @return {Array<[any, any]>}
	 */
	array() {
		Array.from(this.entries());
	};
	/**
	 * @optional {Array<[any, any>}
	 * @return {DataManager}
	 */
	clone(data) {
		return new DataManager(this.array())
			.concat(new DataManager(data));
	};
	/**
	 * @return {this}
	 */
	clear() {
		if (this.sealed) throw new Error('This manager is sealed.');
		if (this.frozen) throw new Error('This manager is frozen.');
		super.clear();
		return this;
	};
	/**
	 * @param {any}
	 * @return {boolean}
	 */
	delete(key) {
		if (this.sealed) throw new Error('This manager is sealed.');
		if (this.frozen) throw new Error('This manager is frozen.');
		return super.delete(key);
	};
	/**
	 * @param {any[]}
	 * @return {boolean}
	 */
	deleteAll(keys) {
		if (this.sealed) throw new Error('This manager is sealed.');
		if (this.frozen) throw new Error('This manager is frozen.');
		let result;
		keys.forEach(elm => {
			const deleted = this.delete(elm);
			if (!deleted && typeof result === 'undefined') result = false;
		});
		if (typeof result === 'undefined') result = true;
		return result;
	};
	/**
	 * @param {any[]}
	 * @return {any[]}
	 */
	getAll(keys) {
		return keys.map(this.get);
	};
	/**
	 * @param {any}
	 * @return {any}
	 * @return {this}
	 */
	set(key, val) {
		if (this.frozen) throw new Error('This manager is frozen.');
		return super.set(key, val);
	};
	/**
	 * @param {Array<[any, any]>}
	 * @return {this}
	 */
	setAll(data) {
		if (this.frozen) throw new Error('This manager is frozen.');
		return data.forEach(elm => this.set(elm[0], elm[1]));
	};
	/**
	 * @param {any[]}
	 * @return {boolean}
	 */
	hasAll(keys) {
		return keys.every(elm => this.has(elm));
	};
	/**
	 * @param {any[]}
	 * @return {boolean}
	 */
	hasAny(keys) {
		return keys.some(elm => this.has(elm));
	};
	/**
	 * @param {any}
	 * @return {any}
	 */
	keyOf(val) {
		return this.findKey(v => v === val);
	};
	/**
	 * @param {...DataManager}
	 * @return {DataManager}
	 */
	concat(...managers) {
		const clone = this.clone();
		managers.forEach(elm => {
			elm.forEach((val, key) => {
				if (!clone.has(key)) clone.set(key, val);
			});
		});
		return clone;
	};
	/**
	 * @param {DataManager}
	 * @return {DataManager}
	 */
	difference(manager) {
		return this.filter((val, key) => !manager.has(key))
			.concat(manager.filter((val, key) => !this.has(key)));
	};
	/**
	 * @param {DataManager}
	 * @return {DataManager}
	 */
	intersect(manager) {
		return this.filter((val, key) => manager.has(key));
	};
	/**
	 * @param {DataManager}
	 * @return {boolean}
	 */
	equals(manager) {
		return this.every((val, key) => manager.get(key) === val);
	};
	/**
	 * @optional {number}
	 * @return {any}
	 */
	at(index = 0) {
		if (index < 0) {
			index *= -1;
			const [key, val] = this.array().reverse()[index - 1];
			return val;
		} else {
			const [key, val] = this.array()[index];
			return val;
		};
	};
	/**
	 * @optional {number}
	 * @return {any}
	 */
	keyAt(index = 0) {
		if (index < 0) {
			index *= -1;
			const [key, val] = this.array().reverse()[index - 1];
			return key;
		} else {
			const [key, val] = this.array()[index];
			return key;
		};
	};
	/**
	 * @return {any}
	 */
	first() {
		const [key, val] = this.array()[0];
		return val;
	};
	/**
	 * @return {any}
	 */
	firstKey() {
		const [key, val] = this.array()[0];
		return key;
	};
	/**
	 * @return {any}
	 */
	last() {
		const [key, val] = this.array().reverse()[0];
		return val;
	};
	/**
	 * @return {any}
	 */
	lastKey() {
		const [key, val] = this.array().reverse()[0];
		return key;
	};
	/**
	 * @return {any}
	 */
	random() {
		const array = this.array();
		const random = Math.floor(Math.random() * array.length);
		const [key, val] = array[random];
		return val;
	}
	/**
	 * @return {any}
	 */
	randomKey() {
		const array = this.array();
		const random = Math.floor(Math.random() * array.length);
		const [key, val] = array[random];
		return key
	};
	/**
	 * @param {any} key of copy source
	 * @optional {...any} key(s) of copy target
	 * @return {this}
	 */
	fill(source, ...target) {
		if (this.sealed) throw new Error('This manager is sealed.');
		if (this.frozen) throw new Error('This manager is frozen.');
		const sourceVal = this.get(source);
		if (!target) {
			this.keys().forEach(elm => this.set(elm, sourceVal));
		};
		target.forEach(elm => this.set(elm, sourceVal));
		return this;
	};
	/**
	 * @param {Function}
	 * @optional {any}
	 * @return {boolean}
	 */
	deleteBy(fn, thisArg) {
		if (this.sealed) throw new Error('This manager is sealed.');
		if (this.frozen) throw new Error('This manager is frozen.');
		if (typeof thisArg !== 'undefined') fn = fn.bind(this);
		let result;
		this.forEach((val, key) => {
			if (fn(val, key, this)) {
				const deleted = this.delete(key);
				if (!deleted && typeof result === 'undefined') result = false;
			};
		});
		if (typeof result === 'undefined') result = true;
	};
	/**
	 * @param {Function}
	 * @optional {any}
	 * @return {boolean}
	 */
	every(fn, thisArg) {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		let result;
		this.forEach((val, key) => {
			if (!fn(val, key, this)) result = false;
		});
		if (typeof result === 'undefined') result = true;
		return result;
	};
	/**
	 * @param {Function}
	 * @optional {any}
	 * @return {DataManager}
	 */
	filter(fn, thisArg) {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		const clone = this.clone();
		clone.forEach(elm => {
			const [key, val] = elm;
			if (!fn(val, key, this)) {
				clone.delete(key);
			};
		});
		return clone;
	};
	/**
	 * @param {Function}
	 * @optional {any}
	 * @return {any}
	 */
	find(fn, thisArg) {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		let result;
		this.forEach((val, key) => {
			if (fn(val, key, this) && typeof result === 'undefined') result = val; 
		});
		return val;
	};
	/**
	 * @param {Function}
	 * @optional {any}
	 * @return {any}
	 */
	findKey(fn, thisArg) {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		let result;
		this.forEach((val, key) => {
			if (fn(val, key, this) && typeof result === 'undefined') result = key; 
		});
		return result;
	};
	/**
	 * @param {Function} returns DataManager
	 * @optional {any}
	 * @return {DataManager}
	 */
	flatMap(fn, thisArg) {
		const managers = this.map(fn, thisArg);
		return new DataManager().concat(...managers);
	};
	/**
	 * @param {Function}
	 * @optional {any}
	 * @return {this}
	 */
	forEach(fn, thisArg) {
		super.forEach(fn, thisArg);
		return this;
	};
	/**
	 * @param {Function}
	 * @optional {any}
	 * @return {any[]}
	 */
	map(fn, thisArg) {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		return this.array().map(elm => fn(elm[1], elm[0], this));
		let result = [];
		this.forEach((val, key) => result.push(fn(val, key, this)));
	};
	/**
	 * @param {Function}
	 * @optional {any}
	 * @return {DataManager}
	 */
	mapValues(fn, thisArg) {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		const clone = this.clone();
		clone.forEach((val, key) => clone.set(
				key,
				fn(val, key, this)
			));
		return clone;
	};
	/**
	 * @param {Function}
	 * @optional {any}
	 * @return {DataManager[]}
	 */
	partition(fn, thisArg) {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		const managers = [new DataManager(), new DataManager()];
		this.forEach((val, key, src) => {
			if (fn(val, key, src)) {
				managers[0].set(key, val);
			} else {
				managers[1].set(key, val);
			};
		});
		return managers;
	};
	/**
	 * @param {Function}
	 * @optional {any}
	 * @return {any}
	 */
	reduce(fn, initialVal) {
		let accumulator;
		if (initialVal) {
			accumulator = initialVal;
			this.forEach((val, key) => {
				accumulator = fn(accumulator, val, key, this);
			});
		} else {
			let first = true;
			this.forEach((val, key) => {
				if (first) {
					accumulator = val;
					first = false;
					continue;
				};
				accumulator = fn(accumulator, val, key, this);
			});
		};
		return accumulator;
	};
	/**
	 * @param {Function}
	 * @optional {any}
	 * @return {boolean}
	 */
	some(fn, thisArg) {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		return Boolean(
				this.find(fn)
			);
	};
	/**
	 * @param {Function}
	 * @return {this}
	 */
	sort(fn = (a, b) => Number(a > b) || Number(a === b) - 1) {
		const entries = this.array();
		entries.sort((first, second) => fn(first[1], second[1], first[0], second[0]));
		this.clear();
		this.setAll(entries);
		return this;
	};
	/**
	 * @param {Function}
	 * @return {DataManager}
	 */
	sorted(fn = (a, b) => Number(a > b) || Number(a === b) - 1) {
		const entries = this.array();
		entries.sort((first, second) => fn(first[1], second[1], first[0], second[0]));
		return new DataManager(entries);
	}
	/**
	 * @param {Function}
	 * @optional {any}
	 * @return {boolean}
	 */
	sweep(fn, thisArg) {
		if (this.sealed) throw new Error('This manager is sealed.');
		if (this.frozen) throw new Error('This manager is frozen.');
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		let result;
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
	 * @optional {any}
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
		this.forEach((val, key) => result[key] = val);
		return result;
	};
	/**
	 * @param {any}
	 * @return {boolean}
	 */
	static isManager(managerLike) {
		return managerLike instanceof DataManager;
	};
};

module.exports = DataManager;