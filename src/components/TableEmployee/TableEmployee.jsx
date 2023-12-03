import React from 'react'
import TableEmployeeDataTable from './TableEmployeeDataTable'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

export default function TableEmployee() {
  /**
   * Pour assurer la stabilité des données dans la table,
   * il est nécessaire d'isoler les données à envoyer en les formatant
   * en dehors du composant TableEmployeeDataTable.
   * @tanstack/react-table ne gère pas efficacement les changements fréquents d'état.
   * Ainsi, les données sont formatées une fois et transmises en tant que propriétés (props)
   * pour maintenir la constance des données à l'intérieur de la table.
   */

  const listEmploye = useSelector((state) => state.employeesList.list)
  const employeeData =
    listEmploye && listEmploye.length > 0
      ? listEmploye.map((item) => ({
          ...item,
          fullName: item.nom + ' ' + item.prenom,
          // dateEmbauche: format(new Date(item.dateEmbauche), ' dd MMM yyyy'),
          cadre: item.cadre ? 'Oui' : '',
        }))
      : []

  return (
    <div className="border shadow-sm overflow-hidden">
      <div>
        <TableEmployeeDataTable data={employeeData} />
      </div>
    </div>
  )
}
