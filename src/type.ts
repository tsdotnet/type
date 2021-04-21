/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import {ArrayLikeWritable, NullablePrimitive, Primitive as P} from '@tsdotnet/common-interfaces';

/*
 * Note: 'type' is essentially a static class with method names that would easily collide without a namespace.
 * We have to export it as well as default so TypeDoc picks it up.
 */

/* eslint-disable @typescript-eslint/ban-types */

export namespace type
{
	export type Primitive = P;

	export const enum Value
	{
		Boolean   = 'boolean',
		Number    = 'number',
		String    = 'string',
		Symbol    = 'symbol',
		Object    = 'object',
		Undefined = 'undefined',
		Function  = 'function',
	}

	type Name<T> = T extends symbol
		? 'symbol'
		: T extends string
			? 'string'
			: T extends number
				? 'number'
				: T extends boolean
					? 'boolean'
					: T extends undefined
						? 'undefined'
						: T extends Function
							? 'function'
							: 'object';

	export type Literal =
		Name<symbol>
		| Name<string>
		| Name<number>
		| Name<boolean>
		| Name<undefined>
		| Name<Function>
		| Name<object>;


	/**
	 * Returns true if the target matches the type (instanceof).
	 * @param instance
	 * @param type
	 * @returns {T|null}
	 */
	export function is<T extends object> (
		instance: object,
		type: new (...params: any[]) => T): instance is T
	{
		return instance instanceof type;
	}

	/**
	 * Returns null if the target does not match the type (instanceof).
	 * Otherwise returns the target as the type.
	 * @param instance
	 * @param type
	 * @returns {T|null}
	 */
	export function as<T> (instance: object, type: new (...params: any[]) => T): T | null
	{
		return instance instanceof type ? instance : null;
	}

	/**
	 * Returns true if the value parameter is null or undefined.
	 * @param value
	 * @returns {boolean}
	 */
	export function isNullOrUndefined (value: unknown): value is null | undefined
	{
		return value==null;
	}

	/**
	 * Returns true if the value parameter is a boolean.
	 * @param value
	 * @returns {boolean}
	 */
	export function isBoolean (value: unknown): value is boolean
	{
		return typeof value==='boolean';
	}

	/**
	 * Returns true if the value parameter is a number.
	 * @param value
	 * @param ignoreNaN Default is false. When true, NaN is not considered a number and will return false.
	 * @returns {boolean}
	 */
	export function isNumber (value: unknown, ignoreNaN: boolean = false): value is number
	{
		return typeof value==='number' && (!ignoreNaN || !isNaN(value));
	}

	/**
	 * Returns true if is a number and is NaN.
	 * @param value
	 * @returns {boolean}
	 */
	export function isTrueNaN (value: unknown): value is number
	{
		return typeof value==='number' && isNaN(value);
	}

	/**
	 * Returns true if the value parameter is a string.
	 * @param value
	 * @returns {boolean}
	 */
	export function isString (value: unknown): value is string
	{
		return typeof value==='string';
	}

	/**
	 * Returns true if the value is a boolean, string, number, or null.
	 * @param value
	 * @returns {boolean}
	 */
	export function isPrimitive (value: unknown): value is NullablePrimitive


	/**
	 * Returns true if the value is a boolean, string, number, null, or undefined.
	 * @param value
	 * @param allowUndefined
	 * @returns {boolean}
	 */
	export function isPrimitive (value: unknown, allowUndefined: false): value is NullablePrimitive

	/**
	 * Returns true if the value is a boolean, string, number, null, or undefined.
	 * @param value
	 * @param allowUndefined if set to true will return true if the value is undefined.
	 * @returns {boolean}
	 */
	export function isPrimitive (
		value: unknown,
		allowUndefined: boolean): value is NullablePrimitive | undefined

	/**
	 * Returns true if the value is a boolean, string, number, null, or undefined.
	 * @param value
	 * @param allowUndefined if set to true will return true if the value is undefined.
	 * @returns {boolean}
	 */
	export function isPrimitive (
		value: unknown,
		allowUndefined: boolean = false): value is NullablePrimitive | undefined
	{
		const t = typeof value;
		switch(t)
		{
			case Value.Boolean:
			case Value.String:
			case Value.Number:
				return true;
			case Value.Undefined:
				return allowUndefined;
			case Value.Object:
				return value===null;
		}
		return false;
	}


	/**
	 * For detecting if the value can be used as a key.
	 * @param value
	 * @returns {boolean}
	 */
	export function isPrimitiveOrSymbol (value: unknown): value is NullablePrimitive | symbol

	/**
	 * For detecting if the value can be used as a key.
	 * @param value
	 * @param allowUndefined
	 * @returns {boolean}
	 */
	export function isPrimitiveOrSymbol (
		value: unknown,
		allowUndefined: false): value is NullablePrimitive | symbol

	/**
	 * For detecting if the value can be used as a key.
	 * @param value
	 * @param allowUndefined
	 * @returns {boolean}
	 */
	export function isPrimitiveOrSymbol (
		value: unknown,
		allowUndefined: boolean): value is NullablePrimitive | symbol | undefined

	/**
	 * For detecting if the value can be used as a key.
	 * @param value
	 * @param allowUndefined
	 * @returns {boolean}
	 */
	export function isPrimitiveOrSymbol (
		value: unknown,
		allowUndefined: boolean = false): value is NullablePrimitive | symbol | undefined
	{
		return typeof value===Value.Symbol || isPrimitive(value, allowUndefined);
	}

	/**
	 * Returns true if the value is a string, number, or symbol.
	 * @param value
	 * @returns {boolean}
	 */
	export function isPropertyKey (value: unknown): value is PropertyKey
	{
		const t = typeof value;
		switch(t)
		{
			case Value.String:
			case Value.Number:
			case Value.Symbol:
				return true;
		}
		return false;
	}

	/**
	 * Returns true if the value parameter is a function.
	 * @param value
	 * @returns {boolean}
	 */
	export function isFunction (value: unknown): value is (...params: any[]) => unknown
	{
		return typeof value==='function';
	}

	/**
	 * Returns true if the value parameter is an object.
	 * @param value
	 * @returns {boolean}
	 */
	export function isObject (value: unknown): value is object

	/**
	 * Returns true if the value parameter is an object.
	 * @param value
	 * @param allowNull If false (default) null is not considered an object.
	 * @returns {boolean}
	 */
	export function isObject (value: unknown, allowNull: false): value is object
	export function isObject (value: unknown, allowNull: boolean): value is object | null
	export function isObject (value: unknown, allowNull: boolean = false): value is object | null
	{
		return typeof value===Value.Object && (allowNull || value!==null);
	}

	/**
	 * Guarantees a number value or NaN instead.
	 * @param value
	 * @returns {number}
	 */
	export function numberOrNaN (value: unknown): number
	{
		return typeof value==='number' ? value : NaN;
	}

	/**
	 * Will detect if a member exists (using 'in').
	 * Returns true if a property or method exists on the object or its prototype.
	 * @param instance
	 * @param property Name of the member.
	 * @param verify When true, if the member exists but is undefined, it will return false.
	 * @returns {boolean}
	 */
	export function hasMember<T = unknown, K extends PropertyKey = keyof T> (
		instance: unknown,
		property: K,
		verify: boolean = false): instance is { [P in K]: unknown } & T
	{
		return (
			instance!=null &&
			!isPrimitive(instance) &&
			property in (instance as object) &&
			(!verify || (instance as any)[property]!==undefined)
		);
	}

	/**
	 * Returns true if the member is a string.
	 * @param instance
	 * @param {K} property
	 * @param {"string"} type
	 * @return {instance is {[P in K]: string} & T}
	 */
	export function hasMemberOfType<T = unknown, K extends PropertyKey = keyof T> (
		instance: unknown,
		property: K,
		type: 'string'): instance is { [P in K]: string } & T;

	/**
	 * Returns true if the member is a number.
	 * @param instance
	 * @param {K} property
	 * @param {"number"} type
	 * @return {instance is {[P in K]: number} & T}
	 */
	export function hasMemberOfType<T = unknown, K extends PropertyKey = keyof T> (
		instance: unknown,
		property: K,
		type: 'number'): instance is { [P in K]: number } & T;

	/**
	 * Returns true if the member is a boolean.
	 * @param instance
	 * @param {K} property
	 * @param {"boolean"} type
	 * @return {instance is {[P in K]: boolean} & T}
	 */
	export function hasMemberOfType<T = unknown, K extends PropertyKey = keyof T> (
		instance: unknown,
		property: K,
		type: 'boolean'): instance is { [P in K]: boolean } & T;

	/**
	 * Returns true if the member is a object.
	 * @param instance
	 * @param {K} property
	 * @param {"object"} type
	 * @return {instance is {[P in K]: object} & T}
	 */
	export function hasMemberOfType<T = unknown, K extends PropertyKey = keyof T> (
		instance: unknown,
		property: K,
		type: 'object'): instance is { [P in K]: object } & T;

	/**
	 * Returns true if the member is a Function.
	 * @param instance
	 * @param {K} property
	 * @param {"function"} type
	 * @return {instance is {[P in K]: Function} & T}
	 */
	export function hasMemberOfType<T = unknown, K extends PropertyKey = keyof T> (
		instance: unknown,
		property: K,
		type: 'function'): instance is { [P in K]: Function } & T;


	/**
	 * Returns true if the member matches the type.
	 * @param instance
	 * @param property
	 * @param type
	 * @returns {boolean}
	 */
	export function hasMemberOfType (
		instance: unknown,
		property: PropertyKey,
		type: Literal): boolean
	{
		return hasMember(instance, property)
			&& typeof instance[property as any]===type;
	}

	/**
	 * Tests to see if an object has a function of the specified name.
	 * @param instance
	 * @param {K} name
	 * @return {instance is {[P in K]: Function} & T}
	 */
	export function hasMethod<T = unknown, K extends PropertyKey = keyof T> (
		instance: unknown,
		name: K): instance is { [P in K]: (...params: any[]) => unknown } & T
	{
		return hasMemberOfType(instance, name, 'function');
	}

	/**
	 * Checks to see if object is an array or something with length property that isn't a function.
	 * @param instance
	 * @returns {instance is ArrayLikeWritable<T>}
	 */
	export function isArrayLike<T = unknown> (instance: unknown): instance is ArrayLikeWritable<T>
	{
		/*
		 * NOTE:
		 *
		 * Functions:
		 * Enumerating a function although it has a .length property will yield nothing or unexpected results.
		 * Effectively, a function is not like an array.
		 *
		 * Strings:
		 * Behave like arrays but don't have the same exact methods.
		 */
		return (
			instance instanceof Array ||
			isString(instance) ||
			(!isFunction(instance) && hasMember(instance, 'length'))
		);
	}

	/**
	 * Checks to see if [Symbol.iterator] is a function.
	 * @param instance
	 * @return {instance is Iterable<T>}
	 */
	export function isIterable<T = unknown> (
		instance: unknown): instance is Iterable<T>
	{
		return hasMemberOfType(instance, Symbol.iterator, Value.Function);
	}


	/**
	 * Ensures an object is iterable if possible.
	 * Returns null if unable to convert to iterable.
	 * @param {string} instance
	 * @return {null}
	 */
	export function asIterable (
		instance: string): null

	/**
	 * Ensures an object is iterable if possible.
	 * Returns null if unable to convert to iterable.
	 * @param {string} instance
	 * @param {false} allowString
	 * @return {null}
	 */
	export function asIterable (
		instance: string,
		allowString: false): null

	/**
	 * Ensures an object is iterable if possible.
	 * Returns null if unable to convert to iterable.
	 * @param {string} instance
	 * @param {true} allowString
	 * @return {string}
	 */
	export function asIterable (
		instance: string,
		allowString: true): string

	/**
	 * Ensures an object is iterable if possible.
	 * Returns null if unable to convert to iterable.
	 * @param {Iterable<T> | ArrayLike<T>} instance
	 * @param {boolean} allowString
	 * @return {Iterable<T> | null}
	 */
	export function asIterable<T> (
		instance: Iterable<T> | ArrayLike<T>,
		allowString?: boolean): Iterable<T> | null

	/**
	 * Ensures an object is iterable if possible.
	 * Returns null if unable to convert to iterable.
	 * @param instance
	 * @param {boolean} allowString
	 * @return {Iterable<T> | null}
	 */
	export function asIterable<T = unknown> (
		instance: unknown,
		allowString?: boolean): Iterable<T> | null

	/**
	 * Ensures an object is iterable if possible.
	 * Returns null if unable to convert to iterable.
	 * @param instance
	 * @param {boolean} allowString
	 * @return {Iterable<unknown> | null}
	 */
	export function asIterable (
		instance: unknown,
		allowString: boolean = false): Iterable<unknown> | null
	{
		if(isIterable(instance)) return instance;
		if((allowString || typeof instance!=='string') && isArrayLike(instance)) return {
			* [Symbol.iterator] (): Iterator<unknown>
			{
				const len = instance.length;
				if(!isNumber(len)) throw new TypeError('ArrayLike object has a non-number length.');
				for(let i = 0; i<len; i++)
				{
					if(len!==instance.length) throw new Error('instance.length value changed while iterating.');
					yield instance[i];
				}
			}
		};
		return null;
	}
}

Object.freeze(type);

export default type;
