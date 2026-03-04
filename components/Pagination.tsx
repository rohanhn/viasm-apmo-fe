/* eslint-disable react/button-has-type */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  loading?: boolean;
  searchQuery?: string;
  basePath: string; // e.g., '/timeline', '/countries'
  itemName?: string; // e.g., 'records', 'countries', 'articles'
  showInfo?: boolean; // Whether to show pagination info text
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  loading = false,
  searchQuery = '',
  basePath,
  itemName = 'items',
  showInfo = true,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }

    const queryString = params.toString();
    const url = queryString ? `${basePath}?${queryString}` : basePath;
    router.push(url);
  };

  // Don't show pagination if loading, only 1 page, or searching
  if (loading || totalPages <= 1 || searchQuery) {
    return showInfo ? (
      <div className="mt-4 text-center text-sm text-gray-500">
        {loading && 'Loading...'}
        {!loading &&
          searchQuery &&
          `Showing filtered results for "${searchQuery}"`}
        {!loading && !searchQuery && `Showing all ${totalItems} ${itemName}`}
      </div>
    ) : null;
  }

  // Calculate visible page numbers (max 7 buttons)
  const getVisiblePages = () => {
    const delta = 3; // Show 3 pages on each side of current page
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage > delta + 2) {
      pages.push('...');
    }

    // Show pages around current page
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    for (let i = start; i <= end; i += 1) {
      pages.push(i);
    }

    if (currentPage < totalPages - delta - 1) {
      pages.push('...');
    }

    // Always show last page (if not already included)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mt-6 space-y-4">
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3 py-2 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition-colors"
        >
          Previous
        </button>

        <div className="flex gap-1">
          {visiblePages.map((page, index) =>
            page === '...' ? (
              <span
                key={`ellipsis-before-${visiblePages[index + 1] || 'end'}`}
                className="px-3 py-2 text-sm text-gray-400"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page as number)}
                className={`px-3 py-2 border rounded-md text-sm transition-colors ${
                  page === currentPage
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'hover:bg-blue-50 border-gray-300'
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3 py-2 border rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition-colors"
        >
          Next
        </button>
      </div>

      {/* Pagination Info */}
      {showInfo && (
        <div className="text-center text-sm text-gray-500">
          Showing {startItem} to {endItem} of {totalItems} {itemName}
          <span className="ml-1 text-gray-400">
            (Page {currentPage} of {totalPages})
          </span>
        </div>
      )}
    </div>
  );
}
