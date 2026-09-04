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
    '2026 年，九個公民團體提出五大訴求，十八項政策承諾，',
    '要求六都市長候選人公開承諾，打造更安全、更永續、更有韌性的城市。',
  ],
  whySixLines: [
    '台灣近七成的人口、六成五的用電、七成以上的溫室氣體排放，都集中在六都。',
    '無論是加速減碳、推動能源轉型，還是面對高溫、暴雨等氣候衝擊，',
    '六都皆站在台灣氣候行動的最前線。',
  ],
  demandsLead: [
    '隨著氣候變遷加劇，城市面臨的災害風險也日益升高。高溫、暴雨等極端氣候事件愈趨頻繁，不僅威脅居民健康與民生安全，更考驗城市的災害應變能力與能源供應穩定。',
    '為此，針對六都市長選舉，我們向候選人提出五大政策訴求，內容涵蓋再生能源發展、防災韌性、高溫調適、水患治理與永續交通。期望城市在邁向淨零的同時，也提升應對氣候變遷衝擊的能力，成為安全、宜居且具韌性的永續城市。',
  ],
  boardLead: '我們邀請六都市長候選人回應五大訴求，以下是各候選人簽署政策承諾情形，供選民參考。',
  endorsementLabel: '連署團體',
  sections: {
    whySix: { id: 'why-six', nav: '六都現況', title: '六都現況' },
    demands: { id: 'demands', nav: '五大訴求', title: '五大訴求，十八項政策承諾' },
    timeline: { id: 'timeline', nav: '行動時程', title: '行動時程' },
    board: { id: 'board', nav: '候選人承諾', title: '候選人簽署看板' },
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
