import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewTile from './ReviewTile.jsx'

const MoreReviewsButton = styled.button`
  display: ${props => props.reviewMax === 0 || props.reviewMax === 1 || props.reviewMax === 2 || props.reviewCount === props.reviewMax || props.reviewCount === props.reviewMax - 1 ? 'none' : 'inline-block'}
  border: 1px solid;
  margin: 5px;
`;

const AddReviewButton = styled.button`
  display: inline-block;
  border: 1px solid;
  margin: 5px;
`;

const ButtonContainer = styled.div`
  display: inline-flex;
`;

export default function ReviewsList(props) {
  const [reviews, setReviews] = useState(() => []);
  const [reviewCounter, setReviewCount] = useState(() => 0);
  let [pageCount, setPageCount] = useState(1);

  useEffect(() => {

    axios.get('/reviews', { params: { product_id: props.productID, count: 2, page: pageCount } })
      .then((response) => {
        setReviews(response.data.results);
        setPageCount(pageCount + 1);
      })
      .catch((e) => console.log(e));

    // get review metadata to count total number of reviews; 'more reviews' button won't display if length of array exceeds the count
    axios.get('/reviews/meta', { params: { product_id: props.productID } })
      .then((response) => {
        setReviewCount(countReviews(response.data.ratings));
      })
      .catch((e) => console.log(e));

  }, []);

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
    // default = 2 reviews
    axios.get('/reviews', { params: { product_id: props.productID, count: 2, page: pageCount } })
    .then((response) => {
      let updatedReviews = reviews.concat(response.data.results)
      setReviews(updatedReviews);
      setPageCount(pageCount + 1);
      console.log(pageCount)
    })
    .catch((e) => console.log(e))

  }


  const listReviewTiles = reviews.map((review) =>
    <li><ReviewTile review={review} /></li>
  )

  return (
    <div>
      <div>
        <ul>
          {listReviewTiles}
        </ul>
      </div>
      <ButtonContainer>
        <MoreReviewsButton onClick={() => getMoreReviews()} reviewCount={reviews.length} reviewMax={reviewCounter} > MORE REVIEWS </MoreReviewsButton>
        <AddReviewButton reviewCount={reviews.length} > ADD A REVIEW </AddReviewButton>
      </ButtonContainer>
    </div>

  )
}


// export default ReviewsList;