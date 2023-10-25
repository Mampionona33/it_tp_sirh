import React from 'react'
import PropTypes from 'prop-types'
import { employeeHours } from 'src/db/db'
import { createColumnHelper } from '@tanstack/react-table'
import DataTable from 'src/components/DataTable'
import { CContainer } from '@coreui/react'
import { format, parseISO } from 'date-fns'

const NormalHours = (props) => {
  const columnHelper = createColumnHelper()
  const [employeeId, setEmployeeId] = React.useState(null)

  React.useEffect(() => {
    let mount = true
    if (props.id) {
      if (mount) {
        setEmployeeId(props.id)
      }
    }
    return () => {
      mount = false
    }
  }, [props.id])

  const employeeNormalHours =
    employeeHours && employeeId
      ? employeeHours.filter((hours) => hours.employee.id === employeeId)
      : []

  const columns = [
    columnHelper.accessor('date', {
      cell: (info) => format(parseISO(info.getValue()), 'dd/MM/yyyy'),
      header: () => 'Date',
    }),
    columnHelper.accessor('normalHours', {
      cell: (info) => info.getValue(),
      header: () => "Nombre d'heures ",
    }),
  ]

  return (
    <>
      <CContainer lg>
        <CContainer md>
          <DataTable title="Heures normal" data={employeeNormalHours} columns={columns} />
        </CContainer>
      </CContainer>
    </>
  )
}
NormalHours.propTypes = {
  id: PropTypes.number.isRequired,
}

export default NormalHours
