import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponses from 'App/Http/Responses/ApiResponses'
import { Status } from 'App/Http/Responses/Status'
import ResendOtp from 'App/Modules/Auth/Commands/ResendOtp'
import ResendValidator from 'App/Modules/Auth/Validators/ResendValidator'

export default class ResendController {
  public async handle({ response, request }: HttpContextContract) {
    const { email } = await request.validate(ResendValidator)

    try {
      await ResendOtp.handle(email)

      return ApiResponses.success(response, {
        message: 'An OTP code send to your registered mail again',
      })
    } catch (error) {
      return ApiResponses.error(response, { message: error.message, status: Status.NOT_ACCEPTABLE })
    }
  }
}
