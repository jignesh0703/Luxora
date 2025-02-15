import mongoose from 'mongoose'

const ConnectDB = async() => {
    try {
        await mongoose.connect(process.env.MongoDB_URL , {
            serverSelectionTimeoutMS: 30000
        })

        console.log('Databse Connected Succesfully')
    } catch (error) {
        console.log("Database Don't Connected")
        process.exit(1)
    }
}

export default ConnectDB