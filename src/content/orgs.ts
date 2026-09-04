export interface Org {
  name: string;
  url: string;
}

export const ORGS: Org[] = [
  { name: '綠色公民行動聯盟', url: 'https://gcaa.org.tw/' },
  { name: '台灣氣候行動網絡研究中心', url: 'https://tcan2050.org.tw/' },
  { name: '台灣環境規劃協會', url: 'https://tep.org.tw/' },
  { name: '主婦聯盟環境保護基金會', url: 'https://www.huf.org.tw/' },
  { name: '環境權保障基金會', url: 'https://erf.org.tw/' },
  { name: '地球公民基金會', url: 'https://www.cet-taiwan.org/' },
  { name: '還路於民行人路權促進會', url: 'https://www.visionzero.tw/' },
  { name: '台灣河溪網協會', url: 'https://www.twrna.org/' },
  { name: '台灣身心障礙者自立生活聯盟', url: 'https://ciltw2018.blogspot.com/' },
];

export const ENDORSING_GROUPS: string[] = [
  '台灣再生能源推動聯盟',
  '荒野保護協會',
  '台灣綠黨',
  '台南新芽',
  '台灣環境保護聯盟',
  '綠色和平',
  '野薑花公民協會',
];

export const INDIVIDUAL_COUNT_SNAPSHOT = 7;
