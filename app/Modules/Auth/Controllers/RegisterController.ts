import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponses from 'App/Modules/Common/Responses/ApiResponses'

export default class RegisterController {
  public async handle({ response }: HttpContextContract) {
    await Mail.send((message) => {
      message
        .from('support.jdjr@solinx.technology')
        .to('thuraaung2493@gmail.com')
        .subject('OTP Code For Authentication Process')
        .htmlView('emails/welcome', { user: { name: 'Virk' }, otp: { code: '102939' } })
    })

    ApiResponses.success(response, {})
  }
}
