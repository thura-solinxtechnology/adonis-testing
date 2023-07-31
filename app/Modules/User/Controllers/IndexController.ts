import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponses from 'App/Modules/Common/Responses/ApiResponses'

export default class IndexController {
  public async handle({ auth, response }: HttpContextContract) {
    return ApiResponses.success(response, { data: auth.user })
  }
}
