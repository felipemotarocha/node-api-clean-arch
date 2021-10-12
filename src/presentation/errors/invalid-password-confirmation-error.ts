export class InvalidPasswordConfirmationError extends Error {
  constructor() {
    super(`The password and your confirmation must be the same.`)
  }
}
