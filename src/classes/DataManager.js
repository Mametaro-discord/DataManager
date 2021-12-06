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
		this.freeze = false;
	};
	/**
	 * @return {this}
	 */
	freeze() {
		this.freeze = true;
		return this;
	};
	/**
	 * @return {this}
	 */
	unfreeze() {
		this.freeze = false;
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
		if (this.freeze) throw new Error('This manager is freezed.');
		super.clear();
		return this;
	};
	/**
	 * @return {boolean}
	 */
	delete() {
		if (this.freeze) throw new Error('This manager is freezed.');
		return super.delete();
	};
	/**
	 * @param {any}
	 * @return {any}
	 * @return {this}
	 */
	set(key, val) {
		if (this.freeze) throw new Error('This manager is freezed.');
		super.set(key, val);
		return this;
	};
	/**
	 * @param {any}
	 * @return {any}
	 */
	keyOf(val) {
		return this.findKey(val => val === val);
	};
	/**
	 * @param {DataManager}
	 * @return {DataManager}
	 */
	concat(manager) {
		const clone = manager.clone();
		this
			.clone()
			.filter((val, key) => !clone.has(key))
			.forEach((val, key) => clone.set(key, val));
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
		fn = fn.bind(thisArg);
		return this.array().every(elm => fn(elm[1], elm[0], this));
	};
	/**
	 * @param {Function}
	 * @optional {any}
	 * @return {DataManager}
	 */
	filter(fn, thisArg) {
		fn = fn.bind(thisArg);
		return new DataManager(
				this.array().filter(elm => fn(elm[1], elm[0], this))
			);
	};
	/**
	 * @param {Function}
	 * @optional {any}
	 * @return {any}
	 */
	find(fn, thisArg) {
		fn = fn.bind(thisArg);
		const [key, val] = this.array().find(elm => fn(elm[1], elm[0], this));
		return val;
	};
	/**
	 * @param {Function}
	 * @optional {any}
	 * @return {any}
	 */
	findKey(fn, thisArg) {
		fn = fn.bind(thisArg);
		const [key, val] = this.array().find(elm => fn(elm[1], elm[0], this));
		return key;
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
		fn = fn.bind(thisArg);
		return this.array().map(elm => fn(elm[1], elm[0], this));
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
		fn = fn.bind(thisArg);
		return Boolean(
				this.find(fn)
			);
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