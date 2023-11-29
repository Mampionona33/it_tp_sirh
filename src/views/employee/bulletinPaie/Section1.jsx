import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { PropTypes } from 'prop-types'
import registerFonts from './font'
import { styles } from './styles'

registerFonts()

const Section1 = (props) => {
  const dateSelectionne = props.data.dateSelectionne
  const nomEmployeur = props.data.employeur.nom
  const addresseEmployeur = props.data.employeur.adresse
  const CP_et_VilleEmployeur = props.data.employeur.CP_et_Ville
  const nif = props.data.employeur.nif
  const stat = props.data.employeur.stat
  const rcs = props.data.employeur.rcs
  const nomPrenomSalarie = props.data.salarie.nom
  const prenomSalarie = props.data.salarie.prenom
  const fonction = props.data.salarie.poste
  const numMatriculSalarie = props.data.salarie.matricule
  const catSalarie = props.data.salarie.cat

  const Line = ({ label, value, valueBold, marginBottom }) => {
    return (
      <View style={[styles.row, { width: '100%' }]}>
        <Text
          style={[
            styles.cell,
            styles.textBoldItalic,
            styles.textBold,
            { width: '45%', padding: 2 },
          ]}
        >
          {label}
        </Text>
        <Text
          style={[
            styles.cell,
            valueBold && styles.textBold,
            {
              width: '65%',
              textAlign: 'center',
              padding: 2,
              marginBottom: marginBottom ? marginBottom : 0,
            },
          ]}
        >
          {value}
        </Text>
      </View>
    )
  }
  Line.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string || PropTypes.number,
    valueBold: PropTypes.bool,
    marginBottom: PropTypes.number,
  }

  const Employeur = () => {
    return (
      <>
        <Line label={'Nom:'} value={nomEmployeur} valueBold={true} />
        <Line label={'Adresse:'} value={addresseEmployeur} />
        <Line label={'CP et Ville:'} value={CP_et_VilleEmployeur} />
        <Line label={'Numéro NIF:'} value={nif} />
        <Line label={'Numéro STAT:'} value={stat} />
        <Line label={'RSC:'} value={rcs} marginBottom={15} />
      </>
    )
  }

  const Salarie = () => {
    return (
      <>
        <Line label={'Nom et Prénom:'} value={`${nomPrenomSalarie} ${prenomSalarie}`} />
        <Line label={'Fonction:'} value={fonction} />
        <Line label={'Numéro Matricule:'} value={numMatriculSalarie} />
        <Line label={'Catégorie:'} value={catSalarie} />
        <Line label={'Mois:'} value={dateSelectionne} />
      </>
    )
  }

  return (
    <>
      <View style={[{ width: '100%' }]}>
        <Text
          style={[
            styles.textBold,
            { textTransform: 'uppercase', textAlign: 'center', fontSize: 11, padding: 1 },
          ]}
        >
          bulletin de paie
        </Text>
      </View>
      <View style={[styles.row, styles.borderTop, styles.borderBottom, { width: '100%' }]}>
        <Text
          style={[
            styles.borderRight,
            styles.textBold,
            {
              width: '45%',
              fontSize: 10,
              textTransform: 'uppercase',
              paddingLeft: 5,
              paddingBottom: 1,
              paddingTop: 1,
            },
          ]}
        >
          Employeur:
        </Text>
        <Text
          style={[
            styles.textBold,
            {
              width: '55%',
              fontSize: 10,
              textTransform: 'uppercase',
              paddingLeft: 5,
              paddingBottom: 1,
              paddingTop: 1,
            },
          ]}
        >
          Salarie:
        </Text>
      </View>
      <View style={[styles.row, styles.borderBottom, { width: '100%' }]}>
        <View style={[styles.borderRight, { width: '45%' }]}>
          <Employeur />
        </View>
        <View style={[{ width: '55%' }]}>
          <Salarie />
        </View>
      </View>
    </>
  )
}

Section1.propTypes = {
  data: PropTypes.object,
}

export default Section1
