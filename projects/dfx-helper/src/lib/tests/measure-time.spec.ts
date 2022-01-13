import {MeasureTime} from '../decorators/measure-time';
import {Thread} from '../helper/Thread';

describe('MeasureTime', () => {
  it('5ms', () => {
    const spy = spyOn(console, 'log');
    Test.test(5);
    expect(spy).toHaveBeenCalled();
  });
  it('5ms in minutes', () => {
    const spy = spyOn(console, 'log');
    Test3.test(5);
    expect(spy).toHaveBeenCalled();
  });
  it('5ms in hours', () => {
    const spy = spyOn(console, 'log');
    Test4.test(5);
    expect(spy).toHaveBeenCalled();
  });
  it('100ms', () => {
    const spy = spyOn(console, 'log');
    Test.test(100);
    expect(spy).toHaveBeenCalled();
  });
  it('1s', () => {
    const spy = spyOn(console, 'log');
    Test2.test(1000);
    expect(spy).toHaveBeenCalled();
  });
});

class Test {
  @MeasureTime()
  public static test(ms: number): void {
    Thread.block(ms);
  }
}

class Test2 {
  @MeasureTime('s')
  public static test(ms: number): void {
    Thread.block(ms);
  }
}

class Test3 {
  @MeasureTime('m')
  public static test(ms: number): void {
    Thread.block(ms);
  }
}

class Test4 {
  @MeasureTime('h')
  public static test(ms: number): void {
    Thread.block(ms);
  }
}
