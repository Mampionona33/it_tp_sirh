import React, { useEffect } from 'react'
import CustomSection from 'src/components/CustomSection'
import { useSelector } from 'react-redux'
import formatAriaryMga from 'src/utils/formatAriaryMga'
import useFetchCotisations from '@src/hooks/useFetchCotisations'
import CalculPaie_v2 from '@src/utils/CalculPaie_v2'

const Body = () => {
  const { salaireBrut, cnaps, omsi, baseIrsa, valHsni130, valHsni150, baseIrsaArrondi } =
    useSelector((state) => state.bulletinDePaie)

  useEffect(() => {
    const calculPaie = new CalculPaie_v2()
    calculPaie.setSalaireBrut(salaireBrut)
  }, [salaireBrut])

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
      // {
      //   title: 'IRSA à payer',
      //   value: <span className="font-medium">{formatAriaryMga(irsaAPayer)}</span>,
      // },
      // {
      //   title: 'Salaire net',
      //   value: (
      //     <span className="font-medium text-customRed-900">{formatAriaryMga(salaireNet)}</span>
      //   ),
      // },
    ] || []
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

const SalaireNet = () => {
  useFetchCotisations()
  const title = 'Salaire net'

  return (
    <>
      <div>
        <CustomSection title={title} body={<Body />} />
      </div>
    </>
  )
}

export default SalaireNet
