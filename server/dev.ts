import fs from 'fs'
import path from 'path'

import { Application } from 'express'

import { HTML_KEY } from './constants'
import { applyServerTheme } from './lib/applyServerTheme'
import { getClientTheme } from './lib/getClientTheme'

const HTML_PATH = path.resolve(process.cwd(), 'index.html')
const ENTRY_SERVER_PATH = path.resolve(process.cwd(), 'src/entry-server.tsx')

export async function setupDev(app: Application) {
  const vite = await (
    await import('vite')
  ).createServer({
    root: process.cwd(),
    server: { middlewareMode: true },
    appType: 'custom',
  })

  app.use(vite.middlewares)

  app.get('*', async (req, res, next) => {
    try {
      let html = fs.readFileSync(HTML_PATH, 'utf-8')
      html = await vite.transformIndexHtml(req.originalUrl, html)

      const { render } = await vite.ssrLoadModule(ENTRY_SERVER_PATH)
      const appHtml = await render(getClientTheme(req))

      html = applyServerTheme(req, html)
      html = html.replace(HTML_KEY, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e as Error)
      console.error((e as Error).stack)
      next(e)
    }
  })
}
