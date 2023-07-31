import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponses from 'App/Modules/Common/Responses/ApiResponses'

export default class LogoutController {
  public async handle({ response, auth }: HttpContextContract) {
    await auth.use('api').revoke()

    return ApiResponses.success(response, { message: 'Logout Success.' })
  }
}
