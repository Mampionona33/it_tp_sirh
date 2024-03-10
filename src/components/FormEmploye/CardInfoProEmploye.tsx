import React from 'react'
import { Controller, useController } from 'react-hook-form'
import { ICardInfoProEmployeProps } from '@src/interfaces/interfaceCardInfoProEmploye'
import { useDispatch } from 'react-redux'
import useFetchCategorieEmploye from '@src/hooks/useFetchCategorieEmploye'
import { setFormEmploye } from '@src/redux/FormEmploye/formEmployeReducer'
import { SetValueAction } from 'react-select'
import { CAlert, CCard, CCardBody } from '@coreui/react'
import InputWithFloatingLabel from '@src/components/Inputs/InputFloatingLabel'
import SelectFloatingLable from '../Inputs/SelectFloatingLable'
import { EnumBoolean } from '@src/interfaces/interfaceEmploye'
import useFetchParametre from '../../hooks/useFetchParametre'
import useErrorFormatter from '@src/hooks/useErrorFormatter'

const CardInfoProEmploye: React.FC<ICardInfoProEmployeProps> = ({
  data,
  register,
  formEmployeValidationError,
  control,
  setValue,
}) => {
  const { categorie } = data

  const dispatch = useDispatch()

  const {
    data: parametres,
    isLoading: isLoadingParametres,
    refetch: refetchParametres,
    isError: isErrorParametres,
    error: errorParametres,
    isSuccess: isSuccessParametres,
    isFetching: isFetchingParametres,
  } = useFetchParametre()

  React.useEffect(() => {
    if (categorie) {
      setValue('categorie', categorie)
    }
  }, [categorie, setValue])

  const {
    field: { value: categorieValue, onChange: catOnChange, ...refCategorie },
  } = useController({ name: 'categorie', control: control })

  const formatError = useErrorFormatter()

  // const {
  //   data: categories,
  //   isError: isErrorCategorieEmploye,
  //   error,
  //   isLoading: isLoadingCategorieEmploye,
  // } = useFetchCategorieEmploye()

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target
  //   dispatch(setFormEmploye({ [name]: value }))
  // }

  const handleSelectChange = (newValue: string, action: SetValueAction) => {
    if (action === 'select-option') {
      dispatch(setFormEmploye({ categorie: newValue }))
      catOnChange(newValue, action)
    }
  }

  // if (isErrorCategorieEmploye) {
  //   return <CAlert color="danger">{(error as Error).message}</CAlert>
  // }
  if (isErrorParametres) {
    return <CAlert color="danger">{formatError(errorParametres)}</CAlert>
  }

  return (
    <>
      <CCard className="classeCard">
        <h2 className="classeCardTitle text-customRed-930">Information professionnelles</h2>
        <CCardBody className="classeCardBody">
          <Controller
            control={control}
            name="matricule"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Matricule"
                    required
                    placeholder="Matricule"
                    id="matricule"
                    className="classeInput"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
                    {...rest}
                    // {...register('matricule')}
                    // name="matricule"
                    // value={matricule}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="titre_poste"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Titre du poste"
                    required
                    placeholder="Titre du poste"
                    id="titre_poste"
                    className="classeInput"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                    // {...register('titre_poste')}
                    // name="titre_poste"
                    // value={titre_poste}
                    // onChange={handleInputChange}
                  />
                  {formEmployeValidationError.titre_poste && (
                    <span className="text-red-500 text-sm">
                      {formEmployeValidationError.titre_poste.message}
                    </span>
                  )}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="categorie"
            render={({
              field: { onChange, onBlur, name, value, ...rest },
              fieldState: { error },
            }) => {
              // console.log(value, 'value')
              return (
                <div>
                  <SelectFloatingLable
                    label="Catégorie"
                    placeholder="Categorie"
                    {...rest}
                    value={value ? value : categorieValue}
                    onChange={(e) => handleSelectChange(e as string, 'select-option')}
                    options={parametres?.categorie_salarie || []}
                    isLoading={isLoadingParametres}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="departement"
            render={({
              field: { onChange, onBlur, name, value, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Département"
                    required
                    placeholder="Département"
                    id="departement"
                    className="classeInput"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    // {...register('departement')}
                    // name="departement"
                    // value={departement}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="date_embauche"
            render={({
              field: { onChange, onBlur, name, value, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Date d'embauche"
                    type="date"
                    required
                    placeholder="Date d'embauche"
                    id="date_embauche"
                    className="classeInput"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                    // name="date_embauche"
                    // value={date_embauche}
                    // {...register('date_embauche')}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="lieu_travail"
            render={({
              field: { onChange, onBlur, name, value, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Lieu de travail"
                    required
                    placeholder="Lieu de travail"
                    id="lieu_travail"
                    className="classeInput"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                    // name="lieu_travail"
                    // value={lieu_travail}
                    // {...register('lieu_travail')}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="telephone"
            render={({
              field: { onChange, onBlur, name, value, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Telephone"
                    placeholder="Telephone"
                    id="telephone"
                    className="classeInput"
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                    // name="telephone"
                    // value={telephone}
                    // {...register('telephone')}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="email"
            render={({
              field: { onChange, onBlur, name, value, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Email"
                    type="email"
                    placeholder="Email: employe@example.com"
                    id="email"
                    className="classeInput"
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                    // name="email"
                    // value={email}
                    // {...register('email')}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="travail_de_nuit"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <fieldset id="travail_de_nuit" className="border border-solid border-gray-300 p-3">
                <legend className="text-sm">Travail de nuit</legend>
                <div className="flex gap-1 flex-col">
                  <label htmlFor="travail_de_nuit_oui" className="flex items-center gap-3 text-sm">
                    <input
                      type="radio"
                      id="travail_de_nuit_oui"
                      className="w-3 h-3 text-sm"
                      value={EnumBoolean.OUI}
                      onChange={onChange}
                      onBlur={onBlur}
                      checked={value === EnumBoolean.OUI}
                    />
                    <span>Oui</span>
                  </label>

                  <label htmlFor="travail_de_nuit_non" className="flex gap-3 items-center text-sm">
                    <input
                      type="radio"
                      id="travail_de_nuit_non"
                      className="w-3 h-3 text-sm text-center"
                      value={EnumBoolean.NON}
                      onChange={onChange}
                      onBlur={onBlur}
                      checked={value === EnumBoolean.NON}
                    />
                    <span>Non</span>
                  </label>
                </div>
                {error && <span className="text-red-500 text-sm">{error.message}</span>}
              </fieldset>
            )}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default CardInfoProEmploye
