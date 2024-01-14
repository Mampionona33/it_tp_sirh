import React from 'react'
import DnsGenerator from './DnsGenerator'
import Select from 'react-select'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import { setDns } from '@src/redux/dns/dnsReducers'
import CustomSection from '@src/components/CustomSection'

const Body = () => {
  const dispatch = useAppDispatch()
  const { anneeSelectionne: annee, periodSelectionne: periode } = useAppSelector(
    (store) => store.dns,
  )
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      height: 21,
      minHeight: 21,
      border: 'none',
      outline: 'none',
      borderBottom: '1px solid #D6111E',
    }),
    valueContainer: (style) => {
      return {
        ...style,
        paddingTop: 0,
        paddingBottom: 0,
        height: 21,
        minHeight: 21,
      }
    },
    input: (style) => {
      return {
        ...style,
        margin: 0,
        height: 21,
        paddingTop: 0,
        paddingBottom: 0,
        minHeight: 21,
        fontSize: '0.875rem',
      }
    },
    singleValue: (style) => {
      return {
        ...style,
        fontSize: '0.875rem',
      }
    },
    placeholder: (style) => {
      return {
        ...style,
        fontSize: '0.875rem',
      }
    },
    menu: (style) => ({
      ...style,
      fontSize: '0.875rem',
    }),
    indicatorsContainer: (style) => {
      return {
        ...style,
        fontSize: '0.875rem',
        height: 21,
        minHeight: 21,
      }
    },
  }

  const periodesOptions = [
    { value: 't1', label: 'Trimestre 1' },
    { value: 't2', label: 'Trimestre 2' },
    { value: 't3', label: 'Trimestre 3' },
  ]

  const handleInputChange = (selectedOption, actionMeta) => {
    if (actionMeta.name === 'periode') {
      dispatch(setDns({ periodSelectionne: selectedOption.value }))
      //   setPeriode(selectedOption.value)
      //   dispatch(fetchDnsData({ periode: selectedOption.value, annee: annee }))
    } else if (actionMeta.name === 'annee') {
      dispatch(setDns({ anneeSelectionne: Number(selectedOption.value) }))
      //   setAnnee(selectedOption.value)
      //   dispatch(fetchDnsData({ periode: periode, annee: selectedOption.value }))
    }
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => ({
    value: currentYear - index,
    label: (currentYear - index).toString(),
  }))

  return (
    <>
      <form action="post" className="w-full flex flex-col gap-2 p-4">
        <div className="w-full flex flex-row gap-2 justify-between flex-wrap items-end">
          <div>
            <label className="form-label text-sm" htmlFor="periode">
              Période
            </label>
            <Select
              className="basic-multi-select"
              name="periode"
              options={periodesOptions}
              onChange={(selectedOption, actionMeta) =>
                handleInputChange(selectedOption, actionMeta)
              }
              value={periodesOptions.find((option) => option.value === periode)}
              styles={customSelectStyles}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                height: 28,
                colors: {
                  ...theme.colors,
                  primary25: '#FFF2F2',
                  primary: '#FEBABA',
                },
              })}
            />
          </div>
          <div>
            <label className="form-label text-sm" htmlFor="annee">
              Année
            </label>
            <Select
              className="basic-multi-select"
              name="annee"
              options={years}
              onChange={(selectedOption, actionMeta) =>
                handleInputChange(selectedOption, actionMeta)
              }
              value={years.find((option) => option.value === annee)}
              styles={customSelectStyles}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                height: 28,
                colors: {
                  ...theme.colors,
                  primary25: '#FFF2F2',
                  primary: '#FEBABA',
                },
              })}
            />
          </div>
          <div className="flex">
            <DnsGenerator />
          </div>
        </div>
      </form>
    </>
  )
}

const DeclarationCnaps = () => {
  return (
    <div>
      <CustomSection body={<Body />} title="Déclaration nominative de salaires" />
    </div>
  )
}

export default DeclarationCnaps
