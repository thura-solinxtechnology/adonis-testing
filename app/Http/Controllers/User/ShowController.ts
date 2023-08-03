import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponses from 'App/Http/Responses/ApiResponses'

export default class ShowController {
  public async handle({ response, auth }: HttpContextContract) {
    return ApiResponses.success(response, { data: auth.user })
  }
}
