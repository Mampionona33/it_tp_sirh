import React from 'react'
import { fr } from 'date-fns/locale'
import { styles } from './styles'
import { format, setDefaultOptions } from 'date-fns'
import { Text, View } from '@react-pdf/renderer'
import { IBulletinDePaieProps } from '@src/interfaces/interfaceBulletinDePaie'

const Header = () => {
  return (
    <View style={[styles.row, styles.textBold, { width: '100%', marginTop: '5mm' }]}>
      <View style={[styles.borderRight, styles.borderBottom, styles.header, { width: '35%' }]}>
        <Text style={[{}]}>cotisation</Text>
      </View>
      <View style={[{ width: '65%' }]}>
        <View style={[styles.row]}>
          <View
            style={[
              styles.row,
              styles.borderRight,
              styles.borderBottom,
              styles.header,
              { width: '50%' },
            ]}
          >
            <Text>retenue</Text>
          </View>
          <View style={[styles.row, styles.borderBottom, styles.header, { width: '50%' }]}>
            <Text style={[]}>indemnités et avantages</Text>
          </View>
        </View>

        <View style={[styles.row, { width: '100%' }]}>
          <View style={[styles.row, { width: '50%' }]}>
            <Text
              style={[
                styles.borderRight,
                styles.borderBottom,
                styles.subTitle,
                { fontSize: 10, width: '33.33%' },
              ]}
            >
              base
            </Text>
            <Text
              style={[
                styles.borderRight,
                styles.borderBottom,
                styles.subTitle,
                { fontSize: 10, width: '33.33%' },
              ]}
            >
              taux
            </Text>
            <Text
              style={[
                styles.borderRight,
                styles.borderBottom,
                styles.subTitle,
                { fontSize: 10, width: '33%' },
              ]}
            >
              montant
            </Text>
          </View>
          <View style={[styles.row, { width: '50%' }]}>
            <Text
              style={[
                styles.borderRight,
                styles.borderBottom,
                styles.subTitle,
                { fontSize: 10, width: '33.33%' },
              ]}
            >
              base
            </Text>
            <Text
              style={[
                styles.borderRight,
                styles.borderBottom,
                styles.subTitle,
                { fontSize: 10, width: '33.33%' },
              ]}
            >
              taux
            </Text>
            <Text style={[styles.borderBottom, styles.subTitle, { fontSize: 10, width: '33.33%' }]}>
              montant
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const Section3 = (params: IBulletinDePaieProps) => {
  setDefaultOptions({ locale: fr })
  return (
    <>
      <View>
        <Header />
      </View>
    </>
  )
}

export default Section3
