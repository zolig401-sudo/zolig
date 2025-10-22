import type { CollectionConfig } from 'payload'

export const ArticlesSimple: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'isPublished', 'createdAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'previewText',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short description shown in article previews',
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Controls whether the article is visible to the public',
      },
    },
    {
      name: 'featureType',
      type: 'select',
      options: [
        {
          label: 'Suggested',
          value: 'suggested',
        },
        {
          label: 'Trending',
          value: 'trending',
        },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main image for the article',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Article author',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        description: 'When the article was published (can differ from creation date)',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
      admin: {
        description: 'Tags for categorization and search',
      },
    },
  ],
  timestamps: true, // This automatically adds createdAt and updatedAt
}
