import React from 'react'
import { ICardInfoPaieEmployeProps } from '@src/interfaces/interfaceCardInfoPaieEmploye'
import { useDispatch } from 'react-redux'
import { Controller, useController } from 'react-hook-form'
import { SetValueAction } from 'react-select'
import { CCard, CCardBody } from '@coreui/react'
import InputWithFloatingLabel from '@src/components/Inputs/InputFloatingLabel'
import SelectFloatingLable from '@src/components/Inputs/SelectFloatingLable'
import useFetchParametre from '@src/hooks/useFetchParametre'
import CustomCAlert from '../CustomAlert'
import useErrorFormatter from '@src/hooks/useErrorFormatter'

const CardInfoPaieEmploye: React.FC<ICardInfoPaieEmployeProps> = ({
  data,
  register,
  formEmployeValidationError,
  control,
  setValue,
  getValues,
}) => {
  // const dispatch = useDispatch()
  const formatError = useErrorFormatter()

  const {
    data: parametres,
    isError: isErrorParametres,
    error: errorParametres,
    isFetching: isFetchingParametres,
  } = useFetchParametre()

  const modeDePaiement = data?.mode_paiement_salaire

  React.useEffect(() => {
    if (data.mode_paiement_salaire) {
      setValue('mode_paiement_salaire', data.mode_paiement_salaire)
    }
    const isVirementBancaireOptionAvailable = parametres?.mode_de_payement?.some(
      (option) => option.label === 'Virement bancaire',
    )

    // Définir la valeur par défaut en fonction de la disponibilité de "Virement bancaire"
    const defaultValue = isVirementBancaireOptionAvailable
      ? parametres?.mode_de_payement.find((option) => option.label === 'Virement bancaire')
      : ''

    // Vérifiez si defaultValue est défini et n'est pas une chaîne vide
    if (defaultValue && typeof defaultValue !== 'string') {
      // Utilisez defaultValue pour définir la valeur par défaut du mode de paiement
      setValue('mode_paiement_salaire', defaultValue)
    }
  }, [setValue, data.mode_paiement_salaire, modeDePaiement, parametres])

  const {
    field: { value: selectedModeDePaiment, onChange: onChangeModeDePaiement },
  } = useController({
    name: 'mode_paiement_salaire',
    control: control,
  })

  const handleSelectChange = (newValue: string, action: SetValueAction) => {
    if (action === 'select-option') {
      onChangeModeDePaiement(newValue, action)
      // dispatch(setFormEmploye({ mode_paiement_salaire: newValue }))
    }
  }

  const handleFocusInputTypeNumber = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select()
  }

  if (isErrorParametres) {
    return <CustomCAlert color="danger">{formatError(errorParametres)}</CustomCAlert>
  }

  return (
    <>
      <CCard className="classeCard">
        <h2 className="classeCardTitle text-customRed-930">Information sur la paie</h2>
        <CCardBody className="classeCardBody grid md:grid-cols-2 gap-y-2 gap-x-3 lg:grid-cols-3 sm:grid-cols-1">
          <Controller
            control={control}
            name="salaire_de_base"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Salaire de base *"
                    type="number"
                    min={0}
                    placeholder="Salaire de base *"
                    id="salaire_de_base"
                    className="classeInput"
                    onFocus={handleFocusInputTypeNumber}
                    value={value ? value.toString() : ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    {...rest}
                    // {...register('salaire_de_base')}
                    // name="salaire_de_base"
                    // value={data.salaire_de_base}
                    // onChange={handleInputChange}
                    // onFocus={handleFocusInputTypeNumber}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="rib"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              console.log(value, 'value')
              const formattedValue = value === null || value === undefined ? '' : value
              return (
                <div>
                  <InputWithFloatingLabel
                    label="RIB"
                    placeholder="RIB: 00000 00000 00000000000 00"
                    id="rib"
                    className="classeInput"
                    value={formattedValue}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    {...rest}
                    // name="rib"
                    // {...register('rib')}
                    // value={data.rib}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="num_cnaps"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Numero CNAPS"
                    placeholder="Numero CNAPS"
                    id="num_cnaps"
                    className="classeInput"
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    {...rest}
                    // name="num_cnaps"
                    // {...register('num_cnaps')}
                    // value={data.num_cnaps}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            name="mode_paiement_salaire"
            control={control}
            render={({ field: { onChange, onBlur, value, ...rest }, fieldState: { error } }) => {
              return (
                <div>
                  <SelectFloatingLable
                    {...rest}
                    required
                    label="Mode de paiement"
                    placeholder="Mode de paiement"
                    options={parametres?.mode_de_payement ? parametres?.mode_de_payement : []}
                    value={value}
                    onBlur={onBlur}
                    onChange={(e) => handleSelectChange(e as string, 'select-option')}
                    isLoading={isFetchingParametres}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default CardInfoPaieEmploye
