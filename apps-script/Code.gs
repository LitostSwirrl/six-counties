const SHEET_ID = 'PUT_SHEET_ID_HERE';
const RESPONSE_SHEET = '表單回覆 1';
const EXTRA_GROUP_SHEET = '團體補登';

function doGet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const rows = ss.getSheetByName(RESPONSE_SHEET).getDataRange().getValues().slice(1);

  const individuals = rows.filter(function (r) { return text(r[2]) === '個人'; });
  const groups = rows.filter(function (r) { return text(r[3]) !== ''; });

  const groupNames = mergeGroupNames(
    groups.map(function (r) { return text(r[3]); }),
    extraGroupNames(ss.getSheetByName(EXTRA_GROUP_SHEET))
  );

  const groupMessages = groups
    .filter(function (r) { return agrees(r[11]) && text(r[9]) !== ''; })
    .map(function (r) { return { name: mask(text(r[5])), message: text(r[9]) }; });

  const individualMessages = individuals
    .filter(function (r) { return text(r[20]) === '同意公開' && text(r[19]) !== ''; })
    .map(function (r) {
      const open = text(r[21]).indexOf('公開我的姓名') === 0;
      return { name: open ? mask(text(r[13])) : '連署公民', message: text(r[19]) };
    });

  const publicMessages = groupMessages.concat(individualMessages).slice(-30);

  return json({
    ok: true,
    individualCount: individuals.length,
    groupCount: groupNames.length,
    groupNames: groupNames,
    publicMessages: publicMessages
  });
}

function agrees(value) {
  return text(value).indexOf('同意') === 0;
}

function extraGroupNames(sheet) {
  if (!sheet) return [];
  return sheet.getDataRange().getValues()
    .map(function (r) { return text(r[0]); })
    .filter(function (name) { return name !== '' && name !== '團體名稱'; });
}

function mergeGroupNames(formNames, extraNames) {
  const result = [];
  const used = [];
  formNames.forEach(function (formName) {
    let display = formName;
    for (let i = 0; i < extraNames.length; i += 1) {
      if (used.indexOf(i) === -1 && sameGroup(formName, extraNames[i])) {
        display = extraNames[i];
        used.push(i);
        break;
      }
    }
    if (!result.some(function (name) { return sameGroup(name, display); })) result.push(display);
  });
  extraNames.forEach(function (extraName, i) {
    if (used.indexOf(i) !== -1) return;
    if (!result.some(function (name) { return sameGroup(name, extraName); })) result.push(extraName);
  });
  return result;
}

function sameGroup(a, b) {
  const x = normalize(a);
  const y = normalize(b);
  return x === y || x.indexOf(y) !== -1 || y.indexOf(x) !== -1;
}

function normalize(name) {
  return name.replace(/\s+/g, '').replace(/臺/g, '台').toLowerCase();
}

function text(value) {
  return String(value == null ? '' : value).trim();
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
