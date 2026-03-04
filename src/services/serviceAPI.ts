// eslint-disable-next-line import/no-cycle

import serviceClient from './serviceClient';

const qs = require('qs');

export const serviceAPI = {
  getGlobalData(): Promise<any> {
    const query = qs.stringify({
      populate: {
        logo: '*',
        favicons: {
          populate: '*',
        },
        socials: {
          populate: '*',
        },
        offices: {
          populate: '*',
        },
        footer: {
          populate: '*',
        },
        partners: {
          populate: '*',
        },
        event: {
          populate: '*',
        },
        defaultSeo: {
          populate: {
            metaTags: '*',
            metaImage: '*',
          },
        },
        popup_ads: {
          populate: '*',
        },
      },
    });
    return serviceClient.get(`/api/global?${query}`);
    // return {};
  },
  getHomeData(locale?: string): Promise<any> {
    const query = qs.stringify({
      locale,
      populate: {
        Slide: {
          populate: '*',
        },
        bai_viets: {
          populate: '*',
        },
        banner: {
          populate: '*',
        },
        intro: {
          populate: '*',
        },
      },
    });
    return serviceClient.get(`/api/home?${query}`);
  },
  getArticleCategory(
    category_name: string,
    locale?: string,
    page: number = 1,
    pageSize: number = 6
  ): Promise<any> {
    const query = qs.stringify({
      filters: {
        categories: {
          name: {
            $eq: category_name,
          },
        },
      },
      sort: ['createdAt:desc'],
      populate: {
        sourceImage: { populate: '*' },
        thumblmage: { populate: '*' },
        // categories: { populate: '*' },
      },
      pagination: {
        page,
        pageSize,
      },
      locale,
    });
    console.log('query', `/api/articles?${query}`);
    return serviceClient
      .get(`/api/articles?${query}`)
      .then((res) => {
        console.log('headers: HTTP headers', res.headers); // HTTP headers
        console.log('data: Your API response data', res.data); // Your API response data
        return res?.data;
      })
      .catch((error) => {
        console.error('Error fetching article category in serviceAPI:', error);
        return { data: [] };
      });
  },
  getArticleById(id: string | number, locale?: string): Promise<any> {
    const query = qs.stringify({
      populate: '*',
    });
    const localeParam = locale ? `&locale=${locale}` : '';
    return serviceClient
      .get(`/api/articles/${id}?${query}${localeParam}`)
      .then((res) => (res?.data?.data ? res : { data: { data: null } }));
  },
  getPostBySlug(slug: string, locale?: string): Promise<any> {
    const query = qs.stringify(
      {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        populate: {
          sourceImage: { populate: '*' },
          thumblmage: { populate: '*' },
          categories: { populate: '*' },
        },
      },
      locale
    );
    return serviceClient.get(`/api/articles?${query}`);
  },
  getCategorybyName({ cat }: { cat?: string }): Promise<any> {
    const filters: any = {};
    if (cat) {
      filters.slug = {
        $eq: cat,
      };
    }
    return serviceClient.get(`/api/categories`);
  },
  getWebRulesData(locale?: string): Promise<any> {
    const query = qs.stringify({
      populate: {
        the_le_lich_trinh: {
          populate: {
            video_tutorial: { populate: '*' },
            references: { populate: '*' },
            bai_viets: { populate: '*' },
          },
        },
      },
      locale,
    });
    return serviceClient.get(`/api/the-le?${query}`);
  },

  getWebGuidelinesData(locale?: string): Promise<any> {
    const query = qs.stringify({
      populate: '*',
      locale,
    });
    return serviceClient.get(`/api/huong-dan?${query}`);
  },
  getWebAboutData(locale?: string): Promise<any> {
    // populate[article][populate][bai_viets][fields][0]=id

    const query = qs.stringify({
      populate: {
        article: {
          populate: {
            bai_viets: {
              populate: {
                sourceImage: { populate: '*' },
                thumblmage: { populate: '*' },
              },
            },
          },
        },
      },
      locale,
    });
    console.log('query', query);
    return serviceClient.get(`/api/gioi-thieu?${query}`);
  },
  getWebOrganizerData(locale?: string): Promise<any> {
    const query = qs.stringify({
      populate: {
        team: {
          populate: '*',
        },
      },
      locale,
    });
    // console.log('query', query);
    return serviceClient.get(`/api/ban-to-chuc-cap-quoc-gia?${query}`);
  },
  getOrgGuide(locale?: string): Promise<any> {
    const query = qs.stringify({
      populate: {
        huong_dan_to_chuc: {
          populate: {
            video_tutorial: { populate: '*' },
            references: { populate: '*' },
            bai_viets: { populate: '*' },
          },
        },
      },
      locale,
    });
    return serviceClient.get(`/api/huong-dan?${query}`);
  },

  submitContact(contactData: {
    full_name: string;
    message: string;
    email_contact: string;
    captchaToken: string;
  }): Promise<any> {
    return serviceClient.post('/api/lien-hes', {
      data: contactData,
    });
  },

  getWebPartnerUnitData(locale?: string): Promise<any> {
    const query = qs.stringify({
      populate: {
        partner: {
          populate: '*',
        },
      },
      locale,
    });
    return serviceClient.get(`/api/don-vi-lien-ket?${query}`);
  },
  getWebAcademicCouncilData(locale?: string): Promise<any> {
    const query = qs.stringify({
      populate: {
        team: {
          populate: '*',
        },
      },
      locale,
    });
    return serviceClient.get(`/api/hoi-dong-chuyen-mon?${query}`);
  },
  // get album anh
  getGallery(locale?: string): Promise<any> {
    const query = qs.stringify({
      populate: {
        images: {
          populate: '*',
        },
      },
      locale,
    });
    return (
      serviceClient.get(`/api/album-anh?${query}`) || {
        data: { data: [] },
      }
    );
  },
  // get Banner ads
  getBannerAds(locale?: string): Promise<any> {
    const query = qs.stringify({
      populate: {
        banner: {
          populate: '*',
        },
      },
      locale,
    });
    return serviceClient
      .get(`/api/banner?${query}`)
      .then((res) => {
        return res?.data || { data: { data: { banner: [] } } };
      })
      .catch(() => {
        return { data: { data: { banner: [] } } };
      });
  },

  getCountries(page: number = 1, pageSize: number = 25): Promise<any> {
    const query = qs.stringify({
      populate: '*',
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
    });

    return serviceClient
      .get(`/api/countries?${query}`)
      .then((res) => {
        return (
          res?.data || {
            data: [],
            meta: {
              pagination: { page: 1, pageSize: 25, pageCount: 1, total: 0 },
            },
          }
        );
      })
      .catch(() => {
        return {
          data: [],
          meta: {
            pagination: { page: 1, pageSize: 25, pageCount: 1, total: 0 },
          },
        };
      });
  },

  getRegulations(): Promise<any> {
    const query = qs.stringify({
      populate: '*',
    });
    return serviceClient
      .get(`/api/regulations?${query}`)
      .then((res) => {
        console.log('Regulations data:', res.data);
        return res?.data;
      })
      .catch((error) => {
        console.error('Error fetching regulations:', error);
        return {
          data: [],
          meta: {
            pagination: { page: 1, pageSize: 25, pageCount: 1, total: 0 },
          },
        };
      });
  },

  getTimelines(page: number = 1, pageSize: number = 25): Promise<any> {
    const query = qs.stringify({
      populate: '*',
      pagination: {
        page,
        pageSize,
      },
      sort: ['year.name:desc'],
    });
    return serviceClient
      .get(`/api/timelines?${query}`)
      .then((res) => {
        console.log('Timeline data:', res.data);
        return res?.data;
      })
      .catch((error) => {
        console.error('Error fetching timelines:', error);
        return {
          data: [],
          meta: {
            pagination: { page: 1, pageSize: 25, pageCount: 1, total: 0 },
          },
        };
      });
  },

  getProblemStatements(): Promise<any> {
    const query = qs.stringify({
      populate: '*',
    });
    return serviceClient
      .get(`/api/problem-statements?${query}`)
      .then((res) => {
        console.log('Problem Statements data:', res.data);
        return res?.data;
      })
      .catch((error) => {
        console.error('Error fetching problem statements:', error);
        return {
          data: [],
          meta: {
            pagination: { page: 1, pageSize: 25, pageCount: 1, total: 0 },
          },
        };
      });
  },

  getProblemSolutions(): Promise<any> {
    const query = qs.stringify({
      populate: '*',
    });
    return serviceClient
      .get(`/api/problem-solutions?${query}`)
      .then((res) => {
        console.log('Problem Solutions data:', res.data);
        return res?.data;
      })
      .catch((error) => {
        console.error('Error fetching problem solutions:', error);
        return {
          data: [],
          meta: {
            pagination: { page: 1, pageSize: 25, pageCount: 1, total: 0 },
          },
        };
      });
  },
};
