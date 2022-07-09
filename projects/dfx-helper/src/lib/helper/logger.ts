import {DateHelper} from './date-helper';
import {Subject} from 'rxjs';
import {UndefinedOr} from '../types';

enum LogType {
  INFO = 1,
  LOG,
  ERROR,
  WARNING,
}

export class Logger {
  private static maxClassNameLength = 25;
  private static maxMethodeNameLength = 25;

  private readonly className: string;

  constructor(className?: UndefinedOr<string>) {
    if (!className) {
      className = 'generic logger';
    }

    className = className.slice(0, Logger.maxClassNameLength);
    for (; className.length < Logger.maxClassNameLength; ) {
      className += ' ';
    }
    this.className = className;
  }

  private _log(logType: LogType, methodeName: string, description: string, object: UndefinedOr<any> = undefined): string {
    const date = new Date();
    const milli = date.getMilliseconds() > 99 ? date.getMilliseconds() : date.getMilliseconds() + ' ';
    let header = DateHelper.getDateFormattedWithHoursMinutesAndSeconds(date) + ':' + milli + ' | ';
    switch (logType) {
      case LogType.LOG:
        header += 'LOG     |';
        break;
      case LogType.INFO:
        header += 'INFO    |';
        break;
      case LogType.WARNING:
        header += 'WARNING |';
        break;
      case LogType.ERROR:
        header += 'ERROR   |';
        break;
      default:
        console.log('ERROR: Unknown log type');
        break;
    }
    header += ' ' + this.className + ' | ';
    methodeName = methodeName.slice(0, Logger.maxMethodeNameLength);
    for (; methodeName.length < Logger.maxMethodeNameLength; ) {
      methodeName += ' ';
    }
    header += methodeName + ' | ' + description;

    if (object) {
      console.log(header, object);
    } else {
      console.log(header);
    }
    LogHelper.add(header);
    return header;
  }

  /**
   * Logs to the console
   * @param {string} methodeName The methods where the logging takes place
   * @param {string} description The log message or description
   * @param {any} object An optional objects which gets printed to the console
   * @return {string} Returns the log message (without the object)
   */
  public log(methodeName: string, description: string, object: UndefinedOr<any> = undefined): string {
    return this._log(LogType.LOG, methodeName, description, object);
  }

  /**
   * Log info to the console
   * @param {string} methodeName The methods where the logging takes place
   * @param {string} description The log message or description
   * @param {any} object An optional objects which gets printed to the console
   * @return {string} Returns the log message (without the object)
   */
  public info(methodeName: string, description: string, object: UndefinedOr<any> = undefined): string {
    return this._log(LogType.INFO, methodeName, description, object);
  }

  /**
   * Log warning to the console
   * @param {string} methodeName The methods where the logging takes place
   * @param {string} description The log message or description
   * @param {any} object An optional objects which gets printed to the console
   * @return {string} Returns the log message (without the object)
   */
  public warning(methodeName: string, description: string, object: UndefinedOr<any> = undefined): string {
    return this._log(LogType.WARNING, methodeName, description, object);
  }

  /**
   * Log error the console
   * @param {string} methodeName The methods where the logging takes place
   * @param {string} description The log message or description
   * @param {any} object An optional objects which gets printed to the console
   * @return {string} Returns the log message (without the object)
   */
  public error(methodeName: string, description: string, object: UndefinedOr<any> = undefined): string {
    return this._log(LogType.ERROR, methodeName, description, object);
  }
}

export class LoggerFactory {
  private static genericLogger: UndefinedOr<Logger> = undefined;

  /**
   * Gets a pre-configured logger
   * @param {string} className The name of the class
   * @return {Logger} Returns a pre-configured logger
   */
  public static getLogger(className: UndefinedOr<string> = undefined): Logger {
    if (className == undefined) {
      if (this.genericLogger == undefined) {
        this.genericLogger = new Logger(undefined);
      }
      return this.genericLogger;
    }
    return new Logger(className);
  }
}

export class LogHelper {
  private static maximalLogSize = 5000;
  private static overflowRemoveCount = 200;

  private static log: string[] = [];
  private static logChange: Subject<string[]> = new Subject<string[]>();

  /**
   * Gets a copy of the log
   * @return {string[]} Copy of the log
   */
  public static getLog(): string[] {
    return this.log.slice();
  }

  private static logChanged() {
    this.logChange.next(this.log.slice());
  }

  private static setLog(log: string[]): void {
    this.log = log;
    this.logChanged();
  }

  /**
   * Adds a string to the log
   * @param {string} log A string to add to the log
   */
  public static add(log: string): void {
    if (this.log.length > this.maximalLogSize) {
      this.log.slice(0, this.overflowRemoveCount);
    }
    this.log.push(log);
    this.logChanged();
  }

  /**
   * Remove a line in the log
   * @param {number} index The line to be removed
   */
  public static remove(index: number): void {
    this.log.slice(index, 1);
    this.logChanged();
  }

  /**
   * Removes the complete log
   */
  public static removeAll(): void {
    this.setLog([]);
  }

  /**
   * Gets the log size
   * @return {number} Returns the log size
   */
  public static size(): number {
    return this.log.length;
  }

  /**
   * Checks if entries exists
   * @return {boolean}Returns <code>true</code> if local storage is empty, <code>false</code> if not
   */
  public static isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Checks if entries exists
   * @return {boolean} Returns <code>false</code> if local storage is empty, <code>true</code> if not
   */
  public static hasEntries(): boolean {
    return !this.isEmpty();
  }
}
