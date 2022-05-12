import {DateHelper} from '../helper/date-helper';

describe('DateHelper', () => {
  it('getFormattedWithHoursMinutesAndSeconds', () => {
    let date = new Date('2020-07-20');
    date.setHours(10);
    date.setMinutes(30);
    date.setSeconds(22);
    expect(DateHelper.getFormattedWithHoursMinutesAndSeconds(date)).toBe('2020-07-20 10:30:22');
    date = new Date('2020-01-01');
    date.setHours(1);
    date.setMinutes(1);
    date.setSeconds(1);
    expect(DateHelper.getFormattedWithHoursMinutesAndSeconds(date)).toBe('2020-01-01 01:01:01');
    date = new Date('2020-1-1');
    date.setHours(1);
    date.setMinutes(1);
    date.setSeconds(1);
    expect(DateHelper.getFormattedWithHoursMinutesAndSeconds(date)).toBe('2020-01-01 01:01:01');
    date = new Date('2020-9-9');
    date.setHours(1);
    date.setMinutes(1);
    date.setSeconds(1);
    expect(DateHelper.getFormattedWithHoursMinutesAndSeconds(date)).toBe('2020-09-09 01:01:01');
    date = new Date('2020-09-09');
    date.setHours(9);
    date.setMinutes(9);
    date.setSeconds(9);
    expect(DateHelper.getFormattedWithHoursMinutesAndSeconds(date)).toBe('2020-09-09 09:09:09');
    date = new Date('2020-12-12');
    date.setHours(12);
    date.setMinutes(12);
    date.setSeconds(12);
    expect(DateHelper.getFormattedWithHoursMinutesAndSeconds(date)).toBe('2020-12-12 12:12:12');
  });
  it('getFormatted', () => {
    expect(DateHelper.getFormatted(new Date('2020-07-20'))).toBe('2020-07-20');
    expect(DateHelper.getFormatted(new Date('2020-01-01'))).toBe('2020-01-01');
    expect(DateHelper.getFormatted(new Date('2020-12-12'))).toBe('2020-12-12');
  });
  it('getFormatted with string', () => {
    expect(DateHelper.getFormatted('2020-07-20')).toBe('2020-07-20');
    expect(DateHelper.getFormatted('2020-01-01')).toBe('2020-01-01');
    expect(DateHelper.getFormatted('2020-12-12')).toBe('2020-12-12');
  });
});
