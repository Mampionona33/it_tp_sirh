import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import registerFonts from './font'
import { styles } from './styles'

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

// const Line = ({ label, value, valueBold, marginBottom }: ILineProps) => {
//   return (
//     <View style={[styles.row, { width: '100%' }]}>
//       <Text
//         style={[styles.cell, styles.textBoldItalic, styles.textBold, { width: '45%', padding: 2 }]}
//       >
//         {label}
//       </Text>
//       <Text
//         style={[
//           styles.cell,
//           {
//             width: '55%',
//             textAlign: 'center',
//             padding: 2,
//             marginBottom: marginBottom ? marginBottom : 0,
//             ...(valueBold && { fontWeight: 'bold' }),
//           },
//         ]}
//       >
//         {value}
//       </Text>
//     </View>
//   )
// }

const Section1: React.FC<ISection1Props> = ({ data }) => {
  const dateSelectionne = data.dateSelectionne
  const nomEmployeur = data.employeur.nom
  const addresseEmployeur = data.employeur.adresse
  const CP_et_VilleEmployeur = data.employeur.CP_et_Ville
  const nif = data.employeur.nif
  const stat = data.employeur.stat
  const rcs = data.employeur.rcs
  const nomPrenomSalarie = data.salarie.nom
  const prenomSalarie = data.salarie.prenom
  const fonction = data.salarie.poste
  const numMatriculSalarie = data.salarie.matricule
  const catSalarie = data.salarie.cat

  console.log(data)

  const Employeur = () => {
    return (
      <>
        <View>
          <Text>test</Text>
        </View>
      </>
      // <>
      //   <Line label={'Nom:'} value={nomEmployeur} valueBold={true} />
      //   <Line label={'Adresse:'} value={addresseEmployeur} />
      //   <Line label={'CP et Ville:'} value={CP_et_VilleEmployeur} />
      //   <Line label={'Numéro NIF:'} value={nif} />
      //   <Line label={'Numéro STAT:'} value={stat} />
      //   <Line label={'RSC:'} value={rcs} marginBottom={15} />
      // </>
    )
  }

  const Salarie = () => {
    return (
      <>
        <View>
          <Text>test</Text>
        </View>
        {/* <Line label={'Nom et Prénom:'} value={`${nomPrenomSalarie} ${prenomSalarie}`} />
        <Line label={'Fonction:'} value={fonction} />
        <Line label={'Numéro Matricule:'} value={numMatriculSalarie} />
        <Line label={'Catégorie:'} value={catSalarie} />
        <Line label={'Mois:'} value={dateSelectionne} /> */}
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

export default Section1
