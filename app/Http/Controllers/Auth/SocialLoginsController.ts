import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponses from 'App/Http/Responses/ApiResponses'
import { Status } from 'App/Http/Responses/Status'
import User from 'App/Models/User'
import SocialLoginValidator from 'App/Modules/Auth/Validators/SocialLoginValidator'
import LoginTypes from 'App/Modules/Common/Enums/LoginTypes'

export default class SocialLoginsController {
  public async handle({ request, auth }: HttpContextContract) {
    const { name, email, phone, loginId } = await request.validate(SocialLoginValidator)
    const loginType: LoginTypes = request.param('type')

    try {
      const user = await User.firstOrCreate({ loginType, loginId }, { name, email, phone })
      return new ApiResponses().success({
        data: await auth.use('api').generate(user),
        status: Status.CREATED,
      })
    } catch (error) {
      return new ApiResponses().error({ message: error.message })
    }
  }
}
