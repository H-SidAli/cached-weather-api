export interface WeatherResponse {
  resolvedAddress: string;
  days: {
    // not all the details since there is a lot 
    datetime: string;
    temp: number;
    conditions: string;
  }[];
}