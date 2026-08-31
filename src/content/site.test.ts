import { describe, expect, it } from 'vitest';
import { PETITION_URL, SITE } from './site';

describe('網站固定文案與連署入口', () => {
  it('使用指定的 Google 表單網址', () => {
    expect(PETITION_URL).toBe('https://forms.gle/33wPJC2G4sYm2VBf6');
  });

  it('使用更新後的氣候風險標題', () => {
    expect(SITE.sections.whySix.title).toBe('六都面對哪些氣候風險');
  });
});
