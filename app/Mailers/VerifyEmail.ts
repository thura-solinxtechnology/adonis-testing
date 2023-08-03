import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Otp from 'App/Models/Otp'
import User from 'App/Models/User'
import { fromAddress } from 'Config/mail'

export default class VerifyEmail extends BaseMailer {
  constructor(
    private user: User,
    private otp: Otp,
    private forgot: boolean = false
  ) {
    super()
  }

  /**
   * The prepare method is invoked automatically when you run
   * "VerifyEmail.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public async prepare(message: MessageContract) {
    await message
      .from(fromAddress)
      .to(this.user.email!)
      .subject(this.getSubject())
      .htmlView('emails/verify', { user: this.user, otp: this.otp })
  }

  private getSubject() {
    return this.forgot ? 'Password Reset' : 'Email Verify'
  }
}
