import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Articles } from './collections/Articles'
import { B2bFacts } from './collections/B2bFacts'
import { Cafes } from './collections/Cafes'
import { CartSnapshots } from './collections/CartSnapshots'
import { Categories } from './collections/Categories'
import { Countries } from './collections/Countries'
import { Media } from './collections/Media'
import { Orders } from './collections/Orders'
import { Pages } from './collections/Pages'
import { Products } from './collections/Products'
import { Users } from './collections/Users'
import { DeliveryInfo } from './globals/DeliveryInfo'
import { PaymentSettings } from './globals/PaymentSettings'
import { Seo } from './globals/Seo'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    Countries,
    Products,
    Articles,
    Cafes,
    B2bFacts,
    Pages,
    Orders,
    CartSnapshots,
  ],
  globals: [SiteSettings, DeliveryInfo, PaymentSettings, Seo],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
