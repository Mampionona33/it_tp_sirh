import React, { useState, useEffect } from 'react'
import CustomSection from 'src/components/CustomSection/'
import Select from 'react-select'
import { selectCustomStyles } from 'src/scss/selectCustomStyles'
import DnsGen from './DnsGen'
import { useDispatch, useSelector } from 'react-redux'
import { resetDns, setDns } from 'src/redux/dns/dnsReducers'
import { useLocation } from 'react-router-dom'
import { fetchDnsData } from 'src/redux/dns/dnsActions'

const DeclarationCnaps = () => {
  const Body = () => {
    const location = useLocation()
    const pathName = location.pathname
    const dispatch = useDispatch()
    const dns = useSelector((state) => state.dns)
    const dsnData = useSelector((state) => state.dns.dsnData)
    const loading = useSelector((state) => state.dns.loading)

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

      const handleBeforeUnload = (event) => {
        localStorage.setItem('dns', JSON.stringify(dns))
      }

      console.log('test', typeof dsnData, dsnData, initialPeriode, initialAnnee)

      if (dsnData === null && initialPeriode && initialAnnee && loading !== 'succeeded') {
        console.log('Dispatching fetchDnsData...')
        dispatch(fetchDnsData({ periode: initialPeriode, annee: initialAnnee }))
      } else {
        console.log('Conditions not met, skipping fetchDnsData dispatch.')
      }

      window.addEventListener('beforeunload', handleBeforeUnload)

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
        if (pathName !== '/etatDivers/cnaps') {
          dispatch(resetDns())
          localStorage.removeItem('dns')
        }
      }
    }, [dispatch, pathName, dns, initialPeriode, initialAnnee, dsnData, loading])

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

    return (
      <>
        <form className="w-full flex flex-col gap-2 p-4">
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
                styles={selectCustomStyles}
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
                styles={selectCustomStyles}
              />
            </div>
            <div className="flex">
              <DnsGen />
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
