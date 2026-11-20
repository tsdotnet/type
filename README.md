<a name="banner"><img src="https://cdn.jsdelivr.net/gh/tsdotnet/type@master/assets/banner.svg" alt="@tsdotnet/type: Check types at run time. Guards that narrow, not just test."></a>

[![npm version](https://img.shields.io/npm/v/@tsdotnet/type.svg?style=flat-square)](https://www.npmjs.com/package/@tsdotnet/type)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/tsdotnet/type/blob/master/LICENSE)

Type guards and checks for JavaScript values, collected in one `type` namespace.

## Install

```sh
npm install @tsdotnet/type
```

## Usage

```ts
import { type } from '@tsdotnet/type';

declare const value: unknown;
if (type.isString(value)) value.toUpperCase(); // narrowed to string

type.isNumber(NaN); // true
type.isNumber(NaN, true); // false: NaN ignored
```

Also `isFunction`, `isObject`, `isIterable`, `hasMember` and more, all as type guards.

## Use it from

ESM (`import { type } from '@tsdotnet/type';`) or CommonJS (`const { type } = require('@tsdotnet/type');`).

<details><summary>In a browser, without a bundler</summary>

```html
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/type@1/dist/umd/type.min.js"></script>
<script>
  const { type } = tsdotnet.type;
</script>
```

</details>

## Docs

[tsdotnet.github.io/type](https://tsdotnet.github.io/type/)
