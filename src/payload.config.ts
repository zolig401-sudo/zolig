import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
// import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Articles } from './collections/Articles'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, Articles],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: 'eyJhcGlLZXkiOiJza19saXZlXzI4ZjY4OThkZTkyYjYzZDQyNmI0N2VjNmMyZWFjNDM2NDU0YTA3ODVhMDFkODA2ZmQzZGU3NDJkZDgyNWE3OTIiLCJhcHBJZCI6IjdubnpzeWgwOHciLCJyZWdpb25zIjpbInNlYTEiXX0=',
        acl: 'public-read',
      },
    }),
  ],
})
