import React, { useState } from 'react';
import styled from 'styled-components';

const TileDiv = styled.div`
  // display: flex;
  // border: solid 1px black;
  color: black;

  padding: 30px 0;
  height: 200px;
`;

const StarsAndUserInfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ReviewSummary = styled.h4`
  box-sizing: border-box;
  width: 960px;
`;

const ReviewBody = styled.div`
`;

const ExpandReviewsButton = styled.button`
  display: ${props => props.readMoreClicked ? 'none' : 'block'};
  background-color: transparent;
  margin: 0;
  padding: 0;
  border-width: 0;
  color: rgb(19, 107, 234);
  display: inline-block;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default function ReviewTile(props) {
  let [isReadMore, setIsReadMore] = useState(false);
  // const toggleReadMore = () => {
  //   setIsReadMore(!isReadMore)
  // }
  let dateObj = new Date(props.review.date);
  let month = dateObj.toLocaleString("en-US", { month: "long" });
  let day = dateObj.getUTCDate("en-US", { day: "long" });
  let year = dateObj.getFullYear()
  let date = month + ' ' + day + ', ' + year;

  const RenderDescription = () => {
    if (props.review.body.length > 250) {
      return (
        <ReviewBody>
          <p>{isReadMore ? props.review.body : props.review.body.slice(0, 247) + '...'}</p>
          {!isReadMore
            ? <ExpandReviewsButton onClick={() => setIsReadMore(true)}>Read more</ExpandReviewsButton>
            : null}
        </ReviewBody>
      )
    }
    return (
      <ReviewBody>
        <p>{props.review.body}</p>
      </ReviewBody>
    )
  }

  return (
    <TileDiv>

      <StarsAndUserInfoBar>
        <div>stars</div>
        <div>{props.review.reviewer_name}, {date}</div>
      </StarsAndUserInfoBar>
      <ReviewSummary>
        {props.review.summary}
      </ReviewSummary>
      {RenderDescription()}

    </TileDiv>
  )
}