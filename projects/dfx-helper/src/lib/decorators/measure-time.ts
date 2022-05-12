import {Stopwatch} from '../helper/stopwatch';
import {Converter} from '../helper/converter';

/**
 * Measures execution time for method call
 * @param unit The unit in which the execution time should be measured, defaults to <code>ms</code>
 * @since 4.0.0
 */
export function MeasureTime(unit: 'ms' | 's' | 'm' | 'h' = 'ms') {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const ogMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const watch = Stopwatch.createStarted();
      const result = ogMethod.apply(this, args);
      watch.stop();
      let time;
      switch (unit) {
        case 'ms':
          time = Converter.toString(watch.getTime()) + 'ms';
          break;
        case 's':
          time = Converter.toString(watch.getTimeInSeconds()) + 's';
          break;
        case 'm':
          time = Converter.toString(watch.getTimeInMinutes()) + 'm';
          break;
        case 'h':
          time = Converter.toString(watch.getTimeInHours()) + 'h';
          break;
      }
      console.log('Time for method "' + propertyKey + '" execution: "' + time + '"');
      return result;
    };
    return descriptor;
  };
}
