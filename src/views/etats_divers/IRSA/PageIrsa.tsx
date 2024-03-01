import { zodResolver } from '@hookform/resolvers/zod'
import CustomCAlert from '@src/components/CustomAlert'
import SelectFloatingLable from '@src/components/Inputs/SelectFloatingLable'
import ButtonWithIcon from '@src/components/buttons/ButtonWithIcon'
import InlineLoading from '@src/components/loadings/InlineLoading'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import useErrorFormatter from '@src/hooks/useErrorFormatter'
import useFetchIrsa from '@src/hooks/useFetchIrsa'
import { setFormPageIrsa } from '@src/redux/irsa/formPageIrsaReducer'
import axios, { AxiosError } from 'axios'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import formPageIrsaSchema, { IFormPageIrsaSchema } from '../../../schema/formPageIrsaSchema'

type SelectOption = {
  value: number
  label: string
}

const PageIrsa = () => {
  const { data, error: errorIrsa } = useAppSelector((store) => store.formPageIrsa)
  const formIrsaProps = useAppSelector((store) => store.formPageIrsa)
  const formateError = useErrorFormatter()
  const dispatch = useAppDispatch()

  const { irsaData, error, isError, isLoading, refetch } = useFetchIrsa(formIrsaProps)

  const moisOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => {
    const date = new Date()
    date.setMonth(m)
    const mois = format(date, 'MMMM', { locale: fr })
    return { value: m, label: mois }
  })

  const currentYear = new Date().getFullYear()
  const anneOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => ({
    value: currentYear - index,
    label: (currentYear - index).toString(),
  }))

  const handleGenerateIrsa = () => {
    // event.preventDefault()
    if (formIrsaProps.data.mois.value === 0 && formIrsaProps.data.annee.value === 0) {
      const error: AxiosError = new AxiosError('Champs obligatoires (Mois et Annee)')
      dispatch(
        setFormPageIrsa({
          ...formIrsaProps,
          error: error,
        }),
      )
    } else {
      console.log('formIrsaProps', formIrsaProps)
      dispatch(setFormPageIrsa({ ...formIrsaProps, fetchData: true }))
    }
  }

  const handleCloseErrorCard = () => {
    dispatch(setFormPageIrsa({ ...formIrsaProps, error: null }))
  }

  const { register, handleSubmit, setValue, control } = useForm<IFormPageIrsaSchema>({
    resolver: zodResolver(formPageIrsaSchema),
  })

  const handleInputChange = (label: keyof IFormPageIrsaSchema, option: SelectOption) => {
    setValue(label, option)
    dispatch(setFormPageIrsa({ ...data, data: { ...data, [label]: option } }))
  }

  return (
    <div className="flex flex-col">
      {isError && <CustomCAlert color="danger">{formateError(error)}</CustomCAlert>}
      {errorIrsa && (
        <CustomCAlert color="danger" onClose={handleCloseErrorCard}>
          {formateError(errorIrsa)}
        </CustomCAlert>
      )}
      <div className="flex">
        <div className="flex flex-col shadow-sm bg-white rounded-sm">
          <h3 className="bg-customRed-900 text-white text-lg px-4 py-2 capitalize rounded-t-sm">
            Impôt sur les revenus salariaux et assimilés
          </h3>
          <form action="" method="post" onSubmit={handleSubmit(handleGenerateIrsa)}>
            <div className="w-full flex px-4 pb-4 pt-2 justify-between gap-2">
              <div className="w-full">
                <Controller
                  name="mois"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, ...rest },
                    fieldState: { error },
                  }) => (
                    <div>
                      <SelectFloatingLable
                        className="w-full capitalize"
                        label="Mois"
                        placeholder="Mois"
                        {...rest}
                        options={moisOptions}
                        value={data.mois.value}
                        onChange={(newVal: any) =>
                          dispatch(setFormPageIrsa({ ...data, data: { ...data, mois: newVal } }))
                        }
                      />
                      {error && <span className="text-red-500 text-sm">{error.message}</span>}
                    </div>
                  )}
                />
                {/* <SelectFloatingLable
                  className="w-full capitalize"
                  label="Mois"
                  placeholder="Mois"
                  options={moisOptions}
                  value={data.mois}
                  required
                  onChange={(newVal: any) =>
                    dispatch(setFormPageIrsa({ ...data, data: { ...data, mois: newVal } }))
                  }
                /> */}
              </div>

              <div className="w-full">
                <Controller
                  name="annee"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, ref, ...rest },
                    fieldState: { error },
                  }) => {
                    console.log('data', data.annee)
                    console.log('error', error)
                    return (
                      <div>
                        <SelectFloatingLable
                          className="w-full capitalize"
                          label="Année"
                          placeholder="Année"
                          {...rest}
                          ref={ref}
                          options={anneOptions}
                          value={data.annee}
                          onChange={(newVal: any) => handleInputChange('annee', newVal)}
                        />
                        {error && <span className="text-red-500 text-sm">{error.message}</span>}
                      </div>
                    )
                  }}
                />
                {/* <SelectFloatingLable
                  className="w-full capitalize"
                  label="Année"
                  placeholder="Année"
                  options={anneOptions}
                  value={data.annee}
                  required
                  onChange={(newVal: any) =>
                    dispatch(setFormPageIrsa({ ...data, data: { ...data, annee: newVal } }))
                  }
                /> */}
              </div>
              <div className="flex full items-end">
                <ButtonWithIcon label="Générer" type="submit" />
              </div>
              <div className="flex full items-end">
                {isLoading ? (
                  <div>
                    <InlineLoading />
                  </div>
                ) : (
                  <ButtonWithIcon label="Télecharger" />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PageIrsa
