import { ContractType, WorkingMode, JobStatus } from '../constant/enums';

export interface JobOffer {
  company_id?: string;
  title: string;
  description: string;
  profile_required?: string | null;

  contract_type: ContractType;
  working_mode: WorkingMode;

  city?: string | null;

  salary_min?: number | null;
  salary_max?: number | null;

  experience_years?: number | null;
  education_level?: string | null;

  status: JobStatus;
  is_featured: boolean;

  published_at?: string | null; // ISO string
  expires_at?: string | null;

  view_count: number;
  application_count: number;

  created_at: string;
  updated_at: string;
}
