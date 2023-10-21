import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CDataTable,
} from '@coreui/react'

const List = () => {
  const employes = [
    {
      nMaticule: 1,
      cin: '10120102102',
      email: 'kaleba@gmail.com',
      post: 'Développeur',
      telephone: '0342154657',
      manager: 'Naivo',
      name: {
        lastName: 'rakoto',
        firstName: 'kaleba',
      },
    },
    {
      nMaticule: 1,
      cin: '10120102102',
      email: 'kaleba@gmail.com',
      post: 'Développeur',
      telephone: '0342154657',
      manager: 'Naivo',
      name: {
        lastName: 'rakoto',
        firstName: 'kaleba',
      },
    },
    {
      nMaticule: 2,
      cin: '10120102102',
      email: 'kaleba@gmail.com',
      post: 'Développeur',
      telephone: '0342154657',
      manager: 'Naivo',
      name: {
        lastName: 'rakoto',
        firstName: 'kaleba',
      },
    },
  ]

  const fields = [
    { key: 'Matricule' },
    { key: 'Nom et Prénom' },
    { key: 'CIN' },
    { key: 'Email' },
    { key: 'Post' },
    { key: 'Télephone' },
    { key: 'Manager' },
    { key: 'Action' },
  ]

  // return (
  //   <CCard className="p-5">
  //     <CDataTable
  //       items={employes}
  //       fields={fields}
  //       itemsPerPageSelect
  //       itemsPerPage={5}
  //       hover
  //       pagination
  //     />
  //   </CCard>
  // )

  return (
    <CRow>
      <CCol xs={12}>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Matricule</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nom et Prénom</CTableHeaderCell>
              <CTableHeaderCell scope="col">CIN</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Post</CTableHeaderCell>
              <CTableHeaderCell scope="col">Télephone</CTableHeaderCell>
              <CTableHeaderCell scope="col">Manager</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
        </CTable>
      </CCol>
    </CRow>
  )
}

export default List
