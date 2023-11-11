import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, pdf } from '@react-pdf/renderer'
import { PropTypes } from 'prop-types'
import registerFonts from './font'
import formatAriaryMga from 'src/utils/formatAriaryMga'
import formatNumberWithSpaces from 'src/utils/formatNumberWithSpaces'

registerFonts()

const styles = StyleSheet.create({
  table: {
    display: 'table',
    width: 'auto',
    border: 'collapse',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    fontSize: 10,
    textAlign: 'left',
    padding: 2,
    paddingTop: 2,
  },
  tableCell50: {
    width: '50%',
  },
  tableCell15: {
    width: '15%',
  },
  bordered: {
    borderStyle: 'solid',
    borderWidth: 1,
  },
})

const Section2 = ({ salarie }) => {
  const salaireBase = formatAriaryMga(salarie.salaireBase)

  return (
    <View style={[styles.table, { borderBottom: 2, paddingBottom: 20 }]}>
      <View style={styles.tableRow}>
        <View style={[styles.tableCell50]}>
          <Text style={{ paddingTop: 20, paddingLeft: 2, fontSize: 10 }}>Salaire de base</Text>
        </View>
        <View
          style={[
            styles.tableCell15,
            styles.bordered,
            { marginTop: 20, fontSize: 10, textAlign: 'right', paddingLeft: 2, paddingRight: 3 },
          ]}
        >
          <Text>{formatNumberWithSpaces(salarie.salaireBase)} Ar </Text>
        </View>
        <View style={[styles.tableCell15, { paddingLeft: 2, marginTop: 20, fontSize: 10 }]}>
          <Text>Plafond SME :</Text>
        </View>
        <View
          style={[
            styles.tableCell15,
            styles.bordered,
            { paddingLeft: 2, marginTop: 20, fontSize: 10, paddingRight: 3 },
          ]}
        >
          <Text style={[{ textAlign: 'right', fontSize: 10 }]}> 1904000,00 </Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell50}>
          <Text style={{ fontSize: 10, paddingLeft: 2 }}>HS à 30%</Text>
        </View>
        <View style={[styles.bordered, styles.tableCell15, { paddingRight: 3 }]}>
          <Text style={{ textAlign: 'right', fontSize: 10 }}>-</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell50}>
          <Text style={{ fontSize: 10, paddingLeft: 2 }}>HS à 50%</Text>
        </View>
        <View style={[styles.bordered, styles.tableCell15, { paddingRight: 3 }]}>
          <Text style={{ textAlign: 'right', fontSize: 10 }}>-</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={[styles.tableCell50, { paddingRight: 3 }]}>
          <Text style={{ fontSize: 10, paddingLeft: 2, fontWeight: 'bold', fontFamily: 'Roboto' }}>
            SALAIRE BRUT
          </Text>
        </View>
        <View
          style={[
            styles.bordered,
            styles.tableCell15,
            {
              padding: 1,
              paddingRight: 3,
              fontSize: 10,
              paddingLeft: 2,
            },
          ]}
        >
          <Text
            style={{ textAlign: 'right', fontSize: 10, fontWeight: 'bold', fontFamily: 'Roboto' }}
          >
            -
          </Text>
        </View>
      </View>
    </View>
  )
}

Section2.propTypes = {
  salarie: PropTypes.object,
}

export default Section2
