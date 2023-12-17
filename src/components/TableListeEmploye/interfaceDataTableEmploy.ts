import React from 'react'
import { IEmploye } from '@src/interfaces/interfaceEmploye'

export interface IDataTableEmploye {
  data: (IEmploye & { actions?: React.FC[] })[]
}
