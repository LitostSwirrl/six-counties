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
  it('將團體名單連結固定在第二盒右下角', () => {
    const markup = renderToStaticMarkup(
      <Hero signedCount={8} groupCount={6} citizenCount={128} citizenCountFailed={false} />
    );

    expect(markup).toContain('relative flex min-h-32');
    expect(markup).toContain('absolute bottom-3 right-5');
  });
});
