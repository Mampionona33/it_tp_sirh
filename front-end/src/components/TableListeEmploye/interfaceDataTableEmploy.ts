import React from 'react'
import { IEmploye } from '@src/interfaces/interfaceEmploye'

export interface IDataTableEmploye {
  data: (IEmploye & { actions?: React.FC[] })[]
  tableTitle?: string
  headerComponents: React.ReactNode[] | React.ReactElement
}

export interface IDataWithActions extends IEmploye {
  fullName?: string
  actions?: React.FC[]
}
