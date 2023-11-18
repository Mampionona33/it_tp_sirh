import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { PropTypes } from 'prop-types'
import registerFonts from './font'
import formatNumberWithSpaces from 'src/utils/formatNumberWithSpaces'

// Chager les fontes personnalisées
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

const Section2 = (props) => {
  const salaireBase = props.data.salarie.salaireBase
    ? formatNumberWithSpaces(props.data.salarie.salaireBase) + ' Ar'
    : '-'
  const valeurHs30 = props.data.valeurHs30
    ? formatNumberWithSpaces(props.data.valeurHs30) + ' Ar'
    : '-'
  const valeurHs50 = props.data.valeurHs50
    ? formatNumberWithSpaces(props.data.valeurHs50) + ' Ar'
    : '-'
  const salaireBrute = props.data.salaireBrute
    ? formatNumberWithSpaces(props.data.salaireBrute) + ' Ar'
    : '-'

  return (
    <View style={[styles.table]}>
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
          <Text>{salaireBase}</Text>
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
          <Text style={[{ textAlign: 'right', fontSize: 10 }]}> {props.data.plafondSME} </Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell50}>
          <Text style={{ fontSize: 10, paddingLeft: 2 }}>HS à 30%</Text>
        </View>
        <View style={[styles.bordered, styles.tableCell15, { paddingRight: 3 }]}>
          <Text style={{ textAlign: 'right', fontSize: 10 }}>{valeurHs30}</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell50}>
          <Text style={{ fontSize: 10, paddingLeft: 2 }}>HS à 50%</Text>
        </View>
        <View style={[styles.bordered, styles.tableCell15, { paddingRight: 3 }]}>
          <Text style={{ textAlign: 'right', fontSize: 10 }}>{valeurHs50}</Text>
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
            {salaireBrute}
          </Text>
        </View>
      </View>

      <View style={[styles.tableRow, { borderBottom: 2, marginTop: 15 }]}></View>
      <View style={[styles.tableRow, { marginTop: 15 }]}>
        <View style={[{ width: '45%' }]}></View>
        <View style={[{ width: '10%', borderBottom: 2 }]}></View>
      </View>
    </View>
  )
}

Section2.propTypes = {
  data: PropTypes.object,
}

export default Section2
