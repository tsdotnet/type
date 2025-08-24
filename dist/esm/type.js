/*!
 * @author electricessence / https://github.com/electricessence/
 * Licensing: MIT
 */
var type;
(function (type_1) {
    let Value;
    (function (Value) {
        Value["Boolean"] = "boolean";
        Value["Number"] = "number";
        Value["String"] = "string";
        Value["Symbol"] = "symbol";
        Value["Object"] = "object";
        Value["Undefined"] = "undefined";
        Value["Function"] = "function";
    })(Value = type_1.Value || (type_1.Value = {}));
    function is(instance, type) {
        return instance instanceof type;
    }
    type_1.is = is;
    function as(instance, type) {
        return instance instanceof type ? instance : null;
    }
    type_1.as = as;
    function isNullOrUndefined(value) {
        return value == null;
    }
    type_1.isNullOrUndefined = isNullOrUndefined;
    function isBoolean(value) {
        return typeof value === 'boolean';
    }
    type_1.isBoolean = isBoolean;
    function isNumber(value, ignoreNaN = false) {
        return typeof value === 'number' && (!ignoreNaN || !isNaN(value));
    }
    type_1.isNumber = isNumber;
    function isTrueNaN(value) {
        return typeof value === 'number' && isNaN(value);
    }
    type_1.isTrueNaN = isTrueNaN;
    function isString(value) {
        return typeof value === 'string';
    }
    type_1.isString = isString;
    function isPrimitive(value, allowUndefined = false) {
        const t = typeof value;
        switch (t) {
            case Value.Boolean:
            case Value.String:
            case Value.Number:
                return true;
            case Value.Undefined:
                return allowUndefined;
            case Value.Object:
                return value === null;
        }
        return false;
    }
    type_1.isPrimitive = isPrimitive;
    function isPrimitiveOrSymbol(value, allowUndefined = false) {
        return typeof value === Value.Symbol || isPrimitive(value, allowUndefined);
    }
    type_1.isPrimitiveOrSymbol = isPrimitiveOrSymbol;
    function isPropertyKey(value) {
        const t = typeof value;
        switch (t) {
            case Value.String:
            case Value.Number:
            case Value.Symbol:
                return true;
        }
        return false;
    }
    type_1.isPropertyKey = isPropertyKey;
    function isFunction(value) {
        return typeof value === 'function';
    }
    type_1.isFunction = isFunction;
    function isObject(value, allowNull = false) {
        return typeof value === 'object' && (allowNull || value !== null);
    }
    type_1.isObject = isObject;
    function numberOrNaN(value) {
        return typeof value === 'number' ? value : NaN;
    }
    type_1.numberOrNaN = numberOrNaN;
    function hasMember(instance, property, verify = false) {
        return (instance != null &&
            !isPrimitive(instance) &&
            property in instance &&
            (!verify || instance[property] !== undefined));
    }
    type_1.hasMember = hasMember;
    function hasMemberOfType(instance, property, type) {
        return hasMember(instance, property)
            && typeof instance[property] === type;
    }
    type_1.hasMemberOfType = hasMemberOfType;
    function hasMethod(instance, name) {
        return hasMemberOfType(instance, name, 'function');
    }
    type_1.hasMethod = hasMethod;
    function isArrayLike(instance) {
        return (instance instanceof Array ||
            isString(instance) ||
            (!isFunction(instance) && hasMember(instance, 'length')));
    }
    type_1.isArrayLike = isArrayLike;
    function isIterable(instance) {
        return hasMemberOfType(instance, Symbol.iterator, Value.Function);
    }
    type_1.isIterable = isIterable;
    function asIterable(instance, allowString = false) {
        if (isIterable(instance))
            return instance;
        if ((allowString || typeof instance !== 'string') && isArrayLike(instance))
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
})(type || (type = {}));
Object.freeze(type);
var type$1 = type;

export { type$1 as default, type };
//# sourceMappingURL=type.js.map
