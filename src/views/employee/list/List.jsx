import React from 'react'
import DataTable from '../../../components/DataTable'
import { CRow, CCol } from '@coreui/react'
import { createColumnHelper } from '@tanstack/react-table'

const List = () => {
  const employes = [
    {
      matricule: 1,
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
      matricule: 2,
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
      matricule: 3,
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
      matricule: 4,
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
      matricule: 5,
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
      matricule: 6,
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
      matricule: 7,
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
      matricule: 8,
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
      matricule: 9,
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
      matricule: 10,
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

  const columnHelper = createColumnHelper()
  const columns = [
    columnHelper.accessor('matricule', {
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

  return (
    <CRow>
      <CCol xs={12}>
        <DataTable data={employes} columns={columns} />
      </CCol>
    </CRow>
  )
}

export default List
