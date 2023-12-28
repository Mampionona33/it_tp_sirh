import React, { useEffect, useState } from 'react'
import { Button } from '@material-tailwind/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

interface IReusableTablePaginationProps {
  pageIndex: number
  canPreviousPage: boolean
  canNextPage: boolean
  pageCount: number
  defaultPageSize: number
  setPageSize: (pageSize: number) => void
  goToPage?: (page: number) => void
  previousPage?: () => void
  nextPage?: () => void
  pageSizeOptions?: number[]
}

const ReusableTablePagination: React.FC<IReusableTablePaginationProps> = ({
  pageIndex,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageSizeOptions,
  defaultPageSize = 5,
  setPageSize,
  previousPage,
  nextPage,
  goToPage,
}) => {
  const [selectedPageSize, setSelectedPageSize] = useState(defaultPageSize)

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value)

    setSelectedPageSize(newSize)
    setPageSize(newSize)
  }

  const renderPageNumbers = () => {
    return Array.from({ length: pageCount }, (_, index) => {
      const page = index + 1
      return (
        <button
          key={page}
          onClick={() => goToPage && goToPage(page - 1)}
          className={`rounded-full w-9 h-9 relative ${
            pageIndex === page - 1
              ? 'bg-customRed-900 text-white'
              : 'hover:bg-customRed-100 hover:-4 hover:ring-customRed-100 transition-all duration-300'
          }`}
        >
          {page}
        </button>
      )
    })
  }

  useEffect(() => {
    if (defaultPageSize) {
      setPageSize(defaultPageSize)
    }
  }, [defaultPageSize, setPageSize])

  return (
    <div className="flex flex-wrap items-center justify-center space-x-2 ">
      <Button
        onClick={() => previousPage && previousPage()}
        variant="text"
        color="gray"
        disabled={!canPreviousPage}
        placeholder="Previous"
        className="flex items-center space-x-2 "
      >
        <ArrowLeftIcon className="w-5 h-5 " />
        Previous
      </Button>

      <div className="flex items-center gap-3">{renderPageNumbers()}</div>

      <Button
        onClick={() => nextPage && nextPage()}
        variant="text"
        color="gray"
        disabled={!canNextPage}
        placeholder="Next"
        className="flex items-center space-x-2"
      >
        Next
        <ArrowRightIcon className="w-5 h-5" />
      </Button>

      {pageSizeOptions && (
        <div className="flex flex-wrap flex-row">
          <span>Page size:</span>
          <select value={selectedPageSize} onChange={handlePageSizeChange}>
            {pageSizeOptions.map((pageSizeOption, pageKey) => (
              <option key={pageKey} value={pageSizeOption}>
                {pageSizeOption}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}

export default ReusableTablePagination
