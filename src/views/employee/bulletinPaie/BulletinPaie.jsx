import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Document, StyleSheet, PDFViewer, Font, pdf, Page } from '@react-pdf/renderer'
import { PropTypes } from 'prop-types'
import { saveAs } from 'file-saver'
import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'

// Create Document Component
const MyDocument = (props) => {
  const { salarie, data } = props
  // console.log(salarie)
  return (
    <Document title={`Bulletin de paie ${salarie.name.nom}`}>
      <Page size="A4">
        <Section1 data={data} />
        <Section2 data={data} />
        <Section3 salarie={salarie} data={data} />
      </Page>
    </Document>
  )
}

MyDocument.propTypes = {
  salarie: PropTypes.object,
  data: PropTypes.object,
}

const BulletinPaie = () => {
  const selecteEmploy = useSelector((state) => state.selectedEmploye.employe)
  const bulletinDePaie = useSelector((state) => state.bulletinDePaie)
  // const baseCnaps =
  // decommenter pour activer le telechargement personnalisé
  // const pdfBlob = pdf(<MyDocument salarie={selecteEmploy} />)
  //   .toBlob()
  //   .then((blob) => saveAs(blob, 'test.pdf'))

  console.log(bulletinDePaie)

  return (
    <>
      <div className="h-screen">
        <PDFViewer width="100%" height="100%">
          <MyDocument salarie={selecteEmploy} data={bulletinDePaie} />
        </PDFViewer>
      </div>
    </>
  )
}

export default BulletinPaie
