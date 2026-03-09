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
  getCountries(page: number = 1, pageSize?: number): Promise<any> {
    const query = qs.stringify({
      ...(pageSize
        ? {
            'pagination[page]': page,
            'pagination[pageSize]': pageSize,
          }
        : {
            'pagination[page]': page,
            'pagination[pageSize]': 25,
          }),
    });

    return serviceClient
      .get(`/api/countries?populate=%2A&${query}`)
      .then((res) => {
        console.log('Raw countries API response:', res);
        console.log('Countries data:', res?.data);
        return res?.data; // ✅ Return the actual response data
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
        return {
          data: [],
          meta: {
            pagination: {
              page: 1,
              pageSize: pageSize || 25,
              pageCount: 1,
              total: 0,
            },
          },
        };
      });
  },

  getCountryRankings(countryCode?: string, pageSize?: number): Promise<any> {
    const filters: any = {};

    if (countryCode) {
      filters.country = {
        code: {
          $eq: countryCode.toUpperCase(),
        },
      };
    }

    const baseQuery = qs.stringify({
      filters,
      sort: ['year.name:desc'], // Sort by year descending (newest first)
      ...(pageSize && {
        pagination: {
          page: 1,
          pageSize,
        },
      }),
    });

    // Add URL encoded populate for Strapi compatibility
    const finalQuery = `populate%5Bcountry%5D=true&populate%5Byear%5D=true&${baseQuery}`;

    return serviceClient
      .get(`/api/country-rankings?${finalQuery}`)
      .then((res) => {
        console.log('Raw country rankings API response:', res);
        console.log('Country rankings data:', res?.data);
        return res?.data;
      })
      .catch((error) => {
        console.error('Error fetching country rankings:', error);
        return {
          data: [],
          meta: {
            pagination: {
              page: 1,
              pageSize: pageSize || 25,
              pageCount: 1,
              total: 0,
            },
          },
        };
      });
  },

  getRegulations(pageSize?: number): Promise<any> {
    const query = qs.stringify({
      populate: '*',
      ...(pageSize && {
        pagination: {
          page: 1,
          pageSize,
        },
      }),
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
            pagination: {
              page: 1,
              pageSize: pageSize || 25,
              pageCount: 1,
              total: 0,
            },
          },
        };
      });
  },

  getTimelines(page: number = 1, pageSize?: number): Promise<any> {
    const query = qs.stringify({
      populate: '*',
      ...(pageSize
        ? {
            pagination: {
              page,
              pageSize,
            },
          }
        : {
            pagination: {
              page,
              pageSize: 25,
            },
          }),
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
            pagination: {
              page: 1,
              pageSize: pageSize || 25,
              pageCount: 1,
              total: 0,
            },
          },
        };
      });
  },

  getProblemStatements(pageSize?: number): Promise<any> {
    const query = qs.stringify({
      populate: '*',
      ...(pageSize && {
        pagination: {
          page: 1,
          pageSize,
        },
      }),
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

  getProblemSolutions(pageSize?: number): Promise<any> {
    const query = qs.stringify({
      populate: '*',
      ...(pageSize && {
        pagination: {
          page: 1,
          pageSize,
        },
      }),
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

  getCountryRankingsByYear(year: string, pageSize?: number): Promise<any> {
    const filters = {
      $or: [
        { year: { name: { $eq: year } } },
        { year: { slug: { $eq: year } } },
      ],
    };

    const query = qs.stringify({
      filters,
      populate: {
        country: true,
        year: true,
      },
      ...(pageSize && {
        pagination: {
          page: 1,
          pageSize,
        },
      }),
    });

    return serviceClient
      .get(`/api/country-rankings?${query}`)
      .then((res) => {
        console.log('Country rankings by year data:', res.data);
        return res?.data;
      })
      .catch((error) => {
        console.error('Error fetching country rankings by year:', error);
        return {
          data: [],
          meta: {
            pagination: {
              page: 1,
              pageSize: pageSize || 25,
              pageCount: 1,
              total: 0,
            },
          },
        };
      });
  },

  getGeneralInfoByYear(year: string): Promise<any> {
    const filters = {
      $or: [
        { year: { name: { $eq: year } } },
        { year: { slug: { $eq: year } } },
      ],
    };

    const query = qs.stringify({
      filters,
      populate: {
        year: true,
      },
    });

    return serviceClient
      .get(`/api/general-infos?${query}`)
      .then((res) => {
        console.log('General info by year data:', res.data);
        return res?.data;
      })
      .catch((error) => {
        console.error('Error fetching general info by year:', error);
        return {
          data: [],
          meta: {
            pagination: { page: 1, pageSize: 25, pageCount: 1, total: 0 },
          },
        };
      });
  },
};
