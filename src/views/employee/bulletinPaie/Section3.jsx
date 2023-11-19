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
  borderBottom: {
    borderBottom: 2,
  },
  header: {
    fontSize: 12,
    justifyContent: 'center',
    textTransform: 'uppercase',
    alignItems: 'center',
    paddingTop: 3,
    paddingBottom: 3,
    borderTop: 2,
  },
  subTitle: {
    textAlign: 'left',
    paddingLeft: 3,
    textTransform: 'capitalize',
  },
  cell: {
    paddingRight: 3,
    paddingBottom: 4,
    paddingTop: 4,
    fontSize: 10,
  },
  textRight: {
    textAlign: 'right',
    paddingRight: 3,
  },
  sousTotal: {
    fontSize: 9,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
})

export default function Section3(props) {
  const indemnites = props.data.ajoutSalaire ? [props.data.ajoutSalaire].flat() : []
  const retenues = props.data.retenuSalaire ? [props.data.retenuSalaire].flat() : []
  const sousTotal = props.data.totalDeduction
  const irsa = props.data.irsaArrondi
  const cnaps = props.data.cnaps
  const totalRetenues = sousTotal + irsa + cnaps
  const totalIndemnite = props.data.totalPrimeEtAvantage

  console.log(totalRetenues)

  const Header = () => {
    return (
      <View style={[styles.row, { width: '100%', marginTop: '5mm' }]}>
        <View
          style={[
            styles.borderRight,
            styles.borderBottom,
            styles.header,
            { backgroundColor: 'green', width: '35%' },
          ]}
        >
          <Text style={[{ backgroundColor: 'blue' }]}>cotisation</Text>
        </View>
        <View style={[{ width: '65%' }]}>
          <View style={[styles.row]}>
            <View
              style={[
                styles.row,
                styles.borderRight,
                styles.borderBottom,
                styles.header,
                { backgroundColor: 'red', width: '50%' },
              ]}
            >
              <Text>retenue</Text>
            </View>
            <View
              style={[
                styles.row,
                styles.borderBottom,
                styles.header,
                { backgroundColor: 'yellow', width: '50%' },
              ]}
            >
              <Text>indemnités et avantages</Text>
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
                style={[styles.borderRight, styles.borderBottom, { fontSize: 10, width: '33.33%' }]}
              >
                taux
              </Text>
              <Text
                style={[styles.borderBottom, styles.subTitle, { fontSize: 10, width: '33.33%' }]}
              >
                montant
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
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
                      <Text style={[styles.cell, { backgroundColor: 'red' }]}>{item.label}</Text>
                    </View>

                    <View style={[styles.row, { width: '65%' }]}>
                      <View style={[styles.row, { width: '50%' }]}>
                        <Text style={[styles.borderRight, { width: '33.33%' }]}></Text>
                        <Text style={[styles.borderRight, { width: '33.33%' }]}></Text>
                        <Text style={[styles.borderRight, { width: '33%' }]}></Text>
                      </View>
                      <View style={[styles.row, { width: '50%' }]}>
                        <Text
                          style={[
                            styles.borderRight,
                            styles.textRight,
                            { width: '33.33%' },
                            styles.cell,
                          ]}
                        >
                          {item.base}
                        </Text>
                        <Text
                          style={[
                            styles.borderRight,
                            styles.textRight,
                            { width: '33.33%' },
                            styles.cell,
                          ]}
                        >
                          {item.taux}
                        </Text>
                        <Text style={[{ width: '33%' }, styles.cell, styles.textRight]}>
                          {item.montant ? formatNumberWithSpaces(item.montant) : '-'}
                        </Text>
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
              return key === retenues.length - 1 ? (
                <React.Fragment key={key}>
                  <View style={[styles.row, { width: '100%' }]}>
                    <View
                      style={[
                        styles.row,
                        styles.borderRight,
                        styles.borderBottom,
                        { width: '35%', backgroundColor: 'green' },
                      ]}
                    >
                      <Text style={[styles.cell, { backgroundColor: 'red', paddingBottom: 20 }]}>
                        {item.label}
                      </Text>
                    </View>

                    <View style={[styles.row, { width: '65%' }]}>
                      <View style={[styles.row, { width: '50%' }]}>
                        <Text
                          style={[
                            styles.borderRight,
                            styles.cell,
                            styles.textRight,
                            styles.borderBottom,
                            { width: '33.33%', paddingBottom: 20 },
                          ]}
                        >
                          {item.base ? formatNumberWithSpaces(item.base) : '-'}
                        </Text>
                        <Text
                          style={[
                            styles.borderRight,
                            styles.cell,
                            styles.textRight,
                            styles.borderBottom,
                            { width: '33.33%', paddingBottom: 20 },
                          ]}
                        >
                          {item.taux && item.taux * 100 + '%'}
                        </Text>
                        <Text
                          style={[
                            styles.borderRight,
                            styles.cell,
                            styles.textRight,
                            styles.borderBottom,
                            { width: '33%', paddingBottom: 20 },
                          ]}
                        >
                          {item.montant ? formatNumberWithSpaces(item.montant) : '-'}
                        </Text>
                      </View>
                      <View style={[styles.row, { width: '50%' }]}>
                        <Text
                          style={[
                            styles.borderRight,
                            styles.borderBottom,
                            { width: '33.33%', paddingBottom: 20 },
                          ]}
                        ></Text>
                        <Text
                          style={[
                            styles.borderRight,
                            styles.borderBottom,
                            { width: '33.33%', paddingBottom: 20 },
                          ]}
                        ></Text>
                        <Text
                          style={[styles.borderBottom, { width: '33.33%', paddingBottom: 20 }]}
                        ></Text>
                      </View>
                    </View>
                  </View>
                </React.Fragment>
              ) : (
                <React.Fragment key={key}>
                  <View style={[styles.row, { width: '100%' }]}>
                    <View
                      style={[
                        styles.row,
                        styles.borderRight,
                        { width: '35%', backgroundColor: 'green' },
                      ]}
                    >
                      <Text style={[styles.cell, { backgroundColor: 'red' }]}>{item.label}</Text>
                    </View>

                    <View style={[styles.row, { width: '65%' }]}>
                      <View style={[styles.row, { width: '50%' }]}>
                        <Text
                          style={[
                            styles.borderRight,
                            styles.cell,
                            styles.textRight,
                            { width: '33.33%' },
                          ]}
                        >
                          {item.base ? formatNumberWithSpaces(item.base) : '-'}
                        </Text>
                        <Text
                          style={[
                            styles.borderRight,
                            styles.cell,
                            styles.textRight,
                            { width: '33.33%' },
                          ]}
                        >
                          {item.taux && item.taux * 100 + '%'}
                        </Text>
                        <Text
                          style={[
                            styles.borderRight,
                            styles.cell,
                            styles.textRight,
                            { width: '33%' },
                          ]}
                        >
                          {item.montant ? formatNumberWithSpaces(item.montant) : '-'}
                        </Text>
                      </View>
                      <View style={[styles.row, { width: '50%' }]}>
                        <Text style={[styles.borderRight, { width: '33.33%' }]}></Text>
                        <Text style={[styles.borderRight, { width: '33.33%' }]}></Text>
                        <Text style={[{ width: '33.33%' }]}></Text>
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
  const Total = () => {
    return (
      <>
        <View style={[styles.row, { width: '100%' }]}>
          <View
            style={[styles.borderRight, styles.row, styles.borderBottom, { width: '35%' }]}
          ></View>
          <View style={[styles.row, { width: '65%', backgroundColor: 'red' }]}>
            <View style={[styles.row, { width: '50%' }]}>
              <View style={[styles.col, { width: '33.33%', backgroundColor: 'green' }]}></View>
              <View
                style={[
                  styles.col,
                  styles.borderRight,
                  { width: '33.33%', backgroundColor: 'green' },
                ]}
              ></View>
              <View
                style={[
                  styles.col,
                  styles.borderBottom,
                  styles.borderRight,
                  { width: '33%', backgroundColor: 'red' },
                ]}
              >
                <Text
                  style={[
                    styles.textRight,
                    styles.cell,
                    styles.row,
                    styles.sousTotal,
                    {
                      backgroundColor: 'blue',
                    },
                  ]}
                >
                  {totalRetenues && formatNumberWithSpaces(totalRetenues)}
                </Text>
              </View>
            </View>
            <View style={[styles.row, { width: '50%' }]}>
              <View style={[styles.col, { width: '33.33%', backgroundColor: 'blue' }]}></View>
              <View
                style={[
                  styles.col,
                  styles.borderRight,
                  { width: '33.33%', backgroundColor: 'blue' },
                ]}
              ></View>
              <View
                style={[styles.col, styles.borderBottom, { width: '33%', backgroundColor: 'red' }]}
              >
                <Text
                  style={[
                    styles.textRight,
                    styles.cell,
                    {
                      backgroundColor: 'green',
                      fontSize: 9,
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                    },
                  ]}
                >
                  {totalIndemnite && formatNumberWithSpaces(totalIndemnite)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </>
    )
  }
  return (
    <>
      <View>
        <Header />
        <Indemnites />
        <Retenues />
        <Total />
      </View>
    </>
  )
}

Section3.propTypes = {
  salarie: PropTypes.object,
  data: PropTypes.object,
}
