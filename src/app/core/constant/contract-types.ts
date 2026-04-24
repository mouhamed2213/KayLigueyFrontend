export const CONTRACT_TYPES = [
  'CDI',
  'CDD',
  'FREELANCE',
  'STAGE',
  'ALTERNANCE',
] as const;

export type ContractType = (typeof CONTRACT_TYPES)[number];

// Used to convert upper case text received form the
export const CONTRACT_TYPE_CONFIG: Record<string, any> = {
  CDI: {
    label: 'CDI',
  },
  CDD: {
    label: 'CDD',
  },
  FREELANCE: {
    label: 'Freelance',
  },
  STAGE: {
    label: 'Stage',
  },
  ALTERNANCE: {
    label: 'Alternance',
  },
};
