import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import type { Candidate } from '../data/types';
import StatusBadge from './StatusBadge';

function candidate(status: Candidate['status'], checkedCount: number): Candidate {
  return {
    city: '臺北市',
    name: '測試',
    party: '',
    status,
    checks: Array.from({ length: 18 }, (_, i) => i < checkedCount),
    signedDate: '',
    photoUrl: '',
    isDemo: false,
  };
}

describe('StatusBadge', () => {
  it('狀態標籤依勾選數判定，不只看狀態欄', () => {
    expect(renderToStaticMarkup(<StatusBadge candidate={candidate('signed', 18)} />)).toContain('全數承諾');
    expect(renderToStaticMarkup(<StatusBadge candidate={candidate('signed', 15)} />)).toContain('部分承諾 15 項');
    expect(renderToStaticMarkup(<StatusBadge candidate={candidate('partial', 18)} />)).toContain('全數承諾');
    expect(renderToStaticMarkup(<StatusBadge candidate={candidate('signed', 0)} />)).toContain('尚未回應');
    expect(renderToStaticMarkup(<StatusBadge candidate={candidate('none', 3)} />)).toContain('尚未回應');
  });
});
