import React from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../global/globalState";
import backSVG from "../assets/svg/back.svg";

const Home = ({ history }) => {
	const user = useRecoilValue(userAtom);
	console.log(user);
	const cta = () => {
		if (!user) {
			history.push("/SignUp");
		} else {
			if (user.type === "user") history.push("/dashboard");
			else history.push("/dashboardTeacher");
		}
	};

	return (
		<div className="Home">
			<div className="container">
				<div className="top">
					<div className="box">
						<div className="left">
							<div className="heading">
								Welcome to <div className="logo">QUIZ Port</div>
							</div>
							<div className="description">
								A service to connect students and teahcers.
								<br />
								QUIZ Port is a tool that has been developed to
								improve and manage continous evaluation of
								students by academic institutions like schools
								and colleges
							</div>
							<button
								className="primary cta"
								onClick={() => cta()}>
								{user ? "Go To Dashboard" : "Get Started"}
							</button>
						</div>
						<div className="right">
							<img src={backSVG} alt="scooter running" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
