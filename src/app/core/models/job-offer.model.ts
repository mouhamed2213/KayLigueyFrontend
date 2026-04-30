import { ContractType } from '../constant/contract-types';
import { WorkingMode } from '../constant/working-mode';
import { JobStatus } from '../constant/job-status';
import { Company } from '../models/company.model';
import { Skills } from './skills-model';
import { IPagination } from './offer-respose.model';

export type JobOffer = {
  id: string;
  title: string;
  description: string;
  profile_required: string;
  contract_type: ContractType;
  working_mode: WorkingMode;
  city: string;
  salary_min: number;
  salary_max: number;
  experience_years: number;
  education_level: string;
  status: JobStatus;
  is_featured: boolean;
  published_at: string;
  expires_at: string;
  view_count: number;
  application_count: number;
};

export type JobOfferWithDetail = JobOffer & {
  company: Company;
  skills: Skills[];
  meta: IPagination;
};
