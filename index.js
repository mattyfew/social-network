const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const data = require('./secrets.json')
const spicedPg = require('spiced-pg')
const db = spicedPg(process.env.DATABASE_URL || `postgres:${data.psqlUser}:${data.psqlPass}@localhost:5432/social_network`);

app.use(express.static('public'))

const server = require('http').Server(app);
const io = require('socket.io')(server);
let onlineUsers = []
let chatMessages = [
    {
        message: "yoyo what up",
        username: "Skrillex"
    },
    {
        message: "sup dudes",
        username: "David Guetta"
    },
    {
        message: "yo shit is wack",
        username: "Vanilla Ice"
    },
]

io.on('connection', (socket) => {
    console.log(`socket with the id ${socket.id} is now connected`);
    onlineUsers.push(socket.id)
    socket.emit('chatMessages', chatMessages)

    socket.on('disconnect', () => {
        onlineUsers.splice(onlineUsers.indexOf(socket.id))
        console.log(`socket with the id ${socket.id} is now disconnected`, onlineUsers);
        socket.emit('userLeft', onlineUsers)
    });

    socket.on('userJoined', (data) => {
        console.log(data);
    });

    socket.on('chatMessage', (data) => {
        chatMessages.push(data)
        console.log("inside emit chatMessage", chatMessages);
        socket.emit('newMessage', chatMessages)
    })
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
