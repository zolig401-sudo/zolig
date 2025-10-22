// import { getPayload } from 'payload'
// import config from './payload.config'

// async function testSQLite() {
//   try {
//     console.log('🔍 Testing SQLite connection...')
    
//     const payload = await getPayload({ config: await config })
    
//     // Test creating a category
//     console.log('📝 Creating test category...')
//     const category = await payload.create({
//       collection: 'categories',
//       data: {
//         slug: 'test-category',
//         label: 'Test Category',
//         order: 1,
//         description: 'Test category for SQLite',
//       },
//     })
//     console.log('✅ Category created:', category.id)
    
//     // Test creating an article
//     console.log('📝 Creating test article...')
//     const article = await payload.create({
//       collection: 'articles',
//       data: {
//         title: 'Test Article for SQLite',
//         category: category.id,
//         previewText: 'This is a test article to verify SQLite works.',
//         content: {
//           root: {
//             type: 'root',
//             children: [
//               {
//                 type: 'paragraph',
//                 children: [
//                   {
//                     type: 'text',
//                     text: 'This is a test article content.',
//                     format: 0,
//                     version: 1,
//                   },
//                 ],
//                 version: 1,
//               },
//             ],
//             direction: 'ltr',
//             format: '',
//             indent: 0,
//             version: 1,
//           },
//         },
//         isPublished: true,
//       },
//     })
    
//     console.log('✅ Article created successfully!')
//     console.log(`Article ID: ${article.id}`)
//     console.log(`Generated slug: ${article.slug}`)
//     console.log('🎉 SQLite setup is working perfectly!')
    
//   } catch (error) {
//     console.error('❌ SQLite test failed:', error)
//     console.error('Error details:', error.message)
//   } finally {
//     process.exit(0)
//   }
// }

// testSQLite()

