import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import { ApiErrorReporter } from 'App/Modules/Common/ErrorReporters/ApiErrorReporter'

export default class VerifyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = ApiErrorReporter

  public schema = schema.create({
    email: schema.string([rules.required(), rules.email(), rules.maxLength(255)]),
    code: schema.string([rules.required(), rules.minLength(6), rules.maxLength(6)]),
  })

  public messages: CustomMessages = {
    'email.required': 'Email is required!',
    'email.email': 'Email is invalid!',
    'email.maxLength': 'Email is too long!',
  }
}
