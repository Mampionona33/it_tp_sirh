import React, { useState } from 'react'
import { Button } from '@material-tailwind/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'

function CustomPagination({
  pageIndex,
  pageCount,
  goToPage,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageSizeOptions,
  setPageSize,
  defaultPageSize,
}) {
  const [selectedPageSize, setSelectedPageSize] = useState(pageSizeOptions[0])

  const handlePageSizeChange = (e) => {
    const newSize = Number(e.target.value)
    const newSizeIndex = pageSizeOptions.indexOf(newSize)

    if (newSizeIndex !== -1) {
      setSelectedPageSize(newSize)
      setPageSize(newSize)
    }
  }

  React.useEffect(() => {
    let mount = true
    if (defaultPageSize) {
      if (mount) {
        setSelectedPageSize(defaultPageSize)
        setPageSize(defaultPageSize)
      }
    }
  }, [defaultPageSize])

  const renderPageNumbers = () => {
    return Array.from({ length: pageCount }, (_, index) => {
      const page = index + 1
      return (
        <button
          key={page}
          onClick={() => goToPage(page - 1)}
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

  return (
    <div className="flex flex-wrap items-center justify-center space-x-2 ">
      <Button
        onClick={() => previousPage()}
        variant="text"
        color="gray"
        disabled={!canPreviousPage}
        className="flex items-center space-x-2 "
      >
        <ArrowLeftIcon className="w-5 h-5 " />
        Previous
      </Button>

      <div className="flex  items-center gap-3">{renderPageNumbers()}</div>

      <Button
        onClick={() => nextPage()}
        variant="text"
        color="gray"
        disabled={!canNextPage}
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

CustomPagination.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  canNextPage: PropTypes.bool.isRequired,
  canPreviousPage: PropTypes.bool.isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  setPageSize: PropTypes.func,
  defaultPageSize: PropTypes.number,
}

CustomPagination.defaultProps = {
  pageSizeOptions: [5], // Default to [5] if not provided
  defaultPageSize: 5,
}

export default CustomPagination
