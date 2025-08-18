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
    function is<T extends object>(instance: object, type: new (...params: any[]) => T): instance is T;
    function as<T>(instance: object, type: new (...params: any[]) => T): T | null;
    function isNullOrUndefined(value: unknown): value is null | undefined;
    function isBoolean(value: unknown): value is boolean;
    function isNumber(value: unknown, ignoreNaN?: boolean): value is number;
    function isTrueNaN(value: unknown): value is number;
    function isString(value: unknown): value is string;
    function isPrimitive(value: unknown): value is NullablePrimitive;
    function isPrimitive(value: unknown, allowUndefined: false): value is NullablePrimitive;
    function isPrimitive(value: unknown, allowUndefined: boolean): value is NullablePrimitive | undefined;
    function isPrimitiveOrSymbol(value: unknown): value is NullablePrimitive | symbol;
    function isPrimitiveOrSymbol(value: unknown, allowUndefined: false): value is NullablePrimitive | symbol;
    function isPrimitiveOrSymbol(value: unknown, allowUndefined: boolean): value is NullablePrimitive | symbol | undefined;
    function isPropertyKey(value: unknown): value is PropertyKey;
    function isFunction(value: unknown): value is (...params: any[]) => unknown;
    function isObject(value: unknown): value is object;
    function isObject(value: unknown, allowNull: false): value is object;
    function isObject(value: unknown, allowNull: boolean): value is object | null;
    function numberOrNaN(value: unknown): number;
    function hasMember<T = unknown, K extends PropertyKey = keyof T>(instance: unknown, property: K, verify?: boolean): instance is {
        [P in K]: unknown;
    } & T;
    function hasMemberOfType<T = unknown, K extends PropertyKey = keyof T>(instance: unknown, property: K, type: 'string'): instance is {
        [P in K]: string;
    } & T;
    function hasMemberOfType<T = unknown, K extends PropertyKey = keyof T>(instance: unknown, property: K, type: 'number'): instance is {
        [P in K]: number;
    } & T;
    function hasMemberOfType<T = unknown, K extends PropertyKey = keyof T>(instance: unknown, property: K, type: 'boolean'): instance is {
        [P in K]: boolean;
    } & T;
    function hasMemberOfType<T = unknown, K extends PropertyKey = keyof T>(instance: unknown, property: K, type: 'object'): instance is {
        [P in K]: object;
    } & T;
    function hasMemberOfType<T = unknown, K extends PropertyKey = keyof T>(instance: unknown, property: K, type: 'function'): instance is {
        [P in K]: Function;
    } & T;
    function hasMethod<T = unknown, K extends PropertyKey = keyof T>(instance: unknown, name: K): instance is {
        [P in K]: (...params: any[]) => unknown;
    } & T;
    function isArrayLike<T = unknown>(instance: unknown): instance is ArrayLikeWritable<T>;
    function isIterable<T = unknown>(instance: unknown): instance is Iterable<T>;
    function asIterable(instance: string): null;
    function asIterable(instance: string, allowString: false): null;
    function asIterable(instance: string, allowString: true): string;
    function asIterable<T>(instance: Iterable<T> | ArrayLike<T>, allowString?: boolean): Iterable<T> | null;
    function asIterable<T = unknown>(instance: unknown, allowString?: boolean): Iterable<T> | null;
}
export default type;
