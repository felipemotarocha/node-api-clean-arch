import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: { message: error.message },
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: { message: new ServerError().message },
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
})
