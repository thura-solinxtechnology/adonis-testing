import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiResponses from 'App/Http/Responses/ApiResponses'
import UserLogin from 'App/Modules/Auth/Commands/UserLogin'
import UserCredential from 'App/Modules/Auth/Data/UserCredential'
import LoginValidator from 'App/Modules/Auth/Validators/LoginValidator'

export default class LoginController {
  public async handle({ request, auth }: HttpContextContract) {
    const data = await request.validate(LoginValidator)

    try {
      const user = await UserLogin.handle(UserCredential.of(data))

      new ApiResponses().success({
        data: await auth.use('api').generate(user),
        message: 'Login success.',
      })
    } catch (error) {
      new ApiResponses().error({ message: error.message })
    }
  }
}
