/**
 * Remembers method result and caches it
 * <br>Should <b>only</b> be used on <b>pure</b> functions!
 * @since 4.0.0
 */
export function RememberResult(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
  const ogMethod = descriptor.value;
  descriptor.value = function(...args: any[]) {
    let uniqueArgsIdentifier = '';
    for (const arg of args) {
      uniqueArgsIdentifier += arg.toString();
    }
    ogMethod.cachedResult = ogMethod.cachedResult || {};
    return ogMethod.cachedResult[uniqueArgsIdentifier] ? ogMethod.cachedResult[uniqueArgsIdentifier] : (ogMethod.cachedResult[uniqueArgsIdentifier] = ogMethod.apply(this, args));
  };
  return descriptor;
}
