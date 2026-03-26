#!/usr/bin/env node
/**
 * CI/локальная проверка: в коллекции products поле images остаётся upload + hasMany.
 * Не заменяет ручной прогон админки, но ловит случайную регрессию в схеме.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const file = path.join(__dirname, '..', 'src', 'collections', 'Products.ts')
const src = fs.readFileSync(file, 'utf8')
const idx = src.indexOf("name: 'images'")
if (idx === -1) {
  console.error('verify-products-images: block images not found')
  process.exit(1)
}
const slice = src.slice(idx, idx + 400)
if (!/type:\s*'upload'/.test(slice) || !/hasMany:\s*true/.test(slice)) {
  console.error('verify-products-images: expected upload + hasMany on images')
  process.exit(1)
}
console.log('verify-products-images: OK')
