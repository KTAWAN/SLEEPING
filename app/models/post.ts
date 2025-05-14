import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Cards from './cards.js'
import User from './user.js'


export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
    
   @column()
  declare user_id: number

  @column()
  declare card_id: number

  @column()
  declare post: string

  @hasMany(() => Cards)
  declare cards: HasMany<typeof Cards>

  @hasMany(() => User)
  declare users: HasMany<typeof User>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime
}
