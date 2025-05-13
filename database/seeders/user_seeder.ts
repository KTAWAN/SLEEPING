import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '../../contact/Role.js'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.create({ username: 'admin', password: 'admin', role: Role.ADMIN })
  }
}
