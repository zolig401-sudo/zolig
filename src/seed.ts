// import { getPayload } from 'payload'
// import config from './payload.config'
// import dotenv from 'dotenv'

// // Load environment variables
// dotenv.config({ path: './test.env' })

// // Set required environment variables if not present
// process.env.PAYLOAD_SECRET = process.env.PAYLOAD_SECRET || 'your-secret-key-here'
// process.env.DATABASE_URI = process.env.DATABASE_URI || 'postgresql://username:password@localhost:5432/zolig_news'

// async function seed() {
//   const payload = await getPayload({ config: await config })

//   try {
//     console.log('🌱 Starting database seed...')

//     // Create categories
//     const categories = [
//       { slug: 'technology', label: 'Technology', order: 1, description: 'Latest tech news and innovations' },
//       { slug: 'business', label: 'Business', order: 2, description: 'Business and finance updates' },
//       { slug: 'sports', label: 'Sports', order: 3, description: 'Sports news and updates' },
//       { slug: 'entertainment', label: 'Entertainment', order: 4, description: 'Entertainment and celebrity news' },
//       { slug: 'health', label: 'Health', order: 5, description: 'Health and wellness news' },
//       { slug: 'politics', label: 'Politics', order: 6, description: 'Political news and analysis' },
//     ]

//     const createdCategories = []
//     for (const categoryData of categories) {
//       const existing = await payload.find({
//         collection: 'categories',
//         where: { slug: { equals: categoryData.slug } },
//         limit: 1,
//       })

//       if (existing.docs.length === 0) {
//         const category = await payload.create({
//           collection: 'categories',
//           data: categoryData,
//         })
//         createdCategories.push(category)
//         console.log(`✅ Created category: ${categoryData.label}`)
//       } else {
//         createdCategories.push(existing.docs[0])
//         console.log(`ℹ️  Category already exists: ${categoryData.label}`)
//       }
//     }

//     // Create users
//     const users = [
//       { email: 'john.doe@example.com', password: 'password123' },
//       { email: 'jane.smith@example.com', password: 'password123' },
//       { email: 'mike.johnson@example.com', password: 'password123' },
//     ]

//     const createdUsers = []
//     for (const userData of users) {
//       const existing = await payload.find({
//         collection: 'users',
//         where: { email: { equals: userData.email } },
//         limit: 1,
//       })

//       if (existing.docs.length === 0) {
//         const user = await payload.create({
//           collection: 'users',
//           data: userData,
//         })
//         createdUsers.push(user)
//         console.log(`✅ Created user: ${userData.email}`)
//       } else {
//         createdUsers.push(existing.docs[0])
//         console.log(`ℹ️  User already exists: ${userData.email}`)
//       }
//     }

//     // Create articles
//     const articles = [
//       {
//         title: 'Revolutionary AI Technology Transforms Healthcare Industry',
//         slug: 'revolutionary-ai-technology-transforms-healthcare',
//         category: createdCategories[0].id, // Technology
//         author: createdUsers[0].id,
//         previewText: 'A groundbreaking AI system has been developed that can diagnose diseases with 99% accuracy, potentially revolutionizing medical diagnosis worldwide.',
//         content: {
//           root: {
//             type: 'root',
//             children: [
//               {
//                 type: 'paragraph',
//                 children: [
//                   {
//                     type: 'text',
//                     text: 'In a major breakthrough for the healthcare industry, researchers have developed an artificial intelligence system that can diagnose diseases with unprecedented accuracy. The new AI technology, developed by a team of scientists at leading medical institutions, has shown remarkable results in early testing phases.',
//                     format: 0,
//                     version: 1,
//                   },
//                 ],
//                 version: 1,
//               },
//               {
//                 type: 'paragraph',
//                 children: [
//                   {
//                     type: 'text',
//                     text: 'The system uses advanced machine learning algorithms to analyze medical images, patient data, and symptoms to provide accurate diagnoses. In clinical trials, the AI achieved a 99% accuracy rate in identifying various diseases, including cancer, heart conditions, and neurological disorders.',
//                     format: 0,
//                     version: 1,
//                   },
//                 ],
//                 version: 1,
//               },
//               {
//                 type: 'heading',
//                 tag: 'h2',
//                 children: [
//                   {
//                     type: 'text',
//                     text: 'Impact on Medical Practice',
//                     format: 0,
//                     version: 1,
//                   },
//                 ],
//                 version: 1,
//               },
//               {
//                 type: 'paragraph',
//                 children: [
//                   {
//                     type: 'text',
//                     text: 'This revolutionary technology is expected to significantly reduce diagnostic errors and improve patient outcomes. Medical professionals are optimistic about the potential to save lives and reduce healthcare costs through earlier and more accurate diagnoses.',
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
//         featureType: 'trending',
//         publishedAt: new Date().toISOString(),
//         tags: [
//           { tag: 'AI' },
//           { tag: 'Healthcare' },
//           { tag: 'Technology' },
//           { tag: 'Innovation' },
//         ],
//       },
//       {
//         title: 'Global Stock Markets Reach Record Highs Amid Economic Recovery',
//         slug: 'global-stock-markets-record-highs-economic-recovery',
//         category: createdCategories[1].id, // Business
//         author: createdUsers[1].id,
//         previewText: 'Major stock indices around the world have surged to new all-time highs as investors show confidence in the ongoing economic recovery.',
//         content: {
//           root: {
//             type: 'root',
//             children: [
//               {
//                 type: 'paragraph',
//                 children: [
//                   {
//                     type: 'text',
//                     text: 'Global stock markets have experienced a remarkable rally this week, with major indices reaching unprecedented levels. The Dow Jones Industrial Average, S&P 500, and NASDAQ all closed at record highs, reflecting growing investor confidence in the economic recovery.',
//                     format: 0,
//                     version: 1,
//                   },
//                 ],
//                 version: 1,
//               },
//               {
//                 type: 'paragraph',
//                 children: [
//                   {
//                     type: 'text',
//                     text: 'Analysts attribute this surge to several factors, including strong corporate earnings, positive economic indicators, and optimistic outlooks from central banks. The technology sector has been particularly strong, with many companies reporting better-than-expected quarterly results.',
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
//         featureType: 'suggested',
//         publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
//         tags: [
//           { tag: 'Stocks' },
//           { tag: 'Economy' },
//           { tag: 'Finance' },
//           { tag: 'Markets' },
//         ],
//       },
//       {
//         title: 'Championship Finals Set for This Weekend',
//         slug: 'championship-finals-set-this-weekend',
//         category: createdCategories[2].id, // Sports
//         author: createdUsers[2].id,
//         previewText: 'The highly anticipated championship finals are scheduled for this weekend, with two top teams competing for the ultimate prize.',
//         content: {
//           root: {
//             type: 'root',
//             children: [
//               {
//                 type: 'paragraph',
//                 children: [
//                   {
//                     type: 'text',
//                     text: 'After an intense season of competition, the championship finals are finally here. The two best teams in the league will face off this weekend in what promises to be an unforgettable match.',
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
//         featureType: 'trending',
//         publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
//         tags: [
//           { tag: 'Sports' },
//           { tag: 'Championship' },
//           { tag: 'Finals' },
//         ],
//       },
//       {
//         title: 'New Study Reveals Benefits of Regular Exercise',
//         slug: 'new-study-reveals-benefits-regular-exercise',
//         category: createdCategories[4].id, // Health
//         author: createdUsers[0].id,
//         previewText: 'A comprehensive study shows that regular exercise can significantly improve both physical and mental health, with benefits lasting well into old age.',
//         content: {
//           root: {
//             type: 'root',
//             children: [
//               {
//                 type: 'paragraph',
//                 children: [
//                   {
//                     type: 'text',
//                     text: 'A groundbreaking study published in the Journal of Health Sciences has revealed that regular exercise provides numerous long-term health benefits. The research, conducted over a 10-year period with over 50,000 participants, shows that even moderate physical activity can significantly improve quality of life.',
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
//         featureType: 'suggested',
//         publishedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
//         tags: [
//           { tag: 'Health' },
//           { tag: 'Exercise' },
//           { tag: 'Wellness' },
//           { tag: 'Study' },
//         ],
//       },
//       {
//         title: 'Major Political Summit Addresses Climate Change',
//         slug: 'major-political-summit-addresses-climate-change',
//         category: createdCategories[5].id, // Politics
//         author: createdUsers[1].id,
//         previewText: 'World leaders gather for a crucial summit to discuss climate change policies and set new environmental targets for the coming decade.',
//         content: {
//           root: {
//             type: 'root',
//             children: [
//               {
//                 type: 'paragraph',
//                 children: [
//                   {
//                     type: 'text',
//                     text: 'Leaders from around the world have convened for a critical summit focused on addressing climate change. The three-day event aims to establish new environmental policies and set ambitious targets for reducing carbon emissions.',
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
//         featureType: 'trending',
//         publishedAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
//         tags: [
//           { tag: 'Politics' },
//           { tag: 'Climate' },
//           { tag: 'Environment' },
//           { tag: 'Summit' },
//         ],
//       },
//       {
//         title: 'Blockchain Technology Revolutionizes Financial Services',
//         slug: 'blockchain-technology-revolutionizes-financial-services',
//         category: createdCategories[0].id, // Technology
//         author: createdUsers[2].id,
//         previewText: 'Financial institutions are rapidly adopting blockchain technology to improve security, transparency, and efficiency in their operations.',
//         content: {
//           root: {
//             type: 'root',
//             children: [
//               {
//                 type: 'paragraph',
//                 children: [
//                   {
//                     type: 'text',
//                     text: 'The financial services industry is experiencing a major transformation as blockchain technology becomes increasingly integrated into banking and payment systems. Major banks and financial institutions are investing heavily in blockchain solutions to enhance security and reduce transaction costs.',
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
//         featureType: 'suggested',
//         publishedAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
//         tags: [
//           { tag: 'Blockchain' },
//           { tag: 'Finance' },
//           { tag: 'Technology' },
//           { tag: 'Banking' },
//         ],
//       },
//       {
//         title: 'Entertainment Industry Embraces Virtual Reality',
//         slug: 'entertainment-industry-embraces-virtual-reality',
//         category: createdCategories[3].id, // Entertainment
//         author: createdUsers[0].id,
//         previewText: 'Movie studios and game developers are increasingly incorporating VR technology to create immersive entertainment experiences.',
//         content: {
//           root: {
//             type: 'root',
//             children: [
//               {
//                 type: 'paragraph',
//                 children: [
//                   {
//                     type: 'text',
//                     text: 'The entertainment industry is undergoing a digital revolution as virtual reality technology becomes more accessible and sophisticated. Major studios and game developers are investing heavily in VR content to provide audiences with unprecedented immersive experiences.',
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
//         featureType: 'trending',
//         publishedAt: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
//         tags: [
//           { tag: 'VR' },
//           { tag: 'Entertainment' },
//           { tag: 'Gaming' },
//           { tag: 'Technology' },
//         ],
//       },
//       {
//         title: 'Renewable Energy Investments Reach New Heights',
//         slug: 'renewable-energy-investments-reach-new-heights',
//         category: createdCategories[1].id, // Business
//         author: createdUsers[1].id,
//         previewText: 'Global investments in renewable energy have reached record levels as countries accelerate their transition to clean energy sources.',
//         content: {
//           root: {
//             type: 'root',
//             children: [
//               {
//                 type: 'paragraph',
//                 children: [
//                   {
//                     type: 'text',
//                     text: 'The renewable energy sector is experiencing unprecedented growth as governments and corporations worldwide increase their investments in clean energy technologies. Solar and wind power projects are leading the charge, with new installations breaking records every quarter.',
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
//         featureType: 'suggested',
//         publishedAt: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
//         tags: [
//           { tag: 'Renewable Energy' },
//           { tag: 'Sustainability' },
//           { tag: 'Investment' },
//           { tag: 'Clean Energy' },
//         ],
//       },
//     ]

//     for (const articleData of articles) {
//       const existing = await payload.find({
//         collection: 'articles',
//         where: { slug: { equals: articleData.slug } },
//         limit: 1,
//       })

//       if (existing.docs.length === 0) {
//         const article = await payload.create({
//           collection: 'articles',
//           data: articleData,
//         })
//         console.log(`✅ Created article: ${articleData.title}`)
//       } else {
//         console.log(`ℹ️  Article already exists: ${articleData.title}`)
//       }
//     }

//     console.log('🎉 Database seeding completed successfully!')
//   } catch (error) {
//     console.error('❌ Error seeding database:', error)
//   } finally {
//     process.exit(0)
//   }
// }

// seed()
