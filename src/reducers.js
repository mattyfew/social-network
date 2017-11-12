export default function(state = {}, action) {

    if (action.type == 'GET_CHAT_MESSAGES') {
        console.log("reducer GET_CHAT_MESSAGES triggered");

        state = Object.assign({}, state, {
            chatMessages: action.chatMessages
        });
    }

    if (action.type == 'GET_ONLINE_USERS') {
        console.log("action GET_ONLINE_USERS triggered");

        state = Object.assign({}, state, {
            online: action.onlineUsers,
            userId: action.yourId,
            chatMessages: action.onlineMessages
        });
    }

    if (action.type == 'ADD_ONLINE_USER') {
        console.log("action ADD_ONLINE_USER triggered");


        let newUsers = [];
        state.online && state.online.forEach((user) => {
            newUsers.unshift(user);
        });
        if (action.userInfo[0].id != state.userId) {
            newUsers.push(action.userInfo[0]);

        }
        state = Object.assign({}, state, {
            online: newUsers,
            chatMessages: action.onlineMessages
        });

    }

    if (action.type == 'NEW_MESSAGE') {
        console.log("reducer NEW_MESSAGE triggered", action);


        state = Object.assign({}, state, {chatMessages: action.chatMessages});
    }

    return state;
}
