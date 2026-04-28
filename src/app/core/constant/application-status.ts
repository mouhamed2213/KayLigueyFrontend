export const APPLICATION_STATUS = [
  'SUBMITTED',
  'REVIEWING',
  'SHORTLISTED',
  'INTERVIEW_SCHEDULED',
  'REJECTED',
  'HIRED',
  'WITHDRAWN', // by the candidata
  'INTERVIEW',
  'OFFERED',
  
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUS)[number];

statsMap: ({
  SUBMITTED: 0,
  REVIEWING: 0,
  SHORTLISTED: 0,
  INTERVIEW: 0,
  OFFERED: 0,
  HIRED: 0,
  REJECTED: 0,
  WITHDRAWN: 0,
});

export const APPLICATION_STATUS_CONFIG: Partial<
  Record<ApplicationStatus, { label: string; class: string }>
> = {
  SUBMITTED: {
    label: 'Envoyée',
    class: 'bg-blue-100 text-blue-700', // Bleu : Neutre / Début
  },
  REVIEWING: {
    label: 'En examen',
    class: 'bg-indigo-100 text-indigo-700', // Indigo : Travail en cours
  },
  SHORTLISTED: {
    label: 'Retenu',
    class: 'bg-orange-100 text-orange-700', // Orange : Attention positive
  },
  INTERVIEW: {
    label: 'Entretien',
    class: 'bg-purple-100 text-purple-700', // Violet : Étape clé
  },
  INTERVIEW_SCHEDULED: {
    label: 'Entretien prévu',
    class: 'bg-purple-100 text-purple-700',
  },
  OFFERED: {
    label: 'Offre reçue',
    class: 'bg-cyan-100 text-cyan-700', // Cyan : Succès imminent
  },
  HIRED: {
    label: 'Recruté',
    class: 'bg-green-100 text-green-700', // Vert : Succès final
  },
  REJECTED: {
    label: 'Refusée',
    class: 'bg-red-100 text-red-700', // Rouge : Échec
  },
  WITHDRAWN: {
    label: 'Retirée',
    class: 'bg-gray-100 text-gray-700', // Gris : Annulé par le candidat
  },
};
