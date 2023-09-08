import HttpContext from '@ioc:Adonis/Core/HttpContext'

import { Status } from './Status'

interface ResponseBody<T> {
  data?: T
  status?: number
  message?: string
}

export default class ApiResponses {
  public success<T>(body: ResponseBody<T>) {
    const ctx = HttpContext.get()!
    const { data, status = Status.OK, message = 'Success.' } = body

    ctx.response.safeStatus(status).safeHeader('Accept', 'application/json').json({
      data,
      message,
      status,
    })
  }

  public error(body: ResponseBody<null>) {
    const ctx = HttpContext.get()!
    const { message = 'Error!', status = Status.INTERNAL_SERVER_ERROR } = body

    ctx.response.safeStatus(status).json({
      message,
      status,
    })
  }
}
