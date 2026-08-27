import { describe, it, expect } from 'vitest';
import { PILLARS } from './demands';
import { HEAT_DATA } from './stats';

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

describe('HEAT_DATA', () => {
  it('涵蓋六都', () => {
    const cities = new Set(HEAT_DATA.map((datum) => datum.city));
    expect(cities).toEqual(
      new Set(['臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市'])
    );
  });
});
