import React from 'react'
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
}) {
  const renderPageNumbers = () => {
    const pageNumbers = []

    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers.map((page) => (
      <IconButton
        key={page}
        onClick={() => goToPage(page - 1)}
        color={pageIndex === page - 1 ? 'indigo' : 'gray'}
        variant={pageIndex === page - 1 ? 'filled' : 'text'}
      >
        {page}
      </IconButton>
    ))
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        onClick={() => previousPage()}
        variant="text"
        color="gray"
        disabled={!canPreviousPage}
        className="flex items-center space-x-2"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Previous
      </Button>

      {renderPageNumbers()}

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
}

export default CustomPagination
