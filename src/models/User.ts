export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatarUrl?: string;
  role: 'user' | 'admin' | 'moderator';
  isEmailVerified: boolean;
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    language?: string;
    emailNotifications?: boolean;
  };
  savedAgents?: string[];
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface UserProfile {
  userId: string;
  bio?: string;
  company?: string;
  jobTitle?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    other?: string;
  };
  interests?: string[];
  expertise?: string[];
  isPublic: boolean;
}

export interface AuthProvider {
  id: string;
  userId: string;
  provider: 'email' | 'google' | 'github' | 'twitter' | 'linkedin';
  providerId: string;
  createdAt: Date;
}
