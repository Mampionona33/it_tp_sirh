import React from 'react'
import PropTypes from 'prop-types' // Importez la bibliothèque PropTypes
import CustomPagination from '../CustomPagination' // Importez l'élément CustomPagination

const TimeSheetTablePagination = ({ table, pageSizeOptions }) => {
  return (
    <div className="bg-gray-100 overflow-auto py-2 px-4">
      <div className="flex justify-center  p-2 mt-2">
        <div className="flex flex-wrap items-center gap-2">
          <CustomPagination
            pageIndex={table.getState().pagination.pageIndex}
            pageCount={table.getPageCount()}
            goToPage={table.setPageIndex}
            nextPage={table.nextPage}
            previousPage={table.previousPage}
            canNextPage={table.getCanNextPage()}
            canPreviousPage={table.getCanPreviousPage()}
            pageSizeOptions={pageSizeOptions}
            setPageSize={table.setPageSize}
            defaultPageSize={31}
          />
        </div>
      </div>
    </div>
  )
}

TimeSheetTablePagination.propTypes = {
  table: PropTypes.object,
  pageSizeOptions: PropTypes.array,
}

export default TimeSheetTablePagination
