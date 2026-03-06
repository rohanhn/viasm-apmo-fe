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

  getCountryRankings(countryCode?: string): Promise<any> {
    const filters: any = {};

    if (countryCode) {
      filters.country = {
        code: {
          $eq: countryCode.toUpperCase(),
        },
      };
    }

    const query = qs.stringify({
      populate: {
        country: true,
        year: true,
      },
      filters,
      sort: ['year.name:desc'], // Sort by year descending (newest first)
    });

    return serviceClient
      .get(`/api/country-rankings?${query}`)
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
