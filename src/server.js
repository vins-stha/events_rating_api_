import express from 'express'
import dotenv from 'dotenv'


dotenv.config({path:'.env'});
const app = express();


// Middlewares
app.use(express.json())


// routers
app.get('/', (req,res)=>{
    res.send('Hello world')
});

// Configure server
app.listen((process.env.PORT || 5001), ()=>{
    console.log(`server running at ${app.get('port')}`);
})

export default app