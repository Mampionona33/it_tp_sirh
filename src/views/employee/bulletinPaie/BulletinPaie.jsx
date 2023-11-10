import React from 'react'
import { useSelector } from 'react-redux'
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
)

const BulletinPaie = () => {
  const selecteEmploy = useSelector((state) => state.selectedEmploye.employe)
  return (
    <>
      <PDFViewer>
        <MyDocument />
      </PDFViewer>
    </>
  )
}

export default BulletinPaie
