import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import Cards from '#models/cards'

export default class PostsController {
  public async store({ auth, request, params, response }: HttpContext) {
    const user = await auth.getUserOrFail()
    const card = await Cards.findByOrFail('name', params.name)
    const body = request.input('post')

    await Post.create({ userId: user.id, cardId: card.id, comment: body })

    return response.redirect().toRoute('pages.show', { name: card.name })
  }

  public async update({ auth, request, params, response }: HttpContext) {
    const user = await auth.getUserOrFail()
    const post = await Post.findOrFail(params.id)
    if (post.userId !== user.id) return response.unauthorized('You can edit only your own comment.')

    post.comment = request.input('post')
    await post.save()

    return response.redirect().toRoute('pages.show', { name: params.name })
  }

  public async destroy({ auth, params, response }: HttpContext) {
    const user = await auth.getUserOrFail()
    const post = await Post.findOrFail(params.id)
    if (post.userId !== user.id) return response.unauthorized('You can delete only your own comment.')

    await post.delete()
    return response.redirect().toRoute('pages.show', { name: params.name })
  }
}