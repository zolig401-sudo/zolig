import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique identifier for this category',
      },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      admin: {
        description: 'Order in which categories should be displayed',
      },
    },
    {
      name: 'description',
      type: 'text',
      required: false,
    },
  ],
}
