import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswersList from './AnswersList.jsx'

export default function Question(props) {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios.get(`/qa/questions/${props.question.question_id}/answers`)
      .then((response) => {setAnswers(response.data)})
      .catch(err => console.log(err))
  }, [])

  return(
    <pre>
      <p>Q: {props.question.question_body} Helpful? Yes {`(${props.question.question_helpfulness})`} | Add Answer</p>
      A: {answers.map((answer) => (<AnswersList answer={answer} key={answer.answer_id}/>))}
      <p>Load More Answers</p>
    </pre>
  )
}