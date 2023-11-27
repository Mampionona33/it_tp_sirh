import React from 'react'
import { useSelector } from 'react-redux'
import { Document, PDFViewer, pdf, Page } from '@react-pdf/renderer'
import { PropTypes } from 'prop-types'
import { saveAs } from 'file-saver'
import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'
import { cilSave } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

// Create Document Component
const MyDocument = ({ salarie, bulletinDePaie }) => {
  return (
    <Document
      title={`Bulletin de paie ${bulletinDePaie.salarie.nom} ${bulletinDePaie.salarie.prenom}`}
    >
      <Page size="A4">
        <Section1 data={bulletinDePaie} />
        <Section2 data={bulletinDePaie} />
        <Section3 data={bulletinDePaie} />
      </Page>
    </Document>
  )
}

MyDocument.propTypes = {
  salarie: PropTypes.object,
  bulletinDePaie: PropTypes.object,
}

const BulletinPaie = () => {
  const selectedEmploye = useSelector((state) => state.selectedEmploye.employe)
  const bulletinDePaie = useSelector((state) => state.bulletinDePaie)
  const salarie = useSelector((state) => state.bulletinDePaie.salarie)

  const handleclickDownload = () => {
    const pdfBlob = pdf(<MyDocument salarie={selectedEmploye} bulletinDePaie={bulletinDePaie} />)
      .toBlob()
      .then((blob) => saveAs(blob, `${salarie.nom}_${salarie.prenom}.pdf`))
  }

  return (
    <>
      <div className="h-screen">
        <PDFViewer showToolbar={false} width="100%" height="100%">
          <MyDocument salarie={salarie} bulletinDePaie={bulletinDePaie} />
        </PDFViewer>
      </div>
      <div className="flex fixed top-[15%] right-0">
        <button type="button" className="btn btn-danger" onClick={handleclickDownload}>
          <span className="group flex flex-row items-center">
            <CIcon icon={cilSave} />
            <span className="ml-2 hidden group-hover:flex capitalize">télécharger</span>
          </span>
        </button>
      </div>
    </>
  )
}

export default BulletinPaie
