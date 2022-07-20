import React from 'react';
import styled from 'styled-components';

export default function SizeModal (props) {

  const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`
const Header = styled.div`
  align-self: flex-start;
`
const Content = styled.div`
  width: 600px;
  height: 300px;
  background-color: #fff;
  object-fit: contain;
  display: flex;
`
const Body = styled.div`
  max-height: 300px;
  align-self: center;
  padding-left: 100px;
`

  return (
    <Container>
      <Content>
        <Header>
        <button onClick={()=> props.setSizeModal(false)}>x</button>
        </Header>
        <Body><h1>Please select size.</h1></Body>
      </Content>
    </Container>
  )
}