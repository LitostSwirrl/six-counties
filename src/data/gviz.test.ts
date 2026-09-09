import { describe, it, expect } from 'vitest';
import { parseGviz, parseGvizTable } from './gviz';

const SAMPLE = `/*O_o*/\ngoogle.visualization.Query.setResponse({"version":"0.6","table":{"cols":[{"label":"縣市"},{"label":"姓名"}],"rows":[{"c":[{"v":"臺北市"},{"v":"測試甲"}]},{"c":[{"v":"高雄市"},null]}]}});`;

describe('parseGviz', () => {
  it('回傳列陣列，null 儲存格轉空字串', () => {
    expect(parseGviz(SAMPLE)).toEqual([['臺北市', '測試甲'], ['高雄市', '']]);
  });
  it('日期儲存格不看顯示格式，一律從 Date(年,月,日) 轉成 ISO 日期', () => {
    const text = `x({"table":{"rows":[{"c":[{"v":"Date(2026,8,25)","f":"2026/9/25"},{"v":"Date(2026,7,3)","f":"2026年8月3日"},{"v":true,"f":"TRUE"}]}]}})`;
    expect(parseGviz(text)).toEqual([['2026-09-25', '2026-08-03', 'true']]);
  });
  it('非 gviz 內容丟出錯誤', () => {
    expect(() => parseGviz('<html>login</html>')).toThrow();
  });
});

describe('parseGvizTable', () => {
  it('同時回傳欄位標籤與列，沒有標籤時給空字串', () => {
    expect(parseGvizTable(SAMPLE)).toEqual({ cols: ['縣市', '姓名'], rows: [['臺北市', '測試甲'], ['高雄市', '']] });
    const text = `x({"table":{"cols":[{"id":"A"},{"id":"B"}],"rows":[{"c":[{"v":"日期"},{"v":"類別"}]}]}})`;
    expect(parseGvizTable(text)).toEqual({ cols: ['', ''], rows: [['日期', '類別']] });
  });
});
