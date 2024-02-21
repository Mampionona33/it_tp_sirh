import { Props as SelectProps } from 'react-select'

export interface ISelectFloatingLableProps extends Omit<SelectProps, 'label'> {
  label: string
}
