import { describe, it, expect } from 'vitest';
import { PILLARS } from './demands';
import { HAZARD_COLUMNS, SIX_HAZARDS } from './heatData';

describe('PILLARS', () => {
  it('共五個面向', () => {
    expect(PILLARS).toHaveLength(5);
  });

  it('各面向訴求數為 3/3/4/3/5', () => {
    expect(PILLARS.map((pillar) => pillar.items.length)).toEqual([3, 3, 4, 3, 5]);
  });

  it('訴求合計 18 項', () => {
    const total = PILLARS.reduce((sum, pillar) => sum + pillar.items.length, 0);
    expect(total).toBe(18);
  });

  it('每項訴求的標題與內文皆非空', () => {
    for (const pillar of PILLARS) {
      expect(pillar.intro.trim().length).toBeGreaterThan(0);
      for (const item of pillar.items) {
        expect(item.title.trim().length).toBeGreaterThan(0);
        expect(item.detail.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('訴求 id 不重複', () => {
    const ids = PILLARS.flatMap((pillar) => pillar.items.map((item) => item.id));
    expect(new Set(ids).size).toBe(18);
  });
});

describe('氣候風險表', () => {
  it('五個欄位，水災或強降雨合併為一欄', () => {
    expect(HAZARD_COLUMNS.map((c) => c.label)).toEqual(['水災或強降雨', '乾旱', '海平面上升', '坡地・土砂', '強風']);
    expect(HAZARD_COLUMNS[0]?.hazards).toEqual(['flood', 'rain']);
  });

  it('六都風險都落在表格欄位內，且不含高溫', () => {
    const covered = new Set(HAZARD_COLUMNS.flatMap((c) => c.hazards));
    expect(SIX_HAZARDS).toHaveLength(6);
    for (const row of SIX_HAZARDS) {
      for (const hazard of row.hazards) expect(covered.has(hazard)).toBe(true);
    }
  });
});
