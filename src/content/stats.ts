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
      '六都總人口高達 1,650 萬人，極端氣候事件如高溫、暴雨造成的衝擊，將直接威脅台灣近七成人口的生命財產與日常安全。',
    motif: 'population',
  },
  {
    value: 65,
    suffix: '%',
    label: '全台用電集中在六都',
    description:
      '六都的工業、商業與民生用電，合計占全台約 65%。龐大的用電需求，讓六都在推動節能、再生能源與提升能源韌性上，扮演重要角色。',
    motif: 'power',
  },
  {
    value: 70,
    suffix: '%+',
    label: '全國溫室氣體排放來自六都',
    description:
      '全台超過七成的溫室氣體排放來自六都。要走向 2050 淨零，六都必須率先加速減碳，帶動產業與城市轉型。',
    motif: 'carbon',
  },
];
