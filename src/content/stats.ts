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
      '六都總人口高達 1,650 萬人，占全台約 69.9%。極端高溫、暴雨一旦襲擊都會區，直接威脅台灣近七成人口的生命財產與日常安全。',
    motif: 'population',
  },
  {
    value: 65,
    suffix: '%',
    label: '全台用電集中在六都',
    description:
      '六都的工業、商業與民生用電量，合計占全台總用電量約 65%。六都的電網韌性與綠能推動速度，直接決定台灣能源轉型能否成功。',
    motif: 'power',
  },
  {
    value: 70,
    suffix: '%+',
    label: '全國溫室氣體排放來自六都',
    description:
      '六都所產生的溫室氣體排放量，占全國總排放量超過七成。六都市長若不祭出強力的減碳政策，台灣的「2050 淨零碳排」終將流於口號。',
    motif: 'carbon',
  },
];

export interface HeatDatum {
  city: string;
  scenario: string;
  extraDays: number;
}

export const HEAT_DATA: HeatDatum[] = [
  { city: '臺北市', scenario: '暖化 1.5 度', extraDays: 7.5 },
  { city: '臺北市', scenario: '暖化 2 度', extraDays: 15.3 },
  { city: '臺北市', scenario: '暖化 4 度', extraDays: 57.5 },
  { city: '新北市', scenario: '暖化 1.5 度', extraDays: 5.1 },
  { city: '新北市', scenario: '暖化 2 度', extraDays: 10.8 },
  { city: '新北市', scenario: '暖化 4 度', extraDays: 49.9 },
  { city: '桃園市', scenario: '暖化 1.5 度', extraDays: 4.7 },
  { city: '桃園市', scenario: '暖化 2 度', extraDays: 10 },
  { city: '桃園市', scenario: '暖化 4 度', extraDays: 50 },
  { city: '臺中市', scenario: '暖化 1.5 度', extraDays: 5.6 },
  { city: '臺中市', scenario: '暖化 2 度', extraDays: 12.4 },
  { city: '臺中市', scenario: '暖化 4 度', extraDays: 63.9 },
  { city: '臺南市', scenario: '暖化 1.5 度', extraDays: 5.6 },
  { city: '臺南市', scenario: '暖化 2 度', extraDays: 13 },
  { city: '臺南市', scenario: '暖化 4 度', extraDays: 69.6 },
  { city: '高雄市', scenario: '暖化 1.5 度', extraDays: 7.2 },
  { city: '高雄市', scenario: '暖化 2 度', extraDays: 16 },
  { city: '高雄市', scenario: '暖化 4 度', extraDays: 78.5 },
];

export const HEAT_SOURCE: string = '資料來源：全台縣市高溫風險數據整理（發起團體彙整）';
