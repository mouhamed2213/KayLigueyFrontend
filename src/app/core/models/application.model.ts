import { ApplicationStatus } from '../constant/application-status';
import { JobOffer as IJobOffer } from './job-offer.model';
export interface IApplication {
  id: string;
  candidat_id: string;
  jobOffer_id: string;
  cover_letter?: string | null;
  status: ApplicationStatus;
  recruiter_note?: string | null;
  interview_date: string | null;
  createdAt: string;

  jobOffer?: IJobOffer;
}

export interface IPaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
//  (Entrée POST)
export interface ICreateApplication {
  candidat_id: string;
  jobOffer_id: string;
  cover_letter?: string | null;
}

// (Entrée PATCH)
export interface IUpdateApplication {
  status: ApplicationStatus;
  recruiter_note?: string;
  interview_date?: Date | string;
}
