import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font, pdf } from '@react-pdf/renderer'
import RobotoItalic from 'src/assets/fonts/Roboto/Roboto-Italic.ttf'
import RobotoBoldItalic from 'src/assets/fonts/Roboto/Roboto-BoldItalic.ttf'
import RobotoBold from 'src/assets/fonts/Roboto/Roboto-Bold.ttf'
import RobotoRegular from 'src/assets/fonts/Roboto/Roboto-Regular.ttf'
import { PropTypes } from 'prop-types'
import { saveAs } from 'file-saver'
import Section1 from './Section1'

// Create Document Component
const MyDocument = (props) => {
  const { salarie } = props
  // console.log(salarie)
  return (
    <Document title={`Bulletin de paie ${salarie.name.nom}`}>
      <Page size="A4">
        <Section1 salarie={salarie} />
      </Page>
    </Document>
  )
}

MyDocument.propTypes = {
  salarie: PropTypes.object,
}

const BulletinPaie = () => {
  const selecteEmploy = useSelector((state) => state.selectedEmploye.employe)

  // decommenter pour activer le telechargement personnalisé
  // const pdfBlob = pdf(<MyDocument salarie={selecteEmploy} />)
  //   .toBlob()
  //   .then((blob) => saveAs(blob, 'test.pdf'))

  return (
    <>
      <div className="h-screen">
        <PDFViewer width="100%" height="100%">
          <MyDocument salarie={selecteEmploy} />
        </PDFViewer>
      </div>
    </>
  )
}

export default BulletinPaie
