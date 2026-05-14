export type ProofPackStatus = 'Draft' | 'Review' | 'Approved' | 'Exported' | 'Archived';
export type ProofItemType = 'Screenshot' | 'Data Point' | 'Report Link' | 'Client Feedback';

export interface Metric {
  type: 'Impressions' | 'Clicks' | 'Conversions' | 'Spend' | 'Engagement' | 'Reach';
  value: number;
  unit: string;
  trend?: 'up' | 'down' | 'neutral'; // For dashboard display
  change?: number; // percentage change
}

export interface ProofItem {
  id: string;
  title: string;
  type: ProofItemType;
  description: string;
  value: string; // URL for screenshot/link, actual data for data point
  status: 'Pending' | 'Ready' | 'Blocked';
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

export interface ProofPack {
  id: string;
  clientName: string;
  campaignName: string;
  status: ProofPackStatus;
  createdAt: string; // ISO Date string
  lastUpdated: string; // ISO Date string
  dueDate: string; // ISO Date string
  metrics: Metric[];
  notes: string;
  proofItems: ProofItem[];
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: string;
  settings: {
    notifications: {
      email: boolean;
      push: boolean;
      weeklyDigest: boolean;
    };
    appearance: {
      theme: 'light' | 'dark' | 'system';
      language: 'en' | 'es' | 'fr';
    };
  };
}