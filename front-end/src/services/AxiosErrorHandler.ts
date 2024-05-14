import axios, { AxiosError } from 'axios'

class BadRequestError extends Error {
  constructor(message: string, originalError: AxiosError) {
    super(message)
    this.name = 'BadRequestError'
  }
}

class NotFoundError extends Error {
  constructor(message: string, originalError: AxiosError) {
    super(message)
    this.name = 'NotFoundError'
  }
}

class UnauthorizedError extends Error {
  constructor(message: string, originalError: AxiosError) {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

class ForbiddenError extends Error {
  constructor(message: string, originalError: AxiosError) {
    super(message)
    this.name = 'ForbiddenError'
  }
}

class ServerError extends Error {
  constructor(message: string, originalError: AxiosError) {
    super(message)
    this.name = 'ServerError'
  }
}

class MethodNotAllowedError extends Error {
  constructor(message: string, originalError: AxiosError) {
    super(message)
    this.name = 'MethodNotAllowedError'
  }
}

class TimeoutError extends Error {
  constructor(message: string, originalError: AxiosError) {
    super(message)
    this.name = 'TimeoutError'
  }
}

class ApiVersionError extends Error {
  constructor(message: string, originalError: AxiosError) {
    super(message)
    this.name = 'ApiVersionError'
  }
}

class ToManyRequestsError extends Error {
  constructor(message: string, originalError: AxiosError) {
    super(message)
    this.name = 'ToManyRequestsError'
  }
}

class ApiError extends Error {
  constructor(message: string, public originalError: AxiosError) {
    super(message)
    this.name = 'ApiError'
  }
}

class AxiosErrorHandler {
  static handle(error: AxiosError) {
    if (axios.isAxiosError(error) && error.response) {
      const { response } = error

      if (response.status) {
        switch (response.status) {
          case 400:
            throw new BadRequestError('Mauvaise requête', error)
          case 401:
            throw new UnauthorizedError('Authentification requise', error)
          case 403:
            throw new ForbiddenError('Accès interdit', error)
          case 404:
            throw new NotFoundError('Ressource introuvable', error)
          case 405:
            throw new MethodNotAllowedError('Methode non autorisee', error)
          case 406:
            throw new ApiVersionError('Version incompatible', error)
          case 408:
            throw new TimeoutError("Temps d'attente de la requête trop court", error)
          case 429:
            throw new ToManyRequestsError('Trop de requêtes', error)
          case 500:
            throw new ServerError("Une erreur inattendue s'est produite", error)
          case 502:
            throw new ApiError("Une erreur inattendue s'est produite", error)
          default:
            throw new ApiError(`Une erreur inattendue s'est produite.`, error)
        }
      }
    }
  }
}

export default AxiosErrorHandler
