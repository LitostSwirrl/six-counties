interface GvizCell {
  v: string | number | boolean | null;
  f?: string;
}

interface GvizRow {
  c: (GvizCell | null)[];
}

interface GvizCol {
  label?: string;
}

export interface GvizTable {
  cols: string[];
  rows: string[][];
}

function cellText(cell: GvizCell | null): string {
  if (cell?.v == null) return '';
  if (typeof cell.v === 'string') {
    const date = /^Date\((\d+),(\d+),(\d+)/.exec(cell.v);
    if (date) return `${date[1]}-${String(Number(date[2]) + 1).padStart(2, '0')}-${date[3].padStart(2, '0')}`;
  }
  return String(cell.v);
}

export function parseGvizTable(text: string): GvizTable {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('gviz 格式錯誤');
  const payload = JSON.parse(text.slice(start, end + 1)) as { table?: { cols?: GvizCol[]; rows?: GvizRow[] } };
  if (!payload.table?.rows) throw new Error('gviz 缺少資料表');
  return {
    cols: (payload.table.cols ?? []).map((col) => col.label ?? ''),
    rows: payload.table.rows.map((row) => (row.c ?? []).map(cellText)),
  };
}

export function parseGviz(text: string): string[][] {
  return parseGvizTable(text).rows;
}
