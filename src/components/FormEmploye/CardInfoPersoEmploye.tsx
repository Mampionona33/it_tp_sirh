import React from 'react'
import { ICardInfoPersoEmploye } from '@src/interfaces/interfaceCardInfoPersoEmploye'
import { CCard, CCardBody } from '@coreui/react'
import { Controller } from 'react-hook-form'
import InputWithFloatingLabel from '@src/components/Inputs/InputFloatingLabel'
import { EnumGenre } from '@src/interfaces/interfaceEmploye'

const CardInfoPersoEmploye: React.FC<ICardInfoPersoEmploye> = ({
  //   register,
  //   formEmployeValidationError,
  //   setValue,
  control,
}) => {
  //   const dispatch = useDispatch()
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = event.target
    // dispatch(setFormEmploye({ [name]: value }))
  }

  return (
    <>
      <CCard className="classeCard">
        <h2 className="classeCardTitle text-customRed-930">Information personnelles</h2>
        <CCardBody className="classeCardBody grid md:grid-cols-2 gap-y-2 gap-x-3 lg:grid-cols-3 sm:grid-cols-1">
          <Controller
            control={control}
            name="nom"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => (
              <div>
                <InputWithFloatingLabel
                  label="Nom employé *"
                  placeholder="Nom *"
                  id="nom"
                  className="classeInput"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ''}
                  {...rest}
                  // {...register('nom')}
                  // value={data?.nom}
                  // onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  //   setValue('nom', event.target.value)
                  // }
                />
                {error && <span className="text-sm text-customRed-800">{error.message}</span>}
              </div>
            )}
          />

          <Controller
            control={control}
            name="prenom"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Prénom employé"
                    id="prenom"
                    placeholder="Prénom employé"
                    className="classeInput"
                    {...rest}
                    onChange={onChange}
                    value={value || ''}
                    onBlur={onBlur}
                    // {...register('prenom')}
                    // value={data?.prenom}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-sm text-customRed-800">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="adresse"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Adresse *"
                    id="adresse"
                    placeholder="Adresse *"
                    className="classeInput"
                    {...rest}
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    // {...register('adresse')}
                    // value={data?.adresse}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-sm text-customRed-800">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="date_naissance"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Date de naissance *"
                    type="date"
                    id="date_naissance"
                    placeholder="Date de naissance *"
                    className="classeInput"
                    {...rest}
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    // required //il faut desactiver required pour que la validation marche
                    // {...register('date_naissance')}
                    // value={data?.date_naissance}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-sm text-customRed-800">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="lieu_naissance"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Lieu de naissance *"
                    id="lieu_naissance"
                    placeholder="Lieu de naissance *"
                    className="classeInput"
                    {...rest}
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    // {...register('lieu_naissance')}
                    // value={data?.lieu_naissance}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-sm text-customRed-800">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="num_cin"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="N° CIN *"
                    id="num_cin"
                    placeholder="N° CIN: 000.000.000.000"
                    className="classeInput"
                    {...rest}
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    // {...register('num_cin')}
                    // value={data?.num_cin}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-sm text-customRed-800">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="date_delivrance_cin"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Date de délivrance de CIN *"
                    type="date"
                    id="date_delivrance_cin"
                    placeholder="Date de delivrance CIN"
                    className="classeInput"
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    // {...register('date_delivrance_cin')}
                    // value={data?.date_delivrance_cin}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-sm text-customRed-800">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="nom_pere"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Nom du père"
                    id="nom_pere"
                    placeholder="Nom du père"
                    className="classeInput"
                    {...rest}
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    // {...register('nom_pere')}
                    // name="nom_pere"
                    // value={data?.nom_pere}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-sm text-customRed-800">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="nom_mere"
            render={({
              field: { onBlur, onChange, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Nom de la mère"
                    id="nom_mere"
                    placeholder="Nom de la mère"
                    className="classeInput"
                    {...rest}
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    // name="nom_mere"
                    // {...register('nom_mere')}
                    // value={data?.nom_mere}
                    // onChange={handleInputChange}
                  />
                  {error && <span className="text-sm text-customRed-800">{error.message}</span>}
                </div>
              )
            }}
          />

          <Controller
            control={control}
            name="genre"
            render={({ field: { onBlur, onChange, value, ...rest }, fieldState: { error } }) => {
              return (
                <fieldset id="genre" className="border border-solid border-gray-300 p-3">
                  <legend className="text-sm">Genre</legend>
                  <div className="flex gap-1 flex-col">
                    <label htmlFor="genre_masculin" className="flex gap-3 items-center text-sm">
                      <input
                        type="radio"
                        value={EnumGenre.MASCULIN}
                        onChange={onChange}
                        checked={value === EnumGenre.MASCULIN}
                        className="w-3 h-3 text-sm"
                      />
                      <span>Masculin</span>
                    </label>
                    <label htmlFor="genre_feminin" className="flex gap-3 items-center text-sm">
                      <input
                        type="radio"
                        value={EnumGenre.FEMININ}
                        onChange={onChange}
                        checked={value === EnumGenre.FEMININ}
                        className="w-3 h-3 text-sm"
                      />
                      <span>Féminin</span>
                    </label>
                  </div>
                  {error && <span className="text-sm text-customRed-800">{error.message}</span>}
                </fieldset>
              )
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default CardInfoPersoEmploye
