export interface CountyHeat {
  city: string;
  six: boolean;
  delta: [number, number, number, number];
  elderlyPct: number | null;
  injuries: number | null;
  riskListed: string;
  otherRisks: string;
}

export const SCENARIO_LABELS = ['+1.5°C', '+2°C', '+3°C', '+4°C'];
export const SCENARIO_MEDIANS = [4.45, 9.85, 26, 50.25];
export const NATIONAL_ELDERLY_PCT = 20.54;
export const INJURY_PERIOD = '2026 年 8 月 1 日至 8 月 16 日';
export const HEAT_NOTE = '年高溫 36°C 天數計算是取平地（海拔低於 500 公尺）區域平均';
export const HEAT_SOURCE = '資料來源：全台縣市高溫風險數據整理（發起團體彙整）';

export const COUNTY_HEAT: CountyHeat[] = [
  { city: '高雄市', six: true, delta: [7.2, 16, 43.3, 78.5], elderlyPct: 21.27, injuries: 16, riskListed: '是（有風險理論分析及分級）', otherRisks: '強降雨、海平面上升、乾旱' },
  { city: '臺北市', six: true, delta: [7.5, 15.3, 34.1, 57.5], elderlyPct: 24.67, injuries: 33, riskListed: '是（有脆弱度分析與行動方案）', otherRisks: '強降雨、乾旱' },
  { city: '彰化縣', six: false, delta: [6.8, 15.1, 39.9, 70.6], elderlyPct: 20.88, injuries: 36, riskListed: '是（分析高溫或寒流的衝擊與因應）', otherRisks: '淹水災害、乾旱、土石流與坡地災害' },
  { city: '臺南市', six: true, delta: [5.6, 13, 37.2, 69.6], elderlyPct: 20.99, injuries: 19, riskListed: '是（熱浪風險評估與措施）', otherRisks: '水災、乾旱、土砂災害' },
  { city: '臺中市', six: true, delta: [5.6, 12.4, 34.3, 63.9], elderlyPct: 17.86, injuries: 61, riskListed: '是（高溫/低溫的風險評估與規劃）', otherRisks: '多雨/少雨、海平面上升、強風' },
  { city: '南投縣', six: false, delta: [5.5, 12.2, 32.6, 59.4], elderlyPct: 23.29, injuries: 7, riskListed: '是（極端高溫與低溫的衝擊）', otherRisks: '降雨（淹水、乾旱、坡地）' },
  { city: '嘉義市', six: false, delta: [5, 12.1, 37.1, 71.6], elderlyPct: 20.35, injuries: 10, riskListed: '是（有分析風險衝擊與推動措施）', otherRisks: '乾旱、極端降雨、颱風' },
  { city: '新北市', six: true, delta: [5.1, 10.8, 26.7, 49.9], elderlyPct: 20.48, injuries: 20, riskListed: '是（有風險理論分析）', otherRisks: '淹水災害、坡地災害' },
  { city: '新竹市', six: false, delta: [4.6, 10.3, 30, 59.9], elderlyPct: 16.55, injuries: 10, riskListed: '是（列出高溫對應措施）', otherRisks: '降雨、乾旱、海平面上升' },
  { city: '屏東縣', six: false, delta: [4.7, 10.2, 27.8, 52.5], elderlyPct: 22.32, injuries: 11, riskListed: '是（有敏弱群體及地區分析）', otherRisks: '極端天氣事件、降水型態變化' },
  { city: '桃園市', six: true, delta: [4.7, 10, 25.8, 50], elderlyPct: 17.21, injuries: 41, riskListed: '是（有分析風險衝擊與應對措施）', otherRisks: '強風、極端降雨、乾旱' },
  { city: '宜蘭縣', six: false, delta: [4.3, 9.7, 26.2, 50.5], elderlyPct: 21.22, injuries: 13, riskListed: '否（於健康領域提出高溫職災預防）', otherRisks: '淹水災害、坡地災害及乾旱災害' },
  { city: '苗栗縣', six: false, delta: [4.3, 9.2, 25.4, 50.6], elderlyPct: 20.68, injuries: 11, riskListed: '是（列出高溫對應措施）', otherRisks: '淹水、坡地' },
  { city: '花蓮縣', six: false, delta: [3.6, 8.3, 24.3, 47.7], elderlyPct: 22.05, injuries: 12, riskListed: '是（有分析風險與衝擊）', otherRisks: '強降雨' },
  { city: '基隆市', six: false, delta: [3.6, 8, 21.7, 44.7], elderlyPct: 22.91, injuries: 2, riskListed: '是（有脆弱族群與產業分析，以及提出相應行動方案）', otherRisks: '極端降雨' },
  { city: '新竹縣', six: false, delta: [3, 6.9, 21, 45.6], elderlyPct: 15.41, injuries: 8, riskListed: '是（極端高低溫的經濟、社會及環境影響）', otherRisks: '淹水災害、坡地災害' },
  { city: '臺東縣', six: false, delta: [3.2, 6.9, 18.8, 37.5], elderlyPct: 21.36, injuries: 5, riskListed: '是（有分析風險衝擊與推動措施）', otherRisks: '極端降雨、颱風' },
  { city: '雲林縣', six: false, delta: [2.7, 6.5, 20, 41.7], elderlyPct: 22.16, injuries: 12, riskListed: '是（有分析風險與衝擊）', otherRisks: '強降雨、乾旱' },
  { city: '嘉義縣', six: false, delta: [2.4, 6.1, 20.5, 44.2], elderlyPct: 24.66, injuries: 5, riskListed: '是（有分析風險衝擊與推動措施）', otherRisks: '強降雨、乾旱、海平面上升及強風' },
  { city: '金門縣', six: false, delta: [3.5, 6.1, 13.5, 25.3], elderlyPct: 20.26, injuries: 3, riskListed: '是（有分析各領域衝擊與高溫關懷措施）', otherRisks: '降雨、乾旱、海平面上升' },
  { city: '連江縣', six: false, delta: [0.2, 0.4, 2.2, 6.3], elderlyPct: 17.65, injuries: 0, riskListed: '是（提出健康及土地利用領域的高溫衝擊與措施）', otherRisks: '降雨、乾旱、海平面上升' },
  { city: '澎湖縣', six: false, delta: [0.1, 0.4, 3.6, 15.4], elderlyPct: 21.67, injuries: 0, riskListed: '是（有風險理論分析及分級）', otherRisks: '淹水' },
];
