import React, { useState, useEffect } from 'react'
import CustomSection from 'src/components/CustomSection/'
import Select from 'react-select'
import { selectCustomStyles } from 'src/scss/selectCustomStyles'
// import DnsGen from './DnsGen'
import { useDispatch, useSelector } from 'react-redux'
import { setDns } from 'src/redux/dns/dnsReducers'
import { useLocation } from 'react-router-dom'
import { fetchDnsData } from 'src/redux/dns/dnsActions'
// import { addNotification } from 'src/redux/notificationStack/notificationStackReducer'
import DnsGenerator from './DnsGenerator'

const DeclarationCnaps = () => {
  const Body = () => {
    const location = useLocation()
    const pathName = location.pathname
    const dispatch = useDispatch()
    const dns = useSelector((state) => state.dns)
    const dsnData = useSelector((state) => state.dns.dsnData)
    const loading = useSelector((state) => state.dns.loading)
    const periodSelectionne = useSelector((state) => state.dns.periodSelectionne)
    const anneeSelectionne = useSelector((state) => state.dns.anneeSelectionne)

    // Local state to hold initial values
    const [initialPeriode, setInitialPeriode] = useState('t1')
    const [initialAnnee, setInitialAnnee] = useState(new Date().getFullYear())

    // Local state for dynamic rendering
    const [periode, setPeriode] = useState(initialPeriode)
    const [annee, setAnnee] = useState(initialAnnee)

    const periodesOptions = [
      { value: 't1', label: 'Trimestre 1' },
      { value: 't2', label: 'Trimestre 2' },
      { value: 't3', label: 'Trimestre 3' },
    ]

    useEffect(() => {
      setInitialPeriode(dns?.periodSelectionne || 't1')
      setInitialAnnee(dns?.anneeSelectionne || new Date().getFullYear())

      setPeriode(dns?.periodSelectionne || 't1')
      setAnnee(dns?.anneeSelectionne || new Date().getFullYear())
    }, [dispatch, pathName, dns, initialPeriode, initialAnnee, dsnData, loading])

    useEffect(() => {
      dispatch(fetchDnsData({ periode: periodSelectionne, annee: anneeSelectionne }))
    }, [dispatch, periodSelectionne, anneeSelectionne])

    // Générer la liste d'années de 1900 à l'année actuelle
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => ({
      value: currentYear - index,
      label: (currentYear - index).toString(),
    }))

    const handleInputChange = (selectedOption, actionMeta) => {
      if (actionMeta.name === 'periode') {
        dispatch(setDns({ ...dns, periodSelectionne: selectedOption.value }))
        setPeriode(selectedOption.value)
        dispatch(fetchDnsData({ periode: selectedOption.value, annee: annee }))
      } else if (actionMeta.name === 'annee') {
        dispatch(setDns({ ...dns, anneeSelectionne: selectedOption.value }))
        setAnnee(selectedOption.value)
        dispatch(fetchDnsData({ periode: periode, annee: selectedOption.value }))
      }
    }

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

    return (
      <>
        <form action="post" className="w-full flex flex-col gap-2 p-4">
          <div className="w-full flex flex-row gap-2 justify-between flex-wrap items-end">
            <div>
              <label className="form-label" htmlFor="periode">
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
              <label className="form-label" htmlFor="annee">
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
              {/* <DnsGen /> */}
              <DnsGenerator />
            </div>
          </div>
        </form>
      </>
    )
  }

  return (
    <>
      <CustomSection body={<Body />} title="Déclaration nominative de salaires" />
    </>
  )
}

export default DeclarationCnaps
