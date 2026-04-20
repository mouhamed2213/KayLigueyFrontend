export const SN_REGIONS: string[] = [
  'DAKAR',
  'THIES',
  'SAINT_LOUIS',
  'DIOURBEL',
  'LOUGA',
  'FATICK',
  'KAOLACK',
  'KAFFRINE',
  'TAMBACOUNDA',
  'KOLDA',
  'ZIGUINCHOR',
  'SEDHIOU',
  'KEDOUGOU',
  'MATAM',
] as const; // translate to readonly can alson get type form it

export type Regions = typeof SN_REGIONS;
