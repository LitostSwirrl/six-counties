import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import BallotBox from './BallotBox';
import PillarIcon from './PillarIcon';
import RiskMatrix from './RiskMatrix';

describe('網站圖示家族', () => {
  it('投票箱保留紙張、投票箱、投入口與勾選符號', () => {
    const markup = renderToStaticMarkup(<BallotBox />);

    expect(markup).toContain('data-icon-family="civic-line"');
    expect(markup).toContain('data-icon-part="paper"');
    expect(markup).toContain('data-icon-part="box"');
    expect(markup).toContain('data-icon-part="slot"');
    expect(markup).toContain('data-icon-part="check"');
  });

  it.each([
    ['energy', ['sun', 'solar-panel']],
    ['resilience', ['house', 'heart']],
    ['heat', ['sun', 'thermometer']],
    ['flood', ['cloud', 'rain', 'waves']],
    ['transport', ['bus', 'direction']],
  ] as const)('%s 圖示保留必要的主要部件', (pillar, parts) => {
    const markup = renderToStaticMarkup(<PillarIcon pillar={pillar} />);

    expect(markup).toContain('data-icon-family="civic-line"');
    for (const part of parts) {
      expect(markup).toContain(`data-icon-part="${part}"`);
    }
  });

  it('氣候風險圖示涵蓋七種風險的主要部件', () => {
    const markup = renderToStaticMarkup(<RiskMatrix />);

    for (const part of ['sun', 'house', 'cloud', 'horizon', 'waves', 'slope', 'wind']) {
      expect(markup).toContain(`data-icon-part="${part}"`);
    }
  });
});
