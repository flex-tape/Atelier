import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx'
import RatingsBox from './RatingsBox.jsx'
import calculateReviewAvg from '../../lib/calculateReviewAvg.js'

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
  let [reviews, setReviews] = useState(() => []);
  let [reviewTotal, setReviewTotal] = useState(0);
  let [reviewDisplayCount, setReviewDisplayCount] = useState(2);
  let [reviewAvg, setReviewAvg] = useState(0);
  let [sortCategory, setSortCategory] = useState('relevant');

  const getReviews = async () => {
    let res = await axios.get('/reviews/meta', { params: { product_id: props.productID } })

    let reviewCount = countReviews(res.data.ratings);
    let reviewAverage = calculateReviewAvg(res.data.ratings)
    await setReviewTotal(reviewCount);
    await setReviewAvg(reviewAverage);

    let res2 = await axios.get('/reviews', { params: { product_id: props.productID, count: reviewCount, sort: sortCategory } })
    let final = res2.data.results;
    setReviews(final)
  }

  useEffect(() => {
    setReviewDisplayCount(2);
    getReviews();
  }, [sortCategory]);

  // useEffect(() => {
  //   console.log(reviewAvg)
  // }, [reviewAvg])

  const countReviews = (ratingsObj) => {
    let counter = 0;
    for (let key in ratingsObj) {
      if (Object.hasOwn(ratingsObj, key)) {
        counter += parseInt(ratingsObj[key])
      }
    }
    return counter;
  }


  const getMoreReviews = () => {
    setReviewDisplayCount(reviewDisplayCount + 2)
  }

  const sortHandler = (event) => {
    setSortCategory(event.target.value);
  }

  return (
    <div>
    <Container id="ratings-reviews-container">
      <RatingsContainer id="ratings-container">
        {reviewAvg}
        <RatingsBox />
      </RatingsContainer>
      <ReviewsContainer id="reviews-container">
        <ReviewsList id="reviews-container" reviews={reviews} reviewDisplayCount={reviewDisplayCount} reviewTotal={reviewTotal} productID={props.productID} sortCategory={sortCategory} sortHandler={sortHandler} getMoreReviews={getMoreReviews} />
      </ReviewsContainer>
    </Container>
    </div>
  )
}