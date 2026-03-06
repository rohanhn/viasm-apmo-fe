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
  getCountries(page: number = 1, pageSize: number = 25): Promise<any> {
    const query = qs.stringify({
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
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
            pagination: { page: 1, pageSize: 25, pageCount: 1, total: 0 },
          },
        };
      });
  },

  getCountryRankings(countryCode?: string): Promise<any> {
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
