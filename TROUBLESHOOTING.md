# Troubleshooting "Method Not Allowed" Error

## 🚨 **Issue: Method Not Allowed Error When Creating Articles**

This error typically occurs due to one of the following issues:

### **1. Database Connection Issues**

**Test your database connection:**
```bash
npm run test-db
```

**Common fixes:**
- Ensure your database is running
- Check your `DATABASE_URI` environment variable
- Verify database credentials

### **2. CORS Issues**

**Solution:** I've added CORS middleware in `src/middleware.ts`

**If still having issues, try:**
1. Clear your browser cache
2. Try in an incognito window
3. Check browser console for CORS errors

### **3. Slug Generation Hook Issues**

**Temporary fix:** Use the simple Articles collection without auto-slug generation:

1. **Backup your current Articles collection:**
   ```bash
   cp src/collections/Articles.ts src/collections/Articles-backup.ts
   ```

2. **Replace with simple version:**
   ```bash
   cp src/collections/Articles-simple.ts src/collections/Articles.ts
   ```

3. **Restart your development server:**
   ```bash
   npm run dev
   ```

### **4. Environment Variables**

**Check your environment variables:**
```bash
# Make sure these are set
PAYLOAD_SECRET=your-secret-key-here
DATABASE_URI=your-database-connection-string
```

### **5. Database Migration Issues**

**If you're getting migration errors:**
```bash
# Reset migrations
npm run payload -- migrate:reset

# Or create new migration
npm run payload -- migrate:create
```

### **6. Quick Test Steps**

1. **Test database connection:**
   ```bash
   npm run test-db
   ```

2. **Check admin panel access:**
   - Go to `http://localhost:3001/admin`
   - Try to create a category first
   - Then try to create an article

3. **Check browser console:**
   - Open Developer Tools (F12)
   - Look for any error messages
   - Check Network tab for failed requests

### **7. Alternative: Manual Slug Entry**

If auto-slug generation is causing issues, you can:

1. Use the simple Articles collection (no auto-slug)
2. Manually enter slugs in the admin panel
3. Use this format: `my-article-title`

### **8. Common Solutions**

**Solution 1: Restart Everything**
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

**Solution 2: Clear Next.js Cache**
```bash
rm -rf .next
npm run dev
```

**Solution 3: Check Database**
- Ensure PostgreSQL is running
- Check if database exists
- Verify connection string

### **9. Debug Information**

**To get more debug info, add this to your payload config:**
```typescript
export default buildConfig({
  // ... existing config
  debug: true, // Add this line
  // ... rest of config
})
```

### **10. Still Having Issues?**

If none of the above solutions work:

1. **Check the server logs** in your terminal
2. **Look for specific error messages** in the browser console
3. **Try creating a simple article** with minimal fields
4. **Test with different browsers**

## 🎯 **Quick Fix Summary**

1. Run `npm run test-db` to test database connection
2. If that fails, check your database setup
3. If that works, try the simple Articles collection
4. Restart your development server
5. Try creating an article again

Let me know what error messages you see and I can help further! 🚀
