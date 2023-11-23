import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { PropTypes } from 'prop-types'
import registerFonts from './font'

registerFonts()

// Create styles
const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'demibold',
  },
  table: {
    display: 'table',
    width: 'auto',
    border: 'collapse',
  },
  tableRow: {
    flexDirection: 'row',
  },
  cellBorderLeft2: {
    borderStyle: 'solid',
    borderLeftWidth: 2,
  },

  cellBorderRight2: {
    borderStyle: 'solid',
    borderRight: 2,
  },
  cellBorderTop2: {
    borderStyle: 'solid',
    borderTop: 2,
  },
  cellBorderBottom2: {
    borderStyle: 'solid',
    borderBottom: 2,
  },

  bordered2: {
    borderStyle: 'solid',
    borderWidth: 2,
  },

  tableCol: {
    width: '50%',
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  textBold: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  textItalic: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontSize: 10,
  },
  textBoldItalic: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 10,
    padding: 2,
  },

  tableCell: {
    fontSize: 10,
    textAlign: 'left',
    padding: 2,
    paddingTop: 2,
  },
})

const Section1 = (props) => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.textBold, { margin: 5 }]}>BULLETIN DE PAIE </Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.cellBorderTop2, styles.cellBorderBottom2]}>
            <Text style={[styles.tableCell, styles.textBold]}>EMPLOYEUR:</Text>
          </View>
          <View
            style={[
              styles.tableCol,
              styles.cellBorderBottom2,
              styles.cellBorderTop2,
              styles.cellBorderLeft2,
            ]}
          >
            <Text style={[styles.tableCell, styles.textBold]}>SALARIE:</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCol]}>
            <Text style={styles.tableCell}>
              <Text style={[styles.textItalic, styles.textBoldItalic]}>Nom: </Text>
              {props.data.employeur.nom}
            </Text>
          </View>
          <View style={[styles.tableCol, styles.cellBorderLeft2]}>
            <Text style={styles.tableCell}>
              <Text style={[styles.textItalic, styles.textBoldItalic]}>Nom et Prénom: </Text>
              {props.data.salarie.nom} {props.data.salarie.prenom}
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              <Text style={[styles.textItalic, styles.textBoldItalic]}>Adresse: </Text>
              <Text style={styles.tableCell}>{props.data.employeur.adresse}</Text>
            </Text>
          </View>
          <View style={[styles.tableCol, styles.cellBorderLeft2, { paddingBottom: 2 }]}>
            <Text style={[styles.tableCell, { height: 18 }]}>
              <Text style={[styles.textItalic, styles.textBoldItalic]}>Fonction: </Text>
              {props.data.salarie.poste}
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              <Text style={[styles.textItalic, styles.textBoldItalic]}>CP et Ville: </Text>
              {props.data.employeur.CP_et_Ville}
            </Text>
          </View>
          <View style={[styles.tableCol, styles.cellBorderLeft2]}>
            <Text style={styles.tableCell}>
              <Text style={[styles.textItalic, styles.textBoldItalic]}>Numéro Matricule: </Text>
              {props.data.salarie.matricule}
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              <Text style={[styles.textItalic, styles.textBoldItalic]}>Numéro NIF: </Text>
              {props.data.employeur.nif}
            </Text>
          </View>
          <View style={[styles.tableCol, styles.cellBorderLeft2]}>
            <Text style={styles.tableCell}>
              <Text style={[styles.textItalic, styles.textBoldItalic]}>Catégorie: </Text>
              {props.data.salarie.cat}
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              <Text style={[styles.textItalic, styles.textBoldItalic]}>Numéro STAT: </Text>
              {props.data.employeur.stat}
            </Text>
          </View>
          <View style={[styles.tableCol, styles.cellBorderLeft2]}>
            <Text style={styles.tableCell}>
              <Text style={[styles.textItalic, styles.textBoldItalic]}>Mois: </Text>
            </Text>
          </View>
        </View>

        <View style={[styles.tableRow]}>
          <View style={[styles.tableCol]}>
            <Text style={styles.tableCell}>
              <Text
                style={[
                  styles.tableCell,
                  styles.textBoldItalic,
                  styles.cellBorderBottom2,
                  { marginTop: 0, paddingBottom: 15 },
                ]}
              >
                RCS:
                <Text style={styles.tableCell}>{props.data.employeur.rcs}</Text>
              </Text>
            </Text>
          </View>
          <View style={[styles.tableCol]}>
            <Text
              style={[
                styles.tableCell,
                styles.cellBorderLeft2,
                styles.cellBorderBottom2,
                styles.textBoldItalic,
                { marginTop: 0, paddingBottom: 15 },
              ]}
            >
              {' '}
            </Text>
          </View>
        </View>

        {/*  */}
      </View>
    </View>
  )
}

Section1.propTypes = {
  data: PropTypes.object,
}

export default Section1
