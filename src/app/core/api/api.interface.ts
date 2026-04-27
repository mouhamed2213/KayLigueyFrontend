// APi Response
export interface ApiResponse<T> {
  succes?: string;
  data: T;
  meta?: any;
}
