export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing ${paramName}.`)
    this.name = paramName
  }
}

export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Invalid ${paramName}.`)
    this.name = paramName
  }
}
