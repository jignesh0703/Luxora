import dotenv from 'dotenv'
import ConnectDB from './connectDB/ConnectDB.js';
import app from './app.js'
dotenv.config()

const PORT = process.env.PORT || 5000;

ConnectDB()
    .then(() => {
        app.listen(PORT,()=>{
            console.log(`Server is running on http://localhost:${process.env.PORT}`)
        })
    })
    .catch((error)=>{
        console.log("MONGO db connection failed !!! ", error)
    })