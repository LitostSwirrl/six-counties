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
      <Endorsements groupsState="ready" groupNames={ENDORSING_GROUPS} messages={[]} />
    );

    expect(markup).not.toContain('overflow-y-auto');
    expect(markup).not.toContain('發起團體');
    expect(markup).not.toContain('綠色公民行動聯盟');
    expect(markup).toContain('共 7 個');
    expect(markup.match(/lg:grid-cols-3/g)).toHaveLength(1);
    expect(markup).toContain('台灣再生能源推動聯盟');
    expect(markup).toContain('綠色和平');
    expect(markup).not.toContain('<a ');
  });

  it('公民連署意見不顯示人數，跑馬燈依卡片數換算時間並補到至少六張', () => {
    const markup = renderToStaticMarkup(
      <Endorsements
        groupsState="ready"
        groupNames={ENDORSING_GROUPS}

        messages={[{ name: '王○明', message: '測試意見' }]}
      />
    );

    expect(markup).toContain('公民連署意見');
    expect(markup).not.toContain('連署公民');
    expect(markup).not.toContain('共 7 位');
    expect(markup).not.toContain('marquee-track-fast');
    expect(markup).toContain('animation-duration:22.5s');
    expect(markup.match(/測試意見/g)).toHaveLength(12);
  });

  it('處理載入、錯誤與空名單狀態', () => {
    const loading = renderToStaticMarkup(<Endorsements groupsState="loading" groupNames={[]} messages={[]} />);
    expect(loading).toContain('載入中');
    expect(loading).not.toContain('共 ');
    expect(renderToStaticMarkup(<Endorsements groupsState="error" groupNames={[]} messages={[]} />)).toContain('讀取失敗');
    expect(renderToStaticMarkup(<Endorsements groupsState="empty" groupNames={[]} messages={[]} />)).toContain('開放團體連署中');
  });
});
