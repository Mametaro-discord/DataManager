export type Spread<T> = Array<T | T[]>;

export class Manager<K = string, V = any> extends Map<K, V> {
	public frozen: boolean;
	public frozenKeys: K[];
	public sealed: boolean;
	public sealedKeys: K[];
	public stricted: boolean;

	public constructor(data?: Array<[K, V]>);

	private _handleError<T>(message: string, type: T): T;
	private _handleSpread(data: Array<any | any[]>): any[];

	public override clear(): this;
	public override delete(key: K): boolean;
	public override forEach(fn: (val: V, key: K, src: this) => void, thisArg?: any): this;
	public override set(key: K, val: V): this;

	public array(): Array<[K, V]>;
	public at(index?: number): V
	public clone(data?: Array<[K, V]>): Manager<K, V>;
	public concat(...managers: Array<Manager<K, V> | Manager<K, V>[]>): Manager<K, V>;
	public deleteAll(...keys: Array<[K, V]>): this;
	public deleteBy(fn: (val: V, key: K, src: this) => boolean, thisArg?: any): this;
	public difference(manager: Manager<K, V>): Manager<K, V>;
	public equals(manager: Manager<K, V>): boolean;
	public every(fn: (val: V, key: K, src: this) => boolean, thisArg?: any): boolean;
	public fill(source: K, ...target: Spread<K>): this;
	public filter(fn: (val: V, key: K, src: this) => boolean, thisArg?: any): Manager<K, V>;
	public find(fn: (val: V, key: K, src: this) => boolean, thisArg?: any): V;
	public findKey(fn: (val: V, key: K, src: this) => boolean, thisArg?: any): K;
	public first(): V;
	public firstKey(): K;
	public flatMap(fn: (val: V, key: K, src: this) => Manager<K, V>, thisArg?: any): Manager<K, V>;
	public freeze(): this;
	public freezeKey(key: K): this;
	public freezeKeys(...keys: Spread<K>): this;
	public getAll(...keys: Spread<K>): Array<V | void>;
	public hasAll(...keys: Spread<K>): boolean;
	public hasAny(...keys: Spread<K>): boolean;
	public intersect(manager: Manager<K, V>): Manager<K, V>;
	public keyArray(): K[];
	public keyAt(index?: number): K;
	public keyOf(val: V): K;
	public last(): V;
	public lastKey(): K;
	public map(fn: (val: V, key: K, src: this) => any, thisArg?: any): any[];
	public mapValues(fn: (val: V, key: K, src: this) => V, thisArg?: any): Manager<K, V>;
	public partition(fn: (val: V, key: K, src: this) => boolean, thisArg?: any): Manager<K, V>[];
	public random(): V;
	public randomKey(): K;
	public reduce(fn: (acc: any, val: V, key: K, src: this) => any, init?: any): any;
	public seal(): this;
	public sealKey(key: K): this;
	public sealKeys(...keys: Spread<K>): this;
	public setAll(keys: Array<[K, V]>): this;
	public some(fn: (val: V, key: K, src: this) => boolean, thisArg?: any): boolean;
	public sort(fn?: (firstV: V, secondV: V, firstK: K, secondK: K) => number): this;
	public sorted(fn?: (firstV: V, secondV: V, firstK: K, secondK: K) => number): Manager<K, V>;
	public strict(): this;
	public sweep(fn: (val: V, key: K, src: this) => boolean, thisArg?: any): number;
	public tap(fn: (src: this) => void, thisArg?: any): this;
	public unfreeze(): this;
	public unfreezeKey(key: K): this;
	public unfreezeKeys(...keys: Spread<K>): this;
	public unseal(): this;
	public unsealKey(key: K): this;
	public unsealKeys(...keys: Spread<K>): this;
	public unstrict(): this;
	public valueArray(): V[];
}