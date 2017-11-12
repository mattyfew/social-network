import React, { Component } from 'react'
import ChatRoom from './ChatRoom'
import axios from 'axios';
import { browserHistory } from 'react-router'
import { Link } from 'react-router';
import Socket from './socket';

export default class App extends Component {
    render() {
        const children = React.cloneElement(this.props.children, {
            // id,
            // firstName,
            // lastName,
            // image,
            // bio,
            // updateBio: this.updateBio
        })


        return (
            <div>
                <h1>My Apppppp</h1>
                <main>
                    <Socket>
                        {children}
                    </Socket>
                </main>

            </div>
        );
    }
}
