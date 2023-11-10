import React from 'react'
import { useSelector } from 'react-redux'
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from '@react-pdf/renderer'
import RobotoItalic from 'src/assets/fonts/Roboto/Roboto-Italic.ttf'
import RobotoBoldItalic from 'src/assets/fonts/Roboto/Roboto-BoldItalic.ttf'
import RobotoBold from 'src/assets/fonts/Roboto/Roboto-Bold.ttf'
import RobotoRegular from 'src/assets/fonts/Roboto/Roboto-Regular.ttf'
import { PropTypes } from 'prop-types'

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: RobotoRegular,
    },
    {
      src: RobotoItalic,
      fontStyle: 'italic',
    },
    {
      src: RobotoBold,
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      src: RobotoBoldItalic,
      fontStyle: 'italic',
      fontWeight: 'bold',
    },
  ],
})

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
    padding: 2,
    paddingTop: 1,
    marginTop: 2,
    marginBottom: 2,
  },
})

// Create Document Component
const MyDocument = (props) => {
  const { salarie } = props
  console.log(salarie)
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={[styles.textBold, { margin: 5 }]}>BULLETIN DE PAIE </Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, styles.cellBorderTop2, styles.cellBorderBottom2]}>
              <Text style={[styles.tableCell, styles.textBold]}>EMPLOYEUR: </Text>
            </View>
            <View style={[styles.tableCol, styles.bordered2]}>
              <Text style={[styles.tableCell, styles.textBold]}>SALARIE: </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={[styles.tableCol]}>
              <Text style={[styles.textItalic, styles.textBoldItalic]}>Nom:</Text>
            </View>
            <View style={[styles.tableCol, styles.cellBorderLeft2]}>
              <Text style={styles.tableCell}>
                <Text style={[styles.textItalic, styles.textBoldItalic]}>Nom et Prénom: </Text>
                {salarie.name.nom} {salarie.name.prenom}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.textBoldItalic]}>Adresse:</Text>
            </View>
            <View style={[styles.tableCol, styles.cellBorderLeft2, { paddingBottom: 2 }]}>
              <Text style={[styles.tableCell, { height: 18 }]}>
                <Text style={[styles.textItalic, styles.textBoldItalic]}>Fonction: </Text>
                {salarie.poste}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.textBoldItalic]}>CP et Ville: </Text>
            </View>
            <View style={[styles.tableCol, styles.cellBorderLeft2]}>
              <Text style={styles.tableCell}>
                <Text style={[styles.textItalic, styles.textBoldItalic]}>Numéro Matricule: </Text>
                {salarie.matricule}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.textBoldItalic]}>Numéro NIF: </Text>
            </View>
            <View style={[styles.tableCol, styles.cellBorderLeft2]}>
              <Text style={styles.tableCell}>
                <Text style={[styles.textItalic, styles.textBoldItalic]}>Catégorie: </Text>
                {salarie.cat}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={[styles.tableCell, styles.textBoldItalic]}>Numéro STAT: </Text>
            </View>
            <View style={[styles.tableCol, styles.cellBorderLeft2]}>
              <Text style={styles.tableCell}>
                <Text style={[styles.textItalic, styles.textBoldItalic]}>Mois: </Text>
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={[styles.tableCol]}>
              <Text
                style={[
                  styles.tableCell,
                  styles.textBoldItalic,
                  styles.cellBorderBottom2,
                  { marginTop: 0 },
                ]}
              >
                RCS:{' '}
              </Text>
            </View>
            <View style={[styles.tableCol]}>
              <Text
                style={[
                  styles.tableCell,
                  styles.cellBorderLeft2,
                  styles.cellBorderBottom2,
                  styles.textBoldItalic,
                  { marginTop: 0 },
                ]}
              >
                {' '}
              </Text>
            </View>
          </View>
          {/*  */}
        </View>
      </Page>
    </Document>
  )
}

MyDocument.propTypes = {
  salarie: PropTypes.object,
}

const BulletinPaie = () => {
  const selecteEmploy = useSelector((state) => state.selectedEmploye.employe)
  return (
    <>
      <div className="h-screen">
        <PDFViewer width="100%" height="100%">
          <MyDocument salarie={selecteEmploy} />
        </PDFViewer>
      </div>
    </>
  )
}

export default BulletinPaie
