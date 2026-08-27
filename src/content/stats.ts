export interface KeyStat {
  value: number;
  suffix: string;
  label: string;
  description: string;
  motif: 'population' | 'power' | 'carbon';
}

export const KEY_STATS: KeyStat[] = [
  {
    value: 69.9,
    suffix: '%',
    label: '全台人口住在六都',
    description:
      '六都總人口高達 1,650 萬人，占全台約 69.9%。極端氣候（如高溫、暴雨）一旦襲擊都會區，將直接威脅台灣近七成人口的生命財產與日常安全。',
    motif: 'population',
  },
  {
    value: 65,
    suffix: '%',
    label: '全台用電集中在六都',
    description:
      '六都的工業、商業與民生用電量，合計占全台總用電量約 65%。六都的電網韌性與綠能推動速度，直接決定了台灣能源轉型是否能成功。',
    motif: 'power',
  },
  {
    value: 70,
    suffix: '%+',
    label: '全國溫室氣體排放來自六都',
    description:
      '六都所產生的溫室氣體排放量，占全國總排放量超過七成。如果六都市長不祭出強力的減碳政策，台灣的「2050淨零碳排」終將流於口號。',
    motif: 'carbon',
  },
];
