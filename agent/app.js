const express = require('express');
const http = require('http');
const configExpress = require('./config/express');
const app = express();
const server = http.Server(app);
var child_process = require("child_process");
const cors = require('cors');

var io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors());
app.use(express.urlencoded({extended: false}));
configExpress(app);


const port = process.env.PORT || 3000;

  
app.get('/', (req, res) => {
     res.send('Agente');
})

io.on('connection', function (socket) {
    async function getSerial(){
        let test
        if(process.platform == 'linux'){
        test = await child_process.execSync("sudo dmidecode -t system | grep Serial");
        }
        else if(process.platform == 'win32'){
            test = await child_process.execSync("wmic csproduct get IdentifyingNumber");
        }
        else if(process.platform == 'darwin'){
            test = await child_process.execSync("system_profiler SPHardwareDataType | grep Serial");
        }
        else{
            test = "Sorry, it is not possible to achieve the serial number";
        }
        socket.emit('achievedSerial', 'LISTO');

        setTimeout(function(){
            socket.emit('sendSerial', test.toString());
        },5000);
    }
    getSerial();
    
    
});
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
    
  })
