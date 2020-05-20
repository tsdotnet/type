﻿/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */

import {ArrayLikeWritable, NullablePrimitive, Primitive as P} from '@tsdotnet/common-interfaces';

/*
 * Note: 'type' is essentially a static class with method names that would easily collide without a namespace.
 * We have to export it as well as default so TypeDoc picks it up.
 */

export namespace type
{
	export type Primitive = P;

	export type PropertyKey = string | number | symbol;

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
	 * @param target
	 * @param type
	 * @returns {T|null}
	 */
	export function is<T extends object> (
		target: object,
		type: new (...params: any[]) => T): target is T
	{
		return target instanceof type;
	}

	/**
	 * Returns null if the target does not match the type (instanceof).
	 * Otherwise returns the target as the type.
	 * @param target
	 * @param type
	 * @returns {T|null}
	 */
	export function as<T> (target: object, type: new (...params: any[]) => T): T | null
	{
		return target instanceof type ? target : null;
	}

	/**
	 * Returns true if the value parameter is null or undefined.
	 * @param value
	 * @returns {boolean}
	 */
	export function isNullOrUndefined (value: any): value is null | undefined
	{
		return value==null;
	}

	/**
	 * Returns true if the value parameter is a boolean.
	 * @param value
	 * @returns {boolean}
	 */
	export function isBoolean (value: any): value is boolean
	{
		return typeof value===Value.Boolean;
	}

	/**
	 * Returns true if the value parameter is a number.
	 * @param value
	 * @param ignoreNaN Default is false. When true, NaN is not considered a number and will return false.
	 * @returns {boolean}
	 */
	export function isNumber (value: any, ignoreNaN: boolean = false): value is number
	{
		return typeof value===Value.Number && (!ignoreNaN || !isNaN(value));
	}

	/**
	 * Returns true if is a number and is NaN.
	 * @param value
	 * @returns {boolean}
	 */
	export function isTrueNaN (value: any): value is number
	{
		return typeof value===Value.Number && isNaN(value);
	}

	/**
	 * Returns true if the value parameter is a string.
	 * @param value
	 * @returns {boolean}
	 */
	export function isString (value: any): value is string
	{
		return typeof value===Value.String;
	}

	/**
	 * Returns true if the value is a boolean, string, number, or null.
	 * @param value
	 * @returns {boolean}
	 */
	export function isPrimitive (value: any): value is NullablePrimitive


	/**
	 * Returns true if the value is a boolean, string, number, null, or undefined.
	 * @param value
	 * @param allowUndefined
	 * @returns {boolean}
	 */
	export function isPrimitive (value: any, allowUndefined: false): value is NullablePrimitive

	/**
	 * Returns true if the value is a boolean, string, number, null, or undefined.
	 * @param value
	 * @param allowUndefined if set to true will return true if the value is undefined.
	 * @returns {boolean}
	 */
	export function isPrimitive (
		value: any,
		allowUndefined: boolean): value is NullablePrimitive | undefined

	/**
	 * Returns true if the value is a boolean, string, number, null, or undefined.
	 * @param value
	 * @param allowUndefined if set to true will return true if the value is undefined.
	 * @returns {boolean}
	 */
	export function isPrimitive (
		value: any,
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
	export function isPrimitiveOrSymbol (value: any): value is NullablePrimitive | symbol

	/**
	 * For detecting if the value can be used as a key.
	 * @param value
	 * @param allowUndefined
	 * @returns {boolean}
	 */
	export function isPrimitiveOrSymbol (
		value: any,
		allowUndefined: false): value is NullablePrimitive | symbol

	/**
	 * For detecting if the value can be used as a key.
	 * @param value
	 * @param allowUndefined
	 * @returns {boolean}
	 */
	export function isPrimitiveOrSymbol (
		value: any,
		allowUndefined: boolean): value is NullablePrimitive | symbol | undefined

	/**
	 * For detecting if the value can be used as a key.
	 * @param value
	 * @param allowUndefined
	 * @returns {boolean}
	 */
	export function isPrimitiveOrSymbol (
		value: any,
		allowUndefined: boolean = false): value is NullablePrimitive | symbol | undefined
	{
		return typeof value===Value.Symbol ? true : isPrimitive(value, allowUndefined);
	}

	/**
	 * Returns true if the value is a string, number, or symbol.
	 * @param value
	 * @returns {boolean}
	 */
	export function isPropertyKey (value: any): value is PropertyKey
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
	export function isFunction (value: any): value is (...params: any[]) => any
	{
		return typeof value===Value.Function;
	}

	/**
	 * Returns true if the value parameter is an object.
	 * @param value
	 * @returns {boolean}
	 */
	export function isObject (value: any): value is object

	/**
	 * Returns true if the value parameter is an object.
	 * @param value
	 * @param allowNull If false (default) null is not considered an object.
	 * @returns {boolean}
	 */
	export function isObject (value: any, allowNull: false): value is object
	export function isObject (value: any, allowNull: boolean): value is object | null
	export function isObject (value: any, allowNull: boolean = false): value is object | null
	{
		return typeof value===Value.Object && (allowNull || value!==null);
	}

	/**
	 * Guarantees a number value or NaN instead.
	 * @param value
	 * @returns {number}
	 */
	export function numberOrNaN (value: any): number
	{
		return isNaN(value) ? NaN : value;
	}

	/**
	 * Will detect if a member exists (using 'in').
	 * Returns true if a property or method exists on the object or its prototype.
	 * @param instance
	 * @param property Name of the member.
	 * @param verify When true, if the member exists but is undefined, it will return false.
	 * @returns {boolean}
	 */
	export function hasMember (
		instance: any,
		property: PropertyKey,
		verify: boolean = false): boolean
	{
		return (
			instance &&
			!isPrimitive(instance) &&
			property in instance &&
			(!verify || instance[property]!==undefined)
		);
	}

	/**
	 * Returns true if the member matches the type.
	 * @param instance
	 * @param property
	 * @param type
	 * @returns {boolean}
	 */
	export function hasMemberOfType<T> (
		instance: any,
		property: PropertyKey,
		type: Literal): instance is T
	{
		return hasMember(instance, property) && typeof instance[property]===type;
	}

	/**
	 * Tests to see if an object has a function of the provide name.
	 * @param instance
	 * @param {string} name
	 * @returns {instance is T}
	 */
	export function hasMethod<T> (instance: any, name: PropertyKey): instance is T
	{
		return hasMemberOfType<T>(instance, name, Value.Function);
	}

	/**
	 * Checks to see if object is an array or something with length property that isn't a function.
	 * @param instance
	 * @returns {instance is ArrayLikeWritable<T>}
	 */
	export function isArrayLike<T> (instance: any): instance is ArrayLikeWritable<T>
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
	export function isIterable<T> (instance: any): instance is Iterable<T>
	{
		return hasMemberOfType(instance, Symbol.iterator, Value.Function);
	}

	/**
	 * Ensures an object is iterable if possible.
	 * Returns null if unable to convert to iterable.
	 * @param {Iterable<T> | ArrayLike<T>} instance
	 * @return {Iterable<T>}
	 */
	export function asIterable<T> (instance: Iterable<T> | ArrayLike<T>): Iterable<T> | null
	{
		if(isIterable(instance)) return instance;
		if(isArrayLike(instance)) return {
			* [Symbol.iterator] (): Iterator<T>
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
