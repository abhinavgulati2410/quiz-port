import React, { useState } from "react";
import Axios from "axios";
import { useRecoilState } from "recoil";
import { userAtom, tokenAtom } from "../global/globalState";
import teacher2SVG from "../assets/svg/teacher2.svg";

const Login = ({ history }) => {
    const [email, setEmail] = useState("");
    const [, setUser] = useRecoilState(userAtom);
    const [, setToken] = useRecoilState(tokenAtom);
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(null);
    const [selected, setSelected] = useState("user");

    const handleLoginUser = () => {
        Axios.post(`${process.env.REACT_APP_API_URL}/student/signin`, {
            email,
            password,
        })
            .then((res) => {
                if (res.data.error) {
                    setErrors([{ msg: res.data.error }]);
                } else {
                    console.log(res.data);
                    localStorage.setItem(
                        "user",
                        JSON.stringify(res.data.student)
                    );
                    localStorage.setItem("token", res.data.token);
                    setUser(res.data.student);
                    setToken(res.data.token);
                    history.push("/dashboard");
                }
            })
            .catch((err) => {
                if (Array.isArray(err.response.data.errors)) {
                    setErrors(err.response.data.errors);
                } else {
                    setErrors([{ msg: err.response.data.error }]);
                }
            });
    };

    const handleLoginTeacher = () => {
        Axios.post(`${process.env.REACT_APP_API_URL}/teacher/signin`, {
            email,
            password,
        })
            .then((res) => {
                if (res.data.error) {
                    setErrors([{ msg: res.data.error }]);
                } else {
                    console.log(res.data);
                    localStorage.setItem(
                        "user",
                        JSON.stringify(res.data.teacher)
                    );
                    localStorage.setItem("token", res.data.token);
                    setUser(res.data.teacher);
                    setToken(res.data.token);
                    history.push("/dashboardTeacher");
                }
            })
            .catch((err) => {
                if (Array.isArray(err.response.data.errors)) {
                    setErrors(err.response.data.errors);
                } else {
                    setErrors([{ msg: err.response.data.error }]);
                }
            });
    };
    return (
        <div className="Login container">
            <div className="left-bar">
                <div className="top">
                    <div onClick={() => history.push("/")}>
                        <div className="logo">
                            <h1>Aqua</h1>
                        </div>
                    </div>
                    <p>Welcome to the Assignment And Quiz Utility App</p>
                </div>
                <img
                    className="art"
                    src={teacher2SVG}
                    alt=""
                />
            </div>
            <div className="main-login">
                <h1>Login</h1>
                <div className="login-form">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="pass">Password</label>
                    <input
                        type="password"
                        id="pass"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="primary"
                        onClick={() =>
                            selected === "user"
                                ? handleLoginUser()
                                : handleLoginTeacher()
                        }
                    >
                        Log In
                    </button>
                </div>
                <div className="error-container">
                    {errors &&
                        errors.map(({ msg }, index) => (
                            <div key={index} className="error">
                                {msg}
                            </div>
                        ))}
                </div>
                <div className="selector-container">
                    <div className="selector">
                        <button
                            className="left"
                            id={selected === "user" ? "selected" : ""}
                            onClick={() => setSelected("user")}
                        >
                            User
                        </button>
                        <button
                            className="right"
                            id={selected === "teacher" ? "selected" : ""}
                            onClick={() => setSelected("teacher")}
                        >
                            Teacher
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
