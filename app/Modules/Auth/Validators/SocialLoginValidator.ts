import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import { ApiErrorReporter } from 'App/Modules/Common/ErrorReporters/ApiErrorReporter'

export default class SocialLoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = ApiErrorReporter

  public schema = schema.create({
    name: schema.string(),
    email: schema.string.optional([
      rules.email(),
      rules.maxLength(255),
      rules.requiredIfNotExistsAny(['phone']),
    ]),
    phone: schema.string.optional([
      rules.minLength(9),
      rules.maxLength(13),
      rules.requiredIfNotExistsAny(['email']),
    ]),
    loginId: schema.string([rules.maxLength(255)]),
  })

  public messages: CustomMessages = {
    'email.email': 'Email is invalid!',
    'email.requiredIfNotExistsAny': 'An email is required if a phone number does not exist.',
    'phone.requiredIfNotExistsAny':
      'A phone number is required if an email address does not exist.',
  }
}
