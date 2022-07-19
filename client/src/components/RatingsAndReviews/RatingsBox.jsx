import React, { useState, useEffect } from 'react';
import calculateReviewAvg from '../../lib/calculateReviewAvg.js';
import styled from 'styled-components';
import RatingsBar from './RatingsBar.jsx';

const RatingsBarContainer = styled.div`
  // display: flex;
  margin: 14px 0;
  height: 8px;
  width: 100%;
`;

const RecommendedContainer = styled.div`
  margin-bottom: 5px;
  margin-top: 10px;
`;

const RatingsBarList = styled.ul`
  list-style-type: none;
  padding-left: 0;

  & li {
    display: flex;
    margin: 8px 0;
    align-items: center;
  }

  & li:hover {
    background-color: orange;
  }
`

export default function RatingsBox(props) {

  let [reviewAvg, setReviewAvg] = useState('');
  let [recommendedPercent, setRecommendedPercent] = useState(0);

  useEffect(() => {
    let reviewAverage = calculateReviewAvg(props.metadata.ratings)['ratingSummary'];
    setReviewAvg(reviewAverage);
    setRecommendedPercent(calculateRecommended(props.metadata.recommended))
  });

  const calculateRecommended = (obj) => {
    // console.log(obj)
    let sumReviews = 0;
    let numberOfRecommends;

    for (let key in obj) {
      if (Object.hasOwn(obj, key)) {
        if (key === 'false') {
          sumReviews += parseInt(obj[key]);
        }
        if (key === 'true') {
          sumReviews += parseInt(obj[key]);
          numberOfRecommends = parseInt(obj[key]);
        }
      }
    }
    // let result = parseInt((numberOfRecommends / sumReviews).toFixed(2));
    let result = (numberOfRecommends / sumReviews).toFixed(2) * 100;
    return String(result);
  }

  // let sortedKeys = Object.keys(props.metadata.ratings).sort( (a, b) => {
  //   return Number(b) - Number(a);
  // })
  // console.log('METADATA IS...', props.metadata.ratings)
  // console.log(Object.keys(props.metadata.ratings))
  // console.log(sortedKeys)

  // Object.keys(props.metadata.ratings).map( (rating) => {

  // })

  const createRatingsBreakdown = (ratingsObj) => {
    let sortedKeys = Object.keys(ratingsObj).sort((a, b) => b - a);
    return sortedKeys.map((key) => {
      let ratingsPercent = Math.round((parseInt(ratingsObj[key]) / props.reviewTotal) * 100);
      console.log('RATINGS PERCENT1 IS...', ratingsPercent)
      let ratingsPercentRemainder = 100 - ratingsPercent;
      return <RatingsBar starValue={key} ratingsPercent={ratingsPercent} ratingsPercentRemainder={ratingsPercentRemainder} ></RatingsBar>
    })
  }

  return (
    <>
      <div><h3>RATINGS & REVIEWS</h3></div>
      <div>
        {reviewAvg}
      </div>
      <RecommendedContainer>
        {recommendedPercent}% of reviews recommend this product
      </RecommendedContainer>
      <div>
        <h4>RATINGS BREAKDOWN</h4>
      </div>
      <RatingsBarContainer>
        <RatingsBarList>
          {props.hasLoaded && createRatingsBreakdown(props.metadata.ratings)}
        </RatingsBarList>
      </RatingsBarContainer>
    </>
  )
}