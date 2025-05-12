import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Cards from '#models/cards'

export default class extends BaseSeeder {
  async run() {
    await Cards.createMany([
  { name: "sundara" },
  { name: "editionxs" },
  { name: "arya" },
  { name: "600" },
  { name: "660s2" },
  { name: "800" },
  { name: "meze99" },
  { name: "meze109" },
  { name: "liric" },
])
  }
}