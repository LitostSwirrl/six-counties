import { describe, it, expect } from 'vitest';
import { parseGviz } from './gviz';

const SAMPLE = `/*O_o*/\ngoogle.visualization.Query.setResponse({"version":"0.6","table":{"cols":[{"label":"縣市"},{"label":"姓名"}],"rows":[{"c":[{"v":"臺北市"},{"v":"測試甲"}]},{"c":[{"v":"高雄市"},null]}]}});`;

describe('parseGviz', () => {
  it('回傳列陣列，null 儲存格轉空字串', () => {
    expect(parseGviz(SAMPLE)).toEqual([['臺北市', '測試甲'], ['高雄市', '']]);
  });
  it('日期儲存格改用格式化字串', () => {
    const text = `x({"table":{"rows":[{"c":[{"v":"Date(2026,8,25)","f":"2026-09-25"},{"v":true,"f":"TRUE"}]}]}})`;
    expect(parseGviz(text)).toEqual([['2026-09-25', 'true']]);
  });
  it('非 gviz 內容丟出錯誤', () => {
    expect(() => parseGviz('<html>login</html>')).toThrow();
  });
});
