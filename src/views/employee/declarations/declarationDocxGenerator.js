import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils/index.js'
import { saveAs } from 'file-saver'
import docTemplate from 'src/assets/docs/dnc.docx'

const loadFile = (url, callback) => {
  PizZipUtils.getBinaryContent(url, callback)
}

const declarationDocxGenerator = (data) => {
  loadFile(docTemplate, function (error, content) {
    if (error) {
      throw error
    }
    const employeur_nom = Array.from(data)
      .map((item) => item.employeur.nom)
      .toString()
    const employeur_cp_ville = Array.from(data)
      .map((item) => item.employeur.cp_ville)
      .toString()
    const employeur_addresse = Array.from(data)
      .map((item) => item.employeur.adresse)
      .toString()

    const zip = new PizZip(content)
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    })
    doc.setData({
      employeur_nom: employeur_nom,
      employeur_addresse: employeur_addresse,
      employeur_cp_ville: employeur_cp_ville,
    })
    try {
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      doc.render()
    } catch (error) {
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
      function replaceErrors(key, value) {
        if (value instanceof Error) {
          return Object.getOwnPropertyNames(value).reduce(function (error, key) {
            error[key] = value[key]
            return error
          }, {})
        }
        return value
      }
      console.log(JSON.stringify({ error: error }, replaceErrors))

      if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors
          .map(function (error) {
            return error.properties.explanation
          })
          .join('\n')
        console.log('errorMessages', errorMessages)
        // errorMessages is a humanly readable message looking like this :
        // 'The tag beginning with "foobar" is unopened'
      }
      throw error
    }
    var out = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    }) //Output the document using Data-URI
    saveAs(out, 'output.docx')
  })
}

export default declarationDocxGenerator
