import React from 'react';
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

  const listReviewTiles = props.reviews.map((review, index) => {
    if (index < props.reviewDisplayCount) {
      return <li><ReviewTile review={review} /></li>
    }
  });

  return (
    <>
      <SortBar>
        <label>{props.reviewTotal} reviews, sorted by </label>
        <select id="sort-bar" value={props.sortCategory} onChange={props.sortHandler}>
          <option value="relevant">relevance</option>
          <option value="helpful">helpfulness</option>
          <option value="newest">newest</option>
        </select>
      </SortBar>

      <UnorderedList>
        {listReviewTiles}
      </UnorderedList>

      <ButtonContainer>
        {props.reviewDisplayCount < 2 || props.reviewDisplayCount >= props.reviewTotal
          ? null
          : <MoreReviewsButton onClick={props.getMoreReviews} > MORE REVIEWS </MoreReviewsButton>
        }
        <AddReviewButton reviewCount={props.reviews.length} > ADD A REVIEW </AddReviewButton>
      </ButtonContainer>
    </>

  )
}


// export default ReviewsList;