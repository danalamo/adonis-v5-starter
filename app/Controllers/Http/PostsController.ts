import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostsController {
  public async create({ view }: HttpContextContract) {
    return view.render('posts/create')
  }

  public async store({ request, response, session }: HttpContextContract) {
    const postSchema = schema.create({
      title: schema.string(),
      body: schema.string(),
    })

    const messages = {
      'title.required': 'Enter the post title',
      'body.required': 'Write some content for the post',
    }

    const payload = await request.validate({
      schema: postSchema,
      messages: messages,
    })

    console.log(payload)

    session.flash('success', 'Post created successfully')
    response.redirect().back()
  }
}
