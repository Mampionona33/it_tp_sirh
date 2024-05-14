import { CAlert } from '@coreui/react'
import React, { ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): { hasError: boolean } {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error)
    console.error(errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <CAlert color="danger">Une erreur est survenue.</CAlert>
    }
    return this.props.children
  }
}

export default ErrorBoundary
