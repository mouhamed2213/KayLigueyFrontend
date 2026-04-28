import { Pipe, PipeTransform } from '@angular/core';
import { WORKING_MODE_CONFIG } from '../../constant/working-mode';

@Pipe({
  name: 'workingModelabel',
})
export class WorkingModeLabelPipe implements PipeTransform {
  transform(label: string | undefined | null, ...args: unknown[]): string {
    if (!label) return '';
    return WORKING_MODE_CONFIG[label]?.label || label;
  }
}
