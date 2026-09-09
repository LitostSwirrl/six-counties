import type { NewsItem } from './news';

const KINDS: NewsItem['kind'][] = ['新聞稿', '投書', '活動'];
const IMAGE = '/six-counties/images/news/20260812-press-conference.webp';

export function mockNews(count: number): NewsItem[] {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(Date.UTC(2026, 7, 12) - i * 7 * 24 * 60 * 60 * 1000);
    const kind = KINDS[i % KINDS.length];
    const hasImage = i % 3 !== 1;
    return {
      date: date.toISOString().slice(0, 10),
      kind,
      title: `【${kind}】測試標題 ${i + 1}：六都氣候治理需要更清楚的承諾與時程`,
      summary: `這是第 ${i + 1} 則測試摘要，用來檢查卡片在不同字數下的排版。九個公民團體持續追蹤六都市長候選人對五大訴求的回應。`,
      href: `https://example.com/news/${i + 1}`,
      ...(hasImage ? { image: IMAGE, imageAlt: '測試縮圖' } : {}),
    };
  });
}
