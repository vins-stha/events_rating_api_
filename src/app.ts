import express from 'express'
import dotenv from 'dotenv'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import eventRouter from './routers/event'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 5006)

// Global middleware
app.use(apiContentType)
app.use(express.json())

// Set up routers
app.use('/api/v1/event', eventRouter)


// Custom API error handler
app.use(apiErrorHandler)

export default app
