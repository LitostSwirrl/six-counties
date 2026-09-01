import { APPS_SCRIPT_URL } from './config';
import { DEMO_ENDORSING_ORGS } from './demo';

export interface PetitionStats {
  individualCount: number;
  groupCount: number;
  publicMessages: { name: string; message: string }[];
}

export interface PetitionPayload {
  kind: 'individual' | 'group';
  name: string;
  email: string;
  city: string;
  message: string;
  consentPublic: boolean;
  website: string;
}

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function validatePetition(p: PetitionPayload): string | null {
  if (p.website.trim() !== '') return '送出失敗，請再試一次';
  if (p.name.trim() === '') return '請填寫姓名或團體名稱';
  if (!EMAIL_PATTERN.test(p.email.trim())) return '請填寫有效的 Email';
  if (p.city.trim() === '') return '請選擇居住縣市';
  return null;
}

export function maskName(name: string): string {
  const chars = Array.from(name);
  if (chars.length < 2) return name;
  chars[1] = '○';
  return chars.join('');
}

export async function submitPetition(payload: PetitionPayload): Promise<void> {
  if (APPS_SCRIPT_URL === '') {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return;
  }
  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'text/plain' },
  });
  if (!res.ok) throw new Error('送出失敗');
  const data = (await res.json()) as { ok?: boolean };
  if (data.ok !== true) throw new Error('送出失敗');
}

export async function fetchPetitionStats(): Promise<PetitionStats> {
  if (APPS_SCRIPT_URL === '') {
    return {
      individualCount: 128,
      groupCount: DEMO_ENDORSING_ORGS.length,
      publicMessages: [
        { name: '林○安', message: '希望市長候選人把永續城市當成任期內就要交出成績的事。' },
        { name: '陳○宇', message: '我住的社區夏天愈來愈熱，很想看到具體的降溫與綠地規劃。' },
        { name: '黃○芳', message: '支持六都一起把永續城市的政策標準拉齊，不要各做各的。' },
        { name: '張○庭', message: '希望城市把降溫、排水與行人安全一起納入長期規劃。' },
        { name: '吳○哲', message: '支持候選人公開承諾，也期待未來定期說明執行進度。' },
        { name: '蔡○玲', message: '讓不同城市都能安全生活，是公民參與地方治理的開始。' },
      ],
    };
  }
  const res = await fetch(APPS_SCRIPT_URL);
  if (!res.ok) throw new Error('讀取連署資料失敗');
  const data = (await res.json()) as {
    ok?: boolean;
    individualCount?: number;
    groupCount?: number;
    publicMessages?: { name: string; message: string }[];
  };
  if (data.ok !== true) throw new Error('讀取連署資料失敗');
  return {
    individualCount: data.individualCount ?? 0,
    groupCount: data.groupCount ?? 0,
    publicMessages: data.publicMessages ?? [],
  };
}
