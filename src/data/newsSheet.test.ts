import { describe, expect, it } from 'vitest';
import { parseGvizTable } from './gviz';
import { mapNewsRows, normaliseDate } from './newsSheet';

const HEADER = ['日期', '類別', '標題', '摘要', '連結', '圖片網址', '圖片說明', '顯示'];

function table(rows: string[][], cols: string[] = HEADER) {
  return { cols, rows };
}

function row(overrides: Partial<Record<number, string>> = {}): string[] {
  const base = ['2026/8/12', '新聞稿', '測試標題', '測試摘要', 'https://example.com/a', '', '', 'TRUE'];
  for (const [index, value] of Object.entries(overrides)) {
    base[Number(index)] = value ?? '';
  }
  return base;
}

describe('normaliseDate', () => {
  it('把試算表的 yyyy/m/d 或 yyyy-m-d 轉成補零的 ISO 日期，其他字串原樣回傳', () => {
    expect(normaliseDate('2026/8/12')).toBe('2026-08-12');
    expect(normaliseDate('2026-9-3')).toBe('2026-09-03');
    expect(normaliseDate('2026-10-05')).toBe('2026-10-05');
    expect(normaliseDate('十月初')).toBe('十月初');
  });
});

describe('mapNewsRows', () => {
  it('gviz 把標題列收進欄位標籤時，用標籤判斷是不是「最新消息」工作表，列全部是資料', () => {
    expect(() => mapNewsRows({ cols: ['縣市', '姓名'], rows: [['臺北市', '某人']] })).toThrow();
    expect(mapNewsRows(table([row()]))).toHaveLength(1);
  });

  it('工作表只有標題列、gviz 沒偵測出標題時，標題留在第一列，也要認得', () => {
    expect(mapNewsRows({ cols: ['', ''], rows: [HEADER] })).toEqual([]);
    expect(mapNewsRows({ cols: ['', ''], rows: [HEADER, row()] })).toHaveLength(1);
    expect(() => mapNewsRows({ cols: ['', ''], rows: [] })).toThrow();
    expect(() => mapNewsRows({ cols: ['', ''], rows: [['臺北市', '某人']] })).toThrow();
  });

  it('吃得下真實的 gviz 回應：標題在 cols、日期是 Date()、顯示是布林', () => {
    const text = `x({"table":{"cols":[{"label":"日期"},{"label":"類別"},{"label":"標題"},{"label":"摘要"},{"label":"連結"},{"label":"圖片網址"},{"label":"圖片說明"},{"label":"顯示"}],"rows":[{"c":[{"v":"Date(2026,7,12)","f":"2026/8/12"},{"v":"新聞稿"},{"v":"真標題"},{"v":"真摘要"},{"v":"https://gcaa.org.tw/16551/"},null,null,{"v":true,"f":"TRUE"}]}]}})`;
    const items = mapNewsRows(parseGvizTable(text));
    expect(items).toEqual([{ date: '2026-08-12', kind: '新聞稿', title: '真標題', summary: '真摘要', href: 'https://gcaa.org.tw/16551/' }]);
  });

  it('把每一列對應成消息，圖片欄留空時不帶 image', () => {
    const items = mapNewsRows(table([row({ 5: 'https://example.com/a.jpg', 6: '合照' }), row({ 4: 'https://example.com/b' })]));
    expect(items).toHaveLength(2);
    expect(items[0]).toEqual({
      date: '2026-08-12',
      kind: '新聞稿',
      title: '測試標題',
      summary: '測試摘要',
      href: 'https://example.com/a',
      image: 'https://example.com/a.jpg',
      imageAlt: '合照',
    });
    expect(items[1].image).toBeUndefined();
    expect(items[1].imageAlt).toBeUndefined();
  });

  it('只保留「顯示」有勾、有標題、連結是 http 開頭的列', () => {
    const items = mapNewsRows(table([
      row({ 7: 'FALSE' }),
      row({ 7: '' }),
      row({ 2: '', 7: 'TRUE' }),
      row({ 4: '', 7: 'TRUE' }),
      row({ 4: 'javascript:alert(1)', 7: 'TRUE' }),
      row({ 4: 'https://example.com/kept', 7: 'TRUE' }),
    ]));
    expect(items.map((i) => i.href)).toEqual(['https://example.com/kept']);
  });

  it('依日期新到舊排序', () => {
    const items = mapNewsRows(table([
      row({ 0: '2026/8/12', 4: 'https://example.com/old' }),
      row({ 0: '2026/9/1', 4: 'https://example.com/new' }),
      row({ 0: '2026-08-20', 4: 'https://example.com/mid' }),
    ]));
    expect(items.map((i) => i.href)).toEqual(['https://example.com/new', 'https://example.com/mid', 'https://example.com/old']);
  });

  it('類別不在三種之內時視為新聞稿', () => {
    const items = mapNewsRows(table([row({ 1: '其他' })]));
    expect(items[0].kind).toBe('新聞稿');
  });
});
