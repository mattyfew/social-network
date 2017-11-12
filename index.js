const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const data = require('./secrets.json')
const spicedPg = require('spiced-pg')
const db = spicedPg(process.env.DATABASE_URL || `postgres:${data.psqlUser}:${data.psqlPass}@localhost:5432/social_network`);


const server = require('http').Server(app);
const io = require('socket.io')(server);
let onlineUsers = []
let chatMessages = [{
    message: "yoyo what up",
    username: "Skrillex"
}]

io.on('connection', (socket) => {
    console.log(`socket with the id ${socket.id} is now connected`);
    onlineUsers.push(socket.id)
    console.log(onlineUsers);

    socket.on('disconnect', () => {
        onlineUsers.splice(onlineUsers.indexOf(socket.id))
        console.log(`socket with the id ${socket.id} is now disconnected`);
        console.log(onlineUsers);
    });

    socket.on('thanks', (data) => {
        console.log(data);
    });

    socket.on('chatMessage', (data) => {
        console.log(data);
        chatMessages.push(data)
        socket.emit('chatMessages', chatMessages)
    })

    socket.emit('welcome', {
        message: 'Welome. It is nice to see you'
    });
});

app.use(cookieSession({
    secret: 'a really hard to guess secret',
    maxAge: 1000 * 60 * 60 * 24 * 14
}))

app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use('/bundle.js', require('http-proxy-middleware')({
        target: 'http://localhost:8081/'
    }));
}

app.get('/', function(req, res){
    req.session = {
        name: "Matt"
    }
    res.sendFile(__dirname + '/index.html');
});

app.get('/chatMessages', function(req, res){

    res.json(chatMessages);
});

server.listen(8080, function() {
    console.log("I'm listening.")
});
