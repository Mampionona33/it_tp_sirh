import React from 'react'
import { useSelector } from 'react-redux'
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
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
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>EMPLOYEUR: </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>SALARIE: </Text>
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
