import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponses from 'App/Http/Responses/ApiResponses'

export default class LogoutController {
  public async handle({ auth }: HttpContextContract) {
    await auth.use('api').revoke()

    return new ApiResponses().success({ message: 'Logout Success.' })
  }
}
