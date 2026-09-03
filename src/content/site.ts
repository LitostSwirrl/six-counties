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
  heroLines: [
    '面對極端高溫、豪雨淹水、交通安全風險、能源與產業轉型挑戰，',
    '城市現在的每一個決定，都將影響未來數百萬人的生活。',
    '2026年，九個公民團體提出五大訴求，十八項政策承諾，',
    '要求六都市長候選人公開承諾，打造更安全、更永續、更有韌性的城市。',
  ],
  whySixLines: [
    '台灣近七成的人口、六成五的用電、七成以上的溫室氣體排放，都集中在六都。',
    '無論是加速減碳、推動能源轉型，還是面對高溫、暴雨等氣候衝擊，',
    '六都皆站在台灣氣候行動的最前線。',
  ],
  demandsLead:
    '城市的永續與韌性不只是單一議題，再生能源與產業永續轉型、防災韌性與民生保障、高溫調適與健康安全、水患治理轉型以及永續交通轉型彼此交織，共同形塑城市面對氣候變遷的韌性。',
  endorsementLabel: '連署團體',
  sections: {
    whySix: { id: 'why-six', nav: '六都現況', title: '六都現況' },
    demands: { id: 'demands', nav: '五大訴求', title: '五大訴求，十八項政策承諾' },
    timeline: { id: 'timeline', nav: '行動時程', title: '行動時程' },
    board: { id: 'board', nav: '候選人承諾', title: '候選人承諾' },
    endorse: { id: 'endorse', nav: '連署團體', title: '公民社會連署響應' },
    join: { id: 'join', nav: '加入連署', title: '加入連署' },
    about: { id: 'about', nav: '關於我們', title: '關於我們' },
  },
  contactEmail: 'gcaa@gcaa.org.tw',
} as const;

export const HERO_BOARD_CTA = '看六都市長候選人簽署結果';
export const HERO_CANDIDATE_LABEL = '候選人簽署共';
export const HERO_GROUP_LABEL = '團體連署共';
export const HERO_CANDIDATE_LIST_LABEL = '>> 看候選人簽署名單';
export const HERO_CANDIDATE_LIST_HREF = `#${SITE.sections.board.id}`;
export const HERO_GROUP_LIST_LABEL = '>> 看團體連署名單';
export const HERO_GROUP_LIST_HREF = `#${SITE.sections.endorse.id}`;
export const JOIN_SECTION_HREF = `#${SITE.sections.join.id}`;
