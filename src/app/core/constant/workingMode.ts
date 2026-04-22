export const WORKING_MODES = ['REMOTE', 'HYBRID', 'ON_SITE'] as const;

export type WorkingMode = (typeof WORKING_MODES)[number];

// Used to convert uppercase and transform  text received form the backend
export const WORKING_MODE_CONFIG: Record<string, any> = {
  REMOTE: {
    label: 'Télétravail',
  },
  HYBRID: {
    label: 'Hybride',
  },
  ON_SITE: {
    label: 'Présentiel',
  },
};
