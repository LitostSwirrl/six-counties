import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Endorsements from './Endorsements';

if (!('window' in globalThis)) {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { matchMedia: () => ({ matches: true }) },
  });
}

describe('團體連署名單', () => {
  it('提供可收合的完整團體名單', () => {
    const markup = renderToStaticMarkup(
      <Endorsements
        orgsState="ready"
        orgs={[
          { name: '示意團體（甲）', url: '', logoUrl: '' },
          { name: '示意團體（乙）', url: '', logoUrl: '' },
          { name: '示意團體（丙）', url: '', logoUrl: '' },
        ]}
        stats={null}
      />
    );

    expect(markup).toContain('<details');
    expect(markup).toContain('查看完整名單');
    expect(markup).toContain('共 3 個');
    expect(markup).toContain('max-h-72');
    expect(markup).toContain('overflow-y-auto');
    expect(markup).toContain('示意團體（甲）');
    expect(markup).toContain('示意團體（丙）');
  });
});
