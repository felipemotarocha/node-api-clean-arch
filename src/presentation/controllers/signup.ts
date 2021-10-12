import {
  MissingParamError,
  InvalidParamError,
  InvalidPasswordConfirmationError,
} from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
} from '../protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'password_confirmation',
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password, password_confirmation } = httpRequest.body

      if (password !== password_confirmation) {
        return badRequest(new InvalidPasswordConfirmationError())
      }

      const isEmailValid = this.emailValidator.isValid(email)
      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return {
        statusCode: 200,
        body: {},
      }
    } catch (error) {
      return serverError()
    }
  }
}
