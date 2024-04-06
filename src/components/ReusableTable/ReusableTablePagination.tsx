import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '@material-tailwind/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { useLocation, useNavigate } from 'react-router-dom'

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
  defaultPageSize,
  setPageSize,
  previousPage,
  nextPage,
  goToPage,
}) => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const page = search ? Number(new URLSearchParams(search).get('page')) : 1
  const pageSize = search ? Number(new URLSearchParams(search).get('pageSize')) : defaultPageSize
  const [selectedPageSize, setSelectedPageSize] = useState<number>(defaultPageSize)

  const updateUrl = useCallback(
    (page: number, pageSize: number) => {
      const url = new URL(window.location.href)
      url.searchParams.set('page', page.toString())
      url.searchParams.set('pageSize', pageSize.toString())
      navigate(url.pathname + url.search)
    },
    [navigate],
  )

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value)
    setSelectedPageSize(newSize)
    updateUrl(Number(page), newSize)
    setPageSize(newSize)
  }

  const handlePageClick = (tablePage: number) => {
    goToPage && goToPage(tablePage - 1)
    updateUrl(tablePage, selectedPageSize)
  }

  const renderPageNumbers = () => {
    return Array.from({ length: pageCount }, (_, index) => {
      const tablePage = index + 1
      return (
        <button
          key={tablePage}
          onClick={() => handlePageClick(tablePage)}
          className={`rounded-full w-9 h-9 relative ${
            pageIndex === tablePage - 1
              ? 'bg-customRed-900 text-white'
              : 'hover:bg-customRed-100 hover:-4 hover:ring-customRed-100 transition-all duration-300'
          }`}
        >
          {tablePage}
        </button>
      )
    })
  }

  const handleNextPage = () => {
    const nextPageValue = pageIndex + 2 // 1-based index for the URL
    updateUrl(nextPageValue, selectedPageSize)
    nextPage && nextPage()
  }

  const handlePreviousPage = () => {
    const previousPageValue = pageIndex // 1-based index for the URL
    updateUrl(previousPageValue, selectedPageSize)
    previousPage && previousPage()
  }

  const updatePage = useCallback(
    (tablePage: number) => {
      goToPage!(tablePage - 1)
      updateUrl(tablePage, selectedPageSize)
    },
    [goToPage, updateUrl, selectedPageSize],
  )

  useEffect(() => {
    let mount = true

    if (mount && page && Number(page) !== pageIndex + 1) {
      updatePage(Number(page))
    }

    return () => {
      mount = false
    }
  }, [page, pageIndex, updatePage])

  useEffect(() => {
    if (pageSize && pageSize !== defaultPageSize) {
      console.log('pageSize', pageSize)
      setPageSize(Number(pageSize))
      setSelectedPageSize(Number(pageSize))
    } else {
      setPageSize(defaultPageSize)
    }
  }, [pageSize, setPageSize, defaultPageSize])

  return (
    <div className="flex flex-wrap items-center justify-center space-x-2 ">
      <Button
        onClick={handlePreviousPage}
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
        onClick={handleNextPage}
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
