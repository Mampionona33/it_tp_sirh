import React from 'react'
import InputWithFloatingLabel from '@src/components/Inputs/InputFloatingLabel'
import useFetchParametre from '@src/hooks/useFetchParametre'
import useErrorFormatter from '@src/hooks/useErrorFormatter'
import CustomCAlert from '@src/components/CustomAlert'
import Loading from '@src/components/loadings/Loading'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import ButtonWithIcon from '@src/components/buttons/ButtonWithIcon'
import { zodResolver } from '@hookform/resolvers/zod'

interface IParametrePaie {
  plafondSme?: number
  reductionChargeParEnfant?: number
  cotisations?: {
    name: string
    part_salarie?: number
    part_employeur?: number
  }[]
}

const formParametrePaie: z.ZodType<IParametrePaie> = z.object({
  plafondSme: z
    .number()
    .min(0)
    .optional()
    .refine((value) => value != null && value >= 0, {
      message: 'Veuillez renseigner un plafond SME valide',
    }),
  reductionChargeParEnfant: z
    .number()
    .min(0)
    .optional()
    .refine((value) => value != null && value >= 0, {
      message: 'Veuillez renseigner une valeur valide',
    }),
  cotisations: z
    .array(
      z.object({
        name: z.string(),
        part_salarie: z
          .number()
          .optional()
          .refine((value) => value != null && value >= 0, {
            message: 'Veuillez renseigner une valeur valide',
          }),
        part_employeur: z
          .number()
          .optional()
          .refine((value) => value != null && value >= 0, {
            message: 'Veuillez renseigner une valeur valide',
          }),
      }),
    )
    .optional(),
})

const ParametrePaie = () => {
  const {
    data,
    isError: isErrorFetchParameter,
    isFetching: isFetchingFetchParameter,
    error: errorFetchParameter,
    isSuccess: isSuccessFetchParameter,
  } = useFetchParametre()

  const { handleSubmit, setValue, getValues, control } = useForm<IParametrePaie>({
    resolver: zodResolver(formParametrePaie),
  })

  React.useEffect(() => {
    if (isSuccessFetchParameter && data) {
      console.log(data)
      // Mettre à jour les valeurs du formulaire avec les données de l'API
      setValue('plafondSme', data?.plafond_sme ?? 0)
      setValue('reductionChargeParEnfant', data?.reduction_charge_par_enfant ?? 0)
      setValue('cotisations', data?.cotisations ?? [])
    }
  }, [data, isSuccessFetchParameter, setValue])

  const formatError = useErrorFormatter()

  if (isFetchingFetchParameter) {
    return <Loading />
  }

  if (isErrorFetchParameter) {
    return <CustomCAlert color="danger">{formatError(errorFetchParameter)}</CustomCAlert>
  }

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select()
  }

  return (
    <form action="" className="flex flex-col gap-4">
      <div className="classeCard">
        <h1 className="classeCardTitle">Parametres Paie</h1>
        <div className="classeCardBody grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Controller
            control={control}
            name="plafondSme"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              console.log(value)

              return (
                <div>
                  <InputWithFloatingLabel
                    label="Plafond SME"
                    name="plafondSme"
                    id="plafondSme"
                    placeholder="Plafond SME"
                    type="number"
                    min={0}
                    onChange={onChange}
                    value={value?.toString() || '0'}
                    onFocus={handleFocus}
                  />
                  {error && <span className="text-sm text-customRed-800">{error.message}</span>}
                </div>
              )
            }}
          />
          <Controller
            control={control}
            name="reductionChargeParEnfant"
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <div>
                  <InputWithFloatingLabel
                    label="Reduction pour enfant"
                    name="reductionChargeParEnfant"
                    id="reductionChargeParEnfant"
                    placeholder="Reduction pour enfant"
                    type="number"
                    min={0}
                    onChange={onChange}
                    value={value?.toString() || '0'}
                  />
                  {error && <span className="text-sm text-customRed-800">{error.message}</span>}
                </div>
              )
            }}
          />
          {data?.cotisations?.map((cotisation, index) => (
            <div key={index}>
              <Controller
                control={control}
                name={`cotisations.${index}.part_salarie`}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <InputWithFloatingLabel
                    label={`Cotisation ${cotisation.name} salarie`}
                    name={`cotisations[${index}].part_salarie`}
                    id={`part_salarie_${index}`}
                    placeholder={`Part salarié de ${cotisation.name}`}
                    type="number"
                    min={0}
                    onChange={onChange}
                    value={value?.toString() || '0'}
                  />
                )}
              />
            </div>
          ))}
          {data?.cotisations?.map((cotisation, index) => (
            <div key={index}>
              <Controller
                control={control}
                name={`cotisations.${index}.part_employeur`}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <InputWithFloatingLabel
                    label={`Cotisation ${cotisation.name} employeur`}
                    name={`cotisations[${index}].part_employeur`}
                    id={`part_employeur_${index}`}
                    placeholder={`Part employeur de ${cotisation.name}`}
                    type="number"
                    min={0}
                    onChange={onChange}
                    value={value?.toString() || '0'}
                  />
                )}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="classeCard">
        <div className="classeCardBody">
          {/* <ButtonWithIcon type="submit" label="Enregistrer" /> */}
        </div>
      </div>
    </form>
  )
}

export default ParametrePaie
