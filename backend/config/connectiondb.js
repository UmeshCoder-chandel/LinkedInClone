import mongoose from 'mongoose'

const connectDB=async () => {
     await mongoose.connect(process.env.MONGODB).then(()=>{
    console.log("atlas connection ")
}).catch(()=>{
    console.log("not connected");  
})
}
export default connectDB;