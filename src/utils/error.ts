import { Errors } from 'src/constants/error'

export class CustomError extends Error {
  public code: Errors | null = null

  constructor(code: Errors) {
    super(String(code))

    this.code = code
  }

  isAuthError = () => this.code === Errors.UNAUTHORIZED
}
