import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginTypes from 'App/Modules/Common/Enums/LoginTypes'
import ApiResponses from 'App/Modules/Common/Responses/ApiResponses'
import { Status } from 'App/Modules/Common/Responses/Status'
import User from 'App/Modules/User/Models/User'
import SocialLoginValidator from '../Validators/SocialLoginValidator'

export default class SocialLoginsController {
  public async handle({ request, response, auth }: HttpContextContract) {
    const { name, email, phone, loginId } = await request.validate(SocialLoginValidator)
    const loginType: LoginTypes = request.param('type')

    try {
      const user = await User.firstOrCreate({ loginType, loginId }, { name, email, phone })
      return ApiResponses.success(response, {
        data: await auth.use('api').generate(user),
        status: Status.CREATED,
      })
    } catch (error) {
      return ApiResponses.error(response, { message: error.message })
    }
  }
}
