import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DEMO_ENDORSING_ORGS } from '../data/demo';
import Endorsements from './Endorsements';

if (!('window' in globalThis)) {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { matchMedia: () => ({ matches: true }) },
  });
}

describe('團體連署名單', () => {
  it('提供可捲動的完整團體名單', () => {
    const markup = renderToStaticMarkup(
      <Endorsements
        orgsState="ready"
        orgs={DEMO_ENDORSING_ORGS}
        stats={null}
      />
    );

    expect(markup).not.toContain('<details');
    expect(markup).not.toContain('<summary');
    expect(markup).toContain('共 12 個');
    expect(markup).toContain('max-h-72');
    expect(markup).toContain('overflow-y-auto');
    expect(markup).toContain('示意團體（甲）');
    expect(markup).toContain('示意團體（壬）');
  });
});
