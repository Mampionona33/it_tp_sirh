import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, pdf } from '@react-pdf/renderer'
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
    paddingTop: 4,
  },
  col1: {
    width: '33%',
  },
  col2: {
    width: '10%',
  },
})

const Section3 = ({ salarie }) => {
  return (
    <>
      <View style={[styles.table, { marginTop: 15, borderTop: 2 }]}>
        <View style={[styles.tableRow]}>
          <View
            style={[
              styles.tableCell,
              styles.col1,
              { paddingBottom: 0, borderRight: 2, borderBottom: 2 },
            ]}
          >
            <Text
              style={[
                styles.textBold,
                {
                  textAlign: 'center',
                  marginTop: 5,
                  marginBottom: 2,
                },
              ]}
            >
              COTISATIONS
            </Text>
          </View>

          <View style={[styles.tableCell, styles.col1, { borderRight: 2 }]}>
            <Text style={[styles.textBold, { textAlign: 'center', borderBottom: 2 }]}>RETENUE</Text>
            <View style={[styles.tableRow]}>
              <Text
                style={[
                  styles.textBold,
                  styles.col1,
                  {
                    textAlign: 'left',
                    paddingLeft: 2,
                    borderBottom: 2,
                    borderRight: 2,
                    paddingTop: 4,
                  },
                ]}
              >
                Base
              </Text>
              <Text
                style={[
                  styles.textBold,
                  styles.col1,
                  {
                    textAlign: 'left',
                    paddingLeft: 2,
                    borderBottom: 2,
                    borderRight: 2,
                    paddingTop: 4,
                  },
                ]}
              >
                Taux
              </Text>
              <Text
                style={[
                  styles.textBold,
                  styles.col1,
                  {
                    textAlign: 'left',
                    borderBottom: 2,
                    paddingTop: 4,
                    paddingLeft: 2,
                    width: '35%',
                  },
                ]}
              >
                Montant
              </Text>
            </View>
          </View>

          <View style={[styles.tableCell, styles.col1]}>
            <Text style={[styles.textBold, { textAlign: 'center', borderBottom: 2 }]}>
              INDEMNITE ET AVANTAGES
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}

Section3.propTypes = {
  salarie: PropTypes.object,
}

export default Section3
