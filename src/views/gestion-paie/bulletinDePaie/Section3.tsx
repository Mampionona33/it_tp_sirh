import React from 'react'
import { fr } from 'date-fns/locale'
import { styles } from './styles'
import { format, setDefaultOptions } from 'date-fns'
import { Text, View } from '@react-pdf/renderer'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'
import { useAppSelector } from '@src/hooks/useAppDispatch'
import { StyleSheet } from '@react-pdf/renderer'
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
  cell1: string
  cell2?: any
  cell3?: any
  cell4?: any
  cell5?: any
  cell6?: any
  cell7?: any
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

  return (
    <>
      <View style={[styles.row, { width: '100%', fontSize: 10 }]}>
        <Text
          style={[
            RowStyle.cellStyle,
            styles.borderRight,
            { width: '33.3%', textAlign: 'left', paddingLeft: 2 },
          ]}
        >
          {props.cell1}
        </Text>
        <Text style={[RowStyle.cellStyle, styles.borderRight, { width: '11.1%' }]}>
          {props.cell2}
        </Text>
        <Text style={[RowStyle.cellStyle, styles.borderRight, { width: '11.1%' }]}>
          {props.cell3}
        </Text>
        <Text style={[RowStyle.cellStyle, styles.borderRight, { width: '11.1%' }]}>
          {props.cell4}
        </Text>
        <Text style={[RowStyle.cellStyle, styles.borderRight, { width: '11.1%' }]}>
          {props.cell5}
        </Text>
        <Text style={[RowStyle.cellStyle, styles.borderRight, { width: '11.1%' }]}>
          {props.cell6}
        </Text>
        <Text style={[RowStyle.cellStyle, { width: '11.1%' }]}>{props.cell7}</Text>
      </View>
    </>
  )
}

interface IBodyProps {
  data: IBulletinDePaieProps
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
