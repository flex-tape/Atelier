import React from 'react';
import QuestionsList from './QuestionsList.jsx';
import styled from 'styled-components';

const Container = styled.div`
  // margin-right: 200px;
  // margin-left: 200px;
  font-family: Arial, sans-serif;
`
const Title = styled.p`
  opacity: 70%;
`

export default function QandA(props) {

  return(
    <Container>
      <Title>QUESTIONS & ANSWERS</Title>
      <QuestionsList productID={props.productID}/>
    </Container>
  )
}