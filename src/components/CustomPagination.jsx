import React, { useState } from 'react'
import { IconButton, Button } from '@material-tailwind/react'
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
}) {
  const [selectedPageSize, setSelectedPageSize] = useState(pageSizeOptions[0]) // Initialize with the first option

  const handlePageSizeChange = (e) => {
    const newSize = Number(e.target.value)
    const newSizeIndex = pageSizeOptions.indexOf(newSize)

    if (newSizeIndex !== -1) {
      setSelectedPageSize(newSize)
      setPageSize(newSize)
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = []

    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers.map((page, key) => (
      <>
        <button
          key={key}
          onClick={() => goToPage(page - 1)}
          className={`rounded-full w-9 h-9 relative ${
            pageIndex === page - 1
              ? 'bg-customRed-900 text-white'
              : 'hover:bg-customRed-100 hover:-4 hover:ring-customRed-100 transition-all duration-300'
          }`}
        >
          {page}
        </button>
      </>

      // <IconButton
      //   key={page}
      //   onClick={() => goToPage(page - 1)}
      //   color={pageIndex === page - 1 ? 'blue' : 'gray'}
      //   variant={pageIndex === page - 1 ? 'filled' : 'text'}
      //   className={
      //     pageIndex === page - 1
      //       ? 'bg-indigo-900 p-1 text-white rounded-full w-9 h-9 hover:bg-gray'
      //       : 'rounded-full p-1'
      //   }
      // >
      //   {page}
      // </IconButton>
    ))
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
            {pageSizeOptions.map((pageSizeOption) => (
              <option key={pageSizeOption} value={pageSizeOption}>
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
}

CustomPagination.defaultProps = {
  pageSizeOptions: [5], // Default to [5] if not provided
}

export default CustomPagination
