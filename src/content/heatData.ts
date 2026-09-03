export type HazardKey = 'flood' | 'rain' | 'drought' | 'sea' | 'slope' | 'wind';
export type HazardIconKey = HazardKey | 'water';

export interface HazardColumn {
  key: 'water' | 'drought' | 'sea' | 'slope' | 'wind';
  label: string;
  hazards: HazardKey[];
}

export const HAZARD_COLUMNS: HazardColumn[] = [
  { key: 'water', label: '水災或強降雨', hazards: ['flood', 'rain'] },
  { key: 'drought', label: '乾旱', hazards: ['drought'] },
  { key: 'sea', label: '海平面上升', hazards: ['sea'] },
  { key: 'slope', label: '坡地・土砂', hazards: ['slope'] },
  { key: 'wind', label: '強風', hazards: ['wind'] },
];

export const RISK_MATRIX_NOTE = '未列出表示持續關注中，只是調適執行方案中的相對風險';

export const SIX_HAZARDS: { city: string; hazards: HazardKey[] }[] = [
  { city: '臺北市', hazards: ['rain', 'drought'] },
  { city: '新北市', hazards: ['flood', 'slope'] },
  { city: '桃園市', hazards: ['wind', 'rain', 'drought'] },
  { city: '臺中市', hazards: ['rain', 'drought', 'sea', 'wind'] },
  { city: '臺南市', hazards: ['flood', 'drought', 'slope'] },
  { city: '高雄市', hazards: ['rain', 'sea', 'drought'] },
];
