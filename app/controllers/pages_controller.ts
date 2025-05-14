 import type { HttpContext } from '@adonisjs/core/http'
 import Cards from '#models/cards'
 import Post from '#models/post'
 

export default class PagesController {
    public async home({ view }: HttpContext) {
    return view.render('pages/home')
  }

  public async hd600({ view }: HttpContext) {
    return view.render('pages/600')
  }

  public async hd660s2({ view }: HttpContext) {
    return view.render('pages/660s2')
  }

  public async hd800({ view }: HttpContext) {
    return view.render('pages/800')
  }

  public async sundara({ view }: HttpContext) {
    return view.render('pages/sundara')
  }

  public async editionxs({ view }: HttpContext) {
    return view.render('pages/editionxs')
  }

  public async arya({ view }: HttpContext) {
    return view.render('pages/arya')
  }

  public async meze99({ view }: HttpContext) {
    return view.render('pages/meze99')
  }

  public async meze109({ view }: HttpContext) {
    return view.render('pages/meze109')
  }

  public async liric({ view }: HttpContext) {
    return view.render('pages/liric')
  }

  async index({ view }: HttpContext) {
    const senheiser = await Cards.query().whereIn('name',['600','660s2','800']).orderBy('id', 'asc')
    const hifiman = await Cards.query().whereIn('name',['sundara','editionxs','arya']).orderBy('id', 'asc')
    const meze = await Cards.query().whereIn('name',['meze99','meze109','liric']).orderBy('id', 'asc')
    return view.render('pages/home', { senheiser, hifiman, meze })
  }

  public async show({ params, view }: HttpContext) {
    const name = params.name
    const card = await Cards.query()
      .where('name', params.name)
      .firstOrFail()

    const posts = await Post.query()
      .where('card_id', card.id)
      .preload('cards')                   
      .orderBy('created_at', 'desc')

    return view.render(`pages/${name}`, {
      name: name,
      posts,                             // now each post has a `.user`
    })
    }

  
  async search({ request, view,response }: HttpContext) {
    const id = request.input('search')
    const name = await Cards.query()
  .whereRaw('name COLLATE utf8mb4_general_ci LIKE ?', [`%${id}%`])
  .first()


    if (!name) {
        return response.redirect('/pages/home')
  }

        return view.render(`pages/${name?.name}`, { name })
    

    
  }

}


  

