'use strict';

export default class Manager<K = any, V = any> extends Map<K, V> {
	public frozen: boolean;
	public frozenKeys: K[];
	public sealed: boolean;
	public sealedKeys: K[];
	public stricted: boolean;
	/**
	 * @param {Array<[K, V]>} @optional
	 */
	constructor(data?: Array<[K, V]>) {
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
	 * @param {string} @optional TYPE
	 * @return {void}
	 * @private
	 */
	private handleError<T>(message: string, type: T): T {
		if (this.stricted) throw new Error(message);
		return type;
	};
	/**
	 * @param {Array<any | any[]>}
	 * @return {any[]}
	 * @private
	 */
	private handleSpread(data: Array<any | any[]>): any[] {
		if (Array.isArray(data[0])) return data[0];
		return data;
	};
	/**
	 * @return {this}
	 */
	freeze(): this {
		this.frozen = true;
		return this;
	};
	/**
	 * @param {K}
	 * @return {this}
	 */
	freezeKey(key: K): this {
		this.frozenKeys.push(key);
		return this;
	};
	/**
	 * @param {Array<K | K[]>}
	 * @return {this}
	 */
	freezeKeys(...keys: Array<K | K[]>): this {
		const transformed: K[] = this.handleSpread(keys);
		transformed.forEach(elm => this.frozenKeys.push(elm));
		return this;
	};
	/**
	 * @return {this}
	 */
	unfreeze(): this {
		this.frozen = false;
		return this;
	};
	/**
	 * @param {K}
	 * @return {this}
	 */
	unfreezeKey(key: K): this {
		this.frozenKeys = this.frozenKeys.filter(elm => elm !== key);
		return this;
	};
	/**
	 * @param {Array<K | K[]>}
	 * @return {this}
	 */
	unfreezeKeys(...keys: Array<K | K[]>): this {
		const transformed: K[] = this.handleSpread(keys);
		this.frozenKeys = this.frozenKeys.filter(elm => !transformed.includes(elm));
		return this;
	};
	/**
	 * @return {this}
	 */
	seal(): this {
		this.sealed = true;
		return this;
	};
	/**
	 * @param {K}
	 * @return {this}
	 */
	sealKey(key: K): this {
		this.sealedKeys.push(key);
		return this;
	};
	/**
	 * @param {Array<K | K[]>}
	 * @return {this}
	 */
	sealKeys(...keys: Array<K | K[]>): this {
		const transformed: K[] = this.handleSpread(keys);
		transformed.forEach(elm => this.sealedKeys.push(elm));
		return this;
	};
	/**
	 * @return {this}
	 */
	unseal(): this {
		this.sealed = false;
		return this;
	};
	/**
	 * @param {K}
	 * @return {this}
	 */
	unsealKey(key: K): this {
		this.sealedKeys = this.sealedKeys.filter(elm => elm !== key);
		return this;
	};
	/**
	 * @param {Array<K | K[]>}
	 * @return {this}
	 */
	unsealKeys(...keys: Array<K | K[]>): this {
		const transformed: K[] = this.handleSpread(keys);
		this.sealedKeys = this.sealedKeys.filter(elm => !transformed.includes(elm));
		return this;
	};
	/**
	 * @return {this}
	 */
	strict(): this {
		this.stricted = true;
		return this;
	};
	/**
	 * @return {this}
	 */
	unstrict(): this {
		this.stricted = false;
		return this;
	};
	/**
	 * @return {Array<[K, V]>}
	 */
	array(): Array<[K, V]> {
		return Array.from(this.entries());
	};
	/**
	 * @return {K[]}
	 */
	keyArray(): K[] {
		return Array.from(this.keys());
	};
	/**
	 * @return {V[]}
	 */
	valueArray(): V[] {
		return Array.from(this.values());
	};
	/**
	 * @param {Array<[K, V]>} @optional
	 * @return {Manager}
	 */
	clone(data?: Array<[K, V]>): Manager<K, V> {
		const clone = new Manager(this.array());
		if (data) clone.setAll(data);
		return clone;
	};
	override clear(): this {
		if (this.sealed) return this.handleError<this>('This manager is sealed.', this);
		if (this.frozen) return this.handleError<this>('This manager is frozen.', this);
		if (this.sealedKeys.some(elm => this.keyArray().includes(elm))) return this
			.handleError<this>('Some keys is sealed.', this);
		if (this.frozenKeys.some(elm => this.keyArray().includes(elm))) return this
			.handleError<this>('Some keys is frozen.', this);
		super.clear();
		return this;
	};
	/**
	 * @param {K}
	 * @return {boolean}
	 */
	override delete(key: K): boolean {
		if (this.sealed) return this.handleError<boolean>('This manager is sealed.', false);
		if (this.frozen) return this.handleError<boolean>('This manager is sealed.', false)
		if (this.sealedKeys.includes(key)) return this
			.handleError<boolean>(`This key: ${key} is sealed.`, false);
		if (this.frozenKeys.includes(key)) return this
			.handleError<boolean>(`This key: ${key} is frozen.`, false);
		return super.delete(key);
	};
	/**
	 * @param {K[]}
	 * @return {this}
	 */
	deleteAll(...keys: Array<K | K[]>): this {
		if (this.sealed) return this.handleError<this>('This manager is sealed.', this);
		if (this.frozen) return this.handleError<this>('This manager is frozen.', this);
		const transformed = this.handleSpread(keys);
		transformed.forEach(elm => {
			if (this.sealedKeys.includes(elm)) this
				.handleError<this>(`This key: ${elm} is sealed.`, this);
			if (this.frozenKeys.includes(elm)) this
				.handleError<this>(`This key: ${elm} is frozen.`, this);
			this.delete(elm);
		});
		return this;
	};
	/**
	 * @param {K[]}
	 * @return {Array<V | undefined>}
	 */
	getAll(...keys: K[]): Array<V | void> {
		keys = this.handleSpread(keys);
		return keys.map(elm => this.get(elm));
	};
	/**
	 * @param {K}
	 * @param {?V}
	 * @return {this}
	 */
	override set(key: K, val: V): this {
		if (this.frozen) return this.handleError<this>('This manager is frozen.', this);
		if (this.frozenKeys.includes(key)) return this
			.handleError<this>(`This key: ${key} is frozen.`, this);
		return super.set(key, val);
	};
	/**
	 * @param {Array<[K, V]>}
	 * @return {this}
	 */
	setAll(data: Array<[K, V]>): this {
		if (this.frozen) return this.handleError<this>('This manager is frozen.', this);
		data.forEach(elm => {
			if (this.frozenKeys.includes(elm[0])) this
				.handleError<this>(`This key: ${elm[0]} is frozen.`, this);
			this.set(elm[0], elm[1]);
		});
		return this;
	};
	/**
	 * @param {K[]}
	 * @return {boolean}
	 */
	hasAll(...keys: Array<K | K[]>): boolean {
		const transformedKeys: K[] = this.handleSpread(keys);
		return transformedKeys.every(elm => this.has(elm));
	};
	/**
	 * @param {K[]}
	 * @return {boolean}
	 */
	hasAny(...keys: Array<K | K[]>): boolean {
		const transformedKeys: K[] = this.handleSpread(keys);
		return transformedKeys.some(elm => this.has(elm));
	};
	/**
	 * @param {V}
	 * @return {K}
	 */
	keyOf(val: V): K {
		return this.findKey(v => v === val);
	};
	/**
	 * @param {Array<Manager<K, V> | Manager<K, V>[]>}
	 * @return {Manager<K, V>}
	 */
	concat(...managers: Array<Manager<K, V> | Manager<K, V>[]>): Manager<K, V> {
		const transformed: Manager<K, V>[] = this.handleSpread(managers);
		let data: Array<[K, V]> = [];
		transformed.forEach(manager => {
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
	difference(manager: Manager<K, V>): Manager<K, V> {
		return this.filter((_, key) => !manager.has(key))
			.concat(manager.filter((_, key) => !this.has(key)));
	};
	/**
	 * @param {Manager<K, V>}
	 * @return {Manager<K, V>}
	 */
	intersect(manager: Manager<K, V>): Manager<K, V> {
		return this.filter((_, key) => manager.has(key));
	};
	/**
	 * @param {Manager<K, V>}
	 * @return {Manager<K, V>}
	 */
	equals(manager: Manager<K, V>): boolean {
		return this.every((val, key) => manager.get(key) === val);
	};
	/**
	 * @param {number} @optional
	 * @return {V}
	 */
	at(index: number = 0): V {
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
	keyAt(index: number = 0): K {
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
	first(): V {
		return this.array()[0][1];
	};
	/**
	 * @return {K}
	 */
	firstKey(): K {
		return this.array()[0][0];
	};
	/**
	 * @return {V}
	 */
	last(): V {
		return this.array().reverse()[0][1];
	};
	/**
	 * @return {K}
	 */
	lastKey(): K {
		return this.array().reverse()[0][0];
	};
	/**
	 * @return {V}
	 */
	random(): V {
		const array = this.array();
		const random = Math.floor(Math.random() * array.length);
		return array[random][1];
	};
	/**
	 * @return {K}
	 */
	randomKey(): K {
		const array = this.array();
		const random = Math.floor(Math.random() * array.length);
		return array[random][0];
	};
	/**
	 * @param {K}
	 * @param {Array<K | K[]>} @optional
	 * @return {this}
	 */
	fill(source: K, ...target: Array<K | K[]> | []): this {
		const transformed: K[] = target ? this.handleSpread(target) : this.keyArray();
		if (this.sealed) return this.handleError<this>('This manager is sealed.', this);
		if (this.frozen) return this.handleError<this>('This manager is frozen.', this);
		const sourceVal: V = this.get(source) as V;
		transformed.forEach(elm => {
			if (this.sealedKeys.includes(elm)) this
				.handleError<this>(`This key: ${elm} is sealed.`, this);
			if (this.frozenKeys.includes(elm)) this
				.handleError<this>(`This key: ${elm} is frozen.`, this);
			this.set(elm, sourceVal);
		});
		return this;
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {this}
	 */
	deleteBy(fn: (val: V, key: K, src: this) => boolean, thisArg?: any): this {
		if (this.sealed) return this.handleError<this>('This manager is sealed.', this);
		if (this.frozen) return this.handleError<this>('This manager is frozen.', this);
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		return this.forEach((val, key) => {
			if (this.sealedKeys.includes(key)) this
				.handleError<this>(`This key: ${key} is sealed.`, this);
			if (this.frozenKeys.includes(key)) this
				.handleError<this>(`This key: ${key} is frozen.`, this);
			if (fn(val, key, this)) this.delete(key);
		});
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {boolean}
	 */
	every(fn: (val: V, key: K, src: this) => boolean, thisArg?: any): boolean {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		let result: number = 0;
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
	filter(fn: (val: V, key: K, src: this) => boolean, thisArg?: any): Manager<K, V> {
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
	find(fn: (val: V, key: K, src: this) => boolean, thisArg?: any): V {
		return this.filter(fn, thisArg).first();
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {K}
	 */
	findKey(fn: (val: V, key: K, src: this) => boolean, thisArg?: any): K {
		return this.filter(fn, thisArg).firstKey();
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {Manager<K, T>}
	 */
	flatMap(fn: (val: V, key: K, src: this) => Manager<K, V>, thisArg?: any): Manager<K, V> {
		const managers: Manager<K, V>[] = this.map(fn, thisArg);
		return new Manager().concat(...managers);
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {this}
	 */
	override forEach(fn: (val: V, key: K, src: this) => void, thisArg?: any): this {
		super.forEach(fn as (val: V, key: K, map: Map<K, V>) => void, thisArg);
		return this;
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {any[]}
	 */
	map(fn: (val: V, key: K, src: this) => any, thisArg?: any): any[] {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		let result: any[] = [];
		this.forEach((val, key) => result.push(fn(val, key, this)));
		return result;
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {Manager<K, V>}
	 */
	mapValues(fn: (val: V, key: K, src: this) => any, thisArg?: any): Manager<K, V> {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		const clone = this.clone();
		return clone.forEach((val, key) => clone.set(key, fn(val, key, this)));
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {Manager<K, V>[]}
	 */
	partition(fn: (val: V, key: K, src: this) => boolean, thisArg?: any): Manager<K, V>[] {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		const managers: Manager<K, V>[] = [new Manager(), new Manager()];
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
	reduce(fn: (acc: any, val: V, key: K, src: this) => any, init?: any): any {
		let acc: any;
		if (init) {
			acc = init;
			this.forEach((val, key) => acc = fn(acc, val, key, this));
		} else {
			let first: boolean = true;
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
	some(fn: (val: V, key: K, src: this) => boolean, thisArg?: any): boolean {
		return Boolean(this.find(fn, thisArg));
	};
	/**
	 * @param {Function}
	 * @return {this}
	 */
	sort(fn: (firstV: V, secondV: V, firstK: K, secondK: K) => number = (a, b) => Number(a > b) || Number(a === b) - 1): this {
		if (this.sealed) return this.handleError<this>('This manager is sealed.', this);
		if (this.frozen) return this.handleError<this>('This manager is frozen.', this);
		if (this.sealedKeys.some(elm => this.keyArray().includes(elm))) return this
			.handleError<this>(`Some keys is sealed.`, this);
		if (this.frozenKeys.some(elm => this.keyArray().includes(elm))) return this
			.handleError<this>(`Some keys is frozen.`, this);
		const array: Array<[K, V]> = this.array();
		array.sort((first, second) => fn(first[1], second[1], first[0], second[0]));
		this.clear();
		this.setAll(array);
		return this;
	};
	/**
	 * @param {Function}
	 * @return {Manager<K, V>}
	 */
	sorted(fn: (firstV: V, secondV: V, firstK: K, secondK: K) => number = (a, b) => Number(a > b) || Number(a === b) - 1): Manager<K, V> {
		const array: Array<[K, V]> = this.array();
		array.sort((first, second) => fn(first[1], second[1], first[0], second[0]));
		return new Manager(array);
	};
	/**
	 * @param {Function}
	 * @param {any} @optional
	 * @return {number}
	 */
	sweep(fn: (val: V, key: K, src: this) => boolean, thisArg?: any): number {
		if (this.sealed) return this.handleError<number>('This manager is sealed.', -1);
		if (this.frozen) return this.handleError<number>('This manager is frozen.', -1);
		if (this.sealedKeys.some(elm => this.keyArray().includes(elm))) return this
			.handleError<number>(`Some keys is sealed.`, -1);
		if (this.frozenKeys.some(elm => this.keyArray().includes(elm))) return this
			.handleError<number>(`Some keys is frozen.`, -1);
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		let result: number = 0;
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
	tap(fn: (src: this) => void, thisArg?: any): this {
		if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
		fn(this);
		return this;
	};
	/**
	 * @param {any}
	 * @return {boolean}
	 */
	static isManager(managerLike: any): boolean {
		return managerLike instanceof Manager;
	};
};