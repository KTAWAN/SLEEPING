import type { HttpContext } from '@adonisjs/core/http'
import Cards from '#models/cards'
import Post from '#models/post'

export default class PagesController {
  public async home({ view }: HttpContext) {
    return view.render('pages/home')
  }

  async index({ view }: HttpContext) {
    const senheiser = await Cards.query().whereIn('name', ['600', '660s2', '800']).orderBy('id')
    const hifiman = await Cards.query().whereIn('name', ['sundara', 'editionxs', 'arya']).orderBy('id')
    const meze = await Cards.query().whereIn('name', ['meze99', 'meze109', 'liric']).orderBy('id')
    return view.render('pages/home', { senheiser, hifiman, meze })
  }

  public async show({ params, view }: HttpContext) {
    const name = params.name
    const card = await Cards.query().where('name', name).firstOrFail()
    const posts = await Post.query()
      .where('cardId', card.id)
      .preload('user')
      .orderBy('createdAt', 'desc')

    return view.render(`pages/${name}`, { name, posts, card })
  }

  public async search({ request, response, view }: HttpContext) {
    const id = request.input('search')
    const card = await Cards.query().whereRaw('name COLLATE utf8mb4_general_ci LIKE ?', [`%${id}%`]).first()

    if (!card) {
      return response.redirect('/pages/home')
    }
    return view.render(`pages/${card.name}`, { name: card.name })
  }

  public async hd600({ view }: HttpContext) { return view.render('pages/hd600') }
  public async hd660s2({ view }: HttpContext) { return view.render('pages/hd660s2') }
  public async hd800({ view }: HttpContext) { return view.render('pages/hd800') }
  public async sundara({ view }: HttpContext) { return view.render('pages/sundara') }
  public async editionxs({ view }: HttpContext) { return view.render('pages/editionxs') }
  public async arya({ view }: HttpContext) { return view.render('pages/arya') }
  public async meze99({ view }: HttpContext) { return view.render('pages/meze99') }
  public async meze109({ view }: HttpContext) { return view.render('pages/meze109') }
  public async liric({ view }: HttpContext) { return view.render('pages/liric') }
}
