import React from 'react'
import DataTable from '../../../components/DataTable'
import { CRow, CCol } from '@coreui/react'
import { createColumnHelper } from '@tanstack/react-table'

const List = () => {
  const employes = [
    {
      maticule: 1,
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

  // const fields = [
  //   { key: 'Matricule' },
  //   { key: 'Nom et Prénom' },
  //   { key: 'CIN' },
  //   { key: 'Email' },
  //   { key: 'Post' },
  //   { key: 'Télephone' },
  //   { key: 'Manager' },
  //   { key: 'Action' },
  // ]

  const columnHelper = createColumnHelper()
  const columns = [
    columnHelper.accessor('maticule', {
      cell: (info) => info.getValue(),
      header: () => 'matricule',
    }),
    columnHelper.accessor('name', {
      cell: (info) => {
        const { lastName, firstName } = info.getValue()
        return `${lastName} ${firstName}`
      },
      header: () => 'name',
    }),
    columnHelper.accessor('cin', {
      cell: (info) => info.getValue(),
      header: () => 'cin',
    }),
    columnHelper.accessor('email', {
      cell: (info) => info.getValue(),
      header: () => 'email',
    }),
    columnHelper.accessor('post', {
      cell: (info) => info.getValue(),
      header: () => 'post',
    }),
    columnHelper.accessor('telephone', {
      cell: (info) => info.getValue(),
      header: () => 'telephone',
    }),
    columnHelper.accessor('manager', {
      cell: (info) => info.getValue(),
      header: () => 'manager',
    }),
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
        <DataTable data={employes} columns={columns} />
      </CCol>
    </CRow>
  )

  // return (
  //   <CRow>
  //     <CCol xs={12}>
  //       <CTable>
  //         <CTableHead>
  //           <CTableRow>
  //             <CTableHeaderCell scope="col">Matricule</CTableHeaderCell>
  //             <CTableHeaderCell scope="col">Nom et Prénom</CTableHeaderCell>
  //             <CTableHeaderCell scope="col">CIN</CTableHeaderCell>
  //             <CTableHeaderCell scope="col">Email</CTableHeaderCell>
  //             <CTableHeaderCell scope="col">Post</CTableHeaderCell>
  //             <CTableHeaderCell scope="col">Télephone</CTableHeaderCell>
  //             <CTableHeaderCell scope="col">Manager</CTableHeaderCell>
  //             <CTableHeaderCell scope="col">Action</CTableHeaderCell>
  //           </CTableRow>
  //         </CTableHead>
  //       </CTable>
  //     </CCol>
  //   </CRow>
  // )
}

export default List
