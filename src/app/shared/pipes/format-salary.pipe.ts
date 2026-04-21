import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatSalary',
})
export class FormatSalaryPipe implements PipeTransform {
  transform(value: any): string | any {
    // chek if is a valide number
    if (value && !isNaN(value) && value >= 1000) {
      // On divise par 1000 et on arrondit
      return Math.floor(value / 1000) + 'k';
    }
    return value; 
  }
}

