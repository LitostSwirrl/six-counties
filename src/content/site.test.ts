import { describe, expect, it } from 'vitest';
import {
  CITY_SKYLINE_URLS,
  HERO_BOARD_CTA,
  HERO_CANDIDATE_LABEL,
  HERO_CANDIDATE_LIST_HREF,
  HERO_CANDIDATE_LIST_LABEL,
  HERO_GROUP_LABEL,
  HERO_GROUP_LIST_HREF,
  HERO_GROUP_LIST_LABEL,
  PETITION_URL,
  SITE,
} from './site';
import { ENDORSING_GROUPS } from './orgs';

describe('網站固定文案與連署入口', () => {
  it('使用指定的 Google 表單網址', () => {
    expect(PETITION_URL).toBe('https://forms.gle/33wPJC2G4sYm2VBf6');
  });

  it('選單與區塊標題使用 2026-09-03 審查後的名稱', () => {
    expect(SITE.sections.whySix.nav).toBe('六都現況');
    expect(SITE.sections.whySix.title).toBe('六都現況');
    expect(SITE.sections.endorse.nav).toBe('連署團體');
    expect(SITE.sections.endorse.title).toBe('公民社會連署響應');
    expect(SITE.sections.board.nav).toBe('候選人承諾');
    expect(SITE.sections.board.title).toBe('候選人簽署看板');
    expect(SITE.sections.demands.title).toBe('五大訴求，十八項政策承諾');
  });

  it('訴求區說明分三段並照 2026-09-08 指定位置斷行', () => {
    expect(SITE.demandsLead).toHaveLength(3);
    expect(SITE.demandsLead.map((lines) => lines.length)).toEqual([3, 2, 2]);
    expect(SITE.demandsLead[0][0]).toBe('隨著氣候變遷加劇，城市面臨的災害風險也日益升高。');
    expect(SITE.demandsLead[1][0]).toContain('針對六都市長選舉');
    expect(SITE.demandsLead[2][1]).toBe('成為安全、宜居且具韌性的永續城市。');
    expect(SITE.boardLead).toBe('我們邀請六都市長候選人回應五大訴求，以下是各候選人簽署政策承諾情形，供選民參考。');
  });

  it('首頁統計盒標籤與入口', () => {
    expect(HERO_CANDIDATE_LABEL).toBe('候選人簽署共');
    expect(HERO_GROUP_LABEL).toBe('團體連署共');
    expect(HERO_CANDIDATE_LIST_LABEL).toBe('>> 看候選人簽署名單');
    expect(HERO_CANDIDATE_LIST_HREF).toBe('#board');
    expect(HERO_GROUP_LIST_LABEL).toBe('>> 看團體連署名單');
    expect(HERO_GROUP_LIST_HREF).toBe('#endorse');
    expect(HERO_BOARD_CTA).toBe('看六都市長候選人簽署結果');
  });

  it('首頁說明分四行，六都現況說明分三行', () => {
    expect(SITE.heroLines).toHaveLength(4);
    expect(SITE.heroLines[2]).toBe('2026 年，九個公民團體提出五大訴求，十八項政策承諾，');
    expect(SITE.whySixLines).toHaveLength(3);
    expect(SITE.whySixLines[0]).toContain('七成以上的溫室氣體排放');
  });

  it('已確認的連署團體名單不重複', () => {
    expect(new Set(ENDORSING_GROUPS).size).toBe(ENDORSING_GROUPS.length);
    expect(ENDORSING_GROUPS).toContain('野薑花公民協會');
  });

  it('風險表、關於我們與加入連署的說明照指定位置斷行', () => {
    expect(SITE.riskLeadLines).toHaveLength(2);
    expect(SITE.aboutLines).toHaveLength(2);
    expect(SITE.aboutLines[0]).toContain('本次行動由九個公民團體共同發起');
    expect(SITE.joinLines).toHaveLength(5);
    expect(SITE.joinLines[0]).toBe('你期待生活在一座什麼樣的城市？');
    expect(SITE.joinCta).toBe('加入連署');
  });

  it('最新消息區排在候選人承諾與關於我們之間', () => {
    expect(SITE.sections.news).toEqual({ id: 'news', nav: '最新消息', title: '最新消息' });
  });

  it('提供日間與夜間天際線圖檔', () => {
    expect(CITY_SKYLINE_URLS).toEqual({
      day: '/six-counties/images/city-skyline.webp',
      night: '/six-counties/images/city-skyline-night.webp',
    });
  });
});
