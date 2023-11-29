import React from 'react'
import { Text, View, StyleSheet, pdf } from '@react-pdf/renderer'
import { PropTypes } from 'prop-types'
import registerFonts from './font'
import formatNumberWithSpaces from 'src/utils/formatNumberWithSpaces'
import { format, setDefaultOptions } from 'date-fns'
import { fr } from 'date-fns/locale'
import { styles } from './styles'

registerFonts()

export default function Section3(props) {
  // Définr la langue du date en français
  setDefaultOptions({ locale: fr })

  const indemnites = props.data.ajoutSalaire ? [props.data.ajoutSalaire].flat() : []
  const retenues = props.data.retenuSalaire ? [props.data.retenuSalaire].flat() : []
  const sousTotal = props.data.totalDeduction
  const baseIrsaArrondi = props.data.baseIrsaArrondi
  const cnaps = props.data.cnaps
  const totalRetenues = sousTotal + baseIrsaArrondi + cnaps
  const totalIndemnite = props.data.totalPrimeEtAvantage
  const salaireNet = props.data.salaireNet
  const avance = props.data.avance
  const salaireNetAPayer = props.data.salaireNetAPayer
  const dateVirement = format(new Date(), 'cccc dd MMMM uuuu', { locale: fr })

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
                    <View style={[styles.row, styles.borderRight, { width: '35%' }]}>
                      <Text style={[styles.cell, { paddingLeft: 2 }]}>{item.label}</Text>
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
                        { width: '35%' },
                      ]}
                    >
                      <Text style={[styles.cell, { paddingBottom: 20, paddingLeft: 2 }]}>
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
                    <View style={[styles.row, styles.borderRight, { width: '35%' }]}>
                      <Text style={[styles.cell, { paddingLeft: 2 }]}>{item.label}</Text>
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
          <View style={[styles.row, { width: '65%' }]}>
            <View style={[styles.row, { width: '50%' }]}>
              <View style={[styles.col, { width: '33.33%' }]}></View>
              <View style={[styles.col, styles.borderRight, { width: '33.33%' }]}></View>
              <View style={[styles.col, styles.borderBottom, styles.borderRight, { width: '33%' }]}>
                <Text style={[styles.textRight, styles.cell, styles.row, styles.sousTotal, {}]}>
                  {totalRetenues && formatNumberWithSpaces(totalRetenues)}
                </Text>
              </View>
            </View>
            <View style={[styles.row, { width: '50%' }]}>
              <View style={[styles.col, { width: '33.33%' }]}></View>
              <View style={[styles.col, styles.borderRight, { width: '33.33%' }]}></View>
              <View style={[styles.col, styles.borderBottom, { width: '33%' }]}>
                <Text
                  style={[
                    styles.textRight,
                    styles.cell,
                    {
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

  const Divider = () => {
    return (
      <>
        <View
          style={[styles.row, styles.borderTop, styles.cell, { width: '100%', marginTop: 5 }]}
        ></View>
      </>
    )
  }

  const FooterSalaireNet = () => {
    return (
      <>
        <View style={[styles.row, styles.borderTop, { width: '100%' }]}>
          <View style={[styles.row, styles.borderRight, { width: '56.66%' }]}></View>
          <View
            style={[styles.row, styles.justifyBetween, styles.borderBottom, { width: '43.44%' }]}
          >
            <View style={[{ width: '50%' }]}>
              <Text
                style={[
                  styles.cell,
                  styles.textMedium,
                  { paddingLeft: 4, paddingBottom: 1, fontSize: 11 },
                ]}
              >
                Salaire net
              </Text>
            </View>
            <View style={[{ width: '50%' }]}>
              <Text
                style={[
                  styles.cell,
                  styles.textRight,
                  styles.textMedium,
                  { paddingBottom: 1, fontSize: 11 },
                ]}
              >
                {salaireNet && formatNumberWithSpaces(salaireNet)}
              </Text>
            </View>
          </View>
        </View>
      </>
    )
  }

  const FooterAvance = () => {
    return (
      <>
        <View style={[styles.row, { width: '100%' }]}>
          <View style={[styles.row, { width: '56.66%' }]}></View>
          <View style={[styles.row, styles.justifyBetween, { width: '43.44%' }]}>
            <View style={[{ width: '50%' }]}>
              <Text style={[styles.cell, styles.textMedium, { paddingLeft: 4, fontSize: 11 }]}>
                Avance sur salaire
              </Text>
            </View>
            <View style={[{ width: '50%', fontSize: 11 }]}>
              <Text style={[styles.cell, styles.textRight, styles.textMedium, {}]}>
                {avance && formatNumberWithSpaces(avance)}
              </Text>
            </View>
          </View>
        </View>
      </>
    )
  }

  const FooterNetAPayer = () => {
    return (
      <>
        <View style={[styles.row, { width: '100%' }]}>
          <View style={[styles.row, { width: '56.66%' }]}>
            <Text
              style={[
                styles.cell,
                styles.textBoldItalic,
                {
                  paddingLeft: 2,
                  fontSize: 9,

                  paddingBottom: 2,
                  alignItems: 'baseline',
                },
              ]}
            >
              Payé par virement bancaire le : {dateVirement}
            </Text>
          </View>
          <View
            style={[
              styles.row,
              styles.justifyBetween,
              styles.textBold,
              { width: '43.44%', fontSize: 12 },
            ]}
          >
            <View style={[{ width: '50%' }]}>
              <Text style={[styles.cell, { paddingLeft: 4 }]}>Net à payer</Text>
            </View>
            <View style={[{ width: '50%', fontSize: 11 }]}>
              <Text style={[styles.cell, styles.textRight, {}]}>
                {salaireNetAPayer && formatNumberWithSpaces(salaireNetAPayer)}
              </Text>
            </View>
          </View>
        </View>
      </>
    )
  }

  const Avertisement = () => {
    return (
      <>
        <View style={[styles.borderBottom, styles.borderTop, { width: '100%', marginTop: 40 }]}>
          <Text style={[styles.textBoldItalic, { textAlign: 'center', fontSize: 12 }]}>
            A CONSERVER SANS LIMITATION DE DUREE
          </Text>
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
        <View style={[{ marginTop: 5 }]}>
          <Divider />
        </View>
        <Divider />
        <FooterSalaireNet />
        <FooterAvance />
        <FooterNetAPayer />
        <Avertisement />
      </View>
    </>
  )
}

Section3.propTypes = {
  salarie: PropTypes.object,
  data: PropTypes.object,
}
