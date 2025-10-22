# Fix: Method Not Allowed Error When Saving Articles

## 🚨 **The Problem**

You're getting a "Method not allowed" error when trying to save articles. This is typically caused by:

1. **Database not properly set up**
2. **Migration not completed**
3. **Database connection issues**

## ✅ **Solution Options**

### **Option 1: Complete the Database Migration (Recommended)**

The database migration is asking about the `users_sessions` table. Here's what to do:

1. **Run the migration command:**
   ```bash
   npm run test-db
   ```

2. **When prompted about `users_sessions` table:**
   - Press **Enter** to create the table
   - Or type `y` and press Enter

3. **This will set up your database properly**

### **Option 2: Set Up PostgreSQL Database**

If you don't have PostgreSQL running:

1. **Install PostgreSQL** (if not installed):
   ```bash
   # macOS with Homebrew
   brew install postgresql
   brew services start postgresql
   
   # Or use Docker
   docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
   ```

2. **Create the database:**
   ```sql
   CREATE DATABASE zolig_news;
   ```

3. **Set environment variable:**
   ```bash
   export DATABASE_URI="postgresql://username:password@localhost:5432/zolig_news"
   ```

### **Option 3: Use a Cloud Database (Easiest)**

1. **Sign up for a free PostgreSQL database:**
   - [Neon](https://neon.tech) (free tier)
   - [Supabase](https://supabase.com) (free tier)
   - [Railway](https://railway.app) (free tier)

2. **Get your connection string** from the provider

3. **Set it as environment variable:**
   ```bash
   export DATABASE_URI="your-connection-string-here"
   ```

### **Option 4: Quick Test with Docker**

If you have Docker installed:

1. **Start PostgreSQL with Docker:**
   ```bash
   docker run --name zolig-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=zolig_news -p 5432:5432 -d postgres
   ```

2. **Set environment variable:**
   ```bash
   export DATABASE_URI="postgresql://postgres:password@localhost:5432/zolig_news"
   ```

3. **Test the connection:**
   ```bash
   npm run test-db
   ```

## 🔧 **Step-by-Step Fix**

### **Step 1: Check Your Current Setup**

```bash
# Check if PostgreSQL is running
ps aux | grep postgres

# Check if you have a database
psql -l
```

### **Step 2: Set Up Environment Variables**

Create a `.env.local` file in your project root:

```env
PAYLOAD_SECRET=your-secret-key-here
DATABASE_URI=postgresql://username:password@localhost:5432/zolig_news
NEXT_PUBLIC_SERVER_URL=http://localhost:3001
```

### **Step 3: Run the Migration**

```bash
# Test database connection
npm run test-db

# When prompted about users_sessions table, press Enter
```

### **Step 4: Restart Your Development Server**

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

### **Step 5: Test Article Creation**

1. Go to `http://localhost:3001/admin`
2. Create your first admin user
3. Try creating an article
4. It should work without the "Method not allowed" error

## 🎯 **Quick Fix Summary**

1. **Answer the migration question** by pressing Enter
2. **Set up your database** (PostgreSQL or cloud)
3. **Set environment variables**
4. **Restart your development server**
5. **Test article creation**

## 🆘 **Still Having Issues?**

If you're still getting the error:

1. **Check the server logs** in your terminal
2. **Look for specific error messages** in the browser console
3. **Try a different database** (cloud vs local)
4. **Check your network connection**

## 📞 **Need Help?**

If none of these solutions work, please share:
1. The exact error message you see
2. Your operating system
3. Whether you have PostgreSQL installed
4. Any error messages in your terminal

The "Method not allowed" error will be fixed once your database is properly set up! 🚀

