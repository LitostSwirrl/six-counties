interface GvizCell {
  v: string | number | boolean | null;
  f?: string;
}

interface GvizRow {
  c: (GvizCell | null)[];
}

export function parseGviz(text: string): string[][] {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('gviz 格式錯誤');
  const payload = JSON.parse(text.slice(start, end + 1)) as { table?: { rows?: GvizRow[] } };
  if (!payload.table?.rows) throw new Error('gviz 缺少資料表');
  return payload.table.rows.map((row) =>
    (row.c ?? []).map((cell) => {
      if (cell?.v == null) return '';
      if (typeof cell.v === 'string' && cell.v.startsWith('Date(') && cell.f) return cell.f;
      return String(cell.v);
    })
  );
}
