import { describe, expect, it } from 'vitest';
import { DEMO_ENDORSING_ORGS } from '../data/demo';
import { JOIN_SECTION_HREF, PETITION_URL, SITE } from './site';

describe('網站固定文案與連署入口', () => {
  it('使用指定的 Google 表單網址', () => {
    expect(PETITION_URL).toBe('https://forms.gle/33wPJC2G4sYm2VBf6');
  });

  it('使用更新後的氣候風險標題', () => {
    expect(SITE.sections.whySix.title).toBe('六都面對哪些氣候風險');
  });

  it('首頁連署統計使用連署團體標籤', () => {
    expect(SITE.endorsementLabel).toBe('連署團體');
  });

  it('示意連署名單有完整且不重複的團體名稱', () => {
    const names = DEMO_ENDORSING_ORGS.map((org) => org.name);
    expect(names).toHaveLength(6);
    expect(new Set(names).size).toBe(names.length);
    expect(names.every((name) => name.startsWith('示意團體（'))).toBe(true);
  });

  it('上方加入連署導向頁面內的加入連署區段', () => {
    expect(JOIN_SECTION_HREF).toBe('#join');
  });

});
