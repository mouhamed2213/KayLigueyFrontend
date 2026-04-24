import { ContractType } from '../constant/contract-types';
import { WorkingMode } from '../constant/working-mode';
export interface IFilters {
  city: string | '';
  contract_type: ContractType | '';
  working_mode: WorkingMode | '';
  education_level: string;
  experience: string;
}
