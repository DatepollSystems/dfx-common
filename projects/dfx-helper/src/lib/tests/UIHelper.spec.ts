import {UIHelper} from '../helper/ui-helper';

describe('UIHelper', () => {
  it('getReadTime', () => {
    expect(UIHelper.getReadTime('asdfasdfasdfasdfasdfasdf', 0)).toBe('> 1m');
    expect(UIHelper.getReadTime('asdfasdfasdfasdfasdfasdf', 5)).toBe('1m');
    expect(UIHelper.getReadTime('asdfasdfasdfasdfasdfdasdfasdfasdf', 11)).toBe('1m');
    expect(
      UIHelper.getReadTime(
        'asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf ',
        10
      )
    ).toBe('2m');
  });
  it('getApproxDate', () => {
    expect(UIHelper.getApproxCurrentDate()).toBeDefined();
    expect(UIHelper.getApproxCurrentDate()).toBeDefined();
  });
  it('getTimeLeft', () => {
    const date1 = new Date('2020-07-19');
    date1.setHours(8);
    const date2 = new Date('2020-07-19');
    date2.setHours(date1.getHours() + 1);
    expect(UIHelper.getTimeLeft(date2, date1)).toBe('1h');
    date2.setHours(date1.getHours() + 3);
    expect(UIHelper.getTimeLeft(date2, date1)).toBe('3h');
    date2.setHours(date1.getHours() + 12);
    expect(UIHelper.getTimeLeft(date2, date1)).toBe('1d');
    date2.setDate(date1.getDate() + 1);
    expect(UIHelper.getTimeLeft(date2, date1)).toBe('2d');
    date2.setDate(date1.getDate() + 30);
    expect(UIHelper.getTimeLeft(date2, date1)).toBe('31d');
    date2.setDate(date1.getDate() + 31);
    expect(UIHelper.getTimeLeft(date2, date1)).toBe('2mo');
    const date = new Date();
    date.setHours(date.getHours() + 1);
    expect(UIHelper.getTimeLeft(date)).toBe('1h');
  });
});
