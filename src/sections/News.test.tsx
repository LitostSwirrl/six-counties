import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { NEWS } from '../content/news';
import News from './News';

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
});
