import {UndefinedOr, UndefinedOrNullOr} from '../types';

export class DateHelper {
  /**
   * @deprecated Use <code>DateHelper.getFormattedWithHoursMinutesAndSeconds</code>
   */
  public static getDateFormattedWithHoursMinutesAndSeconds(date: UndefinedOrNullOr<string | Date>): UndefinedOr<string> {
    return this.getFormattedWithHoursMinutesAndSeconds(date);
  }

  /**
   * @deprecated Use <code>DateHelper.getFormatted</code>
   */
  public static getDateFormatted(date: UndefinedOrNullOr<string | Date>): UndefinedOr<string> {
    return this.getFormatted(date);
  }

  /**
   * Returns a string formatted in 'YYYY-MM-DD HH:mm:ss'
   * If string or date is null, returns <code>null</code>
   * @param {string|Date|undefined|null} date
   * @return string|undefined
   */
  public static getFormattedWithHoursMinutesAndSeconds(date: UndefinedOrNullOr<string | Date>): UndefinedOr<string> {
    if (!date) {
      return undefined;
    }
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    let hour = '' + d.getHours();
    let minutes = '' + d.getMinutes();
    let seconds = '' + d.getSeconds();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    if (hour.length < 2) {
      hour = '0' + hour;
    }
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    if (seconds.length < 2) {
      seconds = '0' + seconds;
    }

    return [year, month, day].join('-') + ' ' + [hour, minutes, seconds].join(':');
  }

  /**
   * Returns a string formatted in 'YYYY-MM-DD'
   * If string or date is null, returns <code>null</code>
   * @param {string|Date|undefined|null} date
   * @return string|undefined
   */
  public static getFormatted(date: UndefinedOrNullOr<string | Date>): UndefinedOr<string> {
    if (!date) {
      return undefined;
    }
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }
}
