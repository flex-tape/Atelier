import React from 'react';
import styled from 'styled-components';

// const Button = styled.button`
//   padding: 10px;
//   border: 2px solid blue;
//   border-radius: 4px;
// `;

const Container = styled.div`
  display: flex;
  margin: auto;
  height: 1300px;
  border: 1px dotted;
`;

const Sidebar = styled.aside`
  flex: 1;
  border: 1px dotted;
  margin: 5px;
`

const Main = styled.main`
  flex: 2;
  border: 1px dotted;
  margin: 5px;
`

const RatingsAndReviews = () => {

  return (
    <Container>
      <Sidebar></Sidebar>
      <Main></Main>

    </Container>
  )
}

export default RatingsAndReviews;