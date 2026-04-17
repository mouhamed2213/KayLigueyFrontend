// Assuming UserRole is defined elsewhere, e.g., in a shared types file
export enum UserRole {
  ADMIN = 'ADMIN',
  CANDIDAT = 'CANDIDAT',
  RECRUTER = 'RECRUTER',
}

// In register.component.ts
export interface User {
  id?: string;
  first_name: string;
  last_name: string;
  last_login: string;
  role: UserRole;
  createdAt?: Date | string;
}

// User profile
export interface profile {}
