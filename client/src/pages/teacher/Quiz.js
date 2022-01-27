import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { useRecoilValue, useRecoilState } from "recoil";
import { tokenAtom, userAtom } from "../../global/globalState";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const Quizs = () => {
	const [teacher, setTeacher] = useRecoilState(userAtom);
	const token = useRecoilValue(tokenAtom);

	const history = useHistory();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [deadline, setDeadline] = useState("");
	const [quizId, setQuizId] = useState("");
	const [courseName, setCourseName] = useState("");
	const [formValues, setFormValues] = useState([
		{
			question: "",
			option1: "",
			option2: "",
			option3: "",
			option4: "",
			answer: 0,
		},
	]);

	const { quizes } = teacher;

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
	const uploadQuiz = () => {
		Axios.post(
			`${process.env.REACT_APP_API_URL}/teacher/uploadQuiz`,
			{
				title: name,
				description,
				quizId,
				deadline,
        questions: formValues,
        courseName,
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

	const redirectToQuiz = (quizId) => {
		history.push(`/quiz/${quizId}`);
	};

	let handleChange = (i, e) => {
		let newFormValues = [...formValues];
		newFormValues[i][e.target.name] = e.target.value;
		setFormValues(newFormValues);
	};

	let addFormFields = () => {
		setFormValues([
			...formValues,
			{ question: "", options: ["", "", "", ""], answer: 0 },
		]);
	};

	let removeFormFields = (i) => {
		let newFormValues = [...formValues];
		newFormValues.splice(i, 1);
		setFormValues(newFormValues);
	};

	return (
		<div className="Quizs">
			<div className="quizs">
				<div className="quizs-title">All Quizs</div>
				<div className="quiz-cards">
					{quizes &&
						quizes.map(
							({
								title,
								description,
								quizId,
								deadline,
								uploadDate,
							}) => (
								<div
									key={quizId}
									onClick={() => redirectToQuiz(quizId)}
									className="quiz-card card">
									<div className="title">
										{title} | <i>{quizId}</i>{" "}
									</div>
									<div className="description">
										{description}
									</div>
                {deadline &&
									<div className="date">
										Deadline : {deadline?.substring(0, 10)},
										at {deadline?.substring(11, 16)}{" "}
									</div>
                }
                {uploadDate &&
									<div className="date">
										Upload : {uploadDate?.substring(0, 10)} ,
										at {uploadDate?.substring(11, 16)}
									</div>
                }
								</div>
							)
						)}
				</div>
			</div>
			<div className="create-quiz">
				<div className="create-quiz-title">Create Quiz</div>
				<div className="create-quiz-form ">
					<label htmlFor="name">Name of quiz</label>
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
					<label htmlFor="name">Quiz ID</label>
					<input
						type="text"
						id="quizId"
						value={quizId}
						onChange={(e) => setQuizId(e.target.value)}
					/>
					<label htmlFor="name">Course : </label>
					<input
						type="text"
						id="courseName"
						value={courseName}
						onChange={(e) => setCourseName(e.target.value)}
					/>
					<label htmlFor="name">Deadline</label>
					<input
						type="date"
						id="deadline"
						value={deadline}
						onChange={(e) => setDeadline(e.target.value)}
					/>
					<br />
				</div>
				<div className="questions ">
					{formValues.map((element, index) => (
						<div
							className="form-inline create-quiz-form"
							key={index}>
							<label>
								<strong>Question {index + 1}</strong>
							</label>
							<input
								type="text"
								name="question"
								value={element.question || ""}
								onChange={(e) => handleChange(index, e)}
							/>
							<label>Option 1</label>
							<input
								type="text"
								name="option1"
								value={element.option1 || ""}
								onChange={(e) => handleChange(index, e)}
							/>
							<label>Option 2</label>
							<input
								type="text"
								name="option2"
								value={element.option2 || ""}
								onChange={(e) => handleChange(index, e)}
							/>
							<label>Option 3</label>
							<input
								type="text"
								name="option3"
								value={element.option3 || ""}
								onChange={(e) => handleChange(index, e)}
							/>
							<label>Option 4</label>
							<input
								type="text"
								name="option4"
								value={element.option4 || ""}
								onChange={(e) => handleChange(index, e)}
							/>
							<label>Answer</label>
							<input
								type="njmber"
								name="answer"
								value={element.answer || ""}
								onChange={(e) => handleChange(index, e)}
							/>
							{index ? (
								<button
									type="button"
									className="button remove"
									onClick={() => removeFormFields(index)}>
									Remove
								</button>
							) : null}
						</div>
					))}
					<button
						className="button add"
						type="button"
						onClick={() => addFormFields()}>
						Add
					</button>
				</div>
				<div className="create-quiz-form">
					<br />
					<button onClick={uploadQuiz} className="primary submit">
						CREATE
					</button>
				</div>
			</div>
		</div>
	);
};

export default Quizs;
