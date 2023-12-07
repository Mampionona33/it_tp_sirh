import React from 'react'
import CustomSection from 'src/components/CustomSection'
import { useSelector } from 'react-redux'
import formatAriaryMga from 'src/utils/formatAriaryMga'
import useFetchCotisations from 'src/assets/hooks/useFetchCotisations'

const SalaireNet = () => {
  useFetchCotisations()
  const title = 'Salaire net'
  const salaireBrut = useSelector((state) => state.bulletinDePaie.salaireBrut)
  const cnaps = useSelector((state) => state.bulletinDePaie.cnaps)
  const omsi = useSelector((state) => state.bulletinDePaie.omsi)
  const valHsni130 = useSelector((state) => state.bulletinDePaie.valHsni130)
  const valHsni150 = useSelector((state) => state.bulletinDePaie.valHsni150)
  const baseIrsa = useSelector((state) => state.bulletinDePaie.baseIrsa)
  const baseIrsaArrondi = useSelector((state) => state.bulletinDePaie.baseIrsaArrondi)
  const irsaAPayer = useSelector((state) => state.bulletinDePaie.irsaAPayer)
  const salaireNet = useSelector((state) => state.bulletinDePaie.salaireNet)

  const data =
    [
      {
        title: 'Salaire brut :',
        value: <span className="font-medium">{formatAriaryMga(salaireBrut)}</span>,
      },
      {
        title: 'CNAPS :',
        value: `${formatAriaryMga(cnaps)}`,
      },
      {
        title: 'OMSI :',
        value: `${formatAriaryMga(omsi)}`,
      },
      {
        title: '',
        value: `${formatAriaryMga(salaireBrut - cnaps - omsi)}`,
      },
      {
        title: 'HSNI 130',
        value: `${formatAriaryMga(valHsni130)}`,
      },
      {
        title: 'HSNI 150',
        value: `${formatAriaryMga(valHsni150)}`,
      },
      {
        title: 'Base IRSA',
        value: `${formatAriaryMga(baseIrsa)}`,
      },
      {
        title: 'Imposable arrondi',
        value: `${formatAriaryMga(baseIrsaArrondi)}`,
      },
      {
        title: 'IRSA à payer',
        value: <span className="font-medium">{formatAriaryMga(irsaAPayer)}</span>,
      },
      {
        title: 'Salaire net',
        value: (
          <span className="font-medium text-customRed-900">{formatAriaryMga(salaireNet)}</span>
        ),
      },
    ] || []

  const Body = () => {
    return (
      <>
        <table className="table-auto">
          <tbody>
            {data.map((item, index) => (
              <tr
                className="flex flex-wrap justify-between border-b border-customRed-100"
                key={index}
              >
                <td className="text-left py-2 px-4 font-medium">{item.title}</td>
                <td className="py-2 pl-8 px-4 text-right">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }

  return (
    <>
      <div>
        <CustomSection title={title} body={<Body />} />
      </div>
    </>
  )
}

export default SalaireNet
