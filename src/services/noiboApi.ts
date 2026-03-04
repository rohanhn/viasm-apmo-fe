/* eslint-disable @typescript-eslint/naming-convention */
import serviceNoiboClient from './serviceNoiboClient';

export interface GetAwardParams {
  examination_round_id: string;
  grade_id: string;
  owner_id: string; // default to 'TRANG_NGUYEN' if not provided
  user_name?: string;
  size_top?: number; // default 100
  province_id?: string;
  district_id?: string;
  school_id?: string;
}

export async function getAward(params: GetAwardParams) {
  const {
    examination_round_id,
    grade_id,
    owner_id = 'TRANG_NGUYEN',
    user_name,
    size_top = 100,
    province_id,
    district_id,
    school_id,
  } = params;

  const queryParams: any = {
    examination_round_id,
    grade_id,
    owner_id,
    size_top,
  };
  if (user_name) queryParams.user_name = user_name;
  if (province_id) queryParams.province_id = province_id;
  if (district_id) queryParams.district_id = district_id;
  if (school_id) queryParams.school_id = school_id;

  const response = await serviceNoiboClient.get('/roll_of_honor', {
    params: queryParams,
  });
  return response.data;
}
