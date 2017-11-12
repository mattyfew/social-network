import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as io from 'socket.io-client';
import { newMessage, userLeft,getChatMessages } from './actions';
let socket;

class Socket extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("something");
        if (!socket) {
            socket = io.connect();


            socket.on('connect', function() {
                console.log("connected");
                // axios.post('/connect/' + socket.id).then(({data}) => {
                //     socket.emit('new connection', {
                //         message: 'new user here',
                //         id: data.id
                //     });
                // });
            });

            socket.on('chatMessages', chatMessages => {
                console.log("WE GOT EM", chatMessages);
                this.props.dispatch(getChatMessages(chatMessages))
            })

            socket.on('init', ({users, messages}) => {
                this.props.dispatch(receiveOnlineUsers(users));
                this.props.dispatch(receiveMessages(messages));
            });

            socket.on('userJoined', (user) => {
                this.props.dispatch(userJoined(user));
            });

            socket.on('userLeft', (onlineUsers) => {
                this.props.dispatch(userLeft(onlineUsers));
            });

            socket.on('newMessage', (message => {
                console.log("something anything");
                console.log("socket newMessage", message);
                this.props.dispatch(newMessage(message));
            }));
        }
    }

    render() {
        const children = React.cloneElement(this.props.children, { socket });
        return children;
    }

}

export default connect()(Socket)
