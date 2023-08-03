import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponses from 'App/Http/Responses/ApiResponses'
import VerifyEmail from 'App/Modules/Auth/Commands/VerifyEmail'
import VerifyData from 'App/Modules/Auth/Data/VerifyData'
import VerifyValidator from 'App/Modules/Auth/Validators/VerifyValidator'

export default class VerifyController {
  public async handle({ response, request, auth }: HttpContextContract) {
    const data = await request.validate(VerifyValidator)

    try {
      const token = await VerifyEmail.handle(VerifyData.of(data), auth)

      return ApiResponses.success(response, { data: token })
    } catch (error) {
      return ApiResponses.error(response, { message: error.message })
    }
  }
}
