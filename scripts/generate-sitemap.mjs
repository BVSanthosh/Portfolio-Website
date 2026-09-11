/**
 * Writes public/sitemap.xml from the slugs declared in src/content/projects.ts.
 * Runs automatically before `npm run build`.
 *
 * Set SITE_URL in the environment (or edit the fallback) once the domain is final.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')

const SITE_URL = (process.env.SITE_URL || 'https://basinavsanthosh.com').replace(/\/$/, '')

const source = readFileSync(join(root, 'src/content/projects.ts'), 'utf8')
const slugs = [...source.matchAll(/^\s*slug:\s*'([^']+)'/gm)].map((m) => m[1])

if (slugs.length === 0) {
  console.warn('[sitemap] no slugs found in projects.ts — writing the home page only')
}

const today = new Date().toISOString().slice(0, 10)

const urls = [
  { loc: `${SITE_URL}/`, priority: '1.0' },
  ...slugs.map((slug) => ({ loc: `${SITE_URL}/work/${slug}`, priority: '0.8' })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(root, 'public/sitemap.xml'), xml)
console.log(`[sitemap] wrote ${urls.length} urls for ${SITE_URL}`)
