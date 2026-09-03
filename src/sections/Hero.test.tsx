import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Hero from './Hero';

if (!('window' in globalThis)) {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { matchMedia: () => ({ matches: true }) },
  });
}

describe('首頁統計盒', () => {
  const markup = renderToStaticMarkup(<Hero signedCount={8} groupCount={6} />);

  it('將統計內容垂直置中並讓桌面入口對齊數量', () => {
    expect(markup).toContain('relative flex min-h-32');
    expect(markup).toContain('justify-center');
    expect(markup).toContain('absolute bottom-3 right-5');
    expect(markup).toContain('lg:static lg:ml-auto');
  });

  it('只有候選人與團體兩個統計盒，各自附名單入口', () => {
    expect(markup).toContain('候選人簽署共');
    expect(markup).toContain('團體連署共');
    expect(markup).not.toContain('公民連署數量');
    expect(markup).toContain('href="#board"');
    expect(markup).toContain('&gt;&gt; 看候選人簽署名單');
    expect(markup).toContain('&gt;&gt; 看團體連署名單');
  });

  it('標題把六都市長候選人納入 h1，並使用簽名圖示', () => {
    expect(markup).toMatch(/<h1[^>]*>[\s\S]*六都市長候選人[\s\S]*永續韌性城市[\s\S]*政策承諾[\s\S]*<\/h1>/);
    expect(markup).toContain('aria-label="簽名圖示"');
    expect(markup).toContain('看六都市長候選人簽署結果');
  });
});
