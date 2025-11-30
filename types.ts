export enum ClassType {
  YOGA = 'Yoga',
  PILATES = 'Pilates',
  TAI_CHI = 'Tai Chi',
  BARRE = 'Barre',
  MEDITATION = 'Meditation',
  SOMATIC = 'Somatic Movement'
}

export enum Intensity {
  LOW = 'Gentle',
  MEDIUM = 'Moderate',
  HIGH = 'Intense'
}

export enum Platform {
  ONLINE_FREE = 'YouTube / Free',
  ONLINE_PAID = 'Paid Subscription',
  LOCAL = 'Local Studio'
}

export interface ClassSession {
  id: string;
  title: string;
  instructor: string;
  type: ClassType;
  durationMinutes: number;
  intensity: Intensity;
  platform: Platform;
  imageUrl: string;
  description: string;
  mentalBenefit: string; // The "Value Add"
  tags: string[];
  location?: string; // For local classes
  price?: string;
  rating: number;
}

export interface FilterState {
  searchQuery: string; // Natural language mood/goal
  selectedTypes: ClassType[];
  maxDuration: number;
  intensity?: Intensity;
}