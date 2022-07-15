import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewTile from './ReviewTile.jsx'

const MoreReviewsButton = styled.button`
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
  let [showMoreReviews, setShowMoreReviews] = useState(true);

  useEffect(() => {

    axios.get('/reviews', { params: { product_id: props.productID, count: 2, page: pageCount } })
      .then((response) => {
        if (response.data.results.length < 2) {
          setShowMoreReviews(false);
        }
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
      if (response.data.results.length < 2) {
        setShowMoreReviews(false);
      }
      let updatedReviews = reviews.concat(response.data.results)
      setReviews(updatedReviews);
      setPageCount(pageCount + 1);
      console.log(pageCount)
    })
    .catch((e) => console.log(e))
  }


  const listReviewTiles = reviews.map((review, key) =>
    <ReviewTile key={key} review={review} />
  )

  return (
    <div>
      <div>
          {/* {reviewCounter} */}
        <ul>
          {listReviewTiles}
        </ul>
      </div>
      <ButtonContainer>
        { showMoreReviews
          ? <MoreReviewsButton onClick={() => getMoreReviews()} > MORE REVIEWS </MoreReviewsButton>
          : null
        }
        <AddReviewButton reviewCount={reviews.length} > ADD A REVIEW </AddReviewButton>
      </ButtonContainer>
    </div>

  )
}


// export default ReviewsList;