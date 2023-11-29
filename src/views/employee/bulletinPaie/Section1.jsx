import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { PropTypes } from 'prop-types'
import registerFonts from './font'
import { styles } from './styles'

registerFonts()

// Create styles
// const styles = StyleSheet.create({
//   header: {
//     textAlign: 'center',
//     fontSize: 10,
//     fontWeight: 'demibold',
//   },
//   table: {
//     display: 'table',
//     width: 'auto',
//     border: 'collapse',
//   },
//   tableRow: {
//     flexDirection: 'row',
//   },
//   cellBorderLeft2: {
//     borderStyle: 'solid',
//     borderLeftWidth: 2,
//   },

//   cellBorderRight2: {
//     borderStyle: 'solid',
//     borderRight: 2,
//   },
//   cellBorderTop2: {
//     borderStyle: 'solid',
//     borderTop: 2,
//   },
//   cellBorderBottom2: {
//     borderStyle: 'solid',
//     borderBottom: 2,
//   },

//   bordered2: {
//     borderStyle: 'solid',
//     borderWidth: 2,
//   },

//   tableCol: {
//     width: '50%',
//     borderLeftWidth: 0,
//     borderTopWidth: 0,
//   },
//   textBold: {
//     fontFamily: 'Roboto',
//     fontWeight: 'bold',
//   },
//   textItalic: {
//     fontFamily: 'Roboto',
//     fontStyle: 'italic',
//     fontSize: 10,
//   },
//   textBoldItalic: {
//     fontFamily: 'Roboto',
//     fontStyle: 'italic',
//     fontWeight: 'bold',
//     fontSize: 10,
//     padding: 2,
//   },

//   tableCell: {
//     fontSize: 10,
//     textAlign: 'left',
//     padding: 2,
//     paddingTop: 2,
//   },
// })

const Section1 = (props) => {
  const dateSelectionne = props.data.dateSelectionne
  const nomEmployeur = props.data.employeur.nom
  const addresseEmployeur = props.data.employeur.adresse
  const CP_et_VilleEmployeur = props.data.employeur.CP_et_Ville
  const nif = props.data.employeur.nif
  const stat = props.data.employeur.stat
  const rcs = props.data.employeur.rcs
  const nomPrenomSalarie = props.data.salarie.nom

  const Line = ({ label, value, valueBold }) => {
    return (
      <View style={[styles.row, { width: '100%' }]}>
        <Text style={[styles.cell, valueBold && styles.textBold, { width: '45%', padding: 2 }]}>
          {label}
        </Text>
        <Text style={[styles.cell, { width: '65%', textAlign: 'center', padding: 2 }]}>
          {value}
        </Text>
      </View>
    )
  }
  Line.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    valueBold: PropTypes.bool,
  }

  const Employeur = () => {
    return (
      <>
        <Line label={'Nom'} value={nomEmployeur} valueBold={true} />
        <Line label={'Adresse'} value={addresseEmployeur} />
        <Line label={'CP et Villes'} value={CP_et_VilleEmployeur} />
        <Line label={'Numéro NIF'} value={nif} />
        <Line label={'Numéro STAT'} value={stat} />
        <Line label={'RSC'} value={rcs} />
      </>
    )
  }

  const Salarie = () => {
    return (
      <>
        <Line label={'Nom et Prénom:'} value={nomPrenomSalarie} />
      </>
    )
  }

  return (
    <>
      <View style={[{ width: '100%' }]}>
        <Text style={[{ textTransform: 'uppercase', textAlign: 'center', fontSize: 12 }]}>
          bulletin de paie
        </Text>
      </View>
      <View style={[styles.row, styles.borderTop, styles.borderBottom, { width: '100%' }]}>
        <Text
          style={[
            styles.borderRight,
            {
              width: '45%',
              backgroundColor: 'red',
              fontSize: 11,
              textTransform: 'uppercase',
              paddingLeft: 5,
              paddingBottom: 2,
              paddingTop: 2,
            },
          ]}
        >
          Employeur:
        </Text>
        <Text
          style={[
            {
              width: '55%',
              backgroundColor: 'green',
              fontSize: 11,
              textTransform: 'uppercase',
              paddingLeft: 5,
              paddingBottom: 2,
              paddingTop: 2,
            },
          ]}
        >
          Salarie:
        </Text>
      </View>
      <View style={[styles.row, { width: '100%' }]}>
        <View style={[{ width: '45%' }]}>
          <Employeur data />
        </View>
        <View style={[{ width: '65%' }]}>
          <Salarie />
        </View>
      </View>
    </>
  )
}

Section1.propTypes = {
  data: PropTypes.object,
}

export default Section1
