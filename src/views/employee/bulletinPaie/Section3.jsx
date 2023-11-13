import React from 'react'
import { Text, View, StyleSheet, pdf } from '@react-pdf/renderer'
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

const Section3 = (props) => {
  const retenues = props.data.retenue ? props.data.retenue : []
  const indemnites = props.data.indemnite ? props.data.indemnite : []

  console.log(props.data)

  const renderRows = () => {
    return (
      <>
        {/* Données du tableau d'indemnités */}
        {indemnites.map((item, index) => (
          <React.Fragment key={index}>
            {/* Colonne cotisation qui contient le label de la cotisation */}
            <View style={[styles.tableRow, { fontSize: 10 }]}>
              <Text style={[styles.tableCell, { width: '33%', paddingLeft: 4 }]}>{item.label}</Text>
              {/* Colonnes pour la base, le taux et le montant en fonction du type */}
              <View style={[styles.tableRow, { width: '68%' }]}>
                {/* Colonnes vides pour retenue */}
                <Text style={[styles.tableCell, { width: '31%', paddingLeft: 4 }]}></Text>
                <Text style={[styles.tableCell, { width: '32%', paddingLeft: 4 }]}></Text>
                <Text style={[styles.tableCell, { width: '33%', paddingLeft: 4 }]}></Text>

                {/* Colonnes d'indemnité */}
                <Text style={[styles.tableCell, { width: '34%', paddingLeft: 4 }]}>
                  {item.base}
                </Text>
                <Text style={[styles.tableCell, { width: '35%', paddingLeft: 4 }]}>
                  {item.taux}
                </Text>
                <Text style={[styles.tableCell, { width: '36%', paddingLeft: 4 }]}>
                  {item.montant}
                </Text>
              </View>
            </View>
          </React.Fragment>
        ))}

        {/* Données du tableau */}
        {retenues.map((item, index) => (
          <React.Fragment key={index}>
            {/* Colonne cotisation qui contient le label de la cotisation */}
            <View style={[styles.tableRow, { fontSize: 10 }]}>
              <Text style={[styles.tableCell, { width: '33%', paddingLeft: 4 }]}>{item.label}</Text>
              {/* Colonnes pour la base, le taux et le montant en fonction du type */}
              <View style={[styles.tableRow, { width: '68%' }]}>
                {/* Colonnes de retenue */}
                <Text style={[styles.tableCell, { width: '31%', paddingLeft: 4 }]}>
                  {item.base}
                </Text>
                <Text style={[styles.tableCell, { width: '32%', paddingLeft: 4 }]}>
                  {item.taux}
                </Text>
                <Text style={[styles.tableCell, { width: '33%', paddingLeft: 4 }]}>
                  {item.montant}
                </Text>

                {/* Colonnes vides pour indemnité */}
                <Text style={[styles.tableCell, { width: '34%', paddingLeft: 4 }]}></Text>
                <Text style={[styles.tableCell, { width: '35%', paddingLeft: 4 }]}></Text>
                <Text style={[styles.tableCell, { width: '36%', paddingLeft: 4 }]}></Text>
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
                    paddingLeft: 4,
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
                    paddingLeft: 4,
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
                    paddingLeft: 4,
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
                    paddingLeft: 4,
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
                    paddingLeft: 4,
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
                    paddingLeft: 4,
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
  data: PropTypes.object,
}

export default Section3
