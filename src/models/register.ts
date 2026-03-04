export interface NationType {
  country_id: string;
  country_name: string;
}

export interface ProvinceType {
  country_id: string;
  country_name: string;
  province_code: string;
  province_id: string;
  province_name: string;
  time_zone_in_minutes: string;
  license_plates_prefixes: number[];
}
