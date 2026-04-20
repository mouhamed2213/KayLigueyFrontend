import { ContractType } from '../constant/enums';
import { WorkingMode } from '../constant/enums';
export interface IFilters {
  city: string | '';
  contract_type: ContractType | '';
  working_mode: WorkingMode | '';
}
