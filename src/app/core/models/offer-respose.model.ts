// APi Response
export interface IOfferResponse<T> {
  success?: boolean;
  data: T;
  meta: IPagination;
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
}
