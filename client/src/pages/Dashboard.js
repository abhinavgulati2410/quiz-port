import React, { useEffect, useState } from "react";
import { userAtom, tokenAtom } from "../global/globalState";
import { useRecoilState, useRecoilValue } from "recoil";
import Axios from "axios";

const Dashboard = ({ history }) => {
	const token = useRecoilValue(tokenAtom);
	const [student, setUser] = useRecoilState(userAtom);

	const { courses, quizes } = student;
	const [selectedCourse, setSelectedCourse] = useState("course1");

	useEffect(() => {
		Axios.get(`${process.env.REACT_APP_API_URL}/student/getStudent`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((res) => {
				console.log("my response", res.data.response);
				setUser(res.data.response);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const redirectToQuiz = (quizId) => {
		history.push(`/quiz/${quizId}`);
	};

	return (
		<div className="Dashboard">
			<div className="container">
				<div className="main">
					<div className="main-section">
						<div className="section">
							<div className="heading">Courses</div>
							<div className="assignment-cards">
								{courses?.length === 0 && (
									<div className="card">
										There are no courses Right now
									</div>
								)}
								{courses &&
									courses[0]?.title &&
									courses.map(({ title, description }) => (
										<div
											key={title}
											onClick={() =>
												setSelectedCourse(title)
											}
											className="assignment-card card">
											<div className="title">{title}</div>
											<div className="description">
												{description}
											</div>
										</div>
									))}
							</div>
						</div>
						<div className="section">
							<div className="heading">quizes</div>
							<div className="exam-cards">
								{quizes?.length === 0 && (
									<div className="card">
										There are no quizes Right now
									</div>
								)}
								{quizes &&
									quizes[0]?.title &&
									quizes
										.filter(
											(ele) =>
												ele.courseName === selectedCourse
										)
										.map(
											({
												_id,
												title,
												description,
												deadline,
												courseName,
												isCompleted,
											}) => (
												<div
													key={_id}
													onClick={() =>
														redirectToQuiz(_id)
													}
													className="exam-card card">
													<div className="title">
														{title} |{" "}
														<i>{courseName}</i>{" "}
													</div>
													<div className="description">
														{description}
													</div>
													<div className="date">
														Deadline :{" "}
														{deadline.substring(
															0,
															10
														)}
														, at{" "}
														{deadline.substring(
															11,
															16
														)}{" "}
													</div>
													<div className="date">
														{isCompleted && "Given"}
													</div>
												</div>
											)
										)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
