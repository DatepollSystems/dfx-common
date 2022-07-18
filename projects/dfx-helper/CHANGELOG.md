## v4.5.0

### New

- Add `StorageHelper.isFull()` and `StorageHelper.isNotFull()`
- Add `ngxPrint` directive
- Add `trackById` and `trackByProperty` directive

### Changes

- Lint complete project
- Log header and object in same line

## v4.4.0

### New

- **Angular v14** support

## v4.3.1

### New

- Add `null` to `undefined` converter
- Add `undefined` to `null` converter

### Fixes

- Refresh selected entity if `fetchAll` is called

## v4.3.0

### New

- Add `Entity` implementations
- Add `Generics` to `AbstractHttpService`
- Add `GenericHelper`
- Refactor `Lists` to support `Generics` better
- Add `float` random generator
- Enhance `StopWatch` with `stopAndGetTimeInX`, `createStarted()`, `createStopped`, `hasStarted`, `isRunning`,
  `isStopped`

### Changes

- Unify helper class naming
- Add options do enable legacy copying
- Doc updates

### Fixes

- Return `undefined` if `undefined` is passed to `DateHelper`
- Fix number to boolean `Converter` issue

## v4.2.2

### Fixes

- Add `DfxHelperModule` to public api

## v4.2.1

### Fixes

- `StorageHelper` api incompatibilities

## v4.2.0

### New

- `DateHelper` is now able to parse `strings`
- Make `IsMobileService` breakpoint customizable
- Split `dfx-helper.scss` into `helper.scss` and `colors.scss`
- Type enhancements
- Make default `StorageHelper.set()` method object compatible
- Add TTL to `StorageHelper`

### Changes

- Return a promise with a `string` from `ClipboardHelper.read()`
- Use new method for copying stuff to your clipboard
- Refactored `Lists`

## v4.1.0 - v4.1.2

### Changes

- `KeyValuePair` updates

## v4.0.12

### Changes

- Move `KeyValuePair` into own class

### Fixes

- Add `Confirmable` decorator to public api
- Generator typos

## v4.0.9 - v4.0.11

### Fixes

- `EntityService` bug

## v4.0.8

### New

- Add `KeyPairs` to all http service methods

## v4.0.7

### New

- Add `getAll()` to `KeyPairs`
- Add `listOf()` functions for easy list creation

### Changes

- Allow `Converter` methods to convert themselves

## v4.0.6

### Fixes

- Fixes error handling in `HttpService`

## v4.0.5

### Fixes

- Fixes indexOf not checking entity ids for `EntityList`

## v4.0.4

### Fixes

- Return `EntityList` on clone function from `EntityList`

## v4.0.3

### Fixes

- Log bug where empty http responses where marked as error

## v4.0.2

### New

- Add `Confirmable(question: string)` annotation / decorator
- Add `params` parameter in `AHttpService` and `AEntityService` request methods

### Changes

- rxjs7 method parameter signature migrations
- Documentation updates for `RememberResults`, `Stopwatch` and `Thread`

### Fixes

- Do not log responses with an empty body as error

## v4.0.1

### Changes

- **Angular v13 support**

### Fixes

- Make `version` property in `AHttpService` optional

## v4.0.0

### Breaking

- **Shorten all class names starting with `Abstract` to `A`**

  - Affected classes:
    - `AbstractComponent` -> `AComponent`
    - `AbstractEntity` -> `AEntity`
    - `AbstractEntityWithName` -> `AEntityWithName`
    - `AbstractEntityService` -> `AEntityService`
    - `AbstractSelectableEntityService` -> `ASelectableEntityService`
    - `AbstractHttpService` -> `AHttpService`

- Change list return types to always return current list, making them **chainable**
  - Remove `getShuffeld()`, add `shuffle()`
  - Affected methods:
    - `addIf()`, `addIfAbsent()`
    - `remove()`
    - `removeIf()`, `removeIfPresent()`
    - `foreachIf()`
    - `computeIf()`, `computeIfAbsent()`, `computeIfPresent()`

### New

- Add **Decorators**/**Annotations**
  - `MeasureTime()`
  - `RememberResult`
  - `RunOutsideChangeDetection`
  - `Delay()`
- Add `Thread` helper
- Add `isString()` and `isNumber()` in `TypeHelper`
- Add `isArray()` and `isIterable()` in `ArrayHelper`
- Add `toString()`, `toBoolean()` and `toNumber()` methods to `Converter`
- Deprecate other type specific methods of `Converter`; **won't probably be removed**

### Change

- Use `IEntity` instead of `AEntity` in `AEntityService` and `EntityList`
- Use `Array<T>` instead of `IList<T>` as parameter of `setAll()` method in `AEntityService`
- Return `Observable<unknown>` instead of `any` in `AHttpService` and `AEntityService`

### Fixes

- Reset `laps` if `reset()` method is called in `Stopwatch`
