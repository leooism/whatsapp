import React from "react";
import Button from "@material-ui/core/Button";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reduce.js";
import { useStateValue } from "./StateProvider";

import "./login.css";

function Login() {
	const [{}, dispatch] = useStateValue();

	const signIn = () => {
		auth
			.signInWithPopup(provider)
			.then(result => {
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
				});
			})
			.catch(error => alert(error.message));
	};
	return (
		<div className="login">
			<div className="login__container">
				<img
					src="//upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/150px-WhatsApp.svg.png"
					alt=""
					srcset=""
				/>
				<div className="login_text">
					<h1>Sign in to whatsApp</h1>
				</div>
				<Button
					type="submit"
					onClick={signIn}
					variant="contained"
					color="Primary"
				>
					Sign In with Google
				</Button>
				{/* 	<Button
					type="submit"
					onClick={signInWithPhone}
					variant="contained"
					color="Secondary"
				>
					Sign In with PhoneNumber
				</Button> */}
			</div>
		</div>
	);
}

export default Login;
