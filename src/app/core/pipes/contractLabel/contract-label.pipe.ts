import { Pipe, PipeTransform } from '@angular/core';
import { CONTRACT_TYPE_CONFIG } from '../../constant/contract-types';

@Pipe({
  name: 'contractLabel',
})
export class ContractLabelPipe implements PipeTransform {
  transform(label: string | undefined | null,   ...args: unknown[]): string  {
        if (!label) return '';
    return CONTRACT_TYPE_CONFIG[label]?.label || label;
  }
}
