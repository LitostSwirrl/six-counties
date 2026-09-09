import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { NEWS } from '../content/news';
import { mockNews } from '../content/newsMock';
import News, { NewsBody, NewsCards } from './News';

describe('最新消息', () => {
  it('區塊帶標題與錨點，首次繪製時是讀取中', () => {
    const markup = renderToStaticMarkup(<News />);
    expect(markup).toContain('id="news"');
    expect(markup).toContain('最新消息');
    expect(markup).toContain('aria-busy="true"');
  });

  it('讀取中顯示骨架卡，不顯示任何消息', () => {
    const markup = renderToStaticMarkup(<NewsBody state="loading" items={[]} retry={() => undefined} />);
    expect(markup).toContain('aria-busy="true"');
    expect(markup).toContain('animate-pulse');
    expect(markup).not.toContain('<a ');
  });

  it('試算表讀取失敗時，卡片上方顯示讀取失敗提示與重新載入鈕，並退回網站內建的新聞稿', () => {
    const markup = renderToStaticMarkup(<NewsBody state="error" items={[]} retry={() => undefined} />);
    expect(markup).toContain('試算表讀取失敗，以下是網站內建的消息。');
    expect(markup).toContain('>重新載入<');
    expect(NEWS.length).toBeGreaterThan(0);
    expect(markup).toContain('href="https://gcaa.org.tw/16551/"');
    expect(markup).toContain('src="/six-counties/images/news/20260812-press-conference.webp"');
    expect(markup).toContain('新聞稿');
    expect(markup).toContain('dateTime="2026-08-12"');
    expect(markup).toContain('【聯合新聞稿】六都市長候選人永續韌性城市政策承諾訴求發布');
    expect(markup.match(/<li/g)).toHaveLength(NEWS.length);
  });

  it('試算表沒有可顯示的列時顯示尚無消息', () => {
    const markup = renderToStaticMarkup(<NewsBody state="empty" items={[]} retry={() => undefined} />);
    expect(markup).toContain('目前還沒有消息');
    expect(markup).not.toContain('<a ');
  });

  it('讀取成功時顯示試算表的消息，每則是一張含縮圖、類別、日期、標題與摘要的卡片', () => {
    const items = mockNews(2);
    const markup = renderToStaticMarkup(<NewsBody state="ready" items={items} retry={() => undefined} />);
    expect(markup).toContain(`href="${items[0].href}"`);
    expect(markup).toContain(`dateTime="${items[0].date}"`);
    expect(markup).toContain(items[0].title);
    expect(markup).toContain(items[0].summary);
    expect(markup).toContain('<img');
    expect(markup.match(/<li/g)).toHaveLength(2);
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
