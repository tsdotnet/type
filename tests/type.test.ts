import { describe, it, expect } from 'vitest';
import type from '../src/type';
import numberOrNaN = type.numberOrNaN;

describe('type', () => {
	class A
		extends Array {}

	describe('Basic type checks', () => {
		it('should identify null or undefined', () => {
			expect(type.isNullOrUndefined(null)).toBe(true);
			expect(type.isNullOrUndefined(undefined)).toBe(true);
			expect(type.isNullOrUndefined(true)).toBe(false);
			expect(type.isNullOrUndefined(false)).toBe(false);
		});
		it('should identify a boolean', () => {
			expect(type.isBoolean(true)).toBe(true);
			expect(type.isBoolean(false)).toBe(true);
			expect(type.isBoolean('true')).toBe(false);
			expect(type.isBoolean(null)).toBe(false);
			expect(type.isBoolean(1)).toBe(false);
			expect(type.isBoolean(0)).toBe(false);
		});
		it('should identify a number', () => {
			expect(type.isNumber('1')).toBe(false);
			expect(type.isNumber(false)).toBe(false);
			expect(type.isNumber(0)).toBe(true);
			expect(type.isNumber(1)).toBe(true);
			expect(type.isNumber(NaN)).toBe(true);
			expect(type.isNumber(NaN, true)).toBe(false);
		});

		it('should identify a string', () => {
			expect(type.isString(true)).toBe(false);
			expect(type.isString('')).toBe(true);
			expect(type.isString('1')).toBe(true);
			expect(type.isString(1)).toBe(false);
		});

		it('should identify a function', () => {
			expect(type.isFunction(true)).toBe(false);
			expect(type.isFunction('')).toBe(false);
			expect(type.isFunction('1')).toBe(false);
			expect(type.isFunction(1)).toBe(false);
			expect(type.isFunction({})).toBe(false);

			// eslint-disable-next-line @typescript-eslint/no-empty-function
			expect(type.isFunction(() => {})).toBe(true);
		});

		it('should identify an object', () => {
			expect(type.isObject(true)).toBe(false);
			expect(type.isObject('')).toBe(false);
			expect(type.isObject('1')).toBe(false);
			expect(type.isObject(1)).toBe(false);
			expect(type.isObject({})).toBe(true);

			// eslint-disable-next-line @typescript-eslint/no-empty-function
			expect(type.isObject(() => {})).toBe(false);
		});

		it('should identify a primitive', () => {
			expect(type.isPrimitive(true)).toBe(true);
			expect(type.isPrimitive('')).toBe(true);
			expect(type.isPrimitive(1)).toBe(true);
			expect(type.isPrimitive(Symbol.iterator)).toBe(false);
			expect(type.isPrimitive({})).toBe(false);
			expect(type.isPrimitive(null)).toBe(true);
			expect(type.isPrimitive(undefined)).toBe(false);
			expect(type.isPrimitive(undefined, true)).toBe(true);
		});

		it('should identify a primitive or symbol', () => {
			expect(type.isPrimitiveOrSymbol(true)).toBe(true);
			expect(type.isPrimitiveOrSymbol('')).toBe(true);
			expect(type.isPrimitiveOrSymbol(1)).toBe(true);
			expect(type.isPrimitiveOrSymbol(Symbol.iterator)).toBe(true);
			expect(type.isPrimitiveOrSymbol({})).toBe(false);
			expect(type.isPrimitiveOrSymbol(null)).toBe(true);
			expect(type.isPrimitiveOrSymbol(undefined)).toBe(false);
		});

		it('should identify a property key', () => {
			expect(type.isPropertyKey(true)).toBe(false);
			expect(type.isPropertyKey('')).toBe(true);
			expect(type.isPropertyKey(1)).toBe(true);
			expect(type.isPropertyKey(Symbol.iterator)).toBe(true);
			expect(type.isPropertyKey({})).toBe(false);
			expect(type.isPropertyKey(null)).toBe(false);
			expect(type.isPropertyKey(undefined)).toBe(false);
		});
	});

	describe('.is(instance, type) and .as(instance, type)', () => {
		it('should identify an instance', () => {
			const a = new A();
			expect(type.is(a, Array)).toBe(true);
			expect(type.is({}, Array)).toBe(false);
			expect(type.as(a, Array)).equal(a);
			expect(type.as({}, Array)).toBeNull();
		});
	});

	describe('.numberOrNaN', () => {
		it('should identify an instance', () => {
			expect(numberOrNaN(1)).equal(1);
			expect(isNaN(numberOrNaN(NaN))).toBe(true);
			expect(isNaN(numberOrNaN(''))).toBe(true);
			expect(isNaN(numberOrNaN({}))).toBe(true);
		});
	});

	describe('.hasMember()', () => {
		it('should detect a positive match for prototype functions', () => {
			const a: unknown = new A();
			expect(type.hasMember(a, 'xxx')).toBe(false);
			expect(type.hasMember(a, 'push')).toBe(true);
			if(type.hasMember(a, 'push'))
			{
				// @ts-expect-error
				a.push(1);
			}
			if(type.hasMember<number[]>(a, 'push'))
			{
				a.push(2);
			}
			expect(a).to.have.ordered.members([1, 2]);
		});

		it('should detect a positive match', () => {
			expect(type.hasMember({
				a: 'hello',
				b: undefined
			}, 'b')).toBe(true);
		});
	});

	describe('.hasMethod()', () => {
		it('should detect a positive match for prototype functions', () => {
			const a: unknown = new A();
			expect(type.hasMethod(a, 'xxx')).toBe(false);
			expect(type.hasMethod(a, 'push')).toBe(true);
			if(type.hasMethod(a, 'push'))
			{
				const x = a.push(1);
				//@ts-expect-error
				expect(x + 1).equal(2);
			}
			if(type.hasMethod<number[]>(a, 'push'))
			{
				a.push(2);
			}
			expect(a).to.have.ordered.members([1, 2]);
		});

		it('should detect a positive match', () => {
			expect(type.hasMember({
				a: 'hello',
				b: undefined
			}, 'b')).toBe(true);
		});
	});

	describe('.isTrueNaN()', () => {
		it('should only return true for actual NaN', () => {
			expect(type.isTrueNaN(NaN)).toBe(true);
			expect(type.isTrueNaN(1)).toBe(false);
			expect(type.isTrueNaN('x')).toBe(false);
		});
	});

	describe('.isArrayLike(instance)', () => {
		it('should identify array like objects', () => {
			expect(type.isArrayLike(new A())).toBe(true);
			expect(type.isArrayLike({})).toBe(false);
			expect(type.isArrayLike(10)).toBe(false);
			expect(type.isArrayLike({length: 10})).toBe(true);
		});
	});

	describe('.isIterable(instance)', () => {
		it('should identify iterables', () => {
			expect(type.isIterable(new A())).toBe(true);
			expect(type.isIterable('hi')).toBe(false);
			expect(type.isIterable({})).toBe(false);
			expect(type.isIterable({length: 10})).toBe(false);
		});
	});

	describe('.asIterable(instance)', () => {
		it('should identify iterables', () => {
			const a = new A();
			expect(type.asIterable(a)).equal(a);
			expect(type.asIterable({})).toBeNull();
			expect(type.asIterable('hello')).toBeNull();
			expect(type.asIterable('hello', true)).not.toBeNull();
			const e = type.asIterable({length: 10, 1: 'yes'});
			expect(e).not.toBeNull();
			let i = 0;
			for(const v of e!)
			{
				switch(i++)
				{
					case 1:
						expect(v).equal('yes');
						break;
					default:
						expect(v).toBeUndefined();
						break;
				}
			}
			expect(i).equal(10);
		});
	});

	describe('hasMemberOfType function', () => {
		it('should check if object has member of specific type', () => {
			const objWithThen = { then: () => {} };
			const objWithoutThen = { other: 'value' };
			const objWithThenNonFunction = { then: 'not a function' };

			// Test the function exists and works
			expect(type.hasMemberOfType).toBeDefined();
			expect(typeof type.hasMemberOfType).toBe('function');

			// Test functionality - use string literal instead of const enum
			expect(type.hasMemberOfType(objWithThen, 'then', 'function')).toBe(true);
			expect(type.hasMemberOfType(objWithoutThen, 'then', 'function')).toBe(false);
			expect(type.hasMemberOfType(objWithThenNonFunction, 'then', 'function')).toBe(false);
			
			// Test with null/undefined
			expect(type.hasMemberOfType(null, 'then', 'function')).toBe(false);
			expect(type.hasMemberOfType(undefined, 'then', 'function')).toBe(false);
		});

		it('should verify that Value enum values work', () => {
			// Test that the actual enum values resolve correctly
			const functionType = type.Value.Function;
			expect(functionType).toBe('function');
			console.log('type.Value.Function resolves to:', functionType);
		});

		it('should test promise-like object detection like promises package does', () => {
			const promise = Promise.resolve(42);
			const thenable = { then: (onFulfilled: any) => onFulfilled(42) };
			const notThenable = { other: 'value' };

			console.log('Testing promise detection...');
			console.log('type default export:', type);
			console.log('type.hasMemberOfType exists:', !!type.hasMemberOfType);
			
			// This is the exact pattern from Promise.ts that was failing
			const THEN = 'then';
			console.log('Testing pattern: typeUtil.hasMemberOfType(value, THEN, typeUtil.Value.Function)');
			
			try {
				const result1 = type.hasMemberOfType(promise, THEN, type.Value.Function);
				console.log('Promise test result:', result1);
				expect(result1).toBe(true);
			} catch (error) {
				console.error('Error testing promise:', error);
				throw error;
			}

			try {
				const result2 = type.hasMemberOfType(thenable, THEN, type.Value.Function);
				console.log('Thenable test result:', result2);
				expect(result2).toBe(true);
			} catch (error) {
				console.error('Error testing thenable:', error);
				throw error;
			}

			try {
				const result3 = type.hasMemberOfType(notThenable, THEN, type.Value.Function);
				console.log('Non-thenable test result:', result3);
				expect(result3).toBe(false);
			} catch (error) {
				console.error('Error testing non-thenable:', error);
				throw error;
			}
		});
	});
});
