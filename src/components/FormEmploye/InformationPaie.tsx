import React from 'react'
import InputWithLabel, { IInputWithLabelOptionsProps, IInputWithLabelProps } from './InputWithLable'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'
import useFetchListModeDePayement from '@src/assets/hooks/useFetchListModeDePayement'
import { CAlert } from '@coreui/react'
import useErrorFormatter from '@src/hooks/useErrorFormatter'
import Loading from '../loadings/Loading'

const InformationPaie = () => {
  const dispatch = useAppDispatch()
  const formEmploye = useAppSelector((state) => state.formEmploye)

  const { listModeDePayement, isError, isLoading, errors, refetch } = useFetchListModeDePayement()
  const formatErrorMessage = useErrorFormatter()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = event.target ?? { name: '', value: '' }

    dispatch(
      setFormEmploye({
        ...formEmploye,
        [name]: value,
      }),
    )
  }

  const handleModePaiementChange = (selectedOption: IInputWithLabelOptionsProps) => {
    dispatch(setFormEmploye({ ...formEmploye, mode_paiement_salaire: selectedOption.value }))
  }

  const inputs: IInputWithLabelProps[] = [
    {
      id: 'salaire_de_base',
      label: 'Salaire de base',
      value: formEmploye.salaire_de_base,
      name: 'salaire_de_base',
      type: 'number',
      placeholder: 'Salaire de base',
      min: 0,
      required: true,
    },
    {
      id: 'rib',
      label: 'RIB',
      value: formEmploye.rib,
      name: 'rib',
      type: 'text',
      placeholder: 'RIB',
    },
    {
      id: 'mode_paiement_salaire',
      label: 'Mode de paiement',
      name: 'mode_paiement_salaire',
      type: 'select',
      required: true,
      value: formEmploye.mode_paiement_salaire,
      options: listModeDePayement,
      placeholder: 'Mode de paiement',
      onSelectChange: handleModePaiementChange,
    },
    {
      id: 'num_cnaps',
      label: 'Numéros cnaps',
      value: formEmploye.num_cnaps,
      name: 'num_cnaps',
      type: 'text',
      placeholder: 'Numéros cnaps',
    },
  ]

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {isError ? (
        <CAlert color="danger">{formatErrorMessage(errors)}</CAlert>
      ) : (
        <div className="flex flex-col border-y border-y-customBlue-200 mt-4 shadow-sm py-4">
          <p className="text-lg ml-4 uppercase mx-8 mb-3">Information sur la paie</p>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-0 px-8 w-full">
            {inputs.map((input, index) => (
              <InputWithLabel
                key={index}
                {...input}
                onChange={(event) => handleInputChange(event, index)}
                onInput={(event) => handleInputChange(event, index)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default InformationPaie
