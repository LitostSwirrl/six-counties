import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { NEWS } from '../content/news';
import { mockNews } from '../content/newsMock';
import News, { NewsCards } from './News';

describe('最新消息', () => {
  it('每則消息是一張含縮圖、類別、日期、標題與摘要的卡片，連到外部文章', () => {
    const markup = renderToStaticMarkup(<News />);
    expect(NEWS.length).toBeGreaterThan(0);
    expect(markup).toContain('最新消息');
    expect(markup).toContain('href="https://gcaa.org.tw/16551/"');
    expect(markup).toContain('src="/six-counties/images/news/20260812-press-conference.webp"');
    expect(markup).toContain('新聞稿');
    expect(markup).toContain('dateTime="2026-08-12"');
    expect(markup).toContain('【聯合新聞稿】六都市長候選人永續韌性城市政策承諾訴求發布');
    expect(markup.match(/<li/g)).toHaveLength(NEWS.length);
  });

  it('三則以內排成格狀，沒有翻頁按鈕', () => {
    const markup = renderToStaticMarkup(<NewsCards items={mockNews(3)} />);
    expect(markup).toContain('flex-wrap justify-center');
    expect(markup).not.toContain('news-track');
    expect(markup).not.toContain('aria-label="下一頁"');
  });

  it('超過三則改為可捲動的輪播，附上一頁與下一頁按鈕', () => {
    const markup = renderToStaticMarkup(<NewsCards items={mockNews(6)} />);
    expect(markup).toContain('news-track');
    expect(markup).toContain('snap-x snap-mandatory');
    expect(markup).toContain('aria-label="上一頁"');
    expect(markup).toContain('aria-label="下一頁"');
    expect(markup.match(/<li/g)).toHaveLength(6);
  });

  it('沒有縮圖的消息以灰色色塊代替圖片', () => {
    const items = mockNews(3);
    const withoutImage = items.filter((item) => !item.image);
    expect(withoutImage).toHaveLength(1);
    const markup = renderToStaticMarkup(<NewsCards items={items} />);
    expect(markup.match(/<img/g)).toHaveLength(2);
    expect(markup).toContain('bg-ink/[0.07]');
  });
});
