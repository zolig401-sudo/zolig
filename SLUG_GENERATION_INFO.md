# Auto-Generated Article Slugs

## ✅ **Slug Generation Feature Added!**

Your articles now automatically generate unique, URL-friendly slugs based on the title.

### **How It Works:**

1. **Automatic Generation**: When you create a new article, the slug is automatically generated from the title
2. **URL-Friendly**: Special characters are removed, spaces become hyphens, everything is lowercase
3. **Unique**: If a slug already exists, a number is appended (e.g., `my-article-1`, `my-article-2`)
4. **Read-Only**: The slug field is now read-only in the admin panel to prevent conflicts

### **Examples:**

| Title | Generated Slug |
|-------|----------------|
| "Revolutionary AI Technology Transforms Healthcare Industry" | `revolutionary-ai-technology-transforms-healthcare-industry` |
| "Global Stock Markets Reach Record Highs!" | `global-stock-markets-reach-record-highs` |
| "New Study: Benefits of Exercise" | `new-study-benefits-of-exercise` |
| "Climate Change Summit 2024" | `climate-change-summit-2024` |

### **Features:**

✅ **Automatic**: No manual slug entry required
✅ **Unique**: Prevents duplicate slugs
✅ **SEO-Friendly**: Clean, readable URLs
✅ **Consistent**: Same title always generates same slug
✅ **Collision Handling**: Adds numbers for duplicates

### **Admin Panel Changes:**

- The slug field is now **read-only** in the admin panel
- You only need to enter the **title** when creating articles
- The slug is generated automatically when you save

### **For Developers:**

The slug generation happens in the `beforeValidate` hook in `src/collections/Articles.ts`:

```typescript
hooks: {
  beforeValidate: [
    async ({ data, req, operation }) => {
      if (data?.title && (!data.slug || operation === 'create')) {
        data.slug = await generateUniqueSlug(data.title, req.payload, data.id)
      }
      return data
    },
  ],
}
```

### **Testing:**

1. Create a new article with just a title
2. The slug will be automatically generated
3. Try creating another article with the same title
4. The second article will get a unique slug with a number

Your news website now has professional, SEO-friendly URLs! 🎉
