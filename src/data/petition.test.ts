import { describe, it, expect } from 'vitest';
import { DEMO_ENDORSING_ORGS } from './demo';
import { fetchPetitionStats, validatePetition, maskName, type PetitionPayload } from './petition';

function payload(overrides: Partial<PetitionPayload> = {}): PetitionPayload {
  return {
    kind: 'individual',
    name: '王小明',
    email: 'test@example.com',
    city: '臺北市',
    message: '',
    consentPublic: false,
    website: '',
    ...overrides,
  };
}

describe('validatePetition', () => {
  it('完整填寫回傳 null', () => {
    expect(validatePetition(payload())).toBeNull();
  });

  it('honeypot 有值時擋下', () => {
    expect(validatePetition(payload({ website: 'http://spam.example' }))).toBe('送出失敗，請再試一次');
  });

  it('姓名空白時要求填寫', () => {
    expect(validatePetition(payload({ name: '' }))).toBe('請填寫姓名或團體名稱');
  });

  it('Email 格式錯誤時要求有效 Email', () => {
    expect(validatePetition(payload({ email: 'abc' }))).toBe('請填寫有效的 Email');
  });

  it('縣市空白時要求選擇', () => {
    expect(validatePetition(payload({ city: '' }))).toBe('請選擇居住縣市');
  });
});

describe('maskName', () => {
  it('三字遮第二字', () => {
    expect(maskName('王小明')).toBe('王○明');
  });

  it('兩字遮第二字', () => {
    expect(maskName('王明')).toBe('王○');
  });

  it('單字照留', () => {
    expect(maskName('王')).toBe('王');
  });

  it('四字遮第二字', () => {
    expect(maskName('歐陽小明')).toBe('歐○小明');
  });
});

describe('fetchPetitionStats', () => {
  it('示意團體數量與示意連署名單同步', async () => {
    const stats = await fetchPetitionStats();
    expect(stats.groupCount).toBe(DEMO_ENDORSING_ORGS.length);
  });

  it('提供六則公民連署意見樣板', async () => {
    const stats = await fetchPetitionStats();
    expect(stats.publicMessages).toHaveLength(6);
  });
});
