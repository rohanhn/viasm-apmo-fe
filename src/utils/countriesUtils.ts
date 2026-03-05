import { countriesData } from './countriesData';
import type { Country, CountryResponse } from '@/src/types';

export interface CountryWithResults extends Country {
  results: string;
}

// Utility function to get participating countries (similar to Python logic)
export function getParticipatingCountries(
  page: number = 1,
  pageSize: number = 25,
  searchTerm: string = ''
): CountryResponse {
  // Convert CSV data to match Country interface
  const formattedCountries: Country[] = countriesData.map((item, index) => ({
    id: index + 1,
    documentId: `country_${item.code.toLowerCase()}`,
    name: item.country,
    code: item.code,
    active: item.status === 'Active',
    contact: item.representative || null,
    slug: item.country.toLowerCase().replace(/\s+/g, '-'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    locale: 'en',
    localizations: [],
  }));

  // Sort by country name (similar to pandas sort_values)
  let sortedCountries = [...formattedCountries].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Filter by search term if provided
  if (searchTerm) {
    sortedCountries = sortedCountries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Calculate pagination
  const total = sortedCountries.length;
  const pageCount = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = sortedCountries.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    meta: {
      pagination: {
        page,
        pageSize,
        pageCount,
        total,
      },
    },
  };
}

// Get all active countries count
export function getActiveCountriesCount(): number {
  return countriesData.filter((country) => country.status === 'Active').length;
}

// Get country by code
export function getCountryByCode(code: string): Country | undefined {
  const csvCountry = countriesData.find((country) => country.code === code);
  if (!csvCountry) return undefined;
  
  return {
    id: 1,
    documentId: `country_${csvCountry.code.toLowerCase()}`,
    name: csvCountry.country,
    code: csvCountry.code,
    active: csvCountry.status === 'Active',
    contact: csvCountry.representative || null,
    slug: csvCountry.country.toLowerCase().replace(/\s+/g, '-'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    locale: 'en',
    localizations: [],
  };
}

// Get all countries (no pagination)
export function getAllCountries(): Country[] {
  return countriesData.map((item, index) => ({
    id: index + 1,
    documentId: `country_${item.code.toLowerCase()}`,
    name: item.country,
    code: item.code,
    active: item.status === 'Active',
    contact: item.representative || null,
    slug: item.country.toLowerCase().replace(/\s+/g, '-'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    locale: 'en',
    localizations: [],
  })).sort((a, b) => a.name.localeCompare(b.name));
}