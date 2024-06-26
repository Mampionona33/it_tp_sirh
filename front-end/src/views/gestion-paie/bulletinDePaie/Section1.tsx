import React from 'react'
import { Text, View, Image } from '@react-pdf/renderer'
import registerFonts from './font'
import { styles } from './styles'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Logo from 'src/assets/images/LogoLs.png'

registerFonts()

interface ISection1Props {
  data: any
}

interface ILineProps {
  label: string
  value: string
  valueBold?: boolean
  marginBottom?: number
}

interface IEmployeurProps {
  data: {
    nomEmployeur: string
    addresseEmployeur: string
    CP_et_VilleEmployeur: string
    nif: string
    stat: string
    rcs: string
  }
}

interface ISalarieProps {
  data: {
    nomPrenomSalarie: string
    prenomSalarie: string
    fonction: string
    numMatriculSalarie: string
    catSalarie: string | { label: string; value: string }
    dateSelectionne: string
  }
}

const Line = ({ label, value, valueBold, marginBottom }: ILineProps) => {
  return (
    <View style={[styles.row, { width: '100%' }]}>
      <Text style={[styles.cell, styles.textItalic, styles.textBold, { width: '45%', padding: 2 }]}>
        {label}
      </Text>
      <Text
        style={[
          styles.cell,
          {
            width: '55%',
            textAlign: 'center',
            padding: 2,
            marginBottom: marginBottom ? marginBottom : 0,
            ...(valueBold && { fontWeight: 'bold' }),
          },
        ]}
      >
        {value}
      </Text>
    </View>
  )
}

const Employeur = ({ data }: IEmployeurProps) => {
  const { nomEmployeur, addresseEmployeur, CP_et_VilleEmployeur, nif, stat, rcs } = data
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

const Salarie = ({ data }: ISalarieProps) => {
  const {
    nomPrenomSalarie,
    prenomSalarie,
    fonction,
    numMatriculSalarie,
    catSalarie,
    dateSelectionne,
  } = data

  // Vérifie si catSalarie est une chaîne de caractères ou un objet
  const catValue = typeof catSalarie === 'string' ? catSalarie : catSalarie.label

  return (
    <>
      <Line label={'Nom et Prénom:'} value={`${nomPrenomSalarie} ${prenomSalarie}`} />
      <Line label={'Fonction:'} value={fonction} />
      <Line label={'Numéro Matricule:'} value={numMatriculSalarie} />
      <Line label={'Catégorie:'} value={catValue} />
      <Line label={'Mois:'} value={dateSelectionne} />
    </>
  )
}

const Section1 = (props: ISection1Props) => {
  const dateSelectionne = format(new Date(props.data.validation.date), 'MMM yyyy', { locale: fr })
  const nomEmployeur = props.data.employeur.nom
  const addresseEmployeur = props.data.employeur.adresse
  const CP_et_VilleEmployeur = props.data.employeur.CP_et_Ville
  const nif = props.data.employeur.nif
  const stat = props.data.employeur.stat
  const rcs = props.data.employeur.rcs
  const nomPrenomSalarie = props.data.salarie.nom
  const prenomSalarie = props.data.salarie.prenom
  const fonction = props.data.salarie.titre_poste
  const numMatriculSalarie = props.data.salarie.matricule
  const catSalarie = props.data.salarie.categorie

  return (
    <>
      <View style={[styles.row, { width: '100%', backgroundColor: '#031F79' }]}>
        <View
          style={[
            styles.row,
            { width: '30%', alignItems: 'center', paddingLeft: 5, paddingTop: 5, paddingBottom: 5 },
          ]}
        >
          <Image src={Logo} style={{ width: 80 }} />
        </View>
        <View style={[styles.row, { width: '70%', alignItems: 'center', paddingLeft: 75 }]}>
          <Text
            style={[
              styles.textBold,
              {
                color: 'white',
                textTransform: 'uppercase',
                fontSize: 14,
                padding: 1,
                width: '100%',
              },
            ]}
          >
            bulletin de paie
          </Text>
        </View>
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
          <Employeur
            data={{ nomEmployeur, addresseEmployeur, CP_et_VilleEmployeur, nif, stat, rcs }}
          />
        </View>
        <View style={[{ width: '55%' }]}>
          <Salarie
            data={{
              nomPrenomSalarie,
              prenomSalarie,
              fonction,
              numMatriculSalarie,
              catSalarie,
              dateSelectionne,
            }}
          />
        </View>
      </View>
    </>
  )
}

export default Section1
