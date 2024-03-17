import { useMemo } from 'react';

type props = {
  siblingCount: number;
  currentPage: number;
  totalPageCount: number;
};

export const DOTS = "..."

export const usePagination = ({
  siblingCount = 1,
  currentPage,
  totalPageCount
}: props) => {

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    // return Array.from({length}); this return an empty array of undefined the number of times the length is
    return Array.from({ length }, (value, index) => index + start);
  }

  const paginationRange = useMemo(() => {
    //logic goes here
    const totalPageNumber = siblingCount + 5;

    //case 1: total number of pages is greater and equal to the page 
    if (totalPageNumber >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);
    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPageCount -2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    //case 2: showright dots
    if (!showLeftDots && showRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    //case 3: show left dots
    if (showLeftDots && !showLeftDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount, totalPageCount);

      return [firstPageIndex, DOTS, ...rightRange]
    }

    //case 4: show both left and right dots
    if (showLeftDots && showRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, middleRange, DOTS, totalPageCount]
    }

  }, [
    siblingCount,
    currentPage,
    totalPageCount
  ]);

  return paginationRange;
};
