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

// Font.register({
//   src: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap',
//   fontStyle: 'italic',
//   family: 'Roboto',
// })

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
  cellBorderLeft: {
    borderStyle: 'solid',
    borderLeft: 1,
  },
  cellBorderRight: {
    borderStyle: 'solid',
    borderRight: 1,
  },
  cellBorderTop: {
    borderStyle: 'solid',
    borderTop: 1,
  },
  cellBorderBottom: {
    borderStyle: 'solid',
    borderBottom: 1,
  },

  bordered: {
    borderStyle: 'solid',
    borderWidth: 1,
  },
  tableCol: {
    width: '50%',
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  italicTableCell: {
    textAlign: 'left',
    padding: 2,
    paddingTop: 1,
    fontSize: 10,
    // fontFamily: 'Roboto',
    fontStyle: 'italic',
  },
  tableCell: {
    textAlign: 'left',
    padding: 2,
    paddingTop: 1,
    fontSize: 10,
  },
})

// Create Document Component
const MyDocument = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>BULLETIN DE PAIE </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, styles.cellBorderTop, styles.cellBorderBottom]}>
              <Text style={styles.tableCell}>EMPLOYEUR: </Text>
            </View>
            <View style={[styles.tableCol, styles.bordered]}>
              <Text style={styles.tableCell}>SALARIE: </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, styles.italicTableCell]}>
              <Text style={[styles.italicTableCell]}>Nom:</Text>
            </View>
            <View style={[styles.tableCol, styles.cellBorderLeft]}>
              <Text style={styles.tableCell}>Nom et Prénom:</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Adresse:</Text>
            </View>
            <View style={[styles.tableCol, styles.cellBorderLeft]}>
              <Text style={styles.tableCell}>Fonction:</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

const BulletinPaie = () => {
  const selecteEmploy = useSelector((state) => state.selectedEmploye.employe)
  return (
    <>
      <div className="h-screen">
        <PDFViewer width="100%" height="100%">
          <MyDocument />
        </PDFViewer>
      </div>
    </>
  )
}

export default BulletinPaie
