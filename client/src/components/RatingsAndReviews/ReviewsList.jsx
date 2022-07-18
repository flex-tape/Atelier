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

const SortBar = styled.form`
  margin-top: 5px;
`;

const UnorderedList = styled.ul`
  padding: 0;
  max-height: 1000px;
  overflow: auto;
  &> li + li {
    border-top: 1px solid black;
  }
  & li:first-child div:first-child {
    // border-box: content-box;
    padding-top: 5px;
  }
`;


export default function ReviewsList(props) {
  let [reviews, setReviews] = useState(() => []);
  let [reviewTotal, setReviewTotal] = useState(0);
  let [pageCount, setPageCount] = useState(2);
  let [showMoreReviews, setShowMoreReviews] = useState(true);
  let [sortCategory, setSortCategory] = useState('relevant')

  const getReviews = async () => {

    let res = await axios.get('/reviews/meta', { params: { product_id: props.productID } })

    let reviewCount = countReviews(res.data.ratings);
    console.log('REVIEW COUNT IS...', reviewCount)
    await setReviewTotal(reviewCount);

    let res2 = await axios.get('/reviews', { params: { product_id: props.productID, count: reviewCount, sort: sortCategory } })
    console.log(res2)
    let final = res2.data.results;
    console.log('RESULTS ARRAY LENGTH IS...', final.length)
    console.log('RESULTS ARRAY IS...', final)
    setReviews(final)
  }

  useEffect(() => {
    setPageCount(2);
    getReviews();

  }, [sortCategory]);

  // useEffect( () => {

  // }, [sortCategory])

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
    setPageCount(pageCount + 2)
  }

  const listReviewTiles = reviews.map((review, index) => {
    if (index < pageCount) {
      return <li><ReviewTile review={review} /></li>
    }
  });

  const sortHandler = (event) => {
    setSortCategory(event.target.value);
  }

  return (
    <>
      <SortBar>
        <label>{reviewTotal} reviews, sorted by </label>
        <select id="sort-bar" value={sortCategory} onChange={sortHandler}>
          <option value="relevant">relevance</option>
          <option value="helpful">helpfulness</option>
          <option value="newest">newest</option>
        </select>
      </SortBar>
      <div>
        {/* {reviewTotal} */}
        <UnorderedList>
          {listReviewTiles}
        </UnorderedList>
      </div>
      <ButtonContainer>
          {pageCount < 2 || pageCount >= reviewTotal
            ? null
            : <MoreReviewsButton onClick={() => getMoreReviews()} > MORE REVIEWS </MoreReviewsButton>
          }
        <AddReviewButton reviewCount={reviews.length} > ADD A REVIEW </AddReviewButton>
      </ButtonContainer>
    </>

  )
}


// export default ReviewsList;