// app/policies/post_policy.ts
import { BasePolicy } from '@adonisjs/bouncer'
import User from '#models/user'
import Post from '#models/post'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import AdminBasePolicy from './admin_base_policy.js'

export default class PostPolicy extends AdminBasePolicy {
  viewList(user: User): AuthorizerResponse {
    return true
  }

  view(user: User, post: Post): AuthorizerResponse {
    return user.id === (post.userId || user.role === 'ADMIN')
  }

  create(user: User): AuthorizerResponse {
    return true
  }

  edit(user: User, post: Post): AuthorizerResponse {
    return user.id === (post.userId || user.role === 'ADMIN')
  }

  update(user: User, post: Post): AuthorizerResponse {
    return user.id === (post.userId || user.role === 'ADMIN')
  }

   public delete(user: User, post: Post): AuthorizerResponse {
    // owners or admins can delete
    return user.id === (post.userId || user.role === 'ADMIN')
  }
}



