import {io} from 'socket.io-client'


const socket =io("https://linkedinclone-backend-i2bq.onrender.com",{withCredentials:true,
    transports : ["websocket"],
})


export default socket;