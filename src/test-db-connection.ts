// import { getPayload } from 'payload'
// import config from './payload.config'

// async function testConnection() {
//   try {
//     console.log('🔍 Testing database connection...')
    
//     const payload = await getPayload({ config: await config })
    
//     // Try to find categories to test the connection
//     const result = await payload.find({
//       collection: 'categories',
//       limit: 1,
//     })
    
//     console.log('✅ Database connection successful!')
//     console.log(`Found ${result.docs.length} categories`)
    
//     // Try to create a test article
//     console.log('🧪 Testing article creation...')
    
//     const testArticle = await payload.create({
//       collection: 'articles',
//       data: {
//         title: 'Test Article for Connection',
//         category: result.docs[0]?.id || 1,
//         previewText: 'This is a test article to verify database connection.',
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
//         isPublished: false,
//       },
//     })
    
//     console.log('✅ Article creation successful!')
//     console.log(`Created article with ID: ${testArticle.id}`)
//     console.log(`Generated slug: ${testArticle.slug}`)
    
//   } catch (error) {
//     console.error('❌ Database connection failed:', error)
//     console.error('Error details:', error.message)
//   } finally {
//     process.exit(0)
//   }
// }

// testConnection()
