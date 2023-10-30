import React, { useState } from 'react'
import PropTypes from 'prop-types'

function MonthYearPicker({ selectedDate, onDateChange }) {
  const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth())
  const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear())

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10))
    onDateChange(new Date(selectedYear, parseInt(event.target.value, 10), 1))
  }

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10))
    onDateChange(new Date(parseInt(event.target.value, 10), selectedMonth, 1))
  }

  const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mais',
    'Juin',
    'Juillet',
    'Aout',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ]

  // Generate an array of years, e.g., from 1901 to the current year
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1900 }, (_, index) => 1901 + index)

  return (
    <div>
      <select value={selectedMonth} onChange={handleMonthChange}>
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
      <select value={selectedYear} onChange={handleYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  )
}

MonthYearPicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onDateChange: PropTypes.func.isRequired,
}

export default MonthYearPicker
