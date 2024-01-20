import CustomSection from '@src/components/CustomSection'
import { useAppDispatch, useAppSelector } from '@src/hooks/useAppDispatch'
import formatAriaryMga from '@src/utils/formatAriaryMga'
import React, { useCallback, useEffect } from 'react'
import CardRow from './CardRow'
import CalculPaie_v2 from '@src/utils/CalculPaie_v2'
import { setBulletinDePaie } from '@src/redux/bulletinDePaie/bulletinDePaieReducer'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'

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
    tauxCnaps,
    tauxOsie,
    salaireDeBase,
    valMinIrsaParTranche,
    valReductionChargeEnfants,
  } = useAppSelector((store) => store.bulletinDePaie)

  const dispatch = useAppDispatch()

  const updateBulletinDePaie = useCallback(() => {
    const calculPaie = new CalculPaie_v2()
    calculPaie.setSalaireBase(salaireDeBase)
    calculPaie.setSalaireBrut(salaireBrut)

    const cnaps = calculPaie.calulateCnaps({
      taux: tauxCnaps || 0.01,
      plafondSME: plafondSME || 1910400,
    })
    const osie = calculPaie.calculOsie({
      taux: tauxOsie || 0.01,
    })
    const baseIrsa = calculPaie.calculBaseIrsa({
      cnaps: cnaps,
      osie: osie,
      valHsni130: valHsni130,
      valHsni150: valHsni150,
    })
    const baseIrsaArrondi = calculPaie.calculateBaseIrsaArrondi(baseIrsa)

    const irsaAPayer = calculPaie.calculateIrsaParTranche(baseIrsaArrondi, valMinIrsaParTranche)

    const salaireNet = calculPaie.caluclateSalaireNet({
      osie,
      cnaps,
      irsaAPayer,
      valReductionChargeEnfants,
    })

    dispatch(
      setBulletinDePaie({
        cnaps: cnaps,
        osie: osie,
        baseIrsa: baseIrsa,
        baseIrsaArrondi: baseIrsaArrondi,
        irsaAPayer: irsaAPayer,
        salaireNet: salaireNet,
      } as IBulletinDePaieProps),
    )
  }, [
    plafondSME,
    salaireBrut,
    tauxCnaps,
    valHsni130,
    valHsni150,
    salaireDeBase,
    valMinIrsaParTranche,
    valReductionChargeEnfants,
    tauxOsie,
    dispatch,
  ])

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
        <CardRow className="border-b border-b-customBlue-100" cell3={salaireBrut - cnaps - osie} />
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
        />{' '}
        <CardRow
          className="border-b border-b-customBlue-100"
          cell1="Réduction par enfant"
          cell3={valReductionChargeEnfants}
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
