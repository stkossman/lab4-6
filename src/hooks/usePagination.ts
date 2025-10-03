import { useState, useMemo, useEffect } from 'react';
import type { UsePaginationProps } from '../types/todo';



export const usePagination = ({ 
  items, 
  initialLimit = 10,
  dependencies = []
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(initialLimit);
  
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / limitPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, dependencies);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * limitPerPage;
    const endIndex = startIndex + limitPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, limitPerPage]);
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  const setLimit = (limit: number) => {
    setLimitPerPage(limit);
    setCurrentPage(1);
  };
  
  return {
    currentPage,
    limitPerPage,
    totalItems,
    totalPages,
    paginatedItems,
    goToNextPage,
    goToPrevPage,
    setLimit,
    setCurrentPage,
  };
};
