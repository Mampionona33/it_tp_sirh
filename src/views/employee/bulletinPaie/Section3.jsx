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
  col33: {
    width: '33%',
  },
  col30: {
    width: '30%',
  },
  col35: {
    width: '35%',
  },
  col2: {
    width: '10%',
  },
})

const Section3 = ({ salarie }) => {
  const bulletinDePaieData = [
    {
      label: 'Cotisation 1',
      type: 'retenue',
      base: 100,
      taux: 0.5,
      montant: 50,
    },
    {
      label: 'Cotisation 2',
      type: 'indemnite',
      base: 200,
      taux: 0.3,
      montant: 60,
    },
  ]

  const renderRows = () => {
    return (
      <>
        {/* Données du tableau */}
        {bulletinDePaieData.map((item, index) => (
          <React.Fragment key={index}>
            {/* Colonne cotisation qui contient le label de la cotisation */}
            <View style={[styles.tableRow, { fontSize: 10 }]}>
              <Text style={[styles.tableCell, { width: '33%', backgroundColor: 'red' }]}>
                {item.label}
              </Text>
              {/* Colonnes pour la base, le taux et le montant en fonction du type */}
              <View style={[styles.tableRow, { backgroundColor: 'yellow', width: '68%' }]}>
                {item.type === 'retenue' && (
                  <React.Fragment>
                    {/* Colonnes de retenue */}
                    <Text style={[styles.tableCell, { backgroundColor: 'green', width: '31%' }]}>
                      {item.base}
                    </Text>
                    <Text style={[styles.tableCell, { backgroundColor: 'blue', width: '32%' }]}>
                      {item.taux}
                    </Text>
                    <Text style={[styles.tableCell, { backgroundColor: 'green', width: '33%' }]}>
                      {item.montant}
                    </Text>

                    {/* Colonnes vides pour indemnité */}
                    <Text
                      style={[styles.tableCell, { width: '34%', backgroundColor: 'blue' }]}
                    ></Text>
                    <Text
                      style={[styles.tableCell, { backgroundColor: 'green', width: '35%' }]}
                    ></Text>
                    <Text
                      style={[styles.tableCell, { backgroundColor: 'blue', width: '36%' }]}
                    ></Text>
                  </React.Fragment>
                )}

                {item.type === 'indemnite' && (
                  <React.Fragment>
                    {/* Colonnes vides pour retenue */}
                    <Text style={[styles.tableCell, { width: '31%' }]}></Text>
                    <Text style={[styles.tableCell, { width: '32%' }]}></Text>
                    <Text style={[styles.tableCell, { width: '33%' }]}></Text>

                    {/* Colonnes d'indemnité */}
                    <Text style={[styles.tableCell, { width: '34%' }]}>{item.base}</Text>
                    <Text style={[styles.tableCell, { width: '35%' }]}>{item.taux}</Text>
                    <Text style={[styles.tableCell, { width: '36%' }]}>{item.montant}</Text>
                  </React.Fragment>
                )}
              </View>
            </View>
          </React.Fragment>
        ))}
      </>
    )
  }

  return (
    <>
      <View style={[styles.table, { marginTop: 15, borderTop: 2 }]}>
        <View style={[styles.tableRow]}>
          <View
            style={[
              styles.tableCell,
              styles.col33,
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

          <View style={[styles.tableCell, styles.col33, { borderRight: 2 }]}>
            <Text style={[styles.textBold, { textAlign: 'center', borderBottom: 2 }]}>RETENUE</Text>
            <View style={[styles.tableRow]}>
              <Text
                style={[
                  styles.textBold,
                  styles.col33,
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
                  styles.col33,
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
                  styles.col33,
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

          <View style={[styles.tableCell, { width: '35%' }]}>
            <Text style={[styles.textBold, { textAlign: 'center', borderBottom: 2 }]}>
              INDEMNITE ET AVANTAGES
            </Text>
            <View style={[styles.tableRow]}>
              <Text
                style={[
                  styles.textBold,
                  styles.col33,
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
                  styles.col33,
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
                  styles.col33,
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
        </View>
        {renderRows()}
      </View>
    </>
  )
}

Section3.propTypes = {
  salarie: PropTypes.object,
}

export default Section3
