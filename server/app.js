const express = require('express');
const http = require('http');
const configExpress = require('./config/express');
const app = express();
var ios = require('socket.io-client');
const server = http.Server(app);
const cors = require('cors');
var io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
});
app.use(cors());
app.use(express.urlencoded({extended: false}));
configExpress(app);

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Servidor');
})

io.on('connection', function (socketS) {
    console.log('conectado')
    var socket = ios.connect("http://localhost:3000", { forceNew: true });
    socket.on('connect', data => {
        console.log('connected to localhost:4000');
        socket.on('achievedSerial', data => {
            const achievedSerial = data;
            socketS.emit('achievedSerial', achievedSerial)
            socket.on('sendSerial', data => {
                const sentSerial = data;
                socketS.emit('sendSerial', sentSerial)
                });
            
            });
        });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
