import React from 'react'
import SelectFloatingLable from '@src/components/Inputs/SelectFloatingLable'
import ButtonWithIcon from '@src/components/buttons/ButtonWithIcon'
import InlineLoading from '@src/components/loadings/InlineLoading'
import { Controller, SubmitHandler, useController, useForm } from 'react-hook-form'
import { SetValueAction } from 'react-select'
import useFetchDns from '@src/hooks/useFetchDns'
import { IPageDnsProps } from '@src/interfaces/interfacePageCnaps'
import useErrorFormatter from '@src/hooks/useErrorFormatter'
import CustomCAlert from '@src/components/CustomAlert'
import { useAppDispatch } from '@src/hooks/useAppDispatch'
import { IDnsState, setDns } from '@src/redux/dns/dnsReducers'
import DnsGenerator from './DnsGenerator'
import useFetchParametre from '@src/hooks/useFetchParametre'
import { ICotisationParametre } from '@src/interfaces/interfaceParametre'
import formDnsSchema from '@src/schema/formDnsSchema'
import { zodResolver } from '@hookform/resolvers/zod'

const DeclarationCnaps = () => {
  const dispatch = useAppDispatch()
  const [state, setState] = React.useState<IPageDnsProps>({
    annee: undefined,
    periode: undefined,
    fetchData: false,
  })

  const formatError = useErrorFormatter()

  const periode = ['t1', 't2', 't3', 't4'].map((item) => {
    return {
      value: item,
      label: item,
    }
  })
  const {
    data: dnsData,
    error: dnsError,
    isError: isDnsError,
    isLoading: dnsIsLoading,
    refetch: dnsRefetch,
    isFetching: dnsIsFetching,
  } = useFetchDns({ annee: state.annee, periode: state.periode, fetchData: state.fetchData })

  const {
    data: parametreData,
    error: parametreError,
    isError: isParametreError,
    isLoading: parametreIsLoading,
    refetch: parametreRefetch,
    isFetching: parametreIsFetching,
  } = useFetchParametre()

  const currentYear = new Date().getFullYear()
  const anneOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => ({
    value: currentYear - index,
    label: (currentYear - index).toString(),
  }))

  const { handleSubmit, control, getValues, reset } = useForm<Partial<IPageDnsProps>>({
    resolver: zodResolver(formDnsSchema),
    defaultValues: {
      annee: undefined,
      periode: undefined,
    },
  })

  const {
    field: { value: selectedPeriode, onChange: onChangePeriode },
  } = useController({
    name: 'periode',
    control,
    defaultValue: undefined,
  })

  const {
    field: { value: selectedAnnee, onChange: onChangeAnnee },
  } = useController({
    name: 'annee',
    control,
    defaultValue: undefined,
  })

  const handleGenerateDns: SubmitHandler<Partial<IPageDnsProps>> = async ({
    annee,
    periode,
  }: Partial<IPageDnsProps>): Promise<void> => {
    if (!!annee && !!periode) {
      setState({ ...state, fetchData: true })
    }
  }

  const handlePeriodeChange = (
    newValue: { value: string; label: string },
    action: SetValueAction,
  ) => {
    if (action === 'select-option') {
      onChangePeriode(newValue, action)
      console.log(newValue)
      setState({ ...state, periode: newValue.value as any, fetchData: false, error: undefined })
      dispatch(
        setDns({
          periodSelectionne: newValue.value,
          dnsData: null,
          loading: 'idle',
        } as IDnsState),
      )
    }
  }

  const handleAnneeChange = (
    newValue: { value: number; label: string },
    action: SetValueAction,
  ) => {
    if (action === 'select-option') {
      onChangeAnnee(newValue, action)
      setState({ ...state, annee: newValue.value as any, fetchData: false, error: undefined })
      dispatch(
        setDns({
          anneeSelectionne: newValue.value,
          dnsData: null,
          loading: 'idle',
        } as IDnsState),
      )
    }
  }

  React.useEffect(() => {
    if (dnsData && state.fetchData) {
      console.log(dnsData, state)
      if (dnsData.travailleur && dnsData.travailleur.length > 0) {
        dispatch(setDns({ dnsData, loading: 'idle' } as IDnsState))
        setState({ ...state, fetchData: false })
      } else {
        dispatch(setDns({ dnsData: null, loading: 'idle' } as IDnsState))
        setState({ ...state, fetchData: false, error: 'Ressource introuvable' })
      }
    }

    if (dnsError && state.fetchData) {
      setState({ ...state, fetchData: false })
    }
  }, [dnsData, dispatch, state, dnsError])

  return (
    <div className="flex flex-col">
      {isDnsError && <CustomCAlert color="danger">{formatError(dnsError)}</CustomCAlert>}
      {isParametreError && (
        <CustomCAlert color="danger">{formatError(parametreError)}</CustomCAlert>
      )}
      {state.error && <CustomCAlert color="danger">{state.error}</CustomCAlert>}
      <div className="flex mt-3">
        <div className="flex flex-col shadow-sm bg-white">
          <h3 className="bg-customRed-900 text-white text-lg px-4 py-2 capitalize rounded-t-sm">
            Déclaration nominative de salaires
          </h3>
          <form action="" method="post" onSubmit={handleSubmit(handleGenerateDns)}>
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
                          value={value}
                          onChange={(e) =>
                            handlePeriodeChange(
                              e as { value: string; label: string },
                              'select-option',
                            )
                          }
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
                    field: { onChange, onBlur, value, ...rest },
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
                          value={value}
                          onChange={(e) =>
                            handleAnneeChange(
                              e as { value: number; label: string },
                              'select-option',
                            )
                          }
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
                {dnsIsFetching ? (
                  <div className="flex min-w-7 justify-center">
                    <InlineLoading />
                  </div>
                ) : (
                  <DnsGenerator
                    plafondSme={parametreData?.plafond_sme || 1910400}
                    tauxCnaps={
                      parametreData?.cotisations.find(
                        (c: ICotisationParametre) => c.name === 'cnaps',
                      ) || { name: '', part_employeur: 0, part_salarie: 0 }
                    }
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

export default DeclarationCnaps
