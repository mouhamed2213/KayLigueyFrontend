import { ContractType } from '../constant/contract-types';
import { WorkingMode } from '../constant/working-mode';
import { JobStatus } from '../constant/job-status';

export interface JobOffer {
  id: string;
  title: string;
  description: string;
  profile_required: string;
  contract_type: string;
  working_mode: string;
  city: string;
  salary_min: number;
  salary_max: number;
  experience_years: number;
  education_level: string;
  status: string;
  is_featured: boolean;
  published_at: string;
  expires_at: string;
  view_count: number;
  application_count: number;
}
