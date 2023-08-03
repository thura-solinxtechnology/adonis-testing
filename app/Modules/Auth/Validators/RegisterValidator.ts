import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import { ApiErrorReporter } from 'App/Modules/Common/ErrorReporters/ApiErrorReporter'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = ApiErrorReporter

  public schema = schema.create({
    name: schema.string([rules.required(), rules.minLength(3), rules.maxLength(150)]),
    email: schema.string([
      rules.required(),
      rules.email(),
      rules.maxLength(255),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string([rules.required(), rules.minLength(8), rules.confirmed()]),
  })

  public messages: CustomMessages = {
    'name.required': 'Name is required!',
    'name.minLength': 'Name must include at least 3 characters!',
    'name.maxLength': 'Name is too long!',
    'email.required': 'Email is required!',
    'email.email': 'Email is invalid!',
    'email.maxLength': 'Email is too long!',
    'email.unique': 'Email is already taken',
  }
}
