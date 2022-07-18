/**
 * Throttles method calling
 */
export function Throttle(timeMs: number): (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    let timeout: any;
    let nextCall: number | undefined;

    const ogMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const now = Date.now();

      if (nextCall === undefined || nextCall <= timeMs) {
        nextCall = now + timeMs;

        return ogMethod.apply(this, args);
      } else {
        const remaining = nextCall - now;

        if (timeout) {
          clearTimeout(timeout as number);
        }

        timeout = setTimeout(() => {
          nextCall = now + timeMs;
          ogMethod.apply(this, args);
        }, remaining);
      }
    };
    return descriptor;
  };
}
