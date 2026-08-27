export const SHEET_ID = '';
export const APPS_SCRIPT_URL = '';

export function gvizUrl(sheetName: string): string {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
}
