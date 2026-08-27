import type { Candidate, EndorsingOrg, SignStatus } from './types';

const CHECK_COUNT = 18;

function checks(trueIndices: number[]): boolean[] {
  return Array.from({ length: CHECK_COUNT }, (_, i) => trueIndices.includes(i));
}

const ALL = Array.from({ length: CHECK_COUNT }, (_, i) => i);
const NONE: number[] = [];

function candidate(
  city: string,
  name: string,
  party: string,
  status: SignStatus,
  trueIndices: number[],
  signedDate: string
): Candidate {
  return {
    city,
    name,
    party,
    status,
    checks: checks(trueIndices),
    signedDate,
    photoUrl: '',
    isDemo: true,
  };
}

export const DEMO_CANDIDATES: Candidate[] = [
  candidate('臺北市', '示意候選人（甲）', '示意政黨Ａ', 'signed', ALL, '2026-09-20'),
  candidate('臺北市', '示意候選人（乙）', '示意政黨Ｂ', 'partial', [0, 1, 2, 5, 6, 9, 12, 13, 16], ''),
  candidate('臺北市', '示意候選人（丙）', '無黨籍', 'met', NONE, ''),
  candidate('新北市', '示意候選人（丁）', '示意政黨Ａ', 'signed', ALL, '2026-09-22'),
  candidate('新北市', '示意候選人（戊）', '示意政黨Ｂ', 'none', NONE, ''),
  candidate('桃園市', '示意候選人（己）', '示意政黨Ｂ', 'partial', [0, 3, 4, 7, 8, 11, 14, 17], ''),
  candidate('桃園市', '示意候選人（庚）', '示意政黨Ａ', 'met', NONE, ''),
  candidate('桃園市', '示意候選人（辛）', '無黨籍', 'none', NONE, ''),
  candidate('臺中市', '示意候選人（壬）', '示意政黨Ａ', 'signed', ALL, '2026-09-25'),
  candidate('臺中市', '示意候選人（癸）', '示意政黨Ｂ', 'partial', [1, 2, 6, 7, 10, 15], ''),
  candidate('臺南市', '示意候選人（子）', '示意政黨Ｂ', 'signed', ALL, '2026-09-28'),
  candidate('臺南市', '示意候選人（丑）', '無黨籍', 'none', NONE, ''),
  candidate('高雄市', '示意候選人（寅）', '示意政黨Ａ', 'partial', [0, 1, 4, 5, 8, 9, 12, 16, 17], ''),
  candidate('高雄市', '示意候選人（卯）', '示意政黨Ｂ', 'met', NONE, ''),
];

export const DEMO_ENDORSING_ORGS: EndorsingOrg[] = [];
