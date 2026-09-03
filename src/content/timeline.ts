export interface TimelineNode {
  date: string;
  deadline: string;
  label: string;
}

export const TIMELINE: TimelineNode[] = [
  { date: '8 月 12 日', deadline: '2026-08-12', label: '發起團體記者會，公布行動與承諾書' },
  { date: '9 月 18 日前', deadline: '2026-09-18', label: '發起團體拜會候選人團隊' },
  { date: '9 月 28 日前', deadline: '2026-09-28', label: '候選人簽署承諾書' },
  { date: '10 月初', deadline: '2026-10-05', label: '記者會公布簽署結果' },
  { date: '', deadline: '', label: '選後持續監督' },
];
