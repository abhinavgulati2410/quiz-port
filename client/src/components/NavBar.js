import React from "react";
import { withRouter } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom, tokenAtom } from "../global/globalState";

const NavBar = ({ history }) => {
	const [user, setUser] = useRecoilState(userAtom);
	const [, setToken] = useRecoilState(tokenAtom);
	const url = String(history.location.pathname);

	const logOut = () => {
		history.push("/");
		setUser(null);
		setToken(null);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
	};

	return (
		<div className="NavBar">
			<div className="logo">
				<div onClick={() => history.push("/")}>QUIZ Port</div>
			</div>
			<div className="links">
				{user ? (
					<React.Fragment>
						<div
							className={
								url === "/dashboard" ||
								url === "/dashboardTeacher"
									? "link selected"
									: "link"
							}
							onClick={() => {
								user.type === "teacher"
									? history.push("/dashboardTeacher")
									: history.push("/dashboard");
							}}>
							{user?.name}
						</div>
						<div className="link" onClick={() => logOut()}>
							Logout
						</div>
					</React.Fragment>
				) : (
					<React.Fragment>
						<div
							className={
								url === "/signup" ? "link selected" : "link"
							}
							onClick={() => history.push("/signup")}>
							Register
						</div>
						<div
							className={
								url === "/login" ? "link selected" : "link"
							}
							onClick={() => history.push("/login")}>
							Login
						</div>
					</React.Fragment>
				)}
			</div>
		</div>
	);
};

export default withRouter(NavBar);
