/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
import { ArrayLikeWritable, NullablePrimitive, Primitive as P } from '@tsdotnet/common-interfaces';
export declare namespace type {
    type Primitive = P;
    const enum Value {
        Boolean = "boolean",
        Number = "number",
        String = "string",
        Symbol = "symbol",
        Object = "object",
        Undefined = "undefined",
        Function = "function"
    }
    type Name<T> = T extends symbol ? 'symbol' : T extends string ? 'string' : T extends number ? 'number' : T extends boolean ? 'boolean' : T extends undefined ? 'undefined' : T extends Function ? 'function' : 'object';
    type Literal = Name<symbol> | Name<string> | Name<number> | Name<boolean> | Name<undefined> | Name<Function> | Name<object>;
    /**
     * Returns true if the target matches the type (instanceof).
     * @param instance
     * @param type
     * @returns {T|null}
     */
    function is<T extends object>(instance: object, type: new (...params: any[]) => T): instance is T;
    /**
     * Returns null if the target does not match the type (instanceof).
     * Otherwise returns the target as the type.
     * @param instance
     * @param type
     * @returns {T|null}
     */
    function as<T>(instance: object, type: new (...params: any[]) => T): T | null;
    /**
     * Returns true if the value parameter is null or undefined.
     * @param value
     * @returns {boolean}
     */
    function isNullOrUndefined(value: unknown): value is null | undefined;
    /**
     * Returns true if the value parameter is a boolean.
     * @param value
     * @returns {boolean}
     */
    function isBoolean(value: unknown): value is boolean;
    /**
     * Returns true if the value parameter is a number.
     * @param value
     * @param ignoreNaN Default is false. When true, NaN is not considered a number and will return false.
     * @returns {boolean}
     */
    function isNumber(value: unknown, ignoreNaN?: boolean): value is number;
    /**
     * Returns true if is a number and is NaN.
     * @param value
     * @returns {boolean}
     */
    function isTrueNaN(value: unknown): value is number;
    /**
     * Returns true if the value parameter is a string.
     * @param value
     * @returns {boolean}
     */
    function isString(value: unknown): value is string;
    /**
     * Returns true if the value is a boolean, string, number, or null.
     * @param value
     * @returns {boolean}
     */
    function isPrimitive(value: unknown): value is NullablePrimitive;
    /**
     * Returns true if the value is a boolean, string, number, null, or undefined.
     * @param value
     * @param allowUndefined
     * @returns {boolean}
     */
    function isPrimitive(value: unknown, allowUndefined: false): value is NullablePrimitive;
    /**
     * Returns true if the value is a boolean, string, number, null, or undefined.
     * @param value
     * @param allowUndefined if set to true will return true if the value is undefined.
     * @returns {boolean}
     */
    function isPrimitive(value: unknown, allowUndefined: boolean): value is NullablePrimitive | undefined;
    /**
     * For detecting if the value can be used as a key.
     * @param value
     * @returns {boolean}
     */
    function isPrimitiveOrSymbol(value: unknown): value is NullablePrimitive | symbol;
    /**
     * For detecting if the value can be used as a key.
     * @param value
     * @param allowUndefined
     * @returns {boolean}
     */
    function isPrimitiveOrSymbol(value: unknown, allowUndefined: false): value is NullablePrimitive | symbol;
    /**
     * For detecting if the value can be used as a key.
     * @param value
     * @param allowUndefined
     * @returns {boolean}
     */
    function isPrimitiveOrSymbol(value: unknown, allowUndefined: boolean): value is NullablePrimitive | symbol | undefined;
    /**
     * Returns true if the value is a string, number, or symbol.
     * @param value
     * @returns {boolean}
     */
    function isPropertyKey(value: unknown): value is PropertyKey;
    /**
     * Returns true if the value parameter is a function.
     * @param value
     * @returns {boolean}
     */
    function isFunction(value: unknown): value is (...params: any[]) => unknown;
    /**
     * Returns true if the value parameter is an object.
     * @param value
     * @returns {boolean}
     */
    function isObject(value: unknown): value is object;
    /**
     * Returns true if the value parameter is an object.
     * @param value
     * @param allowNull If false (default) null is not considered an object.
     * @returns {boolean}
     */
    function isObject(value: unknown, allowNull: false): value is object;
    function isObject(value: unknown, allowNull: boolean): value is object | null;
    /**
     * Guarantees a number value or NaN instead.
     * @param value
     * @returns {number}
     */
    function numberOrNaN(value: unknown): number;
    /**
     * Will detect if a member exists (using 'in').
     * Returns true if a property or method exists on the object or its prototype.
     * @param instance
     * @param property Name of the member.
     * @param verify When true, if the member exists but is undefined, it will return false.
     * @returns {boolean}
     */
    function hasMember<T = unknown, K extends PropertyKey = keyof T>(instance: unknown, property: K, verify?: boolean): instance is {
        [P in K]: unknown;
    } & T;
    /**
     * Returns true if the member is a string.
     * @param instance
     * @param {K} property
     * @param {"string"} type
     * @return {instance is {[P in K]: string} & T}
     */
    function hasMemberOfType<T = unknown, K extends PropertyKey = keyof T>(instance: unknown, property: K, type: 'string'): instance is {
        [P in K]: string;
    } & T;
    /**
     * Returns true if the member is a number.
     * @param instance
     * @param {K} property
     * @param {"number"} type
     * @return {instance is {[P in K]: number} & T}
     */
    function hasMemberOfType<T = unknown, K extends PropertyKey = keyof T>(instance: unknown, property: K, type: 'number'): instance is {
        [P in K]: number;
    } & T;
    /**
     * Returns true if the member is a boolean.
     * @param instance
     * @param {K} property
     * @param {"boolean"} type
     * @return {instance is {[P in K]: boolean} & T}
     */
    function hasMemberOfType<T = unknown, K extends PropertyKey = keyof T>(instance: unknown, property: K, type: 'boolean'): instance is {
        [P in K]: boolean;
    } & T;
    /**
     * Returns true if the member is a object.
     * @param instance
     * @param {K} property
     * @param {"object"} type
     * @return {instance is {[P in K]: object} & T}
     */
    function hasMemberOfType<T = unknown, K extends PropertyKey = keyof T>(instance: unknown, property: K, type: 'object'): instance is {
        [P in K]: object;
    } & T;
    /**
     * Returns true if the member is a Function.
     * @param instance
     * @param {K} property
     * @param {"function"} type
     * @return {instance is {[P in K]: Function} & T}
     */
    function hasMemberOfType<T = unknown, K extends PropertyKey = keyof T>(instance: unknown, property: K, type: 'function'): instance is {
        [P in K]: Function;
    } & T;
    /**
     * Tests to see if an object has a function of the specified name.
     * @param instance
     * @param {K} name
     * @return {instance is {[P in K]: Function} & T}
     */
    function hasMethod<T = unknown, K extends PropertyKey = keyof T>(instance: unknown, name: K): instance is {
        [P in K]: (...params: any[]) => unknown;
    } & T;
    /**
     * Checks to see if object is an array or something with length property that isn't a function.
     * @param instance
     * @returns {instance is ArrayLikeWritable<T>}
     */
    function isArrayLike<T = unknown>(instance: unknown): instance is ArrayLikeWritable<T>;
    /**
     * Checks to see if [Symbol.iterator] is a function.
     * @param instance
     * @return {instance is Iterable<T>}
     */
    function isIterable<T = unknown>(instance: unknown): instance is Iterable<T>;
    /**
     * Ensures an object is iterable if possible.
     * Returns null if unable to convert to iterable.
     * @param {string} instance
     * @return {null}
     */
    function asIterable(instance: string): null;
    /**
     * Ensures an object is iterable if possible.
     * Returns null if unable to convert to iterable.
     * @param {string} instance
     * @param {false} allowString
     * @return {null}
     */
    function asIterable(instance: string, allowString: false): null;
    /**
     * Ensures an object is iterable if possible.
     * Returns null if unable to convert to iterable.
     * @param {string} instance
     * @param {true} allowString
     * @return {string}
     */
    function asIterable(instance: string, allowString: true): string;
    /**
     * Ensures an object is iterable if possible.
     * Returns null if unable to convert to iterable.
     * @param {Iterable<T> | ArrayLike<T>} instance
     * @param {boolean} allowString
     * @return {Iterable<T> | null}
     */
    function asIterable<T>(instance: Iterable<T> | ArrayLike<T>, allowString?: boolean): Iterable<T> | null;
    /**
     * Ensures an object is iterable if possible.
     * Returns null if unable to convert to iterable.
     * @param instance
     * @param {boolean} allowString
     * @return {Iterable<T> | null}
     */
    function asIterable<T = unknown>(instance: unknown, allowString?: boolean): Iterable<T> | null;
}
export default type;
