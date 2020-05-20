"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.type = void 0;
/*
 * Note: 'type' is essentially a static class with method names that would easily collide without a namespace.
 * We have to export it as well as default so TypeDoc picks it up.
 */
var type;
(function (type_1) {
    /**
     * Returns true if the target matches the type (instanceof).
     * @param target
     * @param type
     * @returns {T|null}
     */
    function is(target, type) {
        return target instanceof type;
    }
    type_1.is = is;
    /**
     * Returns null if the target does not match the type (instanceof).
     * Otherwise returns the target as the type.
     * @param target
     * @param type
     * @returns {T|null}
     */
    function as(target, type) {
        return target instanceof type ? target : null;
    }
    type_1.as = as;
    /**
     * Returns true if the value parameter is null or undefined.
     * @param value
     * @returns {boolean}
     */
    function isNullOrUndefined(value) {
        return value == null;
    }
    type_1.isNullOrUndefined = isNullOrUndefined;
    /**
     * Returns true if the value parameter is a boolean.
     * @param value
     * @returns {boolean}
     */
    function isBoolean(value) {
        return typeof value === "boolean" /* Boolean */;
    }
    type_1.isBoolean = isBoolean;
    /**
     * Returns true if the value parameter is a number.
     * @param value
     * @param ignoreNaN Default is false. When true, NaN is not considered a number and will return false.
     * @returns {boolean}
     */
    function isNumber(value, ignoreNaN = false) {
        return typeof value === "number" /* Number */ && (!ignoreNaN || !isNaN(value));
    }
    type_1.isNumber = isNumber;
    /**
     * Returns true if is a number and is NaN.
     * @param value
     * @returns {boolean}
     */
    function isTrueNaN(value) {
        return typeof value === "number" /* Number */ && isNaN(value);
    }
    type_1.isTrueNaN = isTrueNaN;
    /**
     * Returns true if the value parameter is a string.
     * @param value
     * @returns {boolean}
     */
    function isString(value) {
        return typeof value === "string" /* String */;
    }
    type_1.isString = isString;
    /**
     * Returns true if the value is a boolean, string, number, null, or undefined.
     * @param value
     * @param allowUndefined if set to true will return true if the value is undefined.
     * @returns {boolean}
     */
    function isPrimitive(value, allowUndefined = false) {
        const t = typeof value;
        switch (t) {
            case "boolean" /* Boolean */:
            case "string" /* String */:
            case "number" /* Number */:
                return true;
            case "undefined" /* Undefined */:
                return allowUndefined;
            case "object" /* Object */:
                return value === null;
        }
        return false;
    }
    type_1.isPrimitive = isPrimitive;
    /**
     * For detecting if the value can be used as a key.
     * @param value
     * @param allowUndefined
     * @returns {boolean}
     */
    function isPrimitiveOrSymbol(value, allowUndefined = false) {
        return typeof value === "symbol" /* Symbol */ ? true : isPrimitive(value, allowUndefined);
    }
    type_1.isPrimitiveOrSymbol = isPrimitiveOrSymbol;
    /**
     * Returns true if the value is a string, number, or symbol.
     * @param value
     * @returns {boolean}
     */
    function isPropertyKey(value) {
        const t = typeof value;
        switch (t) {
            case "string" /* String */:
            case "number" /* Number */:
            case "symbol" /* Symbol */:
                return true;
        }
        return false;
    }
    type_1.isPropertyKey = isPropertyKey;
    /**
     * Returns true if the value parameter is a function.
     * @param value
     * @returns {boolean}
     */
    function isFunction(value) {
        return typeof value === "function" /* Function */;
    }
    type_1.isFunction = isFunction;
    function isObject(value, allowNull = false) {
        return typeof value === "object" /* Object */ && (allowNull || value !== null);
    }
    type_1.isObject = isObject;
    /**
     * Guarantees a number value or NaN instead.
     * @param value
     * @returns {number}
     */
    function numberOrNaN(value) {
        return isNaN(value) ? NaN : value;
    }
    type_1.numberOrNaN = numberOrNaN;
    /**
     * Will detect if a member exists (using 'in').
     * Returns true if a property or method exists on the object or its prototype.
     * @param instance
     * @param property Name of the member.
     * @param verify When true, if the member exists but is undefined, it will return false.
     * @returns {boolean}
     */
    function hasMember(instance, property, verify = false) {
        return (instance &&
            !isPrimitive(instance) &&
            property in instance &&
            (!verify || instance[property] !== undefined));
    }
    type_1.hasMember = hasMember;
    /**
     * Returns true if the member matches the type.
     * @param instance
     * @param property
     * @param type
     * @returns {boolean}
     */
    function hasMemberOfType(instance, property, type) {
        return hasMember(instance, property) && typeof instance[property] === type;
    }
    type_1.hasMemberOfType = hasMemberOfType;
    /**
     * Tests to see if an object has a function of the provide name.
     * @param instance
     * @param {string} name
     * @returns {instance is T}
     */
    function hasMethod(instance, name) {
        return hasMemberOfType(instance, name, "function" /* Function */);
    }
    type_1.hasMethod = hasMethod;
    /**
     * Checks to see if object is an array or something with length property that isn't a function.
     * @param instance
     * @returns {instance is ArrayLikeWritable<T>}
     */
    function isArrayLike(instance) {
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
        return (instance instanceof Array ||
            isString(instance) ||
            (!isFunction(instance) && hasMember(instance, 'length')));
    }
    type_1.isArrayLike = isArrayLike;
    /**
     * Checks to see if [Symbol.iterator] is a function.
     * @param instance
     * @return {instance is Iterable<T>}
     */
    function isIterable(instance) {
        return hasMemberOfType(instance, Symbol.iterator, "function" /* Function */);
    }
    type_1.isIterable = isIterable;
    /**
     * Ensures an object is iterable if possible.
     * Returns null if unable to convert to iterable.
     * @param {Iterable<T> | ArrayLike<T>} instance
     * @return {Iterable<T>}
     */
    function asIterable(instance) {
        if (isIterable(instance))
            return instance;
        if (isArrayLike(instance))
            return {
                *[Symbol.iterator]() {
                    const len = instance.length;
                    if (!isNumber(len))
                        throw new TypeError('ArrayLike object has a non-number length.');
                    for (let i = 0; i < len; i++) {
                        if (len !== instance.length)
                            throw new Error('instance.length value changed while iterating.');
                        yield instance[i];
                    }
                }
            };
        return null;
    }
    type_1.asIterable = asIterable;
})(type = exports.type || (exports.type = {}));
Object.freeze(type);
exports.default = type;
//# sourceMappingURL=type.js.map