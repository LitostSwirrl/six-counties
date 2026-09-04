export type HazardKey = 'heat' | 'flood' | 'rain' | 'drought' | 'sea' | 'slope' | 'wind';

export interface HazardColumn {
  key: 'heat' | 'water' | 'drought' | 'sea' | 'slope' | 'wind';
  label: string;
  hazards: HazardKey[];
}

export const HAZARD_COLUMNS: HazardColumn[] = [
  { key: 'heat', label: '高溫', hazards: ['heat'] },
  { key: 'water', label: '水災或強降雨', hazards: ['flood', 'rain'] },
  { key: 'drought', label: '乾旱', hazards: ['drought'] },
  { key: 'sea', label: '海平面上升', hazards: ['sea'] },
  { key: 'slope', label: '坡地・土砂', hazards: ['slope'] },
  { key: 'wind', label: '強風', hazards: ['wind'] },
];

export const RISK_MATRIX_NOTE = '本表呈現六都各自在氣候變遷調適執行方案所評估的相對主要風險；未列出不代表該縣市不存在相關災害，仍需持續關注該項風險。';

export const SIX_HAZARDS: { city: string; hazards: HazardKey[] }[] = [
  { city: '臺北市', hazards: ['heat', 'rain', 'drought'] },
  { city: '新北市', hazards: ['heat', 'flood', 'slope'] },
  { city: '桃園市', hazards: ['heat', 'wind', 'rain', 'drought'] },
  { city: '臺中市', hazards: ['heat', 'rain', 'drought', 'sea', 'wind'] },
  { city: '臺南市', hazards: ['heat', 'flood', 'drought', 'slope'] },
  { city: '高雄市', hazards: ['heat', 'rain', 'sea', 'drought'] },
];
