export const CONTRACT_TYPES = [
  'CDI',
  'CDD',
  'FREELANCE',
  'STAGE',
  'ALTERNANCE',
] as const;

export type ContractType = (typeof CONTRACT_TYPES)[number];

export const CONTRACT_TYPE_CONFIG: Record<
  ContractType,
  { label: string; class: string }
> = {
  CDI: {
    label: 'CDI',
    class: 'bg-emerald-100 text-emerald-700',
  },
  CDD: {
    label: 'CDD',
    class: 'bg-blue-100 text-blue-700',
  },
  FREELANCE: {
    label: 'Freelance',
    class: 'bg-purple-100 text-purple-700',
  },
  STAGE: {
    label: 'Stage',
    class: 'bg-orange-100 text-orange-700',
  },
  ALTERNANCE: {
    label: 'Alternance',
    class: 'bg-pink-100 text-pink-700',
  },
};
