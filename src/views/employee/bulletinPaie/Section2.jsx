import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, pdf } from '@react-pdf/renderer'
import { PropTypes } from 'prop-types'
import registerFonts from './font'
import formatAriaryMga from 'src/utils/formatAriaryMga'

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
  tableCell10: {
    width: '15%',
  },
  bordered: {
    borderStyle: 'solid',
    borderWidth: 1,
  },
})

const Section2 = ({ salarie }) => {
  const salaireBase = formatAriaryMga(salarie.salaireBase)

  //   A utiliser dans une composante pour génerer des pdf
  function formatNumberWithSpaces(number) {
    return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '0, 00'
  }

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={[styles.tableCell50]}>
          <Text style={{ paddingTop: 15, paddingLeft: 2, fontSize: 10 }}>Salaire de base</Text>
        </View>
        <View
          style={[
            styles.tableCell10,
            styles.bordered,
            { marginTop: 15, fontSize: 10, textAlign: 'left', paddingLeft: 2 },
          ]}
        >
          <Text>{formatNumberWithSpaces(salarie.salaireBase)} Ar </Text>
        </View>
        <View style={[styles.tableCell10, { paddingLeft: 2, marginTop: 15, fontSize: 10 }]}>
          <Text>Plafond SME :</Text>
        </View>
        <View
          style={[
            styles.tableCell10,
            styles.bordered,
            { paddingLeft: 2, marginTop: 15, fontSize: 10 },
          ]}
        >
          <Text> 1904000,00 </Text>
        </View>
      </View>
    </View>
  )
}

Section2.propTypes = {
  salarie: PropTypes.object,
}

export default Section2
