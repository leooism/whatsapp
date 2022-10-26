import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Avatar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import SidebarChat from "./SidebarChat";

import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import { Unsubscribe } from "@material-ui/icons";
function Sidebar() {
	const [rooms, setRooms] = useState([]);
	const [{ user }, dispatch] = useStateValue();

	useEffect(() => {
		(async () => {
			await db.collection("room").onSnapshot(snapshot => {
				setRooms(
					snapshot.docs.map(doc => ({
						id: doc.id,
						data: doc.data(),
					}))
				);
			});
		})();
		return () => {
			Unsubscribe();
		};
	}, []);

	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<Avatar src={user.photoURL} />
				<div className="sidebar__headerRight">
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
			<div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<SearchOutlined />
					<input placeholder="Search or start new chat" type="text" />
				</div>
			</div>
			<div className="sidebar__chats">
				<SidebarChat addNewChat />
				{rooms.map(room => (
					<SidebarChat key={room.id} id={room.id} name={room.data.name} />
				))}
			</div>
		</div>
	);
}

export default Sidebar;
