import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // If this is a create operation and we have a file uploaded
        if (operation === 'create' && doc.filename) {
          // The UploadThing adapter should populate _key automatically
          // But if it doesn't, we can extract it from the URL
          if (!doc._key && doc.url) {
            // Extract key from UploadThing URL: https://<app-id>.ufs.sh/f/<key>
            const match = doc.url.match(/\.ufs\.sh\/f\/([^/?]+)/)
            if (match && match[1]) {
              // Update the document with the key
              await req.payload.update({
                collection: 'media',
                id: doc.id,
                data: {
                  _key: match[1],
                },
              })
            }
          }
        }
        return doc
      },
    ],
  },
}