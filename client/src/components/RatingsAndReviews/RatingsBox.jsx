import React, { useState, useEffect } from 'react';
import calculateReviewAvg from '../../lib/calculateReviewAvg.js';
import styled from 'styled-components';

// let ProgressBar = styled.

export default function RatingsBox(props) {

  let [reviewAvg, setReviewAvg] = useState('');
  let [recommendedPercent, setRecommendedPercent] = useState(0);

  useEffect( () => {
    let reviewAverage = calculateReviewAvg(props.metadata.ratings)['ratingSummary'];
    setReviewAvg(reviewAverage);
    setRecommendedPercent(calculateRecommended(props.metadata.recommended))
  });

  const calculateRecommended = (obj) => {
    console.log(obj)
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

  return(
    <>
      <div><h4>RATINGS & REVIEWS</h4></div>
      <div>
        {reviewAvg}
      </div>
        {recommendedPercent}% of reviews recommend this product
    </>
  )
}