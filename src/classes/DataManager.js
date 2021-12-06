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
		this.freezed = false;
	};
	/**
	 * @return {this}
	 */
	freeze() {
		this.freezed = true;
		return this;
	};
	/**
	 * @return {this}
	 */
	unfreeze() {
		this.freezed = false;
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
		if (this.freezed) throw new Error('This manager is freezed.');
		super.clear();
		return this;
	};
	/**
	 * @return {boolean}
	 */
	delete() {
		if (this.freezed) throw new Error('This manager is freezed.');
		return super.delete();
	};
	/**
	 * @param {any}
	 * @return {any}
	 * @return {this}
	 */
	set(key, val) {
		if (this.freezed) throw new Error('This manager is freezed.');
		super.set(key, val);
		return this;
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
		return this.findKey(val => val === val);
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
		return this.filter(val => !manager.has(val));
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
	 * @param {any} key of copy source
	 * @optional {...any} key(s) of copy target
	 * @return {this}
	 */
	fill(source, ...target) {
		if (this.freeze) throw new Error('This manager is freezed.');
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
	every(fn, thisArg) {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		return this.array().every(elm => fn(elm[1], elm[0], this));
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
		const [key, val] = this.array().find(elm => fn(elm[1], elm[0], this));
		return val;
	};
	/**
	 * @param {Function}
	 * @optional {any}
	 * @return {any}
	 */
	findKey(fn, thisArg) {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		const [key, val] = this.array().find(elm => fn(elm[1], elm[0], this));
		return key;
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
	 * @optional {any}
	 * @return {boolean}
	 */
	sweep(fn, thisArg) {
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