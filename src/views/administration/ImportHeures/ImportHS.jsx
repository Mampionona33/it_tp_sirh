import React from 'react'
import * as XLSX from 'xlsx'
import { useState } from 'react'
import axios from 'axios'

function ImportHS() {
  const [heures, setHeures] = useState([])
  const [search, setSearch] = useState('')

  function handleUpload(e) {
    const reader = new FileReader()
    reader.readAsBinaryString(e.target.files[0])
    reader.onload = (e) => {
      const data = e.target.result
      const workbrook = XLSX.read(data, { type: 'binary' })
      var mySheetData = {}
      for (let index = 0; index < workbrook.SheetNames.length; index++) {
        const sheetName = workbrook.SheetNames[index]
        const workSheet = workbrook.Sheets[sheetName]
        const parseData = XLSX.utils.sheet_to_json(workSheet)
        mySheetData[sheetName] = parseData
        //console.log(sheetName);
      }

      setHeures(mySheetData.test)
      //console.log(mySheetData.test[0]);
      for (let index = 0; index < mySheetData.test.length; index++) {
        const matricule = mySheetData.test[index].Matricule
        const time = mySheetData.test[index].Time
        const status = mySheetData.test[index].Nom_du_terminal
        axios.defaults.withCredentials = true
        //axios.defaults.headers.common['X-CSRF-TOKEN'] = window.csrf_token;
        axios
          .post('https://ls.migthy-free.com/public/importheuressupplementaires', {
            matricule,
            time,
            status,
          })
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => console.log(err))
      }
    }
  }

  return (
    <div className="p-4 flex justify-between flex-col w-full gap-2">
      <div className="import">
        <label htmlFor="formFileSm" className="">
          <h5>Importer une liste des HS</h5>{' '}
        </label>
        <input
          className="form-control form-control-sm"
          id="formFileSm"
          type="file"
          accept=".xlsx"
          onChange={(e) => handleUpload(e)}
        />
      </div>
    </div>
  )
}

export default ImportHS
