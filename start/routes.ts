import router from '@adonisjs/core/services/router'
import PagesController from '#controllers/pages_controller'
import UsersController from '#controllers/users_controller'
import { middleware } from './kernel.js'
import PostsController from '#controllers/posts_controller'

router.on('/login').render('signin').as('login')
router.get('/', async ({ response }) => {
  response.redirect().toRoute('login')
})

router
  .group(() => {
router.get('/pages/home', [PagesController, 'index']).as('home.page')
router.get('/pages/senheiser_hd600', [PagesController, 'hd600']).as('hd600.page')
router.get('/pages/senheiser_hd660s2', [PagesController, 'hd660s2']).as('hd660s2.page')
router.get('/pages/senheiser_hd800', [PagesController, 'hd800']).as('hd800.page')

router.get('/pages/hifiman_sundara', [PagesController, 'sundara']).as('sundara.page')
router.get('/pages/hifiman_editionxs', [PagesController, 'editionxs']).as('editionxs.page')
router.get('/pages/hifiman_arya', [PagesController, 'arya']).as('arya.page')

router.get('/pages/mezeaudio_99', [PagesController, 'meze99']).as('meze99.page')
router.get('/pages/mezeaudio_109', [PagesController, 'meze109']).as('meze109.page')
router.get('/pages/mezeaudio_liric', [PagesController, 'liric']).as('liric.page')

router.get('/pages/:name', [PagesController, 'show']).as('pages.show')
router.post('/pages', [PagesController, 'search']).as('pages.search')


router.post('/cards/:name/posts', [PostsController, 'store']).as('posts.store')
router.get( '/cards/:name/posts/:id', [PostsController, 'destroy']).as('posts.destroy')
router.post('/cards/:name/posts/:id', [PostsController, 'update']).as('posts.update')
})
  .use(middleware.auth())

  
router.post('/login', [UsersController, 'login']).as('users.login')
router.post('/register', [UsersController, 'register']).as('users.register')
router.get('/logout', [UsersController, 'logout']).as('users.logout')
router.get('/register', [UsersController, 'signup']).as('register')
