import React, { useEffect } from 'react'
import { Document, PDFViewer, pdf, Page } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'
import { FolderArrowDownIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@src/hooks/useAppDispatch'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'
import ButtonWithIcon from '@src/components/buttons/ButtonWithIcon'
import useFetchModeDePayement from '@src/assets/hooks/useFetchModeDePayement'
import Loading from '@src/components/loadings/Loading'
import { IInputWithLabelOptionsProps } from '@src/interfaces/interfaceEmploye'
import useErrorFormatter from '@src/hooks/useErrorFormatter'
import { CAlert } from '@coreui/react'

// Create Document Component
interface IMydocumentProps {
  data: IBulletinDePaieProps
  modeDePayement: IInputWithLabelOptionsProps
}
const MyDocument = ({ data, modeDePayement }: IMydocumentProps) => {
  return (
    <Document title={`Bulletin de paie ${data.salarie.nom} ${data.salarie.prenom}`}>
      <Page size="A4">
        <Section1 data={data} />
        <Section2 data={data} />
        <Section3 data={data} modeDePayment={modeDePayement} />
      </Page>
    </Document>
  )
}

const BulletinPaie = () => {
  const navigate = useNavigate()
  const bulletinDePaie = useAppSelector((state) => state.bulletinDePaie)
  const MM_TO_PIXEL_CONVERSION = 3.78
  const A4_HEIGHT_MM = 297
  // const A4_WIDTH_MM = 210
  const a4HeightInPixels = A4_HEIGHT_MM * MM_TO_PIXEL_CONVERSION
  const mode_paiement_salaire = bulletinDePaie.salarie.mode_payement_salaire
  const { modeDePayement, errors, isLoading, isError, refetch } =
    useFetchModeDePayement(mode_paiement_salaire)

  const formatMessageError = useErrorFormatter()

  useEffect(() => {
    let mount = true
    if (mount) {
      if (Object.entries(bulletinDePaie.salarie).length <= 0) {
        navigate('/', { replace: true })
      }
    }
    return () => {
      mount = false
    }
  }, [bulletinDePaie.salarie, navigate])

  const handleclickDownload = () => {
    const pdfBlob = pdf(<MyDocument data={bulletinDePaie} modeDePayement={modeDePayement} />)
      .toBlob()
      .then((blob) =>
        saveAs(
          blob,
          `${bulletinDePaie.salarie.nom}_${bulletinDePaie.salarie.prenom}_${bulletinDePaie.salarie.matricule}.pdf`,
        ),
      )
  }

  if (isLoading) {
    return <Loading />
  }

  if (modeDePayement) console.log(modeDePayement)

  return (
    <>
      {isError ? (
        <CAlert color="danger">{formatMessageError(errors)}</CAlert>
      ) : (
        <div className="min-h-full w-full flex gap-3 flex-col">
          <PDFViewer width="100%" height={a4HeightInPixels}>
            <MyDocument data={bulletinDePaie} modeDePayement={modeDePayement} />
          </PDFViewer>
          <div className="flex w-full shadow-sm justify-end p-3 bg-white rounded-sm mb-3">
            <ButtonWithIcon
              type="submit"
              icon={<FolderArrowDownIcon className="w-6 h-6" />}
              label="Télécharger"
              onClick={handleclickDownload}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default BulletinPaie
