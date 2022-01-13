/**
 * Delay method call for x milliseconds
 * @param ms {number} Milliseconds which the method call should be delayed
 * @since 4.0.0
 */
export function Delay (ms: number) {
  return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const ogMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
      setTimeout(() => {
        return ogMethod.apply(this, args);
      }, ms)
    };
    return descriptor;
  }
}
