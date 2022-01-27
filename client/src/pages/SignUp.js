import React, { useState } from "react";
import Axios from "axios";
import teacherSVG from "../assets/svg/teacher.svg";

const SignUp = ({ history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullname, setFullName] = useState("");
	const [registrationNo, setRegistrationNo] = useState(0);
	const [phoneNumber, setPhoneNumber] = useState(0);

	const [errors, setErrors] = useState(null);
	const [selected, setSelected] = useState("user");

	const handleSignUp = () => {
		if (selected === "user") {
			Axios.post(`${process.env.REACT_APP_API_URL}/student/signup`, {
				name: fullname,
				email,
				_id: registrationNo,
				password,
			})
				.then((res) => {
					console.log(res.data);
					history.push("/login");
				})
				.catch((err) => {
					if (Array.isArray(err.response.data.errors)) {
						setErrors(err.response.data.errors);
					} else {
						setErrors([{ msg: err.response.data.error }]);
					}
				});
		} else {
			Axios.post(`${process.env.REACT_APP_API_URL}/teacher/signup`, {
				name: fullname,
				email,
				phone: phoneNumber,
				password,
			})
				.then((res) => {
					console.log(res.data);
					history.push("/login");
				})
				.catch((err) => {
					if (Array.isArray(err.response.data.errors)) {
						setErrors(err.response.data.errors);
					} else {
						setErrors([{ msg: err.response.data.error }]);
					}
				});
		}
	};

	return (
		<div className="SignUp container">
			<div className="left-bar">
				<div className="top">
					<div onClick={() => history.push("/")}>
						<div className="logo">
							<h1>QUIZ Port</h1>
						</div>
					</div>
					<p>Welcome to the Assignment And Quiz Utility App</p>
				</div>
				<img className="art" src={teacherSVG} alt="Teacher" />
			</div>
			<div className="main-signup">
				<h1>Sign Up</h1>

				<div className="signup-form">
					<label htmlFor="email">Email</label>
					<input
						type="text"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{selected === "user" ? (
						<>
							<label htmlFor="registratioNo">
								Registration Number
							</label>
							<input
								type="number"
								id="registratioNo"
								value={registrationNo}
								onChange={(e) =>
									setRegistrationNo(e.target.value)
								}
							/>
						</>
					) : (
						<>
							<label htmlFor="phoneNumber">Phone Number</label>
							<input
								type="number"
								id="phoneNumber"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						</>
					)}

					<label htmlFor="fullname">Full Name</label>
					<input
						type="text"
						id="fullname"
						value={fullname}
						onChange={(e) => setFullName(e.target.value)}
					/>

					<label htmlFor="pass">Password</label>
					<input
						type="password"
						id="pass"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className="primary" onClick={() => handleSignUp()}>
						Sign Up
					</button>
				</div>
				<div className="selector-container">
					<div className="selector">
						<button
							className="left"
							id={selected === "user" ? "selected" : ""}
							onClick={() => setSelected("user")}>
							User
						</button>
						<button
							className="right"
							id={selected === "teacher" ? "selected" : ""}
							onClick={() => setSelected("teacher")}>
							Teacher
						</button>
					</div>
				</div>
				{errors &&
					errors.map(({ msg }, index) => (
						<div key={index} className="error">
							{msg}
						</div>
					))}
			</div>
		</div>
	);
};

export default SignUp;
