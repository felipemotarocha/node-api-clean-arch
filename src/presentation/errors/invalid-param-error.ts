export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`Invalid ${paramName}.`)
    this.name = paramName
  }
}
