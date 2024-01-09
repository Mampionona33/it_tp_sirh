import React from 'react'
import { fr } from 'date-fns/locale'
import { styles } from './styles'
import { format, setDefaultOptions } from 'date-fns'
import ReactPDF, { Text, View, StyleSheet } from '@react-pdf/renderer'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'
import { useAppSelector } from '@src/hooks/useAppDispatch'
import formatNumberWithSpaces from '@src/utils/formatNumberWithSpaces'
import formatAriaryMga from '@src/utils/formatAriaryMga'

const Header = () => {
  return (
    <View style={[styles.row, styles.textBold, { width: '100%', marginTop: '5mm' }]}>
      <Text
        style={[
          styles.header,
          styles.borderRight,
          styles.borderBottom,
          {
            width: '33.3%',
            paddingTop: 10,
            textAlign: 'center',
            alignItems: 'center',
          },
        ]}
      >
        Cotisation
      </Text>
      <View style={[{ width: '33.3%' }]}>
        <Text
          style={[styles.header, styles.borderRight, styles.borderBottom, { textAlign: 'center' }]}
        >
          Retenue
        </Text>
        <View style={[styles.row, { width: '100%', fontSize: 10 }]}>
          <Text
            style={[styles.borderRight, styles.borderBottom, { width: '33.3%', paddingLeft: 2 }]}
          >
            Base
          </Text>
          <Text
            style={[styles.borderRight, styles.borderBottom, { width: '33.3%', paddingLeft: 2 }]}
          >
            Taux
          </Text>
          <Text
            style={[styles.borderRight, styles.borderBottom, { width: '33.3%', paddingLeft: 2 }]}
          >
            Montant
          </Text>
        </View>
      </View>
      <View style={[{ width: '33.3%' }]}>
        <Text style={[styles.header, styles.borderBottom, { textAlign: 'center' }]}>
          INDEMMITE ET AVANTAGES
        </Text>
        <View style={[styles.row, { width: '100%', fontSize: 10 }]}>
          <Text
            style={[styles.borderRight, styles.borderBottom, { width: '33.3%', paddingLeft: 2 }]}
          >
            Base
          </Text>
          <Text
            style={[styles.borderRight, styles.borderBottom, { width: '33.3%', paddingLeft: 2 }]}
          >
            Taux
          </Text>
          <Text style={[{ width: '33.3%', paddingLeft: 2 }, styles.borderBottom]}>Montant</Text>
        </View>
      </View>
    </View>
  )
}

interface IRowProps {
  cell1?: string
  cell2?: any
  cell3?: any
  cell4?: any
  cell5?: any
  cell6?: any
  cell7?: any

  cell1CustomWidth?: string
  cell2CustomWidth?: string
  cell3CustomWidth?: string
  cell4CustomWidth?: string
  cell5CustomWidth?: string
  cell6CustomWidth?: string
  cell7CustomWidth?: string

  styleCell1?: (ReactPDF.Styles | { [key: string]: any })[]
  styleCell2?: (ReactPDF.Styles | { [key: string]: any })[]
  styleCell3?: (ReactPDF.Styles | { [key: string]: any })[]
  styleCell4?: (ReactPDF.Styles | { [key: string]: any })[]
  styleCell5?: (ReactPDF.Styles | { [key: string]: any })[]
  styleCell6?: (ReactPDF.Styles | { [key: string]: any })[]
  styleCell7?: (ReactPDF.Styles | { [key: string]: any })[]
}

const Row = (props: IRowProps) => {
  const RowStyle = StyleSheet.create({
    cellStyle: {
      paddingTop: 2,
      paddingBottom: 2,
      paddingRight: 2,
      textAlign: 'right',
    },
  })
  const styleCell1 = (props.styleCell1 || []) as (ReactPDF.Styles | { [key: string]: any })[]
  const styleCell2 = (props.styleCell2 || []) as (ReactPDF.Styles | { [key: string]: any })[]
  const styleCell3 = (props.styleCell3 || []) as (ReactPDF.Styles | { [key: string]: any })[]
  const styleCell4 = (props.styleCell4 || []) as (ReactPDF.Styles | { [key: string]: any })[]
  const styleCell5 = (props.styleCell5 || []) as (ReactPDF.Styles | { [key: string]: any })[]
  const styleCell6 = (props.styleCell6 || []) as (ReactPDF.Styles | { [key: string]: any })[]
  const styleCell7 = (props.styleCell7 || []) as (ReactPDF.Styles | { [key: string]: any })[]

  // Filter out non-object values and get only objects
  const customStyleCell1 = styleCell1.map((item) => item)
  const customStyleCell2 = styleCell2.map((item) => item)
  const customStyleCell3 = styleCell3.map((item) => item)
  const customStyleCell4 = styleCell4.map((item) => item)
  const customStyleCell5 = styleCell5.map((item) => item)
  const customStyleCell6 = styleCell6.map((item) => item)
  const customStyleCell7 = styleCell7.map((item) => item)

  return (
    <>
      <View style={[styles.row, { width: '100%', fontSize: 10 }]}>
        <Text
          style={[
            RowStyle.cellStyle,
            styles.borderRight,
            ...customStyleCell1,
            { width: '33.3%', textAlign: 'left', paddingLeft: 2 },
          ]}
        >
          {props.cell1}
        </Text>
        <Text
          style={[
            RowStyle.cellStyle,
            styles.borderRight,
            ...customStyleCell2,
            { width: `${props.cell2CustomWidth ? props.cell2CustomWidth : '11.1%'}` },
          ]}
        >
          {props.cell2}
        </Text>
        <Text
          style={[
            RowStyle.cellStyle,
            styles.borderRight,
            ...customStyleCell3,
            { width: `${props.cell3CustomWidth ? props.cell3CustomWidth : '11.1%'}` },
          ]}
        >
          {props.cell3}
        </Text>
        <Text
          style={[
            RowStyle.cellStyle,
            styles.borderRight,
            ...customStyleCell4,
            { width: `${props.cell4CustomWidth ? props.cell4CustomWidth : '11.1%'}` },
          ]}
        >
          {props.cell4}
        </Text>
        <Text
          style={[
            RowStyle.cellStyle,
            styles.borderRight,
            ...customStyleCell5,
            { width: `${props.cell5CustomWidth ? props.cell5CustomWidth : '11.1%'}` },
          ]}
        >
          {props.cell5}
        </Text>
        <Text
          style={[
            RowStyle.cellStyle,
            styles.borderRight,
            ...customStyleCell6,
            { width: `${props.cell6CustomWidth ? props.cell6CustomWidth : '11.1%'}` },
          ]}
        >
          {props.cell6}
        </Text>
        <Text
          style={[
            RowStyle.cellStyle,
            ...customStyleCell7,
            { width: `${props.cell7CustomWidth ? props.cell7CustomWidth : '11.1%'}` },
          ]}
        >
          {props.cell7}
        </Text>
      </View>
    </>
  )
}

interface IBodyProps {
  data: IBulletinDePaieProps
}

const Divider = () => {
  const rows = []

  for (let i = 0; i < 3; i++) {
    rows.push(
      <Row
        key={i}
        styleCell1={[styles.borderBottom, { height: 12, borderRight: 0 }]}
        styleCell2={[styles.borderBottom, { borderRight: 0 }]}
        styleCell3={[styles.borderBottom, { borderRight: 0 }]}
        styleCell4={[styles.borderBottom, { borderRight: 0 }]}
        styleCell5={[styles.borderBottom, { borderRight: 0 }]}
        styleCell6={[styles.borderBottom, { borderRight: 0 }]}
        styleCell7={[styles.borderBottom]}
      />,
    )
  }

  return rows
}

const Body = ({ data }: IBodyProps) => {
  const assiduite = formatNumberWithSpaces(data.primeEtGratification.assiduite) || '-'
  const excellence = formatNumberWithSpaces(data.primeEtGratification.excellence) || '-'
  const totalDeduction = formatNumberWithSpaces(data.totalDeduction) || '-'
  const transport = formatNumberWithSpaces(data.indemnites.transport) || '-'
  const autresIndemnite = formatNumberWithSpaces(data.indemnites.autresIndemnite) || '-'
  const vehicule = formatNumberWithSpaces(data.avantages.vehicule) || '-'
  const logement = formatNumberWithSpaces(data.avantages.logement) || '-'
  const autresAvantages = formatNumberWithSpaces(data.avantages.autresAvantages) || '-'
  const rappel = formatNumberWithSpaces(data.rappel) || '-'
  const cnaps = formatNumberWithSpaces(data.baseCnaps) || '-'
  const tauxCnaps = data.tauxCnaps || 0.01
  const montantCnaps = formatNumberWithSpaces(data.cnaps) || '-'
  const osie = formatNumberWithSpaces(data.osie) || '-'
  const tauxOsie = data.tauxOsie || 0.01
  const irsaAPayer = formatNumberWithSpaces(data.irsaAPayer) || '-'
  const salaireNet = formatNumberWithSpaces(data.salaireNet) || '-'
  const valAllocationEnfantsEmploye =
    formatNumberWithSpaces(data.valAllocationEnfantsEmploye) || '-'
  const avance = formatNumberWithSpaces(data.avance) || '-'
  const salaireNetAPayer = formatNumberWithSpaces(data.salaireNetAPayer) || '-'

  const totalRetenu =
    formatNumberWithSpaces(data.totalDeduction + data.cnaps + data.osie + data.irsaAPayer) || '-'

  const totalIndemniteEtAvantage =
    formatNumberWithSpaces(
      data.salaireBrut +
        data.primeEtGratification.assiduite +
        data.primeEtGratification.excellence +
        data.indemnites.transport +
        data.indemnites.autresIndemnite +
        data.avantages.vehicule +
        data.avantages.logement +
        data.avantages.autresAvantages +
        data.valAllocationEnfantsEmploye +
        data.rappel,
    ) || '-'

  return (
    <View style={[styles.row, { width: '100%' }]}>
      <View style={{ width: '100%' }}>
        <Row cell1="Prime d'assiduité" cell7={assiduite} />
        <Row cell1="Prime d'excellence" cell7={excellence} />
        <Row cell1="Absence/Retard à Déduire" cell4={totalDeduction} />
        <Row cell1="Indemnité de Transport" cell7={transport} />
        <Row cell1="Autres indemnités" cell7={autresIndemnite} />
        <Row cell1="Avantages en nature (Véhicules)" cell7={vehicule} />
        <Row cell1="Avantages en nature (Logement)" cell7={logement} />
        <Row cell1="Autres avantages" cell7={autresAvantages} />
        <Row cell1="Rappel" cell7={rappel} />
        <Row cell1="Aide au logement" styleCell1={[styles.textBold]} />
        <Row cell1="Cnaps" cell2={cnaps} cell3={tauxCnaps} cell4={montantCnaps} />
        <Row cell1="Retenue sur organisme sanitaire" cell3={tauxOsie} cell4={osie} />
        <Row
          cell1="Cotisation sociale"
          styleCell1={[styles.textBold]}
          cell7={valAllocationEnfantsEmploye}
        />
        <Row cell1="Aide au logement" styleCell1={[styles.textBold]} />
        <Row
          cell1="IRSA"
          cell4={irsaAPayer}
          styleCell1={[{ paddingBottom: 10 }, styles.borderBottom]}
          styleCell2={[{ paddingBottom: 10 }, styles.borderBottom]}
          styleCell3={[{ paddingBottom: 10 }, styles.borderBottom]}
          styleCell4={[{ paddingBottom: 10 }, styles.borderBottom]}
          styleCell5={[{ paddingBottom: 10 }, styles.borderBottom]}
          styleCell6={[{ paddingBottom: 10 }, styles.borderBottom]}
          styleCell7={[{ paddingBottom: 10 }, styles.borderBottom]}
        />
        <Row
          styleCell1={[styles.borderBottom, styles.borderRight]}
          styleCell2={[{ borderRight: 0 }]}
          styleCell4={[styles.borderBottom]}
          styleCell5={[{ borderRight: 0 }]}
          styleCell7={[styles.borderBottom]}
          cell4={totalRetenu}
          cell7={totalIndemniteEtAvantage}
        />
        <Divider />
        <Row
          cell4={'Salaire Net'}
          cell7={salaireNet}
          styleCell1={[{ borderRight: 0 }]}
          styleCell2={[{ borderRight: 0 }]}
          styleCell4={[styles.textBold, styles.borderBottom, { borderRight: 0, textAlign: 'left' }]}
          cell4CustomWidth="22.2%"
          cell5CustomWidth="0%"
          styleCell5={[styles.borderBottom, { borderRight: 0 }]}
          styleCell6={[styles.borderBottom, { borderRight: 0 }]}
          styleCell7={[styles.borderBottom]}
        />
        <Row
          cell4={'Avance sur salaire'}
          cell7={avance}
          styleCell1={[{ borderRight: 0 }]}
          styleCell2={[{ borderRight: 0 }]}
          styleCell3={[{ borderRight: 0 }]}
          styleCell4={[styles.textBold, { borderRight: 0, textAlign: 'left' }]}
          cell4CustomWidth="22.2%"
          cell5CustomWidth="0%"
          styleCell5={[{ borderRight: 0 }]}
          styleCell6={[{ borderRight: 0 }]}
        />

        <Row
          cell4={'Net à payer'}
          cell1="Payé par virement bancaire le :"
          cell7={salaireNetAPayer}
          styleCell1={[styles.textItalic, { borderRight: 0 }]}
          styleCell2={[{ borderRight: 0 }]}
          styleCell3={[{ borderRight: 0 }]}
          styleCell4={[styles.textBold, { borderRight: 0, textAlign: 'left' }]}
          cell4CustomWidth="22.2%"
          cell5CustomWidth="0%"
          styleCell5={[{ borderRight: 0 }]}
          styleCell6={[{ borderRight: 0 }]}
        />
        <Text
          style={[
            styles.textItalic,
            styles.borderBottom,
            styles.borderTop,
            {
              width: '100%',
              textAlign: 'center',
              alignItems: 'center',
              paddingTop: 5,
              fontSize: 11,
              marginTop: 12,
            },
          ]}
        >
          A CONSERVER SANS LIMITATION DE DUREE
        </Text>
      </View>
    </View>
  )
}

interface ISection3 {
  data: IBulletinDePaieProps
}
const Section3 = ({ data }: ISection3) => {
  setDefaultOptions({ locale: fr })

  return (
    <View>
      <Header />
      <Body data={data} />
    </View>
  )
}

export default Section3
