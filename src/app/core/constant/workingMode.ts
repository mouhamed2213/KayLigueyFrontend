export const WORKING_MODES = ['REMOTE', 'HYBRID', 'ON_SITE'] as const;

export type WorkingMode = (typeof WORKING_MODES)[number];

export const WORKING_MODE_CONFIG: Record<
  WorkingMode,
  { label: string; class: string }
> = {
  REMOTE: {
    label: 'Télétravail',
    class: 'bg-green-100 text-green-700',
  },
  HYBRID: {
    label: 'Hybride',
    class: 'bg-yellow-100 text-yellow-700',
  },
  ON_SITE: {
    label: 'Présentiel',
    class: 'bg-blue-100 text-blue-700',
  },
};
