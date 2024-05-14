import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'
import registerFonts from './font'
import formatNumberWithSpaces from 'src/utils/formatNumberWithSpaces'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'

// Chager les fontes personnalisées
registerFonts()

const styles = StyleSheet.create({
  table: {
    display: 'flex',
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
export interface Section2Props {
  data: IBulletinDePaieProps
}
const Section2 = ({ data }: Section2Props) => {
  const { valHsi130, valHsi150, valHs30, valHs50, valHdim, valHFerie, valHsni130, valHsni150 } =
    data
  const salaireDeBase = data.salaireDeBase
    ? formatNumberWithSpaces(data.salaireDeBase) + ' Ar'
    : '-'
  const hsExoneree = data.valHsni130 ? formatNumberWithSpaces(valHsni130 + valHsni150) + ' Ar' : '-'
  const hsImposables = data.valHsni150
    ? formatNumberWithSpaces(valHsi130 + valHsi150 + valHs30 + valHs50 + valHdim + valHFerie) +
      ' Ar'
    : '-'
  const salaireBrut = data.salaireBrut ? formatNumberWithSpaces(data.salaireBrut) + ' Ar' : '-'

  const plafondSME = data.plafondSME ? formatNumberWithSpaces(data.plafondSME) + ' Ar' : '-'

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
          <Text>{salaireDeBase}</Text>
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
          <Text style={[{ textAlign: 'right', fontSize: 10 }]}> {plafondSME} </Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell50}>
          <Text style={{ fontSize: 10, paddingLeft: 2 }}>HS exonérée</Text>
        </View>
        <View style={[styles.bordered, styles.tableCell15, { paddingRight: 3 }]}>
          <Text style={{ textAlign: 'right', fontSize: 10 }}>{hsExoneree}</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell50}>
          <Text style={{ fontSize: 10, paddingLeft: 2 }}>HS imposable</Text>
        </View>
        <View style={[styles.bordered, styles.tableCell15, { paddingRight: 3 }]}>
          <Text style={{ textAlign: 'right', fontSize: 10 }}>{hsImposables}</Text>
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
            {salaireBrut}
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

// Section2.propTypes = {
//   data: PropTypes.object,
// }

export default Section2
