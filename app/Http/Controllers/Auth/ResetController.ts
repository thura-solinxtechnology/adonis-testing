import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponses from 'App/Http/Responses/ApiResponses'
import { Status } from 'App/Http/Responses/Status'
import ResendOtp from 'App/Modules/Auth/Commands/ResendOtp'
import ResendValidator from 'App/Modules/Auth/Validators/ResendValidator'

export default class ResetController {
  public async handle({ request }: HttpContextContract) {
    const { email } = await request.validate(ResendValidator)

    try {
      await ResendOtp.handle(email)

      return new ApiResponses().success({
        message: 'An OTP code send to your registered mail again',
      })
    } catch (error) {
      return new ApiResponses().error({ message: error.message, status: Status.NOT_ACCEPTABLE })
    }
  }
}
