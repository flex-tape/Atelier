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

  const sortHandler = async (event) => {
    event.preventDefault();
    console.log(event.target)
    console.log(event.target.value)
    let sort = await setSortCategory(event.target.value);
    // console.log('SORT IS ... ', sortCategory)

    // let pageCount = await setPageCount(2);

    // let res2 = await axios.get('/reviews', { params: { product_id: props.productID, count: reviewTotal, sort: sortCategory } })

    // let final = res2.data.results;
    // console.log(final.length)
    // setReviews(final)
    // setPageCount(1);

    // axios.get('/reviews', { params: { product_id: props.productID, count: 2, page: pageCount, sort: sortCategory } })
    //   .then((response) => {
    //     if (response.data.results.length < 2) {
    //       setShowMoreReviews(false);
    //     }
    //     setReviews(response.data.results);
    //     setPageCount(pageCount + 1);
    //   })
    //   .catch((e) => console.log(e));
  }

  return (
    <div className="main-container">
      <SortBar>
        <label>{reviewTotal} reviews, sorted by </label>
        <select id="sort-bar" value={sortCategory} onChange={(event) => sortHandler(event)}>
          <option value="relevant">relevance</option>
          <option value="helpful">helpfulness</option>
          <option value="newest">newest</option>
        </select>
      </SortBar>
      <div>
        {/* {reviewTotal} */}
        <ul>
          {listReviewTiles}
        </ul>
      </div>
      <ButtonContainer>
        {showMoreReviews
          ? <MoreReviewsButton onClick={() => getMoreReviews()} > MORE REVIEWS </MoreReviewsButton>
          : null
        }
        <AddReviewButton reviewCount={reviews.length} > ADD A REVIEW </AddReviewButton>
      </ButtonContainer>
    </div>

  )
}


// export default ReviewsList;