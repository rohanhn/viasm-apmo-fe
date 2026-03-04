export type TabValueType =
  | 'TRANG_NGUYEN_TIENG_VIET'
  | 'TRANG_NGUYEN_TOAN_TAI'
  | 'TRANG_NGUYEN_LICH_SU'
  | 'TRANG_NGUYEN_MAU_GIAO'
  | 'COMBO';

export interface ProductType {
  group_name: TabValueType;
  icon_link: string;
  image_link: string;
  level: number;
  limitation: number;
  monetary_unit: string;
  number_of_reviewers: number;
  number_of_users: number;
  owner_id: string;
  price: number;
  product_package_id: string;
  product_package_name: string;
  review_point: number;
  info: string;
}
