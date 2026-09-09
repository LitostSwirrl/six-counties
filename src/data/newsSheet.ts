import type { NewsItem } from '../content/news';
import type { GvizTable } from './gviz';
import { fetchSheetTable, parseCheck } from './sheets';

const KINDS: NewsItem['kind'][] = ['新聞稿', '投書', '活動'];

function cell(row: string[], index: number): string {
  return (row[index] ?? '').trim();
}

export function normaliseDate(raw: string): string {
  const match = /^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/.exec(raw.trim());
  if (!match) return raw.trim();
  return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
}

function parseKind(raw: string): NewsItem['kind'] {
  return KINDS.find((k) => k === raw) ?? '新聞稿';
}

function mapNewsRow(row: string[]): NewsItem {
  const image = cell(row, 5);
  return {
    date: normaliseDate(cell(row, 0)),
    kind: parseKind(cell(row, 1)),
    title: cell(row, 2),
    summary: cell(row, 3),
    href: cell(row, 4),
    ...(image !== '' ? { image, imageAlt: cell(row, 6) } : {}),
  };
}

function newsBody({ cols, rows }: GvizTable): string[][] {
  if (cell(cols, 0) === '日期') return rows;
  if (rows.length > 0 && cell(rows[0], 0) === '日期') return rows.slice(1);
  throw new Error('找不到「最新消息」工作表');
}

export function mapNewsRows(table: GvizTable): NewsItem[] {
  return newsBody(table)
    .filter((row) => parseCheck(cell(row, 7)) && cell(row, 2) !== '' && cell(row, 4).startsWith('http'))
    .map(mapNewsRow)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function fetchNews(): Promise<NewsItem[]> {
  return mapNewsRows(await fetchSheetTable('最新消息'));
}
