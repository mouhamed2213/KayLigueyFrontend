import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: string | Date | null | undefined | '', ...args: any[]) {
    if (value === '' || value === null || value === undefined) {
      return 'Non spécifié';
    }

    const date = new Date(value);
    const now = new Date();

    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `À l'instant`;

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Il y a ${diffInHours} h`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return `Hier`;
    if (diffInDays < 7) return `Il y a ${diffInDays} jours`;

    // Au-delà de 7 jours, on affiche la date normale
    return date.toLocaleDateString('fr-FR'); 
  }
}
