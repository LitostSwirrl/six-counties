export const PETITION_URL = 'https://forms.gle/33wPJC2G4sYm2VBf6';

export const CITY_SKYLINE_URLS = {
  day: '/six-counties/images/city-skyline.webp',
  night: '/six-counties/images/city-skyline-night.webp',
} as const;

export const SITE = {
  title: '2026 六都市長候選人永續韌性城市政策承諾',
  slogan: '面對城市的下一個十年，六都市長準備好了嗎？',
  heroKicker: '六都市長候選人',
  heroTitle: '永續韌性城市政策承諾',
  heroSub:
    '面對極端高溫、豪雨淹水、交通安全風險、能源與產業轉型挑戰，城市現在的每一個決定，都將影響未來數百萬人的生活。',
  heroSub2:
    '2026年，我們提出五大面向、18項訴求，要求六都市長候選人公開承諾，打造更安全、更永續、更有韌性的城市。',
  endorsementLabel: '連署團體',
  sections: {
    whySix: { id: 'why-six', nav: '六都關鍵', title: '六都面對哪些氣候風險' },
    demands: { id: 'demands', nav: '五大訴求', title: '五大訴求，十八項政策' },
    timeline: { id: 'timeline', nav: '行動時程', title: '行動時程' },
    board: { id: 'board', nav: '簽署看板', title: '候選人簽署看板' },
    endorse: { id: 'endorse', nav: '連署響應', title: '公民社會連署響應' },
    join: { id: 'join', nav: '加入連署', title: '加入連署' },
    about: { id: 'about', nav: '關於我們', title: '關於我們' },
  },
  contactEmail: 'gcaa@gcaa.org.tw',
} as const;

export const HERO_CITIZEN_LABEL = '公民連署數量';
export const HERO_GROUP_LIST_LABEL = '>> 查看完整名單';
export const HERO_GROUP_LIST_HREF = `#${SITE.sections.endorse.id}`;
export const JOIN_SECTION_HREF = `#${SITE.sections.join.id}`;
