import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import { ApiErrorReporter } from 'App/Modules/Common/ErrorReporters/ApiErrorReporter'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = ApiErrorReporter

  public schema = schema.create({
    email: schema.string([rules.required(), rules.exists({ table: 'users', column: 'email' })]),
    password: schema.string([rules.required(), rules.minLength(8)]),
  })

  public messages: CustomMessages = {
    'email.required': 'Email is required!',
    'email.exists': 'Email has not been registered yet!',
    'password.required': 'Password is required!',
    'password.minLength': 'Password must include at least 8 length!',
  }
}
