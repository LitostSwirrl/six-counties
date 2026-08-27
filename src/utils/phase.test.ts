import { describe, it, expect } from 'vitest';
import { currentPhaseIndex } from './phase';
import { TIMELINE } from '../content/timeline';

describe('currentPhaseIndex', () => {
  it('記者會前落在第一節點', () => {
    expect(currentPhaseIndex(TIMELINE, new Date('2026-08-01'))).toBe(0);
  });
  it('deadline 當日仍屬該階段', () => {
    expect(currentPhaseIndex(TIMELINE, new Date('2026-09-11'))).toBe(1);
  });
  it('拜會期間落在第三節點', () => {
    expect(currentPhaseIndex(TIMELINE, new Date('2026-09-15'))).toBe(2);
  });
  it('全部過期停在最後節點', () => {
    expect(currentPhaseIndex(TIMELINE, new Date('2026-11-30'))).toBe(4);
  });
  it('空清單回傳 -1', () => {
    expect(currentPhaseIndex([], new Date('2026-08-27'))).toBe(-1);
  });
});
