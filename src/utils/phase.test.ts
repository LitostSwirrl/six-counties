import { describe, it, expect } from 'vitest';
import { currentPhaseIndex, millisecondsUntilNextTaiwanMidnight, taiwanDateKey } from './phase';
import { TIMELINE } from '../content/timeline';

describe('currentPhaseIndex', () => {
  it('記者會前落在第一節點', () => {
    expect(currentPhaseIndex(TIMELINE, new Date('2026-08-01'))).toBe(0);
  });
  it('9月11日落在拜會節點', () => {
    expect(currentPhaseIndex(TIMELINE, new Date('2026-09-11'))).toBe(1);
  });
  it('依臺灣日期判定跨國際標準時間午夜後的節點', () => {
    expect(currentPhaseIndex(TIMELINE, new Date('2026-09-18T23:30:00+08:00'))).toBe(1);
    expect(currentPhaseIndex(TIMELINE, new Date('2026-09-19T00:30:00+08:00'))).toBe(2);
  });
  it('取得臺灣日期而不受執行環境時區影響', () => {
    expect(taiwanDateKey(new Date('2026-09-12T00:30:00+08:00'))).toBe('2026-09-12');
  });
  it('計算下一個臺灣午夜的重新整理時間', () => {
    expect(millisecondsUntilNextTaiwanMidnight(new Date('2026-09-12T23:59:00+08:00'))).toBe(61_000);
  });
  it('簽署期間落在第三節點', () => {
    expect(currentPhaseIndex(TIMELINE, new Date('2026-09-25'))).toBe(2);
  });
  it('記者會期限當日仍屬記者會節點', () => {
    expect(currentPhaseIndex(TIMELINE, new Date('2026-10-05'))).toBe(3);
  });
  it('記者會期限後停留在選後持續監督', () => {
    expect(currentPhaseIndex(TIMELINE, new Date('2026-10-06'))).toBe(4);
    expect(currentPhaseIndex(TIMELINE, new Date('2027-03-01'))).toBe(4);
  });
  it('空清單回傳 -1', () => {
    expect(currentPhaseIndex([], new Date('2026-08-27'))).toBe(-1);
  });
});
