import React from 'react';
import styled from 'styled-components';
import ReviewsList from './ReviewsList.jsx'

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
  padding: 15px;

  div ul {
    padding: 0;
    max-height: 1000px;
    overflow: auto;
  }

  div ul > li + li {
    border-top: 1px solid black;
  }
`

const RatingsAndReviews = (props) => {

  return (
    <div>

    <Container>
      <Sidebar></Sidebar>
      <Main>
        <ReviewsList productID={props.productID}/>
      </Main>

    </Container>
    </div>
  )
}

export default RatingsAndReviews;