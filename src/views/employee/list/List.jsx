import React from 'react'
import DataTable from '../../../components/DataTable'
import { CRow, CCol } from '@coreui/react'
import { createColumnHelper } from '@tanstack/react-table'

const List = () => {
  const employes = [
    {
      cin: '108.488.659.802',
      name: {
        lastname: 'Slater',
        firstname: 'Cathy',
      },
      post: 'Ouvrier',
      email: 'cathy.slater@gmail.com',
      manager: 'Tahina',
      matricule: 0,
      telephone: '034 61 619 05',
    },
    {
      cin: '107.326.752.652',
      name: {
        lastname: 'Oneil',
        firstname: 'Dickerson',
      },
      post: 'Ouvrier',
      email: 'dickerson.oneil@gmail.com',
      manager: 'Eric',
      matricule: 1,
      telephone: '034 21 272 72',
    },
    {
      cin: '101.145.469.163',
      name: {
        lastname: 'Rocha',
        firstname: 'Augusta',
      },
      post: 'Ouvrier',
      email: 'augusta.rocha@gmail.com',
      manager: 'Eric',
      matricule: 2,
      telephone: '034 84 655 30',
    },
    {
      cin: '109.896.821.502',
      name: {
        lastname: 'Hernandez',
        firstname: 'Le',
      },
      post: 'Ouvrier',
      email: 'le.hernandez@gmail.com',
      manager: 'Tahina',
      matricule: 3,
      telephone: '034 61 915 89',
    },
    {
      cin: '105.785.364.087',
      name: {
        lastname: 'Bradshaw',
        firstname: 'Kathie',
      },
      post: 'Ouvrier',
      email: 'kathie.bradshaw@gmail.com',
      manager: 'Eric',
      matricule: 4,
      telephone: '034 40 870 86',
    },
    {
      cin: '107.414.521.461',
      name: {
        lastname: 'Meyers',
        firstname: 'Mcintosh',
      },
      post: 'Ouvrier',
      email: 'mcintosh.meyers@gmail.com',
      manager: 'Eric',
      matricule: 5,
      telephone: '034 47 747 03',
    },
    {
      cin: '109.633.287.823',
      name: {
        lastname: 'Mitchell',
        firstname: 'Colette',
      },
      post: 'Ouvrier',
      email: 'colette.mitchell@gmail.com',
      manager: 'Tahina',
      matricule: 6,
      telephone: '034 32 801 01',
    },
    {
      cin: '103.335.164.459',
      name: {
        lastname: 'Cook',
        firstname: 'Robertson',
      },
      post: 'Ouvrier',
      email: 'robertson.cook@gmail.com',
      manager: 'Eric',
      matricule: 7,
      telephone: '034 82 334 74',
    },
    {
      cin: '109.796.363.068',
      name: {
        lastname: 'Kaufman',
        firstname: 'Howard',
      },
      post: 'Ouvrier',
      email: 'howard.kaufman@gmail.com',
      manager: 'Eric',
      matricule: 8,
      telephone: '034 17 141 51',
    },
    {
      cin: '105.725.840.661',
      name: {
        lastname: 'Cooley',
        firstname: 'Angelina',
      },
      post: 'Ouvrier',
      email: 'angelina.cooley@gmail.com',
      manager: 'Eric',
      matricule: 9,
      telephone: '034 41 983 52',
    },
    {
      cin: '109.992.452.493',
      name: {
        lastname: 'Bush',
        firstname: 'Corrine',
      },
      post: 'Manœuvre',
      email: 'corrine.bush@gmail.com',
      manager: 'Eric',
      matricule: 10,
      telephone: '034 98 240 10',
    },
    {
      cin: '110.763.147.334',
      name: {
        lastname: 'Douglas',
        firstname: 'Nora',
      },
      post: 'Manœuvre',
      email: 'nora.douglas@gmail.com',
      manager: 'Eric',
      matricule: 11,
      telephone: '034 29 989 61',
    },
    {
      cin: '100.380.563.349',
      name: {
        lastname: 'Mcbride',
        firstname: 'Hill',
      },
      post: 'Manœuvre',
      email: 'hill.mcbride@gmail.com',
      manager: 'Tahina',
      matricule: 12,
      telephone: '034 86 118 88',
    },
    {
      cin: '106.207.903.313',
      name: {
        lastname: 'Lowe',
        firstname: 'Dollie',
      },
      post: 'Manœuvre',
      email: 'dollie.lowe@gmail.com',
      manager: 'Tahina',
      matricule: 13,
      telephone: '034 84 748 82',
    },
    {
      cin: '106.534.407.958',
      name: {
        lastname: 'Hammond',
        firstname: 'Clarice',
      },
      post: 'Manœuvre',
      email: 'clarice.hammond@gmail.com',
      manager: 'Tahina',
      matricule: 14,
      telephone: '034 55 187 20',
    },
    {
      cin: '109.582.308.279',
      name: {
        lastname: 'Ayala',
        firstname: 'Boone',
      },
      post: 'Ouvrier',
      email: 'boone.ayala@gmail.com',
      manager: 'Tahina',
      matricule: 15,
      telephone: '034 83 411 70',
    },
    {
      cin: '100.950.136.434',
      name: {
        lastname: 'Tyler',
        firstname: 'Jenny',
      },
      post: 'Ouvrier',
      email: 'jenny.tyler@gmail.com',
      manager: 'Eric',
      matricule: 16,
      telephone: '034 69 853 15',
    },
    {
      cin: '100.342.728.717',
      name: {
        lastname: 'Humphrey',
        firstname: 'Holman',
      },
      post: 'Manœuvre',
      email: 'holman.humphrey@gmail.com',
      manager: 'Eric',
      matricule: 17,
      telephone: '034 66 989 40',
    },
    {
      cin: '105.520.018.617',
      name: {
        lastname: 'Ortega',
        firstname: 'Wise',
      },
      post: 'Manœuvre',
      email: 'wise.ortega@gmail.com',
      manager: 'Tahina',
      matricule: 18,
      telephone: '034 99 364 57',
    },
    {
      cin: '106.937.906.860',
      name: {
        lastname: 'Moran',
        firstname: 'Elisa',
      },
      post: 'Ouvrier',
      email: 'elisa.moran@gmail.com',
      manager: 'Eric',
      matricule: 19,
      telephone: '034 60 196 13',
    },
    {
      cin: '107.584.834.061',
      name: {
        lastname: 'Harvey',
        firstname: 'Brittany',
      },
      post: 'Ouvrier',
      email: 'brittany.harvey@gmail.com',
      manager: 'Eric',
      matricule: 20,
      telephone: '034 89 318 04',
    },
    {
      cin: '103.096.637.407',
      name: {
        lastname: 'Sherman',
        firstname: 'Dee',
      },
      post: 'Manœuvre',
      email: 'dee.sherman@gmail.com',
      manager: 'Eric',
      matricule: 21,
      telephone: '034 94 103 42',
    },
    {
      cin: '106.181.002.437',
      name: {
        lastname: 'Crawford',
        firstname: 'Callie',
      },
      post: 'Ouvrier',
      email: 'callie.crawford@gmail.com',
      manager: 'Eric',
      matricule: 22,
      telephone: '034 33 023 59',
    },
    {
      cin: '105.181.769.354',
      name: {
        lastname: 'Murphy',
        firstname: 'Craig',
      },
      post: 'Ouvrier',
      email: 'craig.murphy@gmail.com',
      manager: 'Tahina',
      matricule: 23,
      telephone: '034 24 009 73',
    },
    {
      cin: '102.563.847.324',
      name: {
        lastname: 'Peters',
        firstname: 'Megan',
      },
      post: 'Manœuvre',
      email: 'megan.peters@gmail.com',
      manager: 'Tahina',
      matricule: 24,
      telephone: '034 53 724 34',
    },
    {
      cin: '101.057.200.523',
      name: {
        lastname: 'Pena',
        firstname: 'Cameron',
      },
      post: 'Ouvrier',
      email: 'cameron.pena@gmail.com',
      manager: 'Eric',
      matricule: 25,
      telephone: '034 82 387 24',
    },
    {
      cin: '101.898.368.597',
      name: {
        lastname: 'Horn',
        firstname: 'James',
      },
      post: 'Manœuvre',
      email: 'james.horn@gmail.com',
      manager: 'Eric',
      matricule: 26,
      telephone: '034 95 122 90',
    },
    {
      cin: '103.186.190.938',
      name: {
        lastname: 'Mercer',
        firstname: 'Dora',
      },
      post: 'Ouvrier',
      email: 'dora.mercer@gmail.com',
      manager: 'Eric',
      matricule: 27,
      telephone: '034 21 205 00',
    },
    {
      cin: '109.725.437.755',
      name: {
        lastname: 'Carlson',
        firstname: 'Brianna',
      },
      post: 'Manœuvre',
      email: 'brianna.carlson@gmail.com',
      manager: 'Eric',
      matricule: 28,
      telephone: '034 40 291 87',
    },
    {
      cin: '104.879.016.847',
      name: {
        lastname: 'Vaughan',
        firstname: 'Ada',
      },
      post: 'Manœuvre',
      email: 'ada.vaughan@gmail.com',
      manager: 'Tahina',
      matricule: 29,
      telephone: '034 17 264 86',
    },
    {
      cin: '100.077.639.576',
      name: {
        lastname: 'Rollins',
        firstname: 'Patti',
      },
      post: 'Ouvrier',
      email: 'patti.rollins@gmail.com',
      manager: 'Eric',
      matricule: 30,
      telephone: '034 49 995 22',
    },
    {
      cin: '110.408.515.478',
      name: {
        lastname: 'Brock',
        firstname: 'Barker',
      },
      post: 'Ouvrier',
      email: 'barker.brock@gmail.com',
      manager: 'Tahina',
      matricule: 31,
      telephone: '034 93 807 57',
    },
    {
      cin: '107.948.220.750',
      name: {
        lastname: 'Stokes',
        firstname: 'Ursula',
      },
      post: 'Manœuvre',
      email: 'ursula.stokes@gmail.com',
      manager: 'Eric',
      matricule: 32,
      telephone: '034 30 389 05',
    },
    {
      cin: '106.742.367.552',
      name: {
        lastname: 'Stephenson',
        firstname: 'Tracey',
      },
      post: 'Manœuvre',
      email: 'tracey.stephenson@gmail.com',
      manager: 'Tahina',
      matricule: 33,
      telephone: '034 39 963 36',
    },
    {
      cin: '107.693.958.961',
      name: {
        lastname: 'Avery',
        firstname: 'Fitzpatrick',
      },
      post: 'Manœuvre',
      email: 'fitzpatrick.avery@gmail.com',
      manager: 'Eric',
      matricule: 34,
      telephone: '034 77 093 84',
    },
    {
      cin: '103.053.665.401',
      name: {
        lastname: 'Le',
        firstname: 'Gilmore',
      },
      post: 'Ouvrier',
      email: 'gilmore.le@gmail.com',
      manager: 'Tahina',
      matricule: 35,
      telephone: '034 68 829 56',
    },
    {
      cin: '102.779.443.152',
      name: {
        lastname: 'Fischer',
        firstname: 'Gregory',
      },
      post: 'Ouvrier',
      email: 'gregory.fischer@gmail.com',
      manager: 'Tahina',
      matricule: 36,
      telephone: '034 59 920 30',
    },
    {
      cin: '101.835.053.728',
      name: {
        lastname: 'Wade',
        firstname: 'Virgie',
      },
      post: 'Ouvrier',
      email: 'virgie.wade@gmail.com',
      manager: 'Eric',
      matricule: 37,
      telephone: '034 40 679 01',
    },
    {
      cin: '106.458.545.275',
      name: {
        lastname: 'Griffith',
        firstname: 'Mcdonald',
      },
      post: 'Ouvrier',
      email: 'mcdonald.griffith@gmail.com',
      manager: 'Eric',
      matricule: 38,
      telephone: '034 19 960 17',
    },
    {
      cin: '108.595.810.558',
      name: {
        lastname: 'Zimmerman',
        firstname: 'Robbie',
      },
      post: 'Manœuvre',
      email: 'robbie.zimmerman@gmail.com',
      manager: 'Eric',
      matricule: 39,
      telephone: '034 33 203 61',
    },
    {
      cin: '106.894.847.980',
      name: {
        lastname: 'Velazquez',
        firstname: 'Spence',
      },
      post: 'Manœuvre',
      email: 'spence.velazquez@gmail.com',
      manager: 'Eric',
      matricule: 40,
      telephone: '034 76 437 03',
    },
    {
      cin: '102.535.913.839',
      name: {
        lastname: 'Hoffman',
        firstname: 'Flores',
      },
      post: 'Ouvrier',
      email: 'flores.hoffman@gmail.com',
      manager: 'Eric',
      matricule: 41,
      telephone: '034 60 892 94',
    },
    {
      cin: '103.038.897.245',
      name: {
        lastname: 'Riggs',
        firstname: 'Logan',
      },
      post: 'Manœuvre',
      email: 'logan.riggs@gmail.com',
      manager: 'Tahina',
      matricule: 42,
      telephone: '034 45 324 48',
    },
    {
      cin: '103.570.233.935',
      name: {
        lastname: 'Moss',
        firstname: 'Kris',
      },
      post: 'Manœuvre',
      email: 'kris.moss@gmail.com',
      manager: 'Eric',
      matricule: 43,
      telephone: '034 37 494 11',
    },
    {
      cin: '107.693.120.366',
      name: {
        lastname: 'Washington',
        firstname: 'Marjorie',
      },
      post: 'Manœuvre',
      email: 'marjorie.washington@gmail.com',
      manager: 'Eric',
      matricule: 44,
      telephone: '034 16 089 06',
    },
    {
      cin: '108.047.540.393',
      name: {
        lastname: 'Peterson',
        firstname: 'Chambers',
      },
      post: 'Manœuvre',
      email: 'chambers.peterson@gmail.com',
      manager: 'Tahina',
      matricule: 45,
      telephone: '034 67 095 66',
    },
    {
      cin: '101.218.739.337',
      name: {
        lastname: 'Boyd',
        firstname: 'Kirsten',
      },
      post: 'Manœuvre',
      email: 'kirsten.boyd@gmail.com',
      manager: 'Eric',
      matricule: 46,
      telephone: '034 75 502 70',
    },
    {
      cin: '109.640.557.252',
      name: {
        lastname: 'Hartman',
        firstname: 'Waters',
      },
      post: 'Manœuvre',
      email: 'waters.hartman@gmail.com',
      manager: 'Tahina',
      matricule: 47,
      telephone: '034 51 569 12',
    },
    {
      cin: '102.990.916.547',
      name: {
        lastname: 'Mason',
        firstname: 'Lolita',
      },
      post: 'Ouvrier',
      email: 'lolita.mason@gmail.com',
      manager: 'Tahina',
      matricule: 48,
      telephone: '034 23 857 55',
    },
    {
      cin: '102.573.498.626',
      name: {
        lastname: 'Flores',
        firstname: 'Elinor',
      },
      post: 'Manœuvre',
      email: 'elinor.flores@gmail.com',
      manager: 'Eric',
      matricule: 49,
      telephone: '034 89 155 68',
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
        const { lastname, firstname } = info.getValue()
        return `${lastname} ${firstname}`
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
        <DataTable
          title="List employés"
          data={employes}
          columns={columns}
          exportCsvBtn
          importCsvBtn
        />
      </CCol>
    </CRow>
  )
}

export default List
