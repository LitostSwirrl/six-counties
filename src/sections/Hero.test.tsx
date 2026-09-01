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
  it('將統計內容垂直置中並讓桌面入口對齊數量', () => {
    const markup = renderToStaticMarkup(
      <Hero signedCount={8} groupCount={6} citizenCount={128} citizenCountFailed={false} />
    );

    expect(markup).toContain('relative flex min-h-32');
    expect(markup).toContain('justify-center');
    expect(markup).toContain('absolute bottom-3 right-5');
    expect(markup).toContain('lg:static lg:ml-auto');
  });
});
