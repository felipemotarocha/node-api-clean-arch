export class ServerError extends Error {
  constructor() {
    super('Something went wrong. Try again later.')
  }
}
