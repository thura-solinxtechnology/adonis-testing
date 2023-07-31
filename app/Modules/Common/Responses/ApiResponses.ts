import { ResponseContract } from '@ioc:Adonis/Core/Response'
import { Status } from './Status'

interface ResponseBody<T> {
  data?: T
  status?: number
  message?: string
}

export default class ApiResponses {
  public static success<T>(response: ResponseContract, body: ResponseBody<T>) {
    const { data, status = Status.OK, message = 'Success.' } = body

    return response.safeStatus(status).safeHeader('Accept', 'application/json').json({
      data,
      message,
      status,
    })
  }

  public static error(response, body: ResponseBody<null>) {
    const { message = 'Error!', status = Status.INTERNAL_SERVER_ERROR } = body

    return response.safeStatus(status).json({
      message,
      status,
    })
  }
}
