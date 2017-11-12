import React, { Component } from 'react';
import * as io from 'socket.io-client';
const socket = io.connect();
import axios from 'axios';
import { connect } from 'react-redux';


class ChatRoom extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.renderChatMessages = this.renderChatMessages.bind(this)
    }

    renderChatMessages() {
        return this.props.chatMessages.map((msg) => {
            return (
                <p><span className="chat-message-username">{msg.username}</span>: {msg.message}</p>
            )
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        socket.emit('chatMessage', {
            username: this.state.username,
            message: this.state.message
        })
    }

    render() {
        if (!this.props.chatMessages){
            return (<div>Loading...</div>)
        }
        return(
            <div>
                <h1>Chatroom</h1>
                <div id="chat-room">
                    {this.renderChatMessages()}
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

const mapStateToProps = function(state) {
    console.log("something special", state);
    return {
        chatMessages: state.chatMessages
    }
}

export default connect(mapStateToProps)(ChatRoom);
