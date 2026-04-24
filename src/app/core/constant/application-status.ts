export const APPLICATION_STATUS = [
  'SUBMITTED',
  'REVIEWING',
  'INTERVIEW_SCHEDULED',
  'ACCEPTED',
  'REJECTED',
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUS)[number];

export const APPLICATION_STATUS_CONFIG: Record<ApplicationStatus, { label: string; class: string }> = {
  SUBMITTED: {
    label: 'Envoyée',
    class: 'bg-blue-100 text-blue-700'
  },
  REVIEWING: {
    label: 'En examen',
    class: 'bg-yellow-100 text-yellow-700'
  },
  INTERVIEW_SCHEDULED: {
    label: 'Entretien prévu',
    class: 'bg-purple-100 text-purple-700'
  },
  ACCEPTED: {
    label: 'Acceptée',
    class: 'bg-green-100 text-green-700'
  },
  REJECTED: {
    label: 'Refusée',
    class: 'bg-red-100 text-red-700'
  },
};
