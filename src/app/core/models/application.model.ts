import { ApplicationStatus } from '../constant/application-status';

export interface IApplication {
  id: string;
  candidat_id: string;
  jobOffer_id: string;
  cover_letter?: string | null;
  status: ApplicationStatus;
  recruiter_note?: string | null;
  interview_date?: Date | string | null; // Date peut arriver en string via JSON
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Correspond à ton CreateApplicationDto (Entrée POST)
export interface ICreateApplication {
  candidat_id: string | null;
  jobOffer_id: string | null;
  cover_letter?: string | null;
}

// Correspond à ton UpdateApplicationInputDto (Entrée PATCH)
export interface IUpdateApplication {
  status?: ApplicationStatus;
  recruiter_note?: string;
  interview_date?: Date | string;
}
