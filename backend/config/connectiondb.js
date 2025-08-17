import mongoose from 'mongoose'

const connectDB=async () => {
     await mongoose.connect("mongodb://127.0.0.1:27017/linkedin").then(()=>{
    console.log("connection ")
}).catch(()=>{
    console.log("not connected");  
})
}
export default connectDB;