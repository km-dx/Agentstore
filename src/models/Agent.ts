export interface Agent {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  logoUrl?: string;
  websiteUrl: string;
  pricing?: {
    type: 'free' | 'freemium' | 'paid' | 'subscription' | 'contact';
    startingPrice?: number;
    currency?: string;
    pricingUrl?: string;
  };
  categories: string[];
  tags: string[];
  features: string[];
  industries?: string[];
  platforms?: string[];
  integrations?: string[];
  languages?: string[];
  rating?: {
    score: number;
    count: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentReview {
  id: string;
  agentId: string;
  userId: string;
  rating: number;
  title?: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  iconUrl?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  description?: string;
}
