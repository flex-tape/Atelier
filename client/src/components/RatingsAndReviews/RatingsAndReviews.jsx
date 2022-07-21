import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import RatingsBox from './RatingsBox.jsx';

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
  padding: 20px;
`

const ReviewsContainer = styled.main`
  flex: 2;
  border: 1px dotted;
  margin: 5px;
  padding: 15px;
`

export default function RatingsAndReviews(props) {
  let [reviews, setReviews] = useState(() => []);
  let [reviewTotal, setReviewTotal] = useState(0);
  let [reviewDisplayCount, setReviewDisplayCount] = useState(2);
  let [reviewMetadata, setReviewMetadata] = useState('');
  let [sortCategory, setSortCategory] = useState('relevant');
  let [hasLoaded, setHasLoaded] = useState(false);
  let [starsFilter, setStarsFilter] = useState([]);

  const getReviews = async () => {
    let res = await axios.get('/reviews/meta', { params: { product_id: props.productID } });

    await setReviewMetadata(res.data);

    let reviewCount = countReviews(res.data.ratings);
    await setReviewTotal(reviewCount);

    let res2 = await axios.get('/reviews', { params: { product_id: props.productID, count: reviewCount, sort: sortCategory } });
    let final = res2.data.results;
    // await setReviews(final);

    return final;
  }

  useEffect (() => {

    pageLoader();

  }, [sortCategory, starsFilter]);

  const pageLoader = async () => {
    await setReviewDisplayCount(2);
    let loadedReviews = await getReviews();

    if (starsFilter.length > 0) {
      let filteredReviews = loadedReviews.filter( (review) => {
        // return starsFilter.forEach( (star) => {
        //   if (review.rating >= Number(star)) {
        //     return true;
        //   }
        // })
        return starsFilter.includes(String(review.rating))
      })

      await setReviews(filteredReviews)
      await setHasLoaded(true);
      return;
    }
    await setReviews(loadedReviews)
    await setHasLoaded(true);
  }

  const countReviews = (ratingsObj) => {
    let counter = 0;
    for (let key in ratingsObj) {
      if (Object.hasOwn(ratingsObj, key)) {
        counter += parseInt(ratingsObj[key]);
      }
    }
    return counter;
  }

  const getMoreReviews = () => {
    setReviewDisplayCount(reviewDisplayCount + 2);
  }

  const sortHandler = (event) => {
    setSortCategory(event.target.value);
  }

  return (
    <div>
      {hasLoaded &&
        <Container ref={props.reference} id="ratings-reviews-container">
          <RatingsContainer id="ratings-container">
            <RatingsBox metadata={reviewMetadata} hasLoaded={hasLoaded} reviewTotal={reviewTotal} starsFilter={starsFilter} setStarsFilter={setStarsFilter} />
          </RatingsContainer>
          <ReviewsContainer id="reviews-container">
            <ReviewsList id="reviews-container" reviews={reviews} reviewDisplayCount={reviewDisplayCount} reviewTotal={reviewTotal} productID={props.productID} sortCategory={sortCategory} sortHandler={sortHandler} getMoreReviews={getMoreReviews} starsFilter={starsFilter} />
          </ReviewsContainer>
        </Container>
      }
    </div>
  )
}