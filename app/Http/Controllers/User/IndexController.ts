import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponses from 'App/Http/Responses/ApiResponses'
import User from '../../../Models/User'

export default class IndexController {
  public async handle({}: HttpContextContract) {
    const users = await User.all()
    return new ApiResponses().success({ data: users })
  }
}
