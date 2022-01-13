export class DateHelper {

  /**
   * Returns a string formatted in 'YYYY-MM-DD HH:mm:ss'
   * @param {Date} date
   * @return string
   */
  public static getDateFormattedWithHoursMinutesAndSeconds(date: Date): string {
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
   * @param {Date} date
   * @return string
   */
  public static getDateFormatted(date: Date): string {
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
