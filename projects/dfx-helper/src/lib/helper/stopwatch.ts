import {UndefinedOrNullOr} from '../types';
import {Subject} from 'rxjs';

/**
 * Stopwatch - Stops the time
 * <br> Use <code>start()</code> to start it and <code>stop()</code> to stop it. You can also reset it via
 * <code>reset()</code>.
 * <br> Check the Stopwatch status with: <code>hasStarted()</code>, <code>isRunning()</code> and <code>isStopped()</code>.
 * <br> Laps can be created with <code>lap(string)</code> and read with <code>getLaps()</code>, you can also
 * subscribe to <code>lapsChange</code>.
 * <br> The time can be read via <code>getTime()</code>, <code>getTimeInSeconds()</code>, <code>getTimeInMinutes()</code>
 * and <code>getTimeInHours()</code>.
 * @since 3.2.5
 */
export class Stopwatch {
  private startedAt: Date | undefined;
  private endedAt: Date | undefined;
  public lapsChange: Subject<Map<number, UndefinedOrNullOr<string>>> = new Subject<Map<number, UndefinedOrNullOr<string>>>();
  private laps: Map<number, UndefinedOrNullOr<string>> = new Map<number, UndefinedOrNullOr<string>>();

  public start(): Date {
    if (!this.startedAt) {
      this.startedAt = new Date();
    }
    return this.startedAt;
  }

  public stop(): Date {
    if (!this.startedAt) {
      throw 'Stopwatch not started';
    }
    if (!this.endedAt) {
      this.endedAt = new Date();
    }
    return this.endedAt;
  }

  public hasStarted(): boolean {
    return !!this.startedAt;
  }

  public isRunning(): boolean {
    return !!(this.startedAt && !this.endedAt);
  }

  public isStopped(): boolean {
    return !!(this.startedAt && this.endedAt);
  }

  public reset(): void {
    this.startedAt = undefined;
    this.endedAt = undefined;
    this.laps = new Map<number, UndefinedOrNullOr<string>>();
  }

  public getTime(): number {
    let endedAt = this.endedAt;
    if (!this.startedAt) {
      throw 'Stopwatch not started';
    }
    if (!endedAt) {
      endedAt = new Date();
    }
    return endedAt.getTime() - this.startedAt.getTime();
  }

  public getTimeInSeconds(): number {
    return this.getTime() / 1000;
  }

  public getTimeInMinutes(): number {
    return this.getTime() / 1000 / 60;
  }

  public getTimeInHours(): number {
    return this.getTime() / 1000 / 60 / 60;
  }

  public lap(text: string): Date {
    if (!this.startedAt) {
      throw 'Stopwatch not started';
    }
    const date = new Date();
    this.laps.set(date.getTime() - this.startedAt.getTime(), text);
    this.lapsChange.next(this.laps);
    return date;
  }

  public getLaps(): Map<number, UndefinedOrNullOr<string>> {
    return this.laps;
  }
}
