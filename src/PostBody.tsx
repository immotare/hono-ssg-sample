import { FC } from 'hono/jsx'

export const PostBody: FC = (props) => {
  return (
    <div dangerouslySetInnerHTML={{__html: props.content}}></div>
  )
}