import { zodResolver } from '@hookform/resolvers/zod'
import CustomCAlert from '@src/components/CustomAlert'
import SelectFloatingLable from '@src/components/Inputs/SelectFloatingLable'
import ButtonWithIcon from '@src/components/buttons/ButtonWithIcon'
import InlineLoading from '@src/components/loadings/InlineLoading'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import useErrorFormatter from '@src/hooks/useErrorFormatter'
import useFetchOmsi from '@src/hooks/useFecthOmsi'
import { IFormPageOmsi } from '@src/interfaces/interfaceFormPageOmsi'
import { resetFormPageOmsi, setFormPageOmsi } from '@src/redux/formPageOmsi/formPageOmsiReducer'
import formOmsiSchema from '@src/schema/formOmsiSchema'
import React from 'react'
import { Controller, SubmitHandler, useController, useForm } from 'react-hook-form'
import { SetValueAction } from 'react-select'
import BtnDonwloadOmsi from './ BtnDonwloadOmsi'

const PageOmsi = () => {
  const dispatch = useAppDispatch()
  const { annee, periode: storePeriode } = useAppSelector((store) => store.formPageOmsi)
  const formPageOmsi = useAppSelector((store) => store.formPageOmsi)
  const formateError = useErrorFormatter()

  const { omsiData, error, isError, isLoading, refetch, isSuccess, isFetching } =
    useFetchOmsi(formPageOmsi)

  const periode = ['t1', 't2', 't3', 't4'].map((item) => {
    return {
      value: item,
      label: item,
    }
  })

  const currentYear = new Date().getFullYear()
  const anneOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => ({
    value: currentYear - index,
    label: (currentYear - index).toString(),
  }))

  const { handleSubmit, control, getValues, reset } = useForm<IFormPageOmsi>({
    resolver: zodResolver(formOmsiSchema),
    defaultValues: {
      annee: annee,
      periode: storePeriode,
    },
  })

  const {
    field: { value: selectedPeriode, onChange: onChangePeriode },
  } = useController({
    name: 'periode',
    control,
  })

  const {
    field: { value: selectedAnnee, onChange: onChangeAnnee },
  } = useController({
    name: 'annee',
    control,
  })

  const handlePeriodeChange = (newValue: string, action: SetValueAction) => {
    if (action === 'select-option') {
      onChangePeriode(newValue, action)
      dispatch(resetFormPageOmsi())
    }
  }
  const handleAnneeChange = (newValue: string, action: SetValueAction) => {
    if (action === 'select-option') {
      onChangeAnnee(newValue, action)
      dispatch(resetFormPageOmsi())
    }
  }

  const handleGenerateOmsi: SubmitHandler<IFormPageOmsi> = async (
    data: IFormPageOmsi,
  ): Promise<void> => {
    if (!!data) {
      dispatch(setFormPageOmsi({ ...data, fetchData: true }))
    }
  }

  const resetFormOmsiProps = React.useCallback(() => {
    if (isError) {
      dispatch(setFormPageOmsi({ ...formPageOmsi, fetchData: false }))
    }
  }, [isError, omsiData])

  React.useEffect(() => {
    if (isError) {
      resetFormOmsiProps()
    }
  }, [isError, omsiData])

  return (
    <div className="flex flex-col">
      {isError && <CustomCAlert color="danger">{formateError(error)}</CustomCAlert>}
      <div className="flex mt-3">
        <div className="flex flex-col shadow-sm bg-white">
          <h3 className="bg-customRed-900 text-white text-lg px-4 py-2 capitalize rounded-t-sm">
            OMSI
          </h3>
          <form action="" method="post" onSubmit={handleSubmit(handleGenerateOmsi)}>
            <div className="w-full flex px-4 pb-4 pt-2 justify-between gap-2">
              <div className="w-full">
                <Controller
                  name="periode"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, ref, ...rest },
                    fieldState: { error },
                  }) => {
                    return (
                      <div className="w-full min-w-[8rem]">
                        <SelectFloatingLable
                          className="w-full capitalize"
                          label="Période"
                          placeholder="Période"
                          {...rest}
                          options={periode}
                          value={value ? value : selectedPeriode}
                          onChange={(e) => handlePeriodeChange(e as string, 'select-option')}
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
                <ButtonWithIcon label="Générer" type="submit" />
              </div>

              <div className="flex full items-center">
                {isFetching ? (
                  <div className="flex min-w-7 justify-center">
                    <InlineLoading />
                  </div>
                ) : (
                  <BtnDonwloadOmsi data={omsiData} />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PageOmsi
