import React, { useMemo } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import ReusableTable from '@src/components/ReusableTable/ReusableTable'
import { format } from 'date-fns'
import ButtonLink, { ButtonLinkVariant } from '@src/components/buttons/ButtonLink'
import { fr } from 'date-fns/locale'

interface IHistoriquePaieProps {
  id: number
  date: string
  salaire_brut: number
  salaire_net: number
  status: string
}

interface IHistoriquePaieTableProps extends IHistoriquePaieProps {
  actions?: React.FC[]
}

const HistoriquePaie: React.FC = () => {
  const historiquePaiement: IHistoriquePaieProps[] = [
    { id: 1, date: '2023-01-24', salaire_brut: 1000, salaire_net: 900, status: 'oui' },
    { id: 2, date: '2023-02-22', salaire_brut: 1000, salaire_net: 900, status: 'oui' },
    { id: 3, date: '2023-03-23', salaire_brut: 1000, salaire_net: 900, status: 'oui' },
    { id: 3, date: '2023-12-23', salaire_brut: 1000, salaire_net: 900, status: 'non' },
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
        cell: (info) => info.getValue(),
        header: () => 'Validée',
      }),
      columnHelper.accessor('actions', {
        cell: (info) => {
          if (info.row.original.status === 'oui') {
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
                <ButtonLink to={`valider/${info.row.original.id}`}>Valider</ButtonLink>
              </div>
            )
          }
        },
        header: () => 'Actions',
      }),
    ],
    [columnHelper],
  )

  return (
    <div>
      <ReusableTable data={historiquePaiement} columns={cols} title="Historique de paie" />
    </div>
  )
}

export default HistoriquePaie
