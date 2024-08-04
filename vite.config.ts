import { defineConfig } from 'vite'
import devServer from '@hono/vite-dev-server'
import ssg from '@hono/vite-ssg'

const entry = 'src/index.tsx';

export default defineConfig({
  plugins: [
    ssg({ entry }),
    devServer({ entry })
  ],
})