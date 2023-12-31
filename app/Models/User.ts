import Hash from '@ioc:Adonis/Core/Hash'
import {
  BaseModel,
  HasMany,
  beforeCreate,
  beforeSave,
  column,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import LoginTypes from 'App/Modules/Common/Enums/LoginTypes'
import { DateTime } from 'luxon'
import * as uuid from 'uuid'
import Otp from './Otp'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public email?: string

  @column({ serializeAs: null })
  public password?: string

  @column()
  public phone?: string

  @column({ serializeAs: 'firebaseToken' })
  public firebaseToken?: string

  @column()
  public profileImage?: string

  @column({ serializeAs: 'loginType' })
  public loginType: LoginTypes

  @column({ serializeAs: 'loginId' })
  public loginId?: string

  @column.dateTime({ serializeAs: null })
  public emailVerifiedAt?: DateTime

  @column.dateTime({
    autoCreate: true,
    serializeAs: 'createdAt',
    serialize: (value: DateTime | null) => {
      return value
        ? { string: value.toFormat('yyyy-MM-dd HH:mm:ss'), human: value.toRelative() }
        : value
    },
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: 'updatedAt',
    serialize: (value: DateTime | null) => {
      return value
        ? { string: value.toFormat('yyyy-MM-dd HH:mm:ss'), human: value.toRelative() }
        : value
    },
  })
  public updatedAt: DateTime

  @hasMany(() => Otp)
  public otps: HasMany<typeof Otp>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password!)
    }
  }

  @beforeCreate()
  public static async addUUID(user: User) {
    user.id = uuid.v4()
  }
}
