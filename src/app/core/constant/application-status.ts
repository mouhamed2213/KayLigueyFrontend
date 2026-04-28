export const APPLICATION_STATUS = [
  'SUBMITTED',
  'REVIEWING',
  'SHORTLISTED',
  'INTERVIEW_SCHEDULED',
  'REJECTED',
  'HIRED',
  'WITHDRAWN', // by the candidata
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUS)[number];

export const APPLICATION_STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; class: string }
> = {
  SUBMITTED: {
    label: 'Envoyée',
    class: 'bg-blue-100 text-blue-700',
  },
  REVIEWING: {
    label: 'En examen',
    class: 'bg-yellow-100 text-yellow-700',
  },
  SHORTLISTED: {
    label: 'Retenu',
    class: 'bg-yellow-100 text-yellow-700',
  },
  INTERVIEW_SCHEDULED: {
    label: 'Entretien prévu',
    class: 'bg-purple-100 text-purple-700',
  },

  REJECTED: {
    label: 'Refusée',
    class: 'bg-red-100 text-red-700',
  },
  HIRED: {
    label: 'Embauche',
    class: 'bg-red-100 text-red-700',
  },
  WITHDRAWN: {
    label: 'Retirer',
    class: 'bg-red-100 text-red-700',
  },
};
