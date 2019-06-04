import React, { Component } from "react"
import { default as Chatkit } from '@pusher/chatkit-server';
import { FormAction, FormLabel } from "../form"
import API from "../../utils/API"
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import moment from "moment"
import "./style.css"
const chatkit = new Chatkit({
    instanceLocator: "v1:us1:634e15b3-fb2d-47cd-b7aa-3d8749095de8",
    key: "616ff3c1-c8f5-4597-b5bb-f1e293f6a4f7:nYsoZ6crOrC7i3P/zpgpOaMIJQtvcuDs86pRhFWAuyw="
})



export class ChatRoom extends Component {
    state = {
        //currentUser is an object return from chatManager that consist all the function it can call
        currentUser: null,
        currentUserId: "",
        chatTargetId: "",
        chatTargetName: "...",
        currentRoom: "",
        messagesArr: [],
        allOtherUsers: [],
        currentMessage: ""
    }

    componentDidMount() {
        API.searchAllMembers()
            .then(res => {
                this.setState({ allOtherUsers: res.data })
            })

        API.findOne()
            .then(res => {
                this.setState({
                    currentUserId: res.data.id.toString()
                })
                const chatManager = new ChatManager({
                    instanceLocator: "v1:us1:634e15b3-fb2d-47cd-b7aa-3d8749095de8",
                    userId: this.state.currentUserId,
                    tokenProvider: new TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/634e15b3-fb2d-47cd-b7aa-3d8749095de8/token' })
                })
                chatManager
                    .connect()
                    .then(currentUser => {
                        console.log(currentUser)
                        this.setState({
                            currentUser: currentUser
                        })

                    })
            })

    }

    createRoom = (creatorId, memberId, memberName) => {
        chatkit.createRoom({
            creatorId: creatorId,
            name: creatorId + memberId,
            userIds: [memberId]
        })
            .then((room) => {
                console.log('Room created successfully', room);
                this.setState({ currentRoom: room.id,
                    chatTargetId: memberId,
                    chatTargetName: memberName})
                this.retrieveMessage()
                this.state.currentUser.subscribeToRoomMultipart({
                    roomId: this.state.currentRoom,
                    hooks: {
                        onMessage: message => {
                            console.log("New room new message")
                            this.retrieveMessage()
                        }
                    },
                    messageLimit: 10
                })
            }).catch((err) => {
                console.log(err);
            });
    }

    handleInputChange = event => {
        const value = event.target.value;
        this.setState({
            currentMessage: value
        })
    }

    handleButtonClick = event => {
        event.preventDefault();
        const currentUserId = this.state.currentUserId
        let chatTargetId = event.target.getAttribute("data-id")
        let chatTargetName = event.target.getAttribute("data-userName")
        let targetRoom = ""
        console.log(currentUserId)
        chatkit.getUserRooms({
            userId: chatTargetId,
        })
            .then((res) => {
                console.log(res);
                res.forEach(room => {
                    if (room.member_user_ids.indexOf(currentUserId) >= 0) {
                        targetRoom = room.id
                    }
                })

                if (targetRoom) {
                    chatkit.getRoom({
                        roomId: targetRoom,
                    })
                        .then(room => {
                            console.log('got room', room)
                            this.setState({
                                currentRoom: targetRoom,
                                chatTargetId: chatTargetId,
                                chatTargetName: chatTargetName
                            })
                            this.state.currentUser.subscribeToRoomMultipart({
                                roomId: this.state.currentRoom,
                                hooks: {
                                    onMessage: message => {
                                        this.retrieveMessage()
                                    }
                                },
                                messageLimit: 1
                            })
                            this.retrieveMessage()

                        })
                        .catch(err => console.error(err))
                }
                else {
                    this.createRoom(currentUserId, chatTargetId, chatTargetName)
                }

            }).catch((err) => {
                console.log(err);
            });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            currentMessage: ""
        })
        chatkit.sendSimpleMessage({
            userId: this.state.currentUserId,
            roomId: this.state.currentRoom,
            text: this.state.currentMessage,
        })
            .then(res => console.log('sent message with id', res.message_id))
            .catch(err => console.error(err))
            // this.state.currentUser.sendMessage({
            //     text:this.state.currentMessage,
            //     roomId: this.state.currentRoom
            // })
            .catch(error => console.error('error', error));
    }

    retrieveMessage = () => {
        chatkit.fetchMultipartMessages({
            roomId: this.state.currentRoom,
            direction: "older",
            limit: 10
        })
            .then(messages => {
                this.setState({
                    messagesArr: messages.reverse()
                })
                console.log(this.state.messagesArr)
            })
            .catch(err => console.error(err))
    }


    render() {
        return (
            <div id="page-wrap">
                <div className="container mt-4 mb-4">
                    <div className="card">
                        <b className="card-header">Chatting With {this.state.chatTargetName}</b>
                        <div className="card-body">
                            <div className="contatiner">
                                <div className="row">
                                    <div className="col-3">
                                        <p>Chat Room</p>
                                        <div className="chatList list-group">
                                            {this.state.allOtherUsers.map((user, i) => {
                                                return (
                                                    
                                                    <a
                                                        key={i}
                                                        data-id={user.id}
                                                        data-userName={user.userName}
                                                        onClick={this.handleButtonClick}
                                                        href="#"
                                                        class="list-group-item list-group-item-action text-left"
                                                    >
                                                        <img className="rounded-circle profile-icon mx-2" alt={user.userName} src={user.photoLink} />{user.userName}
                                                    </a>



                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="col-9">
                                        <div className="message-display row">
                                            <div className="col-12">
                                                {this.state.chatTargetName !== "..."? (this.state.messagesArr.map((message, i) => {
                                                    return (
                                                        message.user_id === this.state.currentUserId ? (
                                                            <div className="text-left rounded currentUserMsg my-1">
                                                                <b>{this.state.currentUser.name}</b>
                                                                <p>
                                                                    {message.parts[0].content}
                                                                </p>
                                                                <p className="message-timestamp">{moment(message.updated_at).format("MMMM Do YYYY, h:mm:ss a")}</p>
                                                            </div>)

                                                            : 
                                                            (
                                                                <div className="text-left rounded chatTargetMsg my-1">
                                                                    <b>{this.state.chatTargetName}</b>
                                                                    <p>
                                                                        {message.parts[0].content}
                                                                    </p>
                                                                    <p className="message-timestamp">{moment(message.updated_at).format("MMMM Do YYYY, h:mm:ss a")}</p>
                                                                </div>)
                                                

                                                    )
                                                })) : (<div className="row message-direction text-left">
                                                    <div className="col-3 my-auto">
                                                    <i class="fas fa-hand-point-left"></i>
                                                    </div>
                                                    <div className="col-9">
                                                    <b className="direction-text"> Start a conversation with other users </b>
                                                    </div>
                                                    </div>)}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <FormAction
                                                    submit={this.handleSubmit}
                                                >
                                                    <FormLabel
                                                        handleChange={this.handleInputChange}
                                                        value={this.state.currentMessage}
                                                        disabled={this.state.currentRoom ? (""):(true)}
                                                    />
                                                </FormAction>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


