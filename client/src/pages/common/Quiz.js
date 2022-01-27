import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { tokenAtom, userAtom } from "../../global/globalState";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Exam = () => {
  const history = useHistory();
  const { id } = useParams();

  const user = useRecoilValue(userAtom);
  const token = useRecoilValue(tokenAtom);

  const [quiz, setQuiz] = useState([
    {
      question: "q1",
      option1: "op1",
      option2: "op2",
      option3: "op3",
      option4: "op4",
    },
    {
      question: "q2",
      option1: "op1",
      option2: "op2",
      option3: "op3",
      option4: "op4",
    },
  ]);
  const [answers, setAnswer] = useState([
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  ]);

  const [result, setResult] = useState([
    {
      studentName: "Alex",
      score: "100",
    },
    {
      studentName: "Alex2",
      score: "45",
    },
    {
      studentName: "Ale3",
      score: "35",
    },
  ]);

  // *INFO* : uncomment this to make it work
  useEffect(() => {
    if (user.type === "user") {
      console.log(id);
      Axios.post(
        `${process.env.REACT_APP_API_URL}/student/getQuiz`,
        { id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((res) => {
          console.log(res.data.response);
          setQuiz(res.data.response.questions);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.get(
        `${process.env.REACT_APP_API_URL}/teacher/getScores`,
        { id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
        .then((res) => {
          console.log(res.data.response);
          setResult(res.data.response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleAnswerChange = (indexOfQuestion, indexOfAnswer) => {
    setAnswer((prev) => {
      let temp = prev;
      temp[indexOfQuestion] = indexOfAnswer;
      return temp;
    });
  };

  const submitQuiz = () => {
    Axios.post(
      `${process.env.REACT_APP_API_URL}/student/submitQuiz`,
      { id, answers: answers.slice(0, quiz.length) },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
      .then((res) => {
        console.log(res.data);
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Exam">
      {user.type === "user" ? (
        <div className="container">
          <div className="exam-cards">
            {quiz &&
              quiz?.map(
                ({ question, option1, option2, option3, option4 }, index) => (
                  <div className="exam-card card">
                    <div className="question">{question}</div>
                    <div className="options">
                      <div className="option-group">
                        <input
                          type="radio"
                          name={JSON.stringify(question)}
                          onChange={() => handleAnswerChange(index, 0)}
                        />
                        <label htmlFor="option1">{option1}</label>
                      </div>
                      <div className="option-group">
                        <input
                          type="radio"
                          name={JSON.stringify(question)}
                          onChange={() => handleAnswerChange(index, 1)}
                        />
                        <label htmlFor="option2">{option2}</label>
                      </div>
                      <div className="option-group">
                        <input
                          type="radio"
                          name={JSON.stringify(question)}
                          onChange={() => handleAnswerChange(index, 2)}
                        />
                        <label htmlFor="option3">{option3}</label>
                      </div>
                      <div className="option-group">
                        <input
                          onChange={() => handleAnswerChange(index, 3)}
                          type="radio"
                          name={JSON.stringify(question)}
                        />
                        <label htmlFor="option4">{option4}</label>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>

          <button onClick={submitQuiz} className="primary submit">
            Submit
          </button>
        </div>
      ) : (
        <div className="container">
          <div className="exam-cards">
            <div className="card exam-cards">
              {result.map((ele, index) => (
                <div className="exam-card card" key={index}>
                  <div className="student-name">{ele.studentName}</div>
                  <div className="score">{ele.score}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exam;
