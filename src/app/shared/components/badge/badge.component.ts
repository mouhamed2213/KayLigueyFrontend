import { Component, input, computed } from '@angular/core';
@Component({
  selector: 'app-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  styles: [],
})
export class BadgeComponent {
  label = input('');
  style = input('px-2 py-1 text-xs font-semibold rounded-md');

  customClass = computed(() => {
    const text = this.label();
    if (!text) return 'bg-gray-100 text-gray-700';

    let defaultColor = 'bg-green-100 text-green-700';
    // working mode badge
    if (text.includes('Télétravail')) return 'bg-green-100 text-green-700';
    if (text.includes('Hybride')) return 'bg-yellow-100 text-yellow-700';
    if (text.includes('Présentiel')) return 'bg-blue-100 text-blue-700';

    // // contract ype badges
    if (text.includes('CDI')) return 'bg-emerald-100 text-emerald-700';
    if (text.includes('CDD')) return 'bg-blue-100 text-blue-700';
    if (text.includes('Freelance')) return 'bg-purple-100 text-purple-700';
    if (text.includes('Stage')) return 'bg-orange-100 text-orange-700';
    if (text.includes('Alternance')) return 'bg-pink-100 text-pink-700';

    return defaultColor; // Valeur par défaut
  });
}
