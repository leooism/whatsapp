import React, { useEffect, useState } from "react";
import "./sidebarchat.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import { Link } from "react-router-dom";
function SidebarChat({ addNewChat, keys, id, name }) {
	const [seed, setSeed] = useState("");
	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);
	const createChat = () => {
		const roomName = prompt("Please Enter Your name for chat");
		if (roomName) {
			//Do some clever Database stuff
			db.collection("room").add({
				name: roomName,
			});
		}
	};
	return !addNewChat ? (
		<Link to={`/room/${id}`}>
			<div className="sidebarChat">
				<Avatar src={` https://avatars.dicebear.com/api/human/${seed}.svg`} />
				<div className="sidebarChat__info">
					<h2>{name}</h2>
					<p>Last message.....</p>
				</div>
			</div>
		</Link>
	) : (
		<div onClick={createChat} className="sidebarChat">
			<h2>Add new Chat</h2>
		</div>
	);
}

export default SidebarChat;
