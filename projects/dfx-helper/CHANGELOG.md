# Changelog

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
