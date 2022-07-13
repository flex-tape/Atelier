import React, { useState, useEffect } from 'react';

export default function AnswerList(props) {

  // if (props.answer.photos !== undefined) {
  //   return(
  //     <pre>
  //       {props.answer.body}
  //       <p>{props.answer.photos.map((photo) => (<img src={photo.url} key={photo.id}/>))}</p>
  //       <p>by {props.answer.answerer_name}, {props.answer.date} | Helpful? Yes {`(${props.answer.helpfulness})`} | Report</p>
  //     </pre>
  //   )
  // } else {
  //   return(
  //     <pre>
  //     {props.answer.body}
  //     <p>by {props.answer.answerer_name}, {props.answer.date} | Helpful? Yes {`(${props.answer.helpfulness})`} | Report</p>
  //   </pre>
  //   )
  // }
  return(
    <pre>
    {props.answer.body}
    <p>by {props.answer.answerer_name}, {props.answer.date} | Helpful? Yes {`(${props.answer.helpfulness})`} | Report</p>
  </pre>
  )
}
