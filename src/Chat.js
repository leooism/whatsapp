import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";

// import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import "./chat.css";
import db from "./firebase";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
	const roomId = useParams()["id"];

	const [input, setInput] = useState("");
	// const { roomId } = useParams();
	const [messages, setMessages] = useState([]);

	const [roomName, setRoomName] = useState([]);
	const [{ user }, dispatch] = useStateValue();

	const sendMessage = e => {
		e.preventDefault();

		db.collection("room").doc(roomId).collection("message").add({
			message: input,
			name: user.displayName,
			TimeStamp: new Date().getFullYear(),
		});
		setInput("");
		return;
	};
	console.log(firebase.firestore.FieldPath.);

	useEffect(() => {
		if (roomId) {
			db.collection("room")
				.doc(roomId)
				.onSnapshot(snapshot => {
					setRoomName(snapshot.data().name);

					db.collection("room")
						.doc(roomId)
						.collection("message")
						.orderBy("TimeStamp", "asc")
						.onSnapshot(snapshot => {
							setMessages(snapshot.docs.map(doc => doc.data()));
						});
				});
		}
	}, [roomId]);

	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar
					src={`https://avatars.dicebear.com/api/human/${Math.floor(
						Math.random() * 50000
					)}.svg`}
				/>
				<div className="chat__headerInfo">
					<h3>{roomName}</h3>
					<p>Last seen on Tuesday</p>
				</div>
				<div className="chat__headerRight">
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>

			<div className="chat__body">
				{messages.map(message => (
					<p className={`chat__message ${true && "chat__receiver"}`}>
						<span className="chat__name">{message.name}</span>
						{message.message}
						<span className="chat__timestamp">
							{new Date(message.TimeStamp.toDate()).toUTCString()}
						</span>
					</p>
				))}

				<div className="chat__footer">
					<IconButton>
						<InsertEmoticonIcon />
					</IconButton>
					<form>
						<input
							type="text"
							value={input}
							onChange={e => {
								setInput(e.target.value);
							}}
							placeholder="Type a Message"
						/>
						<button onClick={sendMessage}> Send a message</button>
					</form>
					<IconButton>
						<MicIcon />
					</IconButton>
				</div>
			</div>
		</div>
	);
}

export default Chat;
