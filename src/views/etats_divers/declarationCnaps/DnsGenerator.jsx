import React, { useCallback, useEffect, useMemo } from 'react'
import ExcelJS from 'exceljs'
import EmployerWorksheet from './EmployerWorksheet'
import MonthWorksheet from './MonthWorksheet'
import { useDispatch, useSelector } from 'react-redux'
import * as FileSaver from 'file-saver'
import { fetchDnsData } from 'src/redux/dns/dnsActions'

const DnsGenerator = () => {
  const dispatch = useDispatch()
  const wb = new ExcelJS.Workbook()
  const employerSheet = new EmployerWorksheet(wb)

  const anneeSelectionne = useSelector((store) => store.dns.anneeSelectionne)
  const periodSelectionne = useSelector((store) => store.dns.periodSelectionne)
  const dnsData = useSelector((store) => store.dns.dnsData)
  const listSalaries = dnsData && dnsData.length > 0 && dnsData[0].travailleurs

  const mois1Sheet = new MonthWorksheet(wb, 'Mois 1', 'ffff00')
  const [listSalarieMois1, setListSalarieMois1] = React.useState([])

  const verifySalariesExist = useCallback(() => {
    return listSalaries && listSalaries.length > 0
  }, [listSalaries])

  const formatPeriod = useCallback(() => {
    switch (periodSelectionne) {
      case 't1':
        return '01-' + anneeSelectionne
      case 't2':
        return '04-' + anneeSelectionne
      case 't3':
        return '07-' + anneeSelectionne
      default:
        return ''
    }
  }, [anneeSelectionne, periodSelectionne])

  const getListSalarieMois1 = useCallback(() => {
    const mois1List = ['janvier', 'avril', 'juillet']
    if (verifySalariesExist()) {
      const listSalMois1 = listSalaries.filter((salarie) => mois1List.includes(salarie.mois))
      setListSalarieMois1(listSalMois1)
    }
  }, [listSalaries, verifySalariesExist])

  useEffect(() => {
    if (anneeSelectionne && periodSelectionne) {
      dispatch(fetchDnsData({ annee: anneeSelectionne, periode: periodSelectionne }))
    }
  }, [anneeSelectionne, periodSelectionne, dispatch])

  useEffect(() => {
    if (listSalaries) {
      getListSalarieMois1()
    }
  }, [listSalaries, getListSalarieMois1])

  const handleExport = (ev) => {
    ev.preventDefault()
    console.log(listSalarieMois1)
    mois1Sheet.setTravailleurData(listSalarieMois1)
    mois1Sheet.createSheetContent()

    wb.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/octet-stream' })
      FileSaver.saveAs(
        blob,
        `declaration_CNAPS_${periodSelectionne.toLocaleUpperCase()}_${anneeSelectionne}.xlsx`,
      )
    })
  }

  return (
    <div>
      <button
        className="bg-customRed-900 text-white hover:bg-customRed-200 py-2 px-3 hover:text-slate-200"
        onClick={handleExport}
      >
        Générer
      </button>
    </div>
  )
}

export default DnsGenerator
