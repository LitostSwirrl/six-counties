const SHEET_ID = 'PUT_SHEET_ID_HERE';

function doPost(e) {
  const p = JSON.parse(e.postData.contents);
  if (p.website) return json({ ok: false });
  if (!p.name || !p.city || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.email)) return json({ ok: false });
  const sheetName = p.kind === 'group' ? '團體連署' : '個人連署';
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(sheetName);
  sheet.appendRow([new Date(), p.name, p.email, p.city, p.message || '', p.consentPublic ? '是' : '否']);
  return json({ ok: true });
}

function doGet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const individual = ss.getSheetByName('個人連署').getDataRange().getValues().slice(1);
  const group = ss.getSheetByName('團體連署').getDataRange().getValues().slice(1);
  const publicMessages = individual
    .filter(function (r) { return r[5] === '是' && r[4]; })
    .slice(-30)
    .map(function (r) { return { name: mask(String(r[1])), message: String(r[4]) }; });
  return json({ ok: true, individualCount: individual.length, groupCount: group.length, publicMessages: publicMessages });
}

function mask(name) {
  const chars = name.split('');
  if (chars.length < 2) return name;
  chars[1] = '○';
  return chars.join('');
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
