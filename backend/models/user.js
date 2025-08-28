
// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  GoogleId:{type:String},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // will be hashed
  profilePic: { type: String, default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKMAAACUCAMAAADIzWmnAAAAYFBMVEXZ3OFwd3/c3+Rxd3zg4+hweHtydn9vdHjS1drZ3eDV2N1rc3aDiIxrcHTc4ONtdHvHys+lqq67wMSusbZ/ho22ur+UmJyWnaCKjpN7goV5fYGgpKhlbXVlbnCMlJaanaOtahdMAAAEvklEQVR4nO2c7ZKjKhBAtcFABINi/IxO3v8tL5q5O9ndUWFAcKs8P6ZSlflxqlu+ujFRdHJycnJycnJycnJycnJycnJysgi8CK2xCGCguZSVlDlVn0PrfAPGedHeY8GYiON7W+aHs4S04oMQSm9Gfcp4RY9kCdeKZwTF7yCiLKPDWGLaxiL+GxG3FF9D281cq+w7wwmSVaHtZuCRJAuKMULkcYB0X+tsyXAmq0MbTopo1REFl8SPDG04oqzBIRVv5XqiPyNZBnwmIV8eLu+RTPKAkvelSed3RBfMEBeDlmIcsyLQIwn5xnD5IkGhsl0TTcU4YU2QNdEgjHGShBk2+CG0HRFijxBP5JXpGk4IFkARy9HEEY3Sf7Lxh1EcY9J6TzbQTmOJeYsj6ah3R6mzDL5LIu/JhpJoj+oXwvvOAh7Gjg/PilHUGDvWkee1Jm2NHdvUtyM3drzTozteLvfDx/EfcfSe65+MGb+KUfQDR9+KxvMjIo1vRdN1BiXM+zoDhbFj4X29rgz3PZdL5d1Rq0Tx7hj7P3WlZnvcWE3hvhUj3BqdFRDzf1aIcGF45ioDHF5T3WLPizENUATAmkWzF4KHqAFAZeTofeaZoVy7JoUI935ynYFCo9D86Zh5X2Q+uXa62SZdqK4clpnmYpPJYK0FaJiW4/AMV7OHVKcwpZaYEHPjL0nabz+Sog/byAa6OZOrc3XgtibQZqUbh6ZOXGhFJRkV2eI8iUhWHOIuAE7rXoj4j2Cq4ArR12nQfuYXgPOiYyNLfjEN5pF1xZEupwCkecETxl6eTAwxL/L0aJeRAOMblVVZFmUpJb3hA4XwHfgitMrJyT/DdSK0xArTgL7NHHJcq+kxonmey5mc0uhYE+TkJ4u65V1/uUwVskvf8bYuZXTDt9By0ZTeiMpnP75W63hyVH/UnkytiOPYNxWNAk/ogGnZ9MPyNnfa+pQ0YNYB8qZnDF3m6H2H+oYQ0jd5oFhCKvnIVFLRouJUGZ3SzkYuAxy7AEvOtCuQatfGpeeMqyx/THtFbcdksvSacUwfRKgk6ncWpn8m5EF9TUUqzT0zbHLNngnpPNVU1Gl1NAnheyyT7OnjJIspF8vjeBPB6e6hBNmRlblmO5is2/sODS7Z6ny47ajyvW+HAeuXblc0yZ6S8Ny4DK4Zymy/eiQ8zFoyy+xWHr8VZjf1VkBkH0lcjGZdzDVHtMvAwdJZFGdLljuXhLx3FsXZMeld97PhyolbRyS44yPu9vsd5oxurzpDxX60jVglYU77nAbtSwPE3WGjEzcu1pe/GZ7Osg354DzRL0ZnYxtak266Cax15AjVHg/jjLNhk+4WRmeX+XA1WOxp17lcssrFsIG7zb57y1F0DhxBOth6r5A5GNpg+H6HKaS2doTc8O6bKch+/wPlPkvMF4P1uxZX4/v0pghuG0Y67KyoRo3lzgKXro6Cy9jeOsR8vzXmf5DdlT6g+w7ql2NvVYcG6cPR7k0vcHfsX3G0KwhA48XR6i0Byn3k2u4CJ+12nx3j+ULazxVNXl+2wmLJVvsyL46DxcCGav9VZna0ONXo/yiBpaPFTxqYvKpuQ2ZR+cG13n1bW4TFr5V4c6wtHD88Oa6/t/IfRENFUb4UCm4AAAAASUVORK5CYII=" },
  coverPic:{ type:String,default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUMHGGb-GLEBZwmw_LWfpvqb1puwRa4MC5Gw&s"},
  curr_company:{
    type:String,
    default:""
  },
  headline: { type: String, default: "" }, // like "Full Stack Developer"
  about: { type: String, default: "" },
  location: { type: String, default: "" },
  skills: {type:[String],default:[]},
  experience: [
    {
      title: String,
      company: String,
      startDate: Date,
      endDate: Date,
      description: String
    }
  ],
  projects:[
    {
      title:String,
      description:String,
      link:String
    }
  ],
  education: [
    {
      school: String,
      degree: String,
      startDate: Date,
      endDate: Date
    }
  ],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  pending_friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  resume:{
    type:String
  }
}, { timestamps: true });

const User= mongoose.model("User", userSchema);
export default User;