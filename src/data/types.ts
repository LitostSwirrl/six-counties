export type SignStatus = 'signed' | 'partial' | 'none';

export interface Candidate {
  city: string;
  name: string;
  party: string;
  status: SignStatus;
  checks: boolean[];
  signedDate: string;
  photoUrl: string;
  isDemo: boolean;
}
