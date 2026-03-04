export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
export interface IImageProps {
  data: {
    id: number;
    attributes: {
      formats: any;
      url: string;
      width: number;
      height: number;
    };
  };
}

export interface IPaginationProps {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

export interface ISeoProps {
  canonicalURL: string;
  keywords: string;
  metaDescription: string;
  metaImage: IImageProps;
  metaTitle: string;
  titleTemplate: string;
  metaRobots: string;
  structuredData: JSON;
}

export interface IPartner {
  id: number;
  name: string;
  image: IImageProps;
}

export interface IEvent {
  id?: string;
  type?: string;
  name?: string;
  giftImage?: IImageProps;
  bgImage?: IImageProps;
  /** Format: date-time */
  startDate?: string;
  /** Format: date-time */
  endDate?: string;
  link?: string;
  linkGift?: string;
}

export interface IOffice {
  id: number;
  name: string;
  address: string;
}

export interface IArticle {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    content?: string;
    publishedAt: string;
    thumbImage: IImageProps;
    video: IImageProps;
    category: {
      data: ICategory;
    };
    related: {
      data: IArticle[];
    };
    view: number;
    like: number;
    sourceImage: IImageProps;
  };
}

export interface ICategory {
  id: number;
  attributes: {
    name: string;
    slug: string;
  };
}

export interface IHomeData {
  id: number;
  attributes: {
    aboutUs: {
      title: string;
      id: number;
      image: IImageProps;
      description: string;
      statistic: Array<{
        icon: IImageProps;
        bgImage: IImageProps;
        title: string;
        id: number;
        description: string;
        number: string;
      }>;
    };
    news: {
      articles: {
        data: IArticle[];
      };
    };
    cornerParent: {
      articles: {
        data: IArticle[];
      };
    };
    cornerTeacher: {
      articles: {
        data: IArticle[];
      };
    };
    newsSpecical: {
      articles: {
        data: IArticle[];
      };
    };
    articleAboutus: {
      articles: {
        data: IArticle[];
      };
    };
    partners: Array<{
      image: IImageProps;
      id: number;
      name: string;
    }>;
    aboutTN: Array<{
      id: number;
      title: string;
      description: string;
      avatar: IImageProps;
    }>;
  };
}

export interface IIntroData {
  id: number;
  attributes: {
    content: string;
    title: string;
    slogan: string;
    methodEducations: [
      {
        id: number;
        title: string;
        articles: {
          data: IArticle[];
        };
      }
    ];
    coreValue: Array<{
      id: number;
      icon: IImageProps;
      description: string;
      title: string;
    }>;
  };
}

export interface ICornerParent {
  id: number;
  attributes: {
    title: string;
    intro: {
      id: number;
      title: string;
      description: string;
      image: IImageProps;
      article: {
        data: IArticle;
      };
    };
    letters: {
      id: number;
      content: string;
      title: string;
    };
    tabs: Array<{
      id: number;
      title: string;
      articles: {
        data: IArticle[];
      };
    }>;
  };
}

export interface ICornerTeacher {
  id: number;
  attributes: {
    title: string;
    intro: {
      id: number;
      image: IImageProps;
      title: string;
      description: string;
    };
    letters: {
      id: number;
      content: string;
      title: string;
    };
    share: {
      articles: {
        data: IArticle[];
      };
    };
    documents: Array<{
      id: number;
      title: string;
      articles: {
        data: IArticle[];
      };
    }>;
  };
}

export interface IQA {
  id: number;
  attributes: {
    title: string;
    content: Array<{
      id: number;
      question: string;
      answer: string;
    }>;
  };
}

export interface IRecruitment {
  id: number;
  attributes: {
    name: string;
    slug: string;
    time: string;
    endDate: string;
    address: string;
    salary: string;
    content: string;
    department: {
      data: IDepartment;
    };
  };
}

export interface IDepartment {
  id: number;
  attributes: {
    name: string;
    slug: string;
  };
}

export interface IAccountInfo {
  user_id: string;
  user_name: string;
  IAM_user_id: string;
  examination_user_number: number;
  parent_id: string;
  parent_name: string;
  parent_IAM_id: string;
  gender: number;
  birth_date: string;
  signed_up_date: string;
  state: number;
  avatar_image_link: string;
  owner_id: string;
  user_type: string[];
  family_name: string;
  forename: string;
  email: string;
  phone_number: string;
  address: string;
  country_id: string;
  ethnic_group: string;
  province_id: string;
  province_name: string;
  district_id: string;
  district_name: string;
  school_id: string;
  school_name: string;
  class_id: string;
  user_class_id: string;
  grade_id: string;
  gold_bar_number: string;
  class_name: string;
}

export interface IDecoded {
  exp: number;
  iat: number;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}

export interface User {
  exp: number;
  iat: number;
  access_token: string;
  refresh_token: string;
  user_id: string;
  user_name: string;
  IAM_user_id: string;
  examination_user_number: number;
  parent_id: string;
  parent_name: string;
  parent_IAM_id: string;
  gender: number;
  birth_date: string;
  signed_up_date: string;
  state: number;
  avatar_image_link: string;
  owner_id: string;
  user_type: string[];
  family_name: string;
  fullname: string;
  name: string;
  forename: string;
  email: string;
  phone_number: string;
  address: string;
  country_id: string;
  ethnic_group: string;
  province_id: string;
  province_name: string;
  district_id: string;
  district_name: string;
  school_id: string;
  school_name: string;
  class_id: string;
  user_class_id: string;
  grade_id: string;
  gold_bar_number: string;
  class_name: string;
}

export interface InforPayment {
  family_name?: string;
  phone_number?: string;
  email?: string;
  product_transaction_id?: string;
}

export interface InforCart {
  cart_id: string;
  user_id: string;
  data?: any;
  dataPayment?: any;
}

export interface PaymentTransaction {
  product_transaction_id: string;
  total_amount: number;
  product_packages: any[];
  total_voucher_amount: number;
  cart_id: string;
}

export interface ApiResponse<D> {
  status: number;
  data: D;
}
