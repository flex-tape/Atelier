import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './IndividualQuestion/Question.jsx'

export default function QuestionsList() {
  const [questionsList, setQuestionsList] = useState([]);

  // async function getQuestions() {
  //   await axios.get('/qa/questions', {params: {product_id: 40344, count: 4}})
  //     .then((response) => {setQuestionsList(response.data)})
  //     .catch(err => console.log(err))
  // }

  useEffect(() => {
    axios.get('/qa/questions', {params: {product_id: 40344, count: 4}})
      .then((response) => {setQuestionsList(response.data)})
      .catch(err => console.log(err))
  }, [])


  return (
    <div>
      {questionsList.map((question) => (<Question question={question} key={question.question_id}/>))}
    </div>
  );

}