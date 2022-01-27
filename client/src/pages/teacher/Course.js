import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { tokenAtom, userAtom } from "../../global/globalState";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const Courses = () => {
	const [teacher, setTeacher] = useRecoilState(userAtom);
	const token = useRecoilValue(tokenAtom);

	const history = useHistory();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [deadline, setDeadline] = useState("");
	const [courseId, setCourseId] = useState("");

	const { courses } = teacher;
  useEffect(() => {
		Axios.get(`${process.env.REACT_APP_API_URL}/teacher/getTeacher`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((res) => {
				console.log(res.data.response);
				setTeacher(res.data.response);
			})
			.catch((err) => {
				console.log(err);
			});
	},[])
	const uploadCourse = () => {
		Axios.post(
			`${process.env.REACT_APP_API_URL}/teacher/makeCourse`,
			{
				title: name,
				description,
				courseId,
			},
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		)
			.then((res) => {
				console.log(res.data);
				setTeacher(res.data.response);
				localStorage.setItem("user", JSON.stringify(res.data.response));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const redirectToCourse = (courseid) => {
		history.push(`/course/${courseid}`);
	};

	return (
		<div className="Courses">
			<div className="courses">
				<div className="courses-title">ALL Courses</div>
				<div className="course-cards">
					{courses &&
						courses.map(
							({
								title,
								description,
								courseId,
								uploadDate,
							}) => (
								<div
									key={courseId}
									onClick={() =>
										redirectToCourse(courseId)
									}
									className="course-card card">
									<div className="title">
										{title} | <i>{courseId}</i>{" "}
									</div>
									<div className="description">
										{description}
									</div>
								</div>
							)
						)}
				</div>
			</div>
			<div className="create-course">
				<div className="create-course-title">CREATE COURSE</div>
				<div className="create-course-form ">
					<label htmlFor="name">Name of Course</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<label htmlFor="name">Description</label>
					<textarea
						rows="5"
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<label htmlFor="name">Course ID</label>
					<input
						type="text"
						id="courseId"
						value={courseId}
						onChange={(e) => setCourseId(e.target.value)}
					/>

					<button
						onClick={uploadCourse}
						className="primary submit">
						CREATE
					</button>
				</div>
			</div>
		</div>
	);
};

export default Courses;
