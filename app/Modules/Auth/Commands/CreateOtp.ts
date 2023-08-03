import User from 'App/Models/User'
import { DateTime } from 'luxon'
import { generate } from 'otp-generator'

class CreateOtp {
  public handle(user: User) {
    return user.related('otps').create({
      code: generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      }),
      expiredAt: DateTime.now().plus({ minutes: 2 }),
    })
  }
}

export default new CreateOtp()
