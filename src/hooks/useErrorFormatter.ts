import { AxiosError } from 'axios'
import { useCallback } from 'react'

const useErrorFormatter = () => {
  const formatErrorMessage = useCallback((error: AxiosError): string => {
    if (error.code) {
      switch (error.code) {
        case 'ERR_BAD_REQUEST':
          return "Nom d'utilisateur ou mot de passe incorrect."
        case 'ERR_NETWORK':
          return 'Erreur réseau. Veuillez réessayer plus tard.'
        default:
          return "Une erreur inattendue s'est produite."
      }
    } else if (error.message) {
      return error.message
    } else {
      return "Une erreur inattendue s'est produite."
    }
  }, [])

  return formatErrorMessage
}

export default useErrorFormatter
