import { describe, it, expect } from 'vitest';
import { mapCandidateRow, mapCandidateRows, parseCheck, parseStatus } from './sheets';

function row(overrides: Record<number, string>): string[] {
  const base = Array.from({ length: 24 }, () => '');
  base[0] = '臺北市';
  base[1] = '示意候選人（甲）';
  base[2] = '示意政黨Ａ';
  base[3] = '已簽署';
  for (const [index, value] of Object.entries(overrides)) {
    base[Number(index)] = value;
  }
  return base;
}

describe('parseStatus', () => {
  it('對應三種狀態字串，已拜會視為尚未回應', () => {
    expect(parseStatus('已簽署')).toBe('signed');
    expect(parseStatus('部分簽署')).toBe('partial');
    expect(parseStatus('已拜會')).toBe('none');
    expect(parseStatus('尚未回覆')).toBe('none');
    expect(parseStatus('')).toBe('none');
  });
});

describe('parseCheck', () => {
  it('1、TRUE、是視為已勾選', () => {
    expect(parseCheck('1')).toBe(true);
    expect(parseCheck('TRUE')).toBe(true);
    expect(parseCheck('true')).toBe(true);
    expect(parseCheck('是')).toBe(true);
  });
  it('其他值視為未勾選', () => {
    expect(parseCheck('')).toBe(false);
    expect(parseCheck('0')).toBe(false);
    expect(parseCheck('否')).toBe(false);
  });
});

describe('mapCandidateRow', () => {
  it('欄位對應與 18 項勾選', () => {
    const mapped = mapCandidateRow(row({ 4: '1', 6: '是', 21: 'TRUE', 22: '2026-09-20', 23: 'photo.jpg' }));
    expect(mapped.city).toBe('臺北市');
    expect(mapped.name).toBe('示意候選人（甲）');
    expect(mapped.party).toBe('示意政黨Ａ');
    expect(mapped.status).toBe('signed');
    expect(mapped.checks).toHaveLength(18);
    expect(mapped.checks[0]).toBe(true);
    expect(mapped.checks[2]).toBe(true);
    expect(mapped.checks[17]).toBe(true);
    expect(mapped.checks[1]).toBe(false);
    expect(mapped.signedDate).toBe('2026-09-20');
    expect(mapped.photoUrl).toBe('photo.jpg');
    expect(mapped.isDemo).toBe(false);
  });
});

describe('mapCandidateRows', () => {
  it('略過標題列並濾掉無姓名的列', () => {
    const header = Array.from({ length: 24 }, () => '');
    header[0] = '縣市';
    header[1] = '姓名';
    const blank = row({ 1: '' });
    const result = mapCandidateRows([header, row({}), blank]);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('示意候選人（甲）');
  });

  it('無標題列時全數保留', () => {
    expect(mapCandidateRows([row({}), row({ 1: '示意候選人（乙）' })])).toHaveLength(2);
  });
});
