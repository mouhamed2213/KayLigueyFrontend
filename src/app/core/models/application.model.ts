import { ApplicationStatus } from "../constant/application-status.enum";



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
export interface CreateApplicationDto {
  candidat_id: string;
  jobOffer_id: string;
  cover_letter?: string;
}

// Correspond à ton UpdateApplicationInputDto (Entrée PATCH)
export interface UpdateApplicationDto {
  status?: ApplicationStatus;
  recruiter_note?: string;
  interview_date?: Date | string;
}
