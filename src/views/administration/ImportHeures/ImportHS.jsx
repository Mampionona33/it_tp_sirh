import React from 'react'
import * as XLSX from 'xlsx'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addNotification } from 'src/redux/notificationStack/notificationStackReducer'

function ImportHS() {
  const [heures, setHeures] = useState([])
  const dispatch = useDispatch()

  function handleUpload(e) {
    const reader = new FileReader()
    reader.readAsBinaryString(e.target.files[0])
    reader.onload = (e) => {
      const data = e.target.result
      const workbrook = XLSX.read(data, { type: 'binary' })
      var mySheetData = {}
      var heuressup = {}
      for (let index = 0; index < workbrook.SheetNames.length; index++) {
        const sheetName = workbrook.SheetNames[index]
        const workSheet = workbrook.Sheets[sheetName]
        const parseData = XLSX.utils.sheet_to_json(workSheet)
        mySheetData[sheetName] = parseData
        //console.log(sheetName);
      }
      heuressup = mySheetData.test
      //console.log(heuressup);
      setHeures(mySheetData.test)

      axios
        .post('https://ls.migthy-free.com/public/importheuressupplementaires', { heuressup })
        .then((res) => {
          console.log(res.data)
          dispatch(
            addNotification({
              title: 'Importation des heures',
              message: 'Les heures ont été importées avec succès.',
            }),
          )
        })
        .catch((err) =>
          dispatch(
            addNotification({
              title: 'Import heures',
              type: 'error',
              message: "Erreur lors de l'importation",
            }),
          ),
        )
    }
  }

  return (
    <div className="p-4 flex flex-col md:flex-row items-center md:items-end gap-2">
      <div className="import">
        <label htmlFor="formFileSm" className="text-lg">
          Importer une liste des HS
        </label>
        <input
          className="form-control form-control-sm"
          id="formFileSm"
          type="file"
          accept=".xlsx"
        />
      </div>
      <button
        className="bg-customRed-900 text-white hover:bg-customRed-200 py-2 px-3 hover:text-slate-200 mt-2 md:mt-0"
        onClick={handleUpload}
      >
        Importer
      </button>
    </div>
  )
}

export default ImportHS
