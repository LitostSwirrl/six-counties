import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import HazardIcon from './HazardIcon';
import PillarIcon from './PillarIcon';
import SigningHand from './SigningHand';

describe('網站圖示家族', () => {
  it('簽名圖示保留紙張、簽名、手與筆', () => {
    const markup = renderToStaticMarkup(<SigningHand />);

    expect(markup).toContain('data-icon-family="civic-line"');
    expect(markup).toContain('data-icon-part="paper"');
    expect(markup).toContain('data-icon-part="signature"');
    expect(markup).toContain('data-icon-part="hand"');
    expect(markup).toContain('data-icon-part="pen"');
  });

  it.each([
    ['energy', ['sun', 'solar-panel']],
    ['resilience', ['house', 'heart']],
    ['heat', ['sun', 'thermometer']],
    ['flood', ['cloud', 'rain', 'waves']],
    ['transport', ['bicycle', 'direction']],
  ] as const)('%s 圖示保留必要的主要部件', (pillar, parts) => {
    const markup = renderToStaticMarkup(<PillarIcon pillar={pillar} />);

    expect(markup).toContain('data-icon-family="civic-line"');
    for (const part of parts) {
      expect(markup).toContain(`data-icon-part="${part}"`);
    }
  });

  it.each([
    ['flood', ['house', 'waves']],
    ['rain', ['cloud', 'rain']],
    ['drought', ['sun', 'horizon']],
    ['sea', ['waves']],
    ['slope', ['slope']],
    ['wind', ['wind']],
  ] as const)('%s 風險圖示保留必要的主要部件', (hazard, parts) => {
    const markup = renderToStaticMarkup(<HazardIcon hazard={hazard} active />);

    expect(markup).toContain('data-icon-family="civic-line"');
    for (const part of parts) {
      expect(markup).toContain(`data-icon-part="${part}"`);
    }
  });
});

describe('風險表表頭', () => {
  it('水災或強降雨欄位並排顯示淹水與強降雨兩顆圖示', async () => {
    const { default: RiskMatrix } = await import('./RiskMatrix');
    const markup = renderToStaticMarkup(<RiskMatrix />);
    const header = markup.slice(markup.indexOf('<thead'), markup.indexOf('</thead>'));

    expect(header.match(/data-icon-part="house"/g)).toHaveLength(1);
    expect(header.match(/data-icon-part="cloud"/g)).toHaveLength(1);
  });
});
