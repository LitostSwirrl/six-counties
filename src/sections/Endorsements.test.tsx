import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ENDORSING_GROUPS } from '../content/orgs';
import Endorsements from './Endorsements';

if (!('window' in globalThis)) {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { matchMedia: () => ({ matches: true }) },
  });
}

describe('公民社會連署響應', () => {
  it('連署團體以三欄格狀排列，沒有連結、捲軸與發起團體', () => {
    const markup = renderToStaticMarkup(
      <Endorsements groupsState="ready" groupNames={ENDORSING_GROUPS} individualCount={7} messages={[]} />
    );

    expect(markup).not.toContain('overflow-y-auto');
    expect(markup).not.toContain('發起團體');
    expect(markup).not.toContain('綠色公民行動聯盟');
    expect(markup).toContain('共 6 個');
    expect(markup.match(/lg:grid-cols-3/g)).toHaveLength(1);
    expect(markup).toContain('台灣再生能源推動聯盟');
    expect(markup).toContain('綠色和平');
    expect(markup).not.toContain('<a ');
  });

  it('連署公民標題右側顯示人數，並以兩倍速跑馬燈呈現公開意見', () => {
    const markup = renderToStaticMarkup(
      <Endorsements
        groupsState="ready"
        groupNames={ENDORSING_GROUPS}
        individualCount={7}
        messages={[{ name: '王○明', message: '測試意見' }]}
      />
    );

    expect(markup).toContain('連署公民');
    expect(markup).not.toContain('公民連署意見');
    expect(markup).toContain('共 7 位');
    expect(markup).toContain('marquee-track-fast');
    expect(markup).toContain('測試意見');
  });

  it('處理載入、錯誤與空名單狀態，人數未知時不顯示', () => {
    const loading = renderToStaticMarkup(<Endorsements groupsState="loading" groupNames={[]} individualCount={null} messages={[]} />);
    expect(loading).toContain('載入中');
    expect(loading).not.toContain('共 ');
    expect(renderToStaticMarkup(<Endorsements groupsState="error" groupNames={[]} individualCount={null} messages={[]} />)).toContain('讀取失敗');
    expect(renderToStaticMarkup(<Endorsements groupsState="empty" groupNames={[]} individualCount={null} messages={[]} />)).toContain('開放團體連署中');
  });
});
