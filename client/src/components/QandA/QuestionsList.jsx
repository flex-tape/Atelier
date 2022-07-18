import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './IndividualQuestion/Question.jsx';
import SearchBar from './SearchBar.jsx';
import QuestionModal from './QuestionModal.jsx';
import styled from 'styled-components';

const Button = styled.button`
  padding: 12px 15px;
  box-sizing: border-box;
  border: 1px solid black;
  margin-right: 12px;
  background: none;
  font-weight: bold;
`
const QuestionsListContainer = styled.div`
  max-height: 100vh;
  overflow: auto;
`

export default function QuestionsList() {
  const [productID, setProductID] = useState(40344);
  const [questionsList, setQuestionsList] = useState([]);
  const [fullList, setFullList] = useState([]);
  const [count, setCount] = useState(4);
  const [openModal, setOpenModal] = useState(false);
  let [moreQuestions, setMoreQuestions] = useState(true);

  useEffect(() => {
    axios.get('/qa/questions', {params: {product_id: productID}})
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
    setQuestionsList(fullList.slice(0, count + 2));
    setCount(prevCount => prevCount + 2);
    if (count >= fullList.length - 2) {
      setMoreQuestions(false);
    }
  }

  let handleAddClick = (e) => {
    e.preventDefault();
    setOpenModal(true);
  }

  return (
    <div>
      <SearchBar questions={fullList} setQuestionsList={setQuestionsList} count={count}/>
      <QuestionsListContainer>
        {questionsList.map((question) => (<Question question={question} key={question.question_id}/>))}
      </QuestionsListContainer>
      <div>
        {moreQuestions && <Button onClick={handleMoreClick}>SHOW MORE QUESTIONS</Button>}
        <Button onClick ={handleAddClick}>ADD A QUESTION +</Button>
      </div>
      {openModal && <QuestionModal setMoreQuestions={setMoreQuestions} setQuestionsList={setQuestionsList} setFullList={setFullList} productID={productID} setOpenModal={setOpenModal}/>}
    </div>
  );
}