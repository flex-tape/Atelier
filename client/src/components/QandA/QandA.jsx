import React from 'react';
import QuestionsList from './QuestionsList.jsx';
import styled from 'styled-components';

const Container = styled.div`
  margin-right: 200px;
  margin-left: 200px;
  font-family: Arial, sans-serif;
`

export default function QandA(props) {

  return(
    <Container>
      <h3>QUESTIONS & ANSWERS</h3>
      <QuestionsList productID={props.productID}/>
    </Container>
  )
}