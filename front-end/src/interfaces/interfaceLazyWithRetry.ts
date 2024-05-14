import { LazyExoticComponent } from 'react'

export interface ILazyWithRetryProps {
  componentImport: () => Promise<{ default: LazyExoticComponent<() => JSX.Element> }>
}
