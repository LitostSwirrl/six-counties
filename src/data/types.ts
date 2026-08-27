export type SignStatus = 'signed' | 'partial' | 'met' | 'none';

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

export interface EndorsingOrg {
  name: string;
  url: string;
  logoUrl: string;
}
