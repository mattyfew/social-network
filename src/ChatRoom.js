import React, { Component } from 'react';
import * as io from 'socket.io-client';
const socket = io.connect();
import axios from 'axios';

export default class ChatRoom extends Component {
    constructor() {
        super()

        this.state = {
            chatMessages: []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        console.log("props", this.props);
        axios.get('/chatMessages')
            .then(({data}) => {
                console.log("our chatMessages", data);
            })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log(this.state))
    }

    handleSubmit(e) {
        e.preventDefault()
        socket.emit('chatMessage', {
            username: this.state.username,
            message: this.state.message
        })
    }

    render() {
        return(
            <div>
                <h1>Chatroom</h1>
                <div id="chat-room">

                </div>
                <form action="">
                    <input name="username" onChange={this.handleChange} type="text" placeholder="username"/>
                    <input name="message" onChange={this.handleChange} type="text" placeholder="message"/>
                    <button id="submit-button" onClick={this.handleSubmit}>Send</button>
                </form>
            </div>
        )
    }
}
