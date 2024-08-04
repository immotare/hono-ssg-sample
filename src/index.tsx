import { Hono } from 'hono'
import { PostBody } from './PostBody'
import { ssgParams } from 'hono/ssg'
import { getPosts } from './listPosts'

const app = new Hono()

app.get('/', (c) => {
  return c.render(<h1>Hello!</h1>)
})

const posts = await getPosts();

app.get('/posts/:postName',
  ssgParams(async () => {
    return posts.map((post) => {
      return { 
        postName: post.postName
      }
    });
  }),
  async (c) => {
    const postName = c.req.param("postName");
    const post = posts.find((post) => post.postName === postName);
    if (!post) {
      return c.redirect("/404");
    }
    return c.render(
      <PostBody content={post.contents}>
      </PostBody>
    );
  }
)

export default app
