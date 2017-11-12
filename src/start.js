import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import * as io from 'socket.io-client';
const socket = io.connect();
let chatMessages;

socket.on('welcome', function(data) {
    console.log(data);
    socket.emit('thanks', {
      	message: 'Thank you. It is great to be here.'
    });

    socket.on('chatMessages', (chatMessages) => {
        chatMessages = chatMessages
    })
});

ReactDOM.render(
    <App chatMessages={chatMessages} />,
    document.querySelector('main')
);
