/* eslint-disable */
// @ts-ignore

export type CityGetRes = {
  /** City */
  city: string;
  /** Query String */
  query_string?: string;
};

export enum CityName {
  Beijing = 'Beijing',
  Wuhan = 'Wuhan',
  Other = 'Other',
}

export type ICityName = keyof typeof CityName;

export type CityPutRes = {
  city: CityName;
};

export type getCitycityParams = {
  city: string;
  query_string?: string;
};

export type HTTPValidationError = {
  /** Detail */
  detail?: ValidationError[];
};

export type putCitycityParams = {
  city: CityName;
};

export type ValidationError = {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
};
