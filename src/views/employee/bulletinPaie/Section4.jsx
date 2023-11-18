import React from 'react'
import { Text, View, StyleSheet, pdf } from '@react-pdf/renderer'
import { PropTypes, array } from 'prop-types'
import registerFonts from './font'
import { setBulletinDePaie } from 'src/redux/bulletinDePaie/bulletinDePaieReducer'
import formatNumberWithSpaces from 'src/utils/formatNumberWithSpaces'

registerFonts()

const styles = StyleSheet.create({
  table: {
    display: 'flex',
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
  },
  col: {
    flexDirection: 'column',
    display: 'flex',
  },
  borderRight: {
    borderRight: 2,
  },
})

export default function Section4(props) {
  const indemnites = props.data.ajoutSalaire ? [props.data.ajoutSalaire].flat() : []
  const retenues = props.data.retenuSalaire ? [props.data.retenuSalaire].flat() : []

  const Indemnites = () => {
    return (
      <>
        <View>
          {/* <Text>Test</Text> */}
          {indemnites.length > 0 &&
            indemnites.map((item, key) => {
              return (
                <React.Fragment key={key}>
                  <View style={[styles.row, { width: '100%' }]}>
                    <View
                      style={[
                        styles.row,
                        styles.borderRight,
                        { width: '35%', backgroundColor: 'green' },
                      ]}
                    >
                      <Text style={[{ fontSize: 10, backgroundColor: 'red' }]}>{item.label}</Text>
                    </View>

                    <View style={[styles.row, { width: '65%' }]}>
                      <View style={[styles.row, { width: '50%' }]}>
                        <Text style={[styles.borderRight, { width: '33.33%' }]}></Text>
                        <Text style={[styles.borderRight, { width: '33.33%' }]}></Text>
                        <Text style={[styles.borderRight, { width: '33%' }]}></Text>
                      </View>
                      <View style={[styles.row, { width: '50%' }]}>
                        <Text style={{ width: '33.33%', fontSize: 10 }}></Text>
                        <Text style={{ width: '33.33%', fontSize: 10 }}></Text>
                        <Text style={{ width: '33.33%', fontSize: 10 }}>{item.montant}</Text>
                      </View>
                    </View>
                  </View>
                </React.Fragment>
              )
            })}
        </View>
      </>
    )
  }

  const Retenues = () => {
    return (
      <>
        <View>
          {retenues.length > 0 &&
            retenues.map((item, key) => {
              console.log(item)

              return (
                <React.Fragment key={key}>
                  <View style={[styles.row, { width: '100%' }]}>
                    <View style={[styles.row, { width: '35%', backgroundColor: 'green' }]}>
                      <Text style={{ fontSize: 10, backgroundColor: 'red' }}>{item.label}</Text>
                    </View>

                    <View style={[styles.row, { width: '65%' }]}>
                      <View style={[styles.row, { width: '50%' }]}>
                        <Text style={{ width: '33.33%', fontSize: 10 }}>{item.base}</Text>
                        <Text style={{ width: '33.33%', fontSize: 10 }}>{item.taux}</Text>
                        <Text style={{ width: '33.33%', fontSize: 10 }}>{item.montant}</Text>
                      </View>
                      <View style={[styles.row, { width: '50%' }]}>
                        <Text style={{ width: '33.33%' }}></Text>
                        <Text style={{ width: '33.33%' }}></Text>
                        <Text style={{ width: '33.33%' }}></Text>
                      </View>
                    </View>
                  </View>
                </React.Fragment>
              )
            })}
        </View>
      </>
    )
  }

  return (
    <>
      <View style={[styles.row, { width: '100%', marginTop: '5mm' }]}>
        <View style={[styles.borderRight, { backgroundColor: 'green', width: '35%' }]}>
          <Text style={[{ backgroundColor: 'blue' }]}>cotisation</Text>
        </View>
        <View style={[{ width: '65%' }]}>
          <View style={[styles.row]}>
            <Text
              style={[styles.row, styles.borderRight, { backgroundColor: 'red', width: '50%' }]}
            >
              retenue
            </Text>
            <Text style={[styles.row, { backgroundColor: 'yellow' }]}>indemnités et avantages</Text>
          </View>
          <View style={[styles.row, { width: '100%' }]}>
            <View style={[styles.row, { width: '50%' }]}>
              <Text style={[styles.borderRight, { fontSize: 10, width: '33.33%' }]}>base</Text>
              <Text style={[styles.borderRight, { fontSize: 10, width: '33.33%' }]}>taux</Text>
              <Text style={[styles.borderRight, { fontSize: 10, width: '33%' }]}>montant</Text>
            </View>
            <View style={[styles.row, { width: '50%' }]}>
              <Text style={[styles.borderRight, { fontSize: 10, width: '33.33%' }]}>base</Text>
              <Text style={[styles.borderRight, { fontSize: 10, width: '33.33%' }]}>taux</Text>
              <Text style={[{ fontSize: 10, width: '33.33%' }]}>montant</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Indemnites />
        <Retenues />
      </View>
    </>
  )
}

Section4.propTypes = {
  salarie: PropTypes.object,
  data: PropTypes.object,
}
