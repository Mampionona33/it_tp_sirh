import { AxiosError } from 'axios'
import { useCallback } from 'react'

const useErrorFormatter = () => {
  const formatErrorMessage = useCallback((error: unknown): string => {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.status) {
          switch (error.response.status) {
            case 401:
              return "Nom d'utilisateur ou mot de passe incorrect."
            case 403:
              return 'Accès interdit.'
            case 404:
              return 'Ressource non accessible. '
            case 405:
              return 'Methode non autorisee.'
            case 406:
              return 'Version incompatible.'
            case 408:
              return "Temps d'attente de la requête trop court."
            case 429:
              return 'Trop de requêtes.'
            case 500:
              return 'Erreur spécique. Veuillez réessayer plus tard.'
            default:
              return "Une erreur inattendue s'est produite."
          }
        }
      } else if (error.message) {
        return error.message
      } else {
        return "Une erreur inattendue s'est produite."
      }
    } else if (error instanceof Error && error.message) {
      return error.message
    } else {
      return "Une erreur inattendue s'est produite."
    }
    return "Une erreur inattendue s'est produite."
  }, [])

  return formatErrorMessage
}

export default useErrorFormatter
