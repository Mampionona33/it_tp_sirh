import { zodResolver } from '@hookform/resolvers/zod'
import CustomCAlert from '@src/components/CustomAlert'
import SelectFloatingLable from '@src/components/Inputs/SelectFloatingLable'
import ButtonWithIcon from '@src/components/buttons/ButtonWithIcon'
import InlineLoading from '@src/components/loadings/InlineLoading'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import useErrorFormatter from '@src/hooks/useErrorFormatter'
import useFetchIrsa from '@src/hooks/useFetchIrsa'
import { resetFormPageIrsa, setFormPageIrsa } from '@src/redux/irsa/formPageIrsaReducer'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import React, { useCallback, useMemo } from 'react'
import { Controller, SubmitHandler, useController, useForm } from 'react-hook-form'
import formPageIrsaSchema from '../../../schema/formPageIrsaSchema'
import { IPageIrsaState } from '@src/interfaces/intefacePageIrsa'
import { SetValueAction } from 'react-select'
import BtnDownloadIrsa from './BtnDownloadIrsa'
import { irsaProps } from '@src/interfaces/interfaceBtnDownloadIrsaProps'

type SelectOption = {
  value: number
  label: string
}

const PageIrsa = () => {
  const { data, error: errorIrsa } = useAppSelector((store) => store.formPageIrsa)
  const formIrsaProps = useAppSelector((store) => store.formPageIrsa)
  const formateError = useErrorFormatter()
  const dispatch = useAppDispatch()

  const { irsaData, error, isError, isLoading, refetch, isSuccess, isFetching } =
    useFetchIrsa(formIrsaProps)

  const fetchedData = useMemo(() => {
    if (irsaData && formIrsaProps.loading === 'succeeded') {
      return irsaData
    }
    return [] as irsaProps[]
  }, [irsaData, formIrsaProps.loading])

  const moisOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((m) => {
    const date = new Date()
    date.setMonth(m - 1)
    const mois = format(date, 'MMMM', { locale: fr })
    return { value: m, label: mois }
  })

  const currentYear = new Date().getFullYear()
  const anneOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => ({
    value: currentYear - index,
    label: (currentYear - index).toString(),
  }))

  const handleGenerateIrsa: SubmitHandler<IPageIrsaState> = async (
    data: IPageIrsaState,
  ): Promise<void> => {
    if (!!data) {
      console.log(data)
      dispatch(setFormPageIrsa({ ...formIrsaProps, fetchData: true, data }))
    }
  }

  const { handleSubmit, control, getValues, reset } = useForm<IPageIrsaState>({
    resolver: zodResolver(formPageIrsaSchema),
    defaultValues: data,
  })

  const {
    field: { value: selectedMois, onChange: onChangeMois },
  } = useController({
    name: 'mois',
    control,
    rules: { required: true },
  })

  const {
    field: { value: selectedAnnee, onChange: onChangeAnnee },
  } = useController({
    name: 'annee',
    control,
    rules: { required: true },
  })

  const resetFormIrsaProps = React.useCallback(() => {
    if (isError) {
      isSuccess && console.log('success')
      dispatch(resetFormPageIrsa())
      // reset()
    }
    if (isSuccess) {
      dispatch(setFormPageIrsa({ ...formIrsaProps, fetchData: false, loading: 'succeeded' }))
    }
  }, [isError, irsaData])

  React.useEffect(() => {
    let mount = true
    if (isError || isSuccess) {
      resetFormIrsaProps()
    }
    if (mount) {
      resetFormIrsaProps()
    }
    return () => {
      mount = false
    }
  }, [isError, isSuccess])

  const handleMoisChange = (newValue: string, action: SetValueAction) => {
    if (action === 'select-option') {
      // console.log(newValue)
      onChangeMois(newValue, action)
      dispatch(
        setFormPageIrsa({
          ...formIrsaProps,
          loading: 'idle',
        }),
      )
    }
  }

  const handleAnneeChange = (newValue: string, action: SetValueAction) => {
    if (action === 'select-option') {
      console.log(newValue)
      onChangeAnnee(newValue, action)
      dispatch(
        setFormPageIrsa({
          ...formIrsaProps,
          loading: 'idle',
        }),
      )
    }
  }

  return (
    <div className="flex flex-col">
      {isError && <CustomCAlert color="danger">{formateError(error)}</CustomCAlert>}

      <div className="flex mt-3">
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
                    field: { onChange, onBlur, value, ref, ...rest },
                    fieldState: { error },
                  }) => {
                    return (
                      <div className="w-full min-w-[8rem]">
                        <SelectFloatingLable
                          className="w-full capitalize"
                          label="Mois"
                          placeholder="Mois"
                          {...rest}
                          options={moisOptions}
                          value={value ? value : selectedMois}
                          onChange={(e) => handleMoisChange(e as string, 'select-option')}
                        />
                        {error && <span className="text-red-500 text-sm">{error.message}</span>}
                      </div>
                    )
                  }}
                />
              </div>

              <div className="w-full">
                <Controller
                  name="annee"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, ref, ...rest },
                    fieldState: { error },
                  }) => {
                    return (
                      <div className="w-full min-w-[8rem]">
                        <SelectFloatingLable
                          className="w-full capitalize"
                          label="Année"
                          placeholder="Année"
                          {...rest}
                          options={anneOptions}
                          value={value ? value : selectedAnnee}
                          onChange={(e) => handleAnneeChange(e as string, 'select-option')}
                        />
                        {error && <span className="text-red-500 text-sm">{error.message}</span>}
                      </div>
                    )
                  }}
                />
              </div>

              <div className="flex full items-center">
                <ButtonWithIcon
                  label="Générer"
                  type="submit"
                  // disabled={!(getValues('annee') && getValues('mois'))}
                />
              </div>

              <div className="flex full items-center">
                {isFetching ? (
                  <div className="flex min-w-7 justify-center">
                    <InlineLoading />
                  </div>
                ) : (
                  <BtnDownloadIrsa
                    data={fetchedData}
                    mois={getValues('mois')?.label || ''}
                    annee={getValues('annee')?.label || ''}
                  />
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
