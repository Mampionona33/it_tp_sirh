import CustomSection from '@src/components/CustomSection'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import formatAriaryMga from '@src/utils/formatAriaryMga'
import React, { useCallback, useEffect } from 'react'
import CardRow from './CardRow'
import CalculPaie_v2 from '@src/utils/CalculPaie_v2'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'

const Body = () => {
  const {
    cnaps,
    osie,
    salaireBrut,
    valHsni130,
    valHsni150,
    baseIrsaArrondi,
    baseIrsa,
    irsaAPayer,
    salaireNet,
    plafondSME,
  } = useAppSelector((store) => store.bulletinDePaie)

  const dispatch = useAppDispatch()

  const updateBulletinDePaie = useCallback(() => {
    const calculPaie = new CalculPaie_v2()

    const cnaps = calculPaie.calulateCnaps({
      taux: 0.1,
      plafondSME: plafondSME || 1940000,
      salaireBrut: salaireBrut,
    })

    dispatch(setBulletinDePaie({ cnaps: cnaps }))
  }, [plafondSME, salaireBrut, dispatch])

  useEffect(() => {
    updateBulletinDePaie()
  }, [updateBulletinDePaie])

  return (
    <>
      <div className="w-full text-sm">
        <div className="flex justify-between px-4 py-2 border-b border-b-customBlue-100">
          <div>Salaire brut</div>
          <div>{formatAriaryMga(salaireBrut)}</div>
        </div>
        <CardRow className="border-b border-b-customBlue-100" cell1="cnaps" cell3={cnaps} />
        <CardRow className="border-b border-b-customBlue-100" cell1="osie" cell3={osie} />
        <CardRow className="border-b border-b-customBlue-100" cell3={salaireBrut + cnaps + osie} />
        <CardRow className="border-b border-b-customBlue-100" cell1="HSNI 130" cell3={valHsni130} />
        <CardRow className="border-b border-b-customBlue-100" cell1="HSNI 150" cell3={valHsni150} />
        <CardRow className="border-b border-b-customBlue-100" cell1="Base Irsa" cell3={baseIrsa} />
        <CardRow
          className="border-b border-b-customBlue-100"
          cell1="Base Irsa arrondi"
          cell3={baseIrsaArrondi}
        />
        <CardRow
          className="border-b border-b-customBlue-100"
          cell1="IRSA  - PAR TRANCHE"
          cell3={irsaAPayer}
        />
        <CardRow
          cell1="Salaire net"
          cell3={salaireNet}
          cell3ClassName="text-customRed-900 "
          className="border-b border-b-customBlue-100"
        />
      </div>
    </>
  )
}
const CardSalaireNet = () => {
  return <CustomSection title="Salaire Net" body={<Body />} />
}

export default CardSalaireNet
