import React from 'react'
import { useSelector } from 'react-redux'
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  tableCell: {
    borderStyle: 'solid',
    borderWidth: 1,
    flexGrow: 1,
    padding: 5,
  },
})

// Create Document Component
const MyDocument = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Informations personnelles</Text>
          <View style={styles.table}>
            <Text style={styles.tableCell}>Nom:</Text>
            <Text style={styles.tableCell}>Nom et Prénom:</Text>
          </View>
          {/* Ajoutez d'autres informations personnelles de la même manière */}
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Salaire</Text>
          <View style={styles.table}>
            <Text style={styles.tableCell}>Salaire de base</Text>
            {/* Ajoutez d'autres lignes de salaire de la même manière */}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Cotisations</Text>
          <View style={styles.table}>
            <Text style={styles.tableCell}>Cnaps</Text>
            {/* Ajoutez d'autres lignes de cotisations de la même manière */}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Retenue et avantages</Text>
          <View style={styles.table}>
            <Text style={styles.tableCell}>Retenue sur organisme sanitaire</Text>
            {/* Ajoutez d'autres lignes de retenue et avantages de la même manière */}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.header}>Récapitulatif</Text>
          <View style={styles.table}>
            <Text style={styles.tableCell}>Salaire Net</Text>
            {/* Ajoutez d'autres lignes de récapitulatif de la même manière */}
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
