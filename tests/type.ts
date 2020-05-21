import {expect} from 'chai';
import type from '../src/type';
import numberOrNaN = type.numberOrNaN;

describe('type', () => {
	class A
		extends Array {}

	describe('Basic type checks', () => {
		it('should identify null or undefined', () => {
			expect(type.isNullOrUndefined(null)).to.be.true;
			expect(type.isNullOrUndefined(undefined)).to.be.true;
			expect(type.isNullOrUndefined(true)).to.be.false;
			expect(type.isNullOrUndefined(false)).to.be.false;
		});
		it('should identify a boolean', () => {
			expect(type.isBoolean(true)).to.be.true;
			expect(type.isBoolean(false)).to.be.true;
			expect(type.isBoolean('true')).to.be.false;
			expect(type.isBoolean(null)).to.be.false;
			expect(type.isBoolean(1)).to.be.false;
			expect(type.isBoolean(0)).to.be.false;
		});
		it('should identify a number', () => {
			expect(type.isNumber('1')).to.be.false;
			expect(type.isNumber(false)).to.be.false;
			expect(type.isNumber(0)).to.be.true;
			expect(type.isNumber(1)).to.be.true;
			expect(type.isNumber(NaN)).to.be.true;
			expect(type.isNumber(NaN, true)).to.be.false;
		});

		it('should identify a string', () => {
			expect(type.isString(true)).to.be.false;
			expect(type.isString('')).to.be.true;
			expect(type.isString('1')).to.be.true;
			expect(type.isString(1)).to.be.false;
		});

		it('should identify a function', () => {
			expect(type.isFunction(true)).to.be.false;
			expect(type.isFunction('')).to.be.false;
			expect(type.isFunction('1')).to.be.false;
			expect(type.isFunction(1)).to.be.false;
			expect(type.isFunction({})).to.be.false;

			// eslint-disable-next-line @typescript-eslint/no-empty-function
			expect(type.isFunction(() => {})).to.be.true;
		});

		it('should identify an object', () => {
			expect(type.isObject(true)).to.be.false;
			expect(type.isObject('')).to.be.false;
			expect(type.isObject('1')).to.be.false;
			expect(type.isObject(1)).to.be.false;
			expect(type.isObject({})).to.be.true;

			// eslint-disable-next-line @typescript-eslint/no-empty-function
			expect(type.isObject(() => {})).to.be.false;
		});

		it('should identify a primitive', () => {
			expect(type.isPrimitive(true)).to.be.true;
			expect(type.isPrimitive('')).to.be.true;
			expect(type.isPrimitive(1)).to.be.true;
			expect(type.isPrimitive(Symbol.iterator)).to.be.false;
			expect(type.isPrimitive({})).to.be.false;
			expect(type.isPrimitive(null)).to.be.true;
			expect(type.isPrimitive(undefined)).to.be.false;
			expect(type.isPrimitive(undefined, true)).to.be.true;
		});

		it('should identify a primitive or symbol', () => {
			expect(type.isPrimitiveOrSymbol(true)).to.be.true;
			expect(type.isPrimitiveOrSymbol('')).to.be.true;
			expect(type.isPrimitiveOrSymbol(1)).to.be.true;
			expect(type.isPrimitiveOrSymbol(Symbol.iterator)).to.be.true;
			expect(type.isPrimitiveOrSymbol({})).to.be.false;
			expect(type.isPrimitiveOrSymbol(null)).to.be.true;
			expect(type.isPrimitiveOrSymbol(undefined)).to.be.false;
		});

		it('should identify a property key', () => {
			expect(type.isPropertyKey(true)).to.be.false;
			expect(type.isPropertyKey('')).to.be.true;
			expect(type.isPropertyKey(1)).to.be.true;
			expect(type.isPropertyKey(Symbol.iterator)).to.be.true;
			expect(type.isPropertyKey({})).to.be.false;
			expect(type.isPropertyKey(null)).to.be.false;
			expect(type.isPropertyKey(undefined)).to.be.false;
		});
	});

	describe('.is(instance, type) and .as(instance, type)', () => {
		it('should identify an instance', () => {
			const a = new A();
			expect(type.is(a, Array)).to.be.true;
			expect(type.is({}, Array)).to.be.false;
			expect(type.as(a, Array)).equal(a);
			expect(type.as({}, Array)).to.be.null;
		});
	});

	describe('.numberOrNaN', () => {
		it('should identify an instance', () => {
			expect(numberOrNaN(1)).equal(1);
			expect(isNaN(numberOrNaN(NaN))).to.be.true;
			expect(isNaN(numberOrNaN(''))).to.be.true;
			expect(isNaN(numberOrNaN({}))).to.be.true;
		});
	});

	describe('.hasMember()', () => {
		it('should detect a positive match for prototype functions', () => {
			const a: unknown = new A();
			expect(type.hasMember(a, 'xxx')).to.be.false;
			expect(type.hasMember(a, 'push')).to.be.true;
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
			}, 'b')).to.be.true;
		});
	});

	describe('.hasMethod()', () => {
		it('should detect a positive match for prototype functions', () => {
			const a: unknown = new A();
			expect(type.hasMethod(a, 'xxx')).to.be.false;
			expect(type.hasMethod(a, 'push')).to.be.true;
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
			}, 'b')).to.be.true;
		});
	});

	describe('.isTrueNaN()', () => {
		it('should only return true for actual NaN', () => {
			expect(type.isTrueNaN(NaN)).to.be.true;
			expect(type.isTrueNaN(1)).to.be.false;
			expect(type.isTrueNaN('x')).to.be.false;
		});
	});

	describe('.isArrayLike(instance)', () => {
		it('should identify array like objects', () => {
			expect(type.isArrayLike(new A())).to.be.true;
			expect(type.isArrayLike({})).to.be.false;
			expect(type.isArrayLike(10)).to.be.false;
			expect(type.isArrayLike({length: 10})).to.be.true;
		});
	});

	describe('.isIterable(instance)', () => {
		it('should identify iterables', () => {
			expect(type.isIterable(new A())).to.be.true;
			expect(type.isIterable({})).to.be.false;
			expect(type.isIterable({length: 10})).to.be.false;
		});
	});

	describe('.asIterable(instance)', () => {
		it('should identify iterables', () => {
			const a = new A();
			expect(type.asIterable(a)).equal(a);
			expect(type.asIterable({})).to.be.null;
			const e = type.asIterable({length: 10, 1: 'yes'});
			expect(e).not.to.be.null;
			let i = 0;
			for(const v of e!)
			{
				switch(i++)
				{
					case 1:
						expect(v).equal('yes');
						break;
					default:
						expect(v).to.be.undefined;
						break;
				}
			}
			expect(i).equal(10);
		});
	});
});
