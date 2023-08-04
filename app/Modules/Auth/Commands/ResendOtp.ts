import { Exception } from '@adonisjs/core/build/standalone'
import VerifyEmail from 'App/Mailers/VerifyEmail'
import { DateTime } from 'luxon'
import { generate } from 'otp-generator'
import FetchRegisteredUserByEmail from '../Queries/FetchRegisteredUserByEmail'

class ResendOtp {
  public async handle(email: string) {
    const user = await FetchRegisteredUserByEmail.handle(email)

    if (!user) {
      throw new Exception('This email has not been registered yet!')
    }

    if (user.emailVerifiedAt) {
      throw new Exception('This email has already been verified!')
    }

    const otp = await user.related('otps').create({
      code: generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      }),
      expiredAt: DateTime.now().plus({ minutes: 2 }),
    })

    await new VerifyEmail(user, otp).sendLater()
  }
}

export default new ResendOtp()
