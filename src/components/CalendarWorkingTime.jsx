import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { employeeHours } from 'src/db/db' // Assurez-vous d'importer vos données correctement
import PropTypes from 'prop-types'

// Composant pour afficher les données de l'événement
const CustomEventComponent = ({ event }) => {
  return (
    <div className="flex gap-y-px flex-col">
      <p className="bg-primary m-0">Heures normal: {event.normalHours}</p>
      <p className="bg-customRed-900 m-0">Heures supp: {event.overtimeHours}</p>
      <p className="bg-cyan-700 m-0">Heures de nuit: {event.nightShiftHours}</p>
      <p className="bg-yellow-800 m-0">Heures férier: {event.holidayHours}</p>
    </div>
  )
}

CustomEventComponent.propTypes = {
  event: PropTypes.shape({
    normalHours: PropTypes.number,
    overtimeHours: PropTypes.number,
    nightShiftHours: PropTypes.number,
    holidayHours: PropTypes.number,
  }).isRequired,
}

const CalendarWorkingTime = (props) => {
  const localizer = momentLocalizer(moment)
  const [employeeId, setEmployeeId] = useState(null)

  useEffect(() => {
    let isMounted = true

    if (props.id && isMounted) {
      setEmployeeId(props.id)
    }

    return () => {
      isMounted = false
    }
  }, [props.id])

  const employeeNormalHours =
    employeeHours && employeeId
      ? employeeHours.filter((hours) => hours.employee.id === employeeId)
      : []

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = 'transparent'
    return {
      style: {
        backgroundColor,
        color: 'white',
      },
    }
  }

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={employeeNormalHours}
        startAccessor="date"
        endAccessor="date"
        style={{ height: 800 }}
        components={{
          event: CustomEventComponent,
        }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  )
}

CalendarWorkingTime.propTypes = {
  id: PropTypes.number.isRequired,
}

export default CalendarWorkingTime
