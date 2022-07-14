import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswersList from './AnswersList.jsx'

export default function Question(props) {
  const [answers, setAnswers] = useState([]);
  const [helpfulCount, setHelpfulCount] = useState(props.question.question_helpfulness);

  useEffect(() => {
    axios.get(`/qa/questions/${props.question.question_id}/answers`)
      .then((response) => {setAnswers(response.data)})
      .catch(err => console.log(err));
  }, [])

  const helpfulClick = (e) => {
    e.preventDefault();
    axios.put(`/qa/questions/${props.question.question_id}/helpful`)
      .then(() => {setHelpfulCount(helpfulCount + 1)})
      .catch(err => console.log(err));
  }

  const loadMoreAnswers = () => {
    if (Object.keys(props.question.answers).length > 2) {
      return (
        <a href=''>Load More Answers</a>
      )
    }
  }

  return(
    <pre>
      <p>Q: {props.question.question_body} Helpful? <a href='' onClick={helpfulClick}>Yes</a> {`(${helpfulCount})`} | Add Answer</p>
      A: {answers.map((answer) => (<AnswersList answer={answer} key={answer.answer_id}/>))}
      {loadMoreAnswers()}
    </pre>
  )
}