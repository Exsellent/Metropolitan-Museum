export interface IApiResponse {
  objectIDs: number[];
  primaryImageSmall: string;
  artistDisplayName: string;
  culture: string;
  period: string;
  accessionYear: string;
}

export interface IFetchBaseQueryError {
  status: number;
  data: unknown;
}
