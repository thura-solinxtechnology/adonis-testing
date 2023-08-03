import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponses from 'App/Http/Responses/ApiResponses'
import { Status } from 'App/Http/Responses/Status'
import EmailRegister from 'App/Modules/Auth/Commands/EmailRegister'
import RegisterData from 'App/Modules/Auth/Data/RegisterData'
import RegisterValidator from 'App/Modules/Auth/Validators/RegisterValidator'

export default class RegisterController {
  public async handle({ response, request }: HttpContextContract) {
    const data = await request.validate(RegisterValidator)

    await EmailRegister.handle(RegisterData.of(data))

    ApiResponses.success(response, {
      message: 'Register success. OTP code is sent to your email',
      status: Status.CREATED,
    })
  }
}
