export interface NewsItem {
  date: string;
  kind: '新聞稿' | '投書' | '活動';
  title: string;
  summary: string;
  href: string;
  image: string;
  imageAlt: string;
}

export const NEWS: NewsItem[] = [
  {
    date: '2026-08-12',
    kind: '新聞稿',
    title: '【聯合新聞稿】六都市長候選人永續韌性城市政策承諾訴求發布',
    summary:
      '九個公民團體共同發布「六都市長候選人永續韌性城市政策承諾」，提出再生能源與產業永續轉型、防災韌性與民生保障、高溫調適與健康安全、水患治理轉型及永續交通轉型五大政策面向，邀請六都市長候選人簽署。',
    href: 'https://gcaa.org.tw/16551/',
    image: '/six-counties/images/news/20260812-press-conference.webp',
    imageAlt: '九個公民團體代表在記者會合照',
  },
];
