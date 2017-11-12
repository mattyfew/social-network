import React from 'react'
import ChatRoom from './ChatRoom'


export default function App(props) {
    return (
        <div>
            <h1>My Apppppp</h1>
            <ChatRoom chatMessages={props.chatMessages}/>
        </div>
    );
}
