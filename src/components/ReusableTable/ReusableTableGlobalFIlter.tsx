import React from 'react'
import { DebounceInput } from 'react-debounce-input'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface GlobalFilterProps {
  globalFilter: string
  setGlobalFilter: (value: string) => void
}

const ReusableTableGlobalFIlter: React.FC<GlobalFilterProps> = ({
  globalFilter,
  setGlobalFilter,
}) => {
  return (
    <div className="relative flex items-center w-full">
      <div className="relative">
        <DebounceInput
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="p-1 h-9 bg-white"
          placeholder="Rechercher"
        />
        {globalFilter && (
          <XMarkIcon
            className="cursor-pointer absolute right-1 top-1 outline-customRed-50 text-slate-500 hover:text-slate-900"
            onClick={() => setGlobalFilter('')}
            width={28}
            height={28}
          />
        )}
      </div>
    </div>
  )
}

export default ReusableTableGlobalFIlter
