import express from 'express'
import dotenv from 'dotenv'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import eventRouter from './routers/event'
import voterRouter from './routers/voter'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 5006)

// Global middleware
app.use(apiContentType)
app.use(express.json())

// Set up routers
app.use('/api/v1/event', eventRouter);
app.use('/api/v1/voter', voterRouter)



// Custom API error handler
app.use(apiErrorHandler)

export default app
