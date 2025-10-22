# Quick Start - Adding Dummy Articles

## 🚀 Your News Website is Ready!

Your development server is running at: **http://localhost:3001**

## 📝 Add Sample Data (Choose One Method)

### Method 1: Admin Panel (Easiest)
1. Go to `http://localhost:3001/admin`
2. Create your first admin user
3. Add categories and articles through the web interface
4. Use the sample data from `ADD_DUMMY_DATA.md`

### Method 2: Answer the Migration Question
If you want to use the script:
1. Run: `PAYLOAD_SECRET=your-secret-key-here npm run add-sample-data`
2. When asked about `users_sessions` table, press **Enter** to create it
3. The script will add all sample data automatically

### Method 3: Manual Database Setup
If you prefer to set up the database manually:
1. Set up a PostgreSQL database
2. Update the `DATABASE_URI` in your environment
3. Run the migration commands

## 🎨 What You'll Get

Once you add the sample data, your website will have:

✅ **6 Categories**: Technology, Business, Sports, Entertainment, Health, Politics
✅ **8 Sample Articles** with rich content
✅ **Trending & Suggested** articles in sidebars
✅ **Infinite scroll** for latest news
✅ **Responsive design** for all devices
✅ **Beautiful styling** with gradients and animations

## 🔗 Quick Links

- **Frontend**: http://localhost:3001
- **Admin Panel**: http://localhost:3001/admin
- **Sample Data Guide**: See `ADD_DUMMY_DATA.md`

## 🎯 Next Steps

1. Add the sample data using any method above
2. Visit your news website
3. Test all the features
4. Customize the content and styling
5. Deploy when ready!

Your news website is fully functional and ready to use! 🎉

