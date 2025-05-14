import { type HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import Cards from '#models/cards'

export default class PostsController {
  
   public async store({ auth, request, params, response }: HttpContext) {
    const user     = await auth.getUserOrFail()
    const cardName = params.name!
    const card     = await Cards.query().where('name', cardName).firstOrFail()
    const { post } = request.input('post') as { post: string }

    await Post.create({
      user_id: user.id,
      card_id: card.id,
      post,
    })

    // Redirect back to GET /pages/:name
    return response.redirect().toRoute('pages.show', { name: cardName })
  }

  public async update({ auth, request, params, response }: HttpContext) {
    const user     = await auth.getUserOrFail()
    const cardName = params.name!
    const card     = await Cards.query().where('name', cardName).firstOrFail()
    const post     = await Post.findOrFail(params.id)
    const { post: body } = request.input('post') as { post: string }

    post.user_id = user.id
    post.card_id = card.id
    post.post    = body
    await post.save()

    return response.redirect().toRoute('pages.show', { name: cardName })
  }

  public async destroy({ params, response }: HttpContext) {
    const cardName = params.name!
    const post     = await Post.findOrFail(params.id)
    await post.delete()

    return response.redirect().toRoute('pages.show', { name: cardName })
  }
}
