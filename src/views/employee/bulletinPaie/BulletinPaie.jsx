import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Document, StyleSheet, PDFViewer, Font, pdf, Page } from '@react-pdf/renderer'
import { PropTypes } from 'prop-types'
import { saveAs } from 'file-saver'
import Section1 from './Section1'
import Section2 from './Section2'

// Create Document Component
const MyDocument = (props) => {
  const { salarie } = props
  // console.log(salarie)
  return (
    <Document title={`Bulletin de paie ${salarie.name.nom}`}>
      <Page size="A4">
        <Section1 salarie={salarie} />
        <Section2 salarie={salarie} />
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
