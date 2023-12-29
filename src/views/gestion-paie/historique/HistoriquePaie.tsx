import React, { useMemo } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import ReusableTable from '@src/components/ReusableTable/ReusableTable'
import { format } from 'date-fns'
import ButtonLink, { ButtonLinkVariant } from '@src/components/buttons/ButtonLink'
import { fr } from 'date-fns/locale'
import { IHistoriquePaieProps } from '@src/interfaces/interfaceHistoriquePaie'
import { EnumBoolean } from '@src/interfaces/interfaceEmploye'
import Page404 from '@src/views/pages/page404/Page404'
import useEmployeeExists from '@src/hooks/useEmployeeExists'

interface IHistoriquePaieTableProps extends IHistoriquePaieProps {
  actions?: React.FC[]
}

const HistoriquePaie: React.FC = () => {
  const isEmployeExist = useEmployeeExists()
  const historiquePaiement: IHistoriquePaieProps[] = [
    {
      id: 1,
      id_employe: 1,
      date: '2023-01-24',
      salaire_brut: 1000,
      salaire_net: 900,
      status: EnumBoolean.OUI,
    },
    {
      id: 2,
      id_employe: 1,
      date: '2023-02-22',
      salaire_brut: 1000,
      salaire_net: 900,
      status: EnumBoolean.OUI,
    },
    {
      id: 3,
      id_employe: 1,
      date: '2023-03-23',
      salaire_brut: 1000,
      salaire_net: 900,
      status: EnumBoolean.OUI,
    },
    {
      id: 3,
      id_employe: 1,
      date: '2023-12-23',
      salaire_brut: 1000,
      salaire_net: 900,
      status: EnumBoolean.NON,
    },
  ]

  const columnHelper = createColumnHelper<IHistoriquePaieTableProps>()

  const cols = useMemo<ColumnDef<IHistoriquePaieTableProps>[]>(
    () => [
      columnHelper.accessor('date', {
        cell: (info) => format(new Date(info.getValue()), 'dd MMMM yyyy', { locale: fr }),
        header: () => 'Date',
      }),
      columnHelper.accessor('salaire_brut', {
        cell: (info) => info.getValue(),
        header: () => 'Salaire brut',
      }),
      columnHelper.accessor('salaire_net', {
        cell: (info) => info.getValue(),
        header: () => 'Salaire net',
      }),
      columnHelper.accessor('status', {
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
        header: () => 'Validée',
      }),
      columnHelper.accessor('actions', {
        cell: (info) => {
          if (info.row.original.status === EnumBoolean.OUI) {
            return (
              <div className="flex justify-center">
                <ButtonLink
                  variant={ButtonLinkVariant.Secondary}
                  to={`details/${info.row.original.id}`}
                >
                  Détails
                </ButtonLink>
              </div>
            )
          } else if (info.row.original.status === 'non') {
            return (
              <div className="flex justify-center">
                <ButtonLink to={`valider/${info.row.original.date}`}>Valider</ButtonLink>
              </div>
            )
          }
        },
        header: () => 'Actions',
      }),
    ],
    [columnHelper],
  )

  const DateFilter = () => {
    return (
      <>
        <div className="flex gap-2 flex-row">
          Du
          <div>
            <label htmlFor="dateDepart" className="hidden">
              Date du départ
            </label>
            <input type="date" name="dateDepart" id="dateDepart" />
          </div>
          au
          <div>
            <label htmlFor="dateFin" className="hidden">
              Date fin
            </label>
            <input type="date" name="dateFin" id="dateFin" />
          </div>
        </div>
      </>
    )
  }

  return (
    <div>
      {isEmployeExist ? (
        <ReusableTable
          data={historiquePaiement}
          columns={cols}
          title="Historique de paie"
          headerComponents={<DateFilter />}
        />
      ) : (
        <Page404 />
      )}
    </div>
  )
}

export default HistoriquePaie
