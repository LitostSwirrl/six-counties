export const SHEET_ID: string = '18MZP1jPFbK7Orn_W-66r-LjVsIpFIt1GkYwSlfvS_GY';
export const APPS_SCRIPT_URL: string = 'https://script.google.com/macros/s/AKfycby9aJVWf6SFQ7HGxIumvNQjyvhvTfLdG4JGOoa-muJN-6v8cE4pyOpNOWaVPyn601u2/exec';

export function gvizUrl(sheetName: string): string {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
}
