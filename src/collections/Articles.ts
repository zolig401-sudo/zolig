import type { CollectionConfig } from 'payload'

// Helper function to create URL-friendly slug
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

// Helper function to generate unique slug (simplified version)
function generateUniqueSlug(title: string): string {
  const baseSlug = createSlug(title)
  // Add timestamp to ensure uniqueness without database query
  return `${baseSlug}-${Date.now()}`
}

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'isPublished', 'createdAt'],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Always generate slug if title exists and slug is missing
        if (data?.title && !data.slug) {
          data.slug = generateUniqueSlug(data.title)
        }
        return data
      },
    ],
    beforeChange: [
      ({ data }) => {
        // Ensure slug is always present before saving
        if (data?.title && !data.slug) {
          data.slug = generateUniqueSlug(data.title)
        }
        return data
      },
    ],
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
      required: false,
      unique: true,
      defaultValue: () => `article-${Date.now()}`,
      admin: {
        description: 'URL-friendly version of the title (auto-generated)',
        readOnly: true,
        condition: (data) => Boolean(data.title),
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

