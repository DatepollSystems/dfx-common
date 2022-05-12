import {UndefinedOr} from '../types';
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
  public lapsChange: Subject<Map<number, UndefinedOr<string>>> = new Subject<Map<number, UndefinedOr<string>>>();
  private laps: Map<number, UndefinedOr<string>> = new Map<number, UndefinedOr<string>>();

  constructor(start: boolean = false) {
    if (start) {
      this.start();
    }
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

  /**
   * Starts stopwatch (only once)
   * @return {Date} Date at which the stopwatch was started
   */
  public start(): Date {
    if (!this.startedAt) {
      this.startedAt = new Date();
    }
    return this.startedAt;
  }

  /**
   * Stops stopwatch (only once)
   * @return {Date} Date at which the stopwatch was stopped
   */
  public stop(): Date {
    if (!this.startedAt) {
      throw 'Stopwatch not started';
    }
    if (!this.endedAt) {
      this.endedAt = new Date();
    }
    return this.endedAt;
  }

  /**
   * Stops stopwatch and returns elapsed time in milliseconds
   * @return {number} Elapsed time in milliseconds
   */
  public stopAndGetTime(): number {
    this.stop();
    return this.getTimeInSeconds();
  }

  /**
   * Stops stopwatch and returns elapsed time in seconds
   * @return {number} Elapsed time in seconds
   */
  public stopAndGetTimeInSeconds(): number {
    this.stop();
    return this.getTimeInSeconds();
  }

  /**
   * Stops stopwatch and returns elapsed time in minutes
   * @return {number} Elapsed time in minutes
   */
  public stopAndGetTimeInMinutes(): number {
    this.stop();
    return this.getTimeInMinutes();
  }

  /**
   * Stops stopwatch and returns elapsed time in hours
   * @return {number} Elapsed time in hours
   */
  public stopAndGetTimeInHours(): number {
    this.stop();
    return this.getTimeInMinutes();
  }

  /**
   * Resets complete stopwatch
   */
  public reset(): void {
    this.startedAt = undefined;
    this.endedAt = undefined;
    this.laps = new Map<number, UndefinedOr<string>>();
    this.lapsChange.next(this.laps);
  }

  /**
   * @return {number} Elapsed time in milliseconds
   */
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

  /**
   * @return {number} Elapsed time in seconds
   */
  public getTimeInSeconds(): number {
    return this.getTime() / 1000;
  }

  /**
   * @return {number} Elapsed time in minutes
   */
  public getTimeInMinutes(): number {
    return this.getTime() / 1000 / 60;
  }

  /**
   * @return {number} Elapsed time in hours
   */
  public getTimeInHours(): number {
    return this.getTime() / 1000 / 60 / 60;
  }

  /**
   * Creates a lap with optional string, notifies all lap subscribers
   * @param {string} text
   * @return {Date} Date when the lap was set
   */
  public lap(text?: string): Date {
    if (!this.startedAt) {
      throw 'Stopwatch not started';
    }
    const date = new Date();
    this.laps.set(date.getTime() - this.startedAt.getTime(), text);
    this.lapsChange.next(this.laps);
    return date;
  }

  /**
   * Returns all laps
   * @return {Map<number, UndefinedOr<string>>} All laps
   */
  public getLaps(): Map<number, UndefinedOr<string>> {
    return this.laps;
  }

  public static createStarted(): Stopwatch {
    return new Stopwatch(true);
  }

  public static createStopped(): Stopwatch {
    return new Stopwatch(false);
  }
}
