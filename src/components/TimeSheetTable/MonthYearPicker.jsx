import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

function MonthYearPicker({ selectedDate, onDateChange }) {
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth())
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear())

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(parseInt(selectedOption.value, 10))
    onDateChange(new Date(selectedYear, parseInt(selectedOption.value, 10), 1))
  }

  const handleYearChange = (selectedOption) => {
    setSelectedYear(parseInt(selectedOption.value, 10))
    onDateChange(new Date(parseInt(selectedOption.value, 10), selectedMonth, 1))
  }

  const months = [
    { label: 'Janvier', value: 0 },
    { label: 'Février', value: 1 },
    { label: 'Mars', value: 2 },
    { label: 'Avril', value: 3 },
    { label: 'Mai', value: 4 },
    { label: 'Juin', value: 5 },
    { label: 'Juillet', value: 6 },
    { label: 'Aout', value: 7 },
    { label: 'Septembre', value: 8 },
    { label: 'Octobre', value: 9 },
    { label: 'Novembre', value: 10 },
    { label: 'Décembre', value: 11 },
  ]

  const customStyles = {
    control: (provided) => ({
      ...provided,
      '::-webkit-scrollbar': {
        display: 'none',
      },
      width: '10rem',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#da200d' : 'inherit',
      color: state.isSelected ? '#fff' : '#57534e',
      ':hover': {
        backgroundColor: '#e7b7b4',
      },
      zIndex: '1000',
    }),
    // menuList: (base) => ({
    //   ...base,

    //   '::-webkit-scrollbar': {
    //     width: '5px',
    //   },
    //   '::-webkit-scrollbar-track': {
    //     background: '#bfc0d3',
    //   },
    //   '::-webkit-scrollbar-thumb': {
    //     background: '#f19088',
    //   },
    //   '::-webkit-scrollbar-thumb:hover': {
    //     background: '#f19088',
    //   },
    // }),
  }

  // Generate an array of years, e.g., from 1901 to the current year
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1900 }, (_, index) => ({
    label: `${1901 + index}`,
    value: 1901 + index,
  }))

  return (
    <div className="flex flex-wrap gap-2">
      <div className="">
        <label className="form-label" htmlFor="month">
          Mois
        </label>
        <Select
          menuPlacement="auto"
          value={months.find((m) => m.value === selectedMonth)} // Set the default value for the month
          onChange={handleMonthChange}
          options={months}
          styles={customStyles}
        />
      </div>
      <div className="">
        <label className="form-label" htmlFor="year">
          Année
        </label>
        <Select
          menuPlacement="auto"
          value={years.find((y) => y.value === selectedYear)} // Set the default value for the year
          onChange={handleYearChange}
          options={years}
          styles={customStyles}
        />
      </div>
    </div>
  )
}

MonthYearPicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onDateChange: PropTypes.func.isRequired,
}

export default MonthYearPicker
