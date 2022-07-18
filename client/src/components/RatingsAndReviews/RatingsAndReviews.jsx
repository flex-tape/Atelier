import React from 'react';
import styled from 'styled-components';
import ReviewsList from './ReviewsList.jsx'
import RatingsBox from './RatingsBox.jsx'

const Container = styled.div`
  display: flex;
  margin: auto;
  height: 1300px;
  border: 1px dotted;
`;

const RatingsContainer = styled.section`
  flex: 1;
  border: 1px dotted;
  margin: 5px;
`

const ReviewsContainer = styled.main`
  flex: 2;
  border: 1px dotted;
  margin: 5px;
  padding: 15px;
`

export default function RatingsAndReviews (props) {

  return (
    <div>
    <Container id="ratings-reviews-container">
      <RatingsContainer id="ratings-container">
        <RatingsBox />
      </RatingsContainer>
      <ReviewsContainer id="reviews-container">
        <ReviewsList id="reviews-container" productID={props.productID}/>
      </ReviewsContainer>
    </Container>
    </div>
  )
}