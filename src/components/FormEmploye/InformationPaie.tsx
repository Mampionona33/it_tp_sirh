import React from 'react'
import InputWithLabel, { IInputWithLabelOptionsProps, IInputWithLabelProps } from './InputWithLable'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'
import useFetchListModeDePayement from '@src/hooks/useFetchListModeDePayement'
import { CAlert } from '@coreui/react'
import useErrorFormatter from '@src/hooks/useErrorFormatter'
import Loading from '../loadings/Loading'
import { IInformationPaie } from '@src/interfaces/interfaceInformationPaie'

const InformationPaie = ({ register, formErrors }: IInformationPaie) => {
  const dispatch = useAppDispatch()
  const formEmploye = useAppSelector((state) => state.formEmploye)

  if (formErrors) {
    console.log(formErrors)
  }

  const {
    data: listModeDePayement,
    isError,
    isLoading,
    error,
    refetch,
  } = useFetchListModeDePayement()
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
      register: register,
      registerPath: 'salaire_de_base',
      errorMessage: formErrors?.salaire_de_base?.message,
    },
    {
      id: 'rib',
      label: 'RIB',
      value: formEmploye.rib,
      name: 'rib',
      type: 'text',
      placeholder: 'RIB: 00000 00000 00000000000 00',
      required: true,
      register: register,
      registerPath: 'rib',
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
      errorMessage: formErrors?.mode_paiement_salaire?.message,
      register: register,
      registerPath: 'mode_paiement_salaire',
    },
    {
      id: 'num_cnaps',
      label: 'Numéros cnaps',
      value: formEmploye.num_cnaps,
      name: 'num_cnaps',
      type: 'text',
      placeholder: 'Numéros cnaps',
      register: register,
      registerPath: 'num_cnaps',
      errorMessage: formErrors?.num_cnaps?.message,
    },
  ]

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      {isError ? (
        <CAlert color="danger">{formatErrorMessage(error)}</CAlert>
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
