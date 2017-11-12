import axios from 'axios';


export function newMessage(chatMessages) {
    return {
        type: 'NEW_MESSAGE',
        chatMessages
    };
}


export function userLeft(users) {
    return {
        type: 'USER_LEFT',
        id: id
    };
}

export function getChatMessages(chatMessages) {
    return {
        type: 'GET_CHAT_MESSAGES',
        chatMessages
    };
}
//
// export function receiveFriendRequests() {
//     return axios.get('/friendRequests').then(function({ data }) {
//         return {
//             type: 'RECEIVE_FRIEND_REQUESTS',
//             friends: data.friends
//         };
//     });
// }
//
// export function acceptFriendRequest(id) {
//     console.log("received", id)
//     return axios.post('/acceptFriendRequest/' + id).then(function() {
//         return {
//             type: 'ACCEPT_FRIEND_REQUEST',
//             id
//         };
//     });
// }
//
// export function endFriendship(id) {
//   console.log("received", id)
//     return axios.post('/endFriendship/' + id).then(function() {
//         return {
//             type: 'END_FRIENDSHIP',
//             id
//         };
//     });
// }
//
// export function rejectFriendRequest(id) {
//   console.log("received", id)
//     return axios.post('/rejectFriendRequest/' + id).then(function() {
//         return {
//             type: 'REJECT_FRIEND_REQUEST',
//             id
//         };
//     });
// }
//
// export function onlineUsers(users){
//   return{
//     type: 'ONLINE_USERS',
//     users:users
//   }
// }
//
// export function userJoined(user){
//   return{
//     type: 'USER_JOINED',
//     user: user
//   }
// }
//
// export function userLeft(id){
//   return{
//     type: 'USER_LEFT',
//     id
//   }
// }
