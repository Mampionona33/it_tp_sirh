import React from 'react'
import { EnumGenre } from '@src/interfaces/interfaceEmploye'
import { v4 as uuidV4 } from 'uuid'
import SelectFloatingLable from '../Inputs/SelectFloatingLable'
import { Controller } from 'react-hook-form'
import InputWithFloatingLabel from '@src/components/Inputs/InputFloatingLabel'
import { ICardEnfantEmployeProps } from '@src/interfaces/interfaceCardEnfantEmploye'
import ButtonWithIcon from '../buttons/ButtonWithIcon'
import { XMarkIcon } from '@heroicons/react/24/outline'
import useFetchParametre from '@src/hooks/useFetchParametre'
import CustomCAlert from '../CustomAlert'
import useErrorFormatter from '@src/hooks/useErrorFormatter'

const CardEnfantEmploye: React.FC<ICardEnfantEmployeProps> = ({
  index,
  formEmployeValidationError,
  register,
  control,
  setValue,
  value,
  remove,
  update,
}) => {
  //   const dispatch = useDispatch()
  const handleDeleteEnf = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    // dispatch(formEmployeSupprimerEnfant(data.id))
    remove(Number(index))
  }

  const idNom = uuidV4()
  const certificat = uuidV4()
  const idPrenom = uuidV4()
  const idDateNaissance = uuidV4()
  const idLieuNaissance = uuidV4()
  const idGenreMasculin = uuidV4()
  const idGenreFeminin = uuidV4()
  const idGenre = uuidV4()

  const {
    data: parametres,
    isLoading: isLoadingParametres,
    refetch: refetchParametres,
    isError: isErrorParametres,
    error: errorParametres,
    isSuccess: isSuccessParametres,
    isFetching: isFetchingParametres,
  } = useFetchParametre()

  const formatError = useErrorFormatter()

  // const handleSelectChange = (newValue: CertificatEnfantProps, action: SetValueAction) => {
  //   if (action === 'select-option') {
  //     setValue(`enfant.${index}.certificat` as any, newValue)
  //   }
  // }

  if (isErrorParametres) {
    return <CustomCAlert color="danger">{formatError(errorParametres)}</CustomCAlert>
  }

  return (
    <>
      <div className="max-w-full border border-slate-300 rounded-sm m-3 relative ">
        <ButtonWithIcon
          className="absolute h-[20px] right-0 top-0"
          onClick={handleDeleteEnf}
          icon={<XMarkIcon width={18} height={18} />}
        ></ButtonWithIcon>
        <div className="grid mx-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 p-3">
          <Controller
            control={control}
            name={`enfant.${index}.nom` as any}
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Nom *"
                    placeholder="Nom *"
                    id={idNom}
                    className="classeInput"
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                    // {...register(`enfant.${index}.nom` as any)}
                    // name="nom"
                    // value={value.nom}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name={`enfant.${index}.prenom` as any}
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Prènom"
                    placeholder="Prènom"
                    id={idPrenom}
                    className="classeInput"
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                    // name="prenom"
                    // {...register(`enfant.${index}.prenom` as any)}
                    // value={value.prenom}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name={`enfant.${index}.lieu_naissance` as any}
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Lieu de naissance *"
                    placeholder="Lieu de naissance *"
                    id={idLieuNaissance}
                    className="classeInput"
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                    // {...register(`enfant.${index}.lieu_naissance` as any)}
                    // name="lieu_naissance"
                    // value={data.lieu_naissance}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name={`enfant.${index}.date_naissance` as any}
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Date de naissance *"
                    type="date"
                    id={idDateNaissance}
                    placeholder="Date de naissance"
                    className="classeInput"
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...rest}
                    // name="date_naissance"
                    // value={data.date_naissance}
                    // onChange={handleInputChange}
                    // {...register(`enfant.${index}.date_naissance` as any)}
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          {/**
           * Utilisation de Controller pour intégrer React-select.
           * Controller permet de gérer les champs de formulaire avec React-hook-form.
           * Cela nous permet de synchroniser facilement les valeurs du formulaire avec les composants externes comme React-select.
           */}
          <Controller
            control={control}
            name={`enfant.${index}.certificat` as any}
            render={({
              field: { onBlur, onChange, value, name, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <SelectFloatingLable
                    label="Certificat"
                    placeholder="Certificat"
                    id={certificat}
                    options={parametres?.certificats || []}
                    value={value}
                    {...rest}
                    ref={ref}
                    onBlur={onBlur}
                    onChange={onChange}
                    isLoading={isFetchingParametres}
                    // name="certificat"
                    // onChange={(newValue) => handleChange(newValue)} // Utiliser la fonction handleChange
                  />
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />

          <fieldset id={idGenre} className="border border-solid border-gray-300 p-3">
            <legend className="text-sm">Genre</legend>
            <div className="flex gap-1 flex-col">
              <label htmlFor={idGenreMasculin} className="flex gap-3 items-center text-sm">
                <input
                  type="radio"
                  {...register(`enfant.${index}.genre_enfant` as any)}
                  id={idGenreMasculin}
                  className="w-3 h-3 text-sm"
                  value={EnumGenre.MASCULIN}
                  // name={`genre_enfant_${data.id}`}
                  // checked={data.genre_enfant === EnumGenre.MASCULIN}
                  // onChange={handleInputChange}
                />
                <span>Masculin</span>
              </label>
              <label htmlFor={idGenreFeminin} className="flex gap-3 items-center text-sm">
                <input
                  type="radio"
                  id={idGenreFeminin}
                  {...register(`enfant.${index}.genre_enfant` as any)}
                  className="w-3 h-3 text-sm"
                  value={EnumGenre.FEMININ}
                  // name={`genre_enfant_${data.id}`}
                  // onChange={handleInputChange}
                  // checked={data.genre_enfant === EnumGenre.FEMININ}
                />
                <span>Féminin</span>
              </label>
            </div>
          </fieldset>
        </div>
      </div>
    </>
  )
}

export default CardEnfantEmploye
