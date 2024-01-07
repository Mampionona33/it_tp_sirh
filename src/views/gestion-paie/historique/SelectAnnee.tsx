import React, { useState } from 'react'
import Select from 'react-select'

interface YearOption {
  label: string
  value: number
}

export interface SelectAnneeProps {
  selectedDate: Date
  onDateChange: (date: Date) => void
}

const SelectAnnee: React.FC<SelectAnneeProps> = ({ selectedDate, onDateChange }) => {
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear())

  // Generate an array of years, e.g., from 1901 to the current year
  const currentYear = new Date().getFullYear()
  const years: YearOption[] = Array.from({ length: currentYear - 1900 }, (_, index) => ({
    label: `${1901 + index}`,
    value: 1901 + index,
  }))

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      height: 21,
      minHeight: 21,
      border: 'none',
      outline: 'none',
      borderBottom: '1px solid #D6111E',
    }),
    valueContainer: (style) => ({
      ...style,
      paddingTop: 0,
      paddingBottom: 0,
      height: 21,
      minHeight: 21,
    }),
    input: (style) => ({
      ...style,
      margin: 0,
      height: 21,
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: 21,
      fontSize: '0.875rem',
    }),
    singleValue: (style) => ({
      ...style,
      fontSize: '0.875rem',
    }),
    placeholder: (style) => ({
      ...style,
      fontSize: '0.875rem',
    }),
    menu: (style) => ({
      ...style,
      fontSize: '0.875rem',
    }),
    indicatorsContainer: (style) => ({
      ...style,
      fontSize: '0.875rem',
      height: 21,
      minHeight: 21,
    }),
  }

  return (
    <div>
      <Select
        menuPlacement="auto"
        value={years.find((y) => y.value === selectedYear)}
        onChange={(selectedOption: YearOption) => {
          setSelectedYear(selectedOption.value)
          onDateChange(new Date(selectedOption.value, 1))
        }}
        options={years}
        styles={customSelectStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          height: 28,
          colors: {
            ...theme.colors,
            primary25: '#FFF2F2',
            primary: '#FEBABA',
          },
        })}
      />
    </div>
  )
}

export default SelectAnnee
