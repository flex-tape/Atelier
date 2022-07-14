import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './IndividualQuestion/Question.jsx'

export default function QuestionsList() {
  const [questionsList, setQuestionsList] = useState([]);
  const [fullList, setFullList] = useState([]);
  let [moreQuestions, setMoreQuestions] = useState(true);

  useEffect(() => {
    axios.get('/qa/questions', {params: {product_id: 40347}})
      .then((response) => {
        let sortedQuestions = response.data.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
        setQuestionsList(sortedQuestions.slice(0, 4));
        setFullList(sortedQuestions);
        if (sortedQuestions.length <= 4) {
          setMoreQuestions(false);
        }
      })
      .catch(err => console.log(err))
  }, [])

  let handleMoreClick = (e) => {
    e.preventDefault();
    setQuestionsList(fullList);
    setMoreQuestions(false);
  }

  return (
    <div>
      {questionsList.map((question) => (<Question question={question} key={question.question_id}/>))}
      {moreQuestions && <button onClick={handleMoreClick}>More Questions</button>}
    </div>
  );

}