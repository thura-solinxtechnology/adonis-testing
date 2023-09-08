import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponses from 'App/Http/Responses/ApiResponses'

export default class ShowController {
  public async handle({ auth }: HttpContextContract) {
    return new ApiResponses().success({ data: auth.user })
  }
}
