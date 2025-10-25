import { getPayload } from 'payload'
import config from './payload.config'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function initDatabase() {
  try {
    console.log('🔄 Initializing database...')
    
    const payload = await getPayload({ config: await config })
    
    // This will trigger Payload to create all necessary tables
    console.log('✅ Database initialized successfully!')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error initializing database:', error)
    process.exit(1)
  }
}

initDatabase()