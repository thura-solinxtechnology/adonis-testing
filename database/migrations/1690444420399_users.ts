import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import LoginTypes from 'App/Modules/Common/Enums/LoginTypes'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id', { primaryKey: true }).primary().notNullable()

      table.string('name').notNullable()
      table.string('phone').nullable()

      table.string('email').nullable()
      table.string('password').nullable()
      table.timestamp('email_verified_at', { useTz: true }).nullable()

      table.enum('login_type', Object.values(LoginTypes)).defaultTo(LoginTypes.Email)
      table.string('login_id').nullable()

      table.string('firebase_token').nullable()
      table.string('profile_image').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.unique(['email', 'login_type'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
