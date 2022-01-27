import React, { useState } from "react";
import Course from "./teacher/Course";
import Quiz from "./teacher/Quiz";

const DashboardTeacher = () => {
	const [currentTab, setCurrentTab] = useState(0);

	// 0 - Create Course
	// 1 - Create Quiz

	return (
		<div className="DashboardTeacher">
			<div className="container">
				<div className="tabs">
					<div
						id="tab1"
						onClick={() => setCurrentTab(0)}
						className={`tab ${currentTab === 0 && "selected-tab"}`}>
						Courses
					</div>
					<div
						id="tab2"
						onClick={() => setCurrentTab(1)}
						className={`tab ${currentTab === 1 && "selected-tab"}`}>
						Quizzes
					</div>
				</div>

				{currentTab === 0 ? <Course /> : <Quiz />}
			</div>
		</div>
	);
};

export default DashboardTeacher;
