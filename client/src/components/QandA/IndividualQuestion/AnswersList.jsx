import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {format} from 'date-fns';

export default function AnswerList(props) {
  const [answerHelpfulness, setAnswerHelpfulness] = useState(props.answer.helpfulness);
  const [reported, setReported] = useState('Report');

  const helpfulClick = (e) => {
    e.preventDefault();
    axios.put(`/qa/answers/${props.answer.answer_id}/helpful`)
    .then(() => {setAnswerHelpfulness(answerHelpfulness + 1)})
    .catch(err => console.log(err));
  }

  const reportClick = (e) => {
    e.preventDefault();
    if (reported === 'Report') {
      axios.put(`/qa/answers/${props.answer.answer_id}/report`)
        .then(() => {setReported('Reported')})
        .catch(err => console.log(err));
    }
  }

  const renderPhotos = () => {
    if (props.answer.photos !== undefined) {
      return(
        <p>{props.answer.photos.map((photo) => (<img width='100' height='100' src={photo.url} key={photo.id}/>))}</p>
      )
    }
  }

  return(
    <pre>
      {props.answer.body}
      <p>by {props.answer.answerer_name}, {format(new Date(props.answer.date), 'MM/dd/yyyy')} | Helpful? <a href='' onClick={helpfulClick}>Yes</a> {`(${answerHelpfulness})`} | <a href='' onClick={reportClick}>{reported}</a></p>
      {renderPhotos()}
    </pre>
  )

}
