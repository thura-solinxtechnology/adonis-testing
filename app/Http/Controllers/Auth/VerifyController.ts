import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponses from 'App/Http/Responses/ApiResponses'
import VerifyEmail from 'App/Modules/Auth/Commands/VerifyEmail'
import VerifyData from 'App/Modules/Auth/Data/VerifyData'
import VerifyValidator from 'App/Modules/Auth/Validators/VerifyValidator'

export default class VerifyController {
  public async handle({ request }: HttpContextContract) {
    const data = await request.validate(VerifyValidator)

    try {
      await VerifyEmail.handle(VerifyData.of(data))

      return new ApiResponses().success({ message: 'Your email is verifyed successfull.' })
    } catch (error) {
      return new ApiResponses().error({ message: error.message })
    }
  }
}
