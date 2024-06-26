import React from 'react'
import { ICardResiliationContratProps } from '@src/interfaces/interfaceCardResiliationContrat'
import { useDispatch } from 'react-redux'
import useMutateSalarie from '@src/hooks/useMutateSalarie'
import { CCard, CCardBody, CCardFooter, CCardText } from '@coreui/react'
import { format } from 'date-fns'
import { Controller } from 'react-hook-form'
import ButtonWithIcon from '../buttons/ButtonWithIcon'

const CardResiliationContrat: React.FC<ICardResiliationContratProps> = ({
  control,
  handleSubmit,
  register,
  formEmployeValidationError,
  setValue,
  getValue,
  reset,
  id,
}) => {
  const dateDepart = getValue('depart.date')
  React.useEffect(() => {
    let mount = true
    if (mount) {
      setValue('depart', undefined)
    }
    if (!dateDepart) {
      setValue('depart.date', format(new Date(), 'yyyy-MM-dd'))
    }
    return () => {
      mount = false
    }
  }, [dateDepart, setValue, getValue, reset])

  return (
    <>
      <CCard>
        <h2 className="classeCardTitle text-customRed-930">Résiliation du contrat</h2>
        <CCardBody className="p-3 flex flex-col gap-3">
          <CCardText className="text-sm text-customRed-930">
            {`Veuillez confirmer la résiliation en saisissant les informations suivantes: nom,
            matricule de l'employe, ainsi que le motif de la resiliation. Merci de noter que cette
            action et irréversible. Assurez-vous de suivre le format suivant:`}
            <strong>nom matricule</strong>.
          </CCardText>

          <Controller
            name="depart.date"
            control={control}
            render={({
              field: { onChange, onBlur, value, ref, ...rest },
              fieldState: { error },
            }) => {
              const formatedValue =
                value === null || value === undefined ? '' : format(new Date(), 'yyyy-MM-dd')
              return (
                <div className="w-1/3">
                  <label htmlFor="date" className="visually-hidden">
                    date
                  </label>
                  <input
                    type="hidden"
                    id="date"
                    ref={ref}
                    onChange={onChange}
                    value={formatedValue}
                  />
                </div>
              )
            }}
          />

          <Controller
            name="depart.nom_matricule"
            control={control}
            render={({
              field: { onChange, onBlur, value, ref, ...rest },
              fieldState: { error },
            }) => {
              return (
                <div className="w-1/3">
                  <label htmlFor="nom_matricule" className="visually-hidden">
                    nom et matricule
                  </label>
                  <div>
                    <input
                      type="text"
                      id="nom_matricule"
                      placeholder="Nom matricule"
                      {...rest}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value || ''}
                      ref={ref}
                      // name="nom_matricule"
                      // value={value!.nom_matricule}
                      // {...register('depart.nom_matricule')}
                      required
                      className="border text-sm p-2 h-[28px] w-full outline-customRed-930"
                    />
                    {error && <span className="text-red-500 text-sm">{error.message}</span>}
                  </div>
                </div>
              )
            }}
          />

          <Controller
            name="depart.motif"
            control={control}
            render={({ field: { onChange, onBlur, value, ...rest }, fieldState: { error } }) => {
              return (
                <div>
                  <textarea
                    {...rest}
                    id="motif"
                    rows={3}
                    placeholder="Motif de la resiliation du contrat"
                    required
                    className="border outline-customRed-930 text-sm p-1 w-full"
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    // {...register('depart.motif')}
                    // name="motif"
                    // value={data.depart?.motif}
                    // onChange={handleTexteAreaChange}
                  ></textarea>
                  {error && <span className="text-red-500 text-sm">{error.message}</span>}
                </div>
              )
            }}
          />
        </CCardBody>
        <CCardFooter className="flex justify-end">
          <ButtonWithIcon label="Résilier" type="submit" name="submit-resiliation" />
        </CCardFooter>
      </CCard>
    </>
  )
}

export default CardResiliationContrat
