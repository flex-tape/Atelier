import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './IndividualQuestion/Question.jsx'

export default function QuestionsList() {
  const [questionsList, setQuestionsList] = useState([]);
  // let [count, setCount] = useState(4);
  // let [enoughQuestions, setEnoughQUestions] = useState(true);

  useEffect(() => {
    axios.get('/qa/questions', {params: {product_id: 40347}})
      .then((response) => {setQuestionsList(response.data.sort((a, b) => b.question_helpfulness - a.question_helpfulness))})
      .catch(err => console.log(err))
  }, [])

  // handleMoreClick = (e) => {
  //   e.preventDefault();
  //   setCount(count += 2);
  //   axios.get('/qa/questions', {params: {product_id: 40347, count: 2}})
  // }

  return (
    <div>
      {questionsList.map((question) => (<Question question={question} key={question.question_id}/>))}
      <button>More Questions</button>
    </div>
  );

}