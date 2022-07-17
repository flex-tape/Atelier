import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import dateHandler from '../../lib/dateHandler.js'

const TileDiv = styled.div`
  color: black;
  padding: 30px 0;

`;

const StarsAndUserInfoBar = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-right: 5px;
`;

const ReviewSummary = styled.h4`
  box-sizing: border-box;
  width: 960px;
  font-size: 18px;
  margin-bottom: 20px;
`;

const ReviewBody = styled.div`
  box-sizing: border-box;
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
  position: relative;
  bottom: 0.5em;
`;

const PhotoCarousel = styled.div`
  display: flex;
  box-sizing: border-box;
  margin-top: 16px;
  gap: 8px;

  img {
    object-fit: cover;
    height: 80px;
    width: 10%
  }
`

const LightBox = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.80);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    object-fit: cover;
    width: 50%;
    height: 50%;
  }
`;

const Recommended = styled.div`
  display: flex;
  box-sizing: border-box;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  svg {
    height: 18px;
    margin-right: 4px;
    position: relative;
    bottom: .10em;
  }
  align-content: center;
`;

const SellerResponse = styled.div`
  background-color: grey;
`;

const Helpfulness = styled.div`
  box-sizing: border-box;
  padding-top: 10px;
  font-size: 0.95em;
`;

export default function ReviewTile(props) {
  let [isReadMore, setIsReadMore] = useState(false);
  let [lightBoxDisplay, setLightBoxDisplay] = useState(false);
  let [imageToShow, setImageToShow] = useState('');
  let [helpfulnessCount, setHelpfulnessCount] = useState(props.review.helpfulness);
  let [helpfulnessClicked, setHelpfulnessClicked] = useState(false);

  let date = dateHandler(props.review.date)

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

  const listPhotos = props.review.photos.map((photo) =>
    <img src={photo.url} onClick={() => showImage(photo.url)}></img>
  )

  const showImage = (image) => {
    setImageToShow(image);

    setLightBoxDisplay(true);
  }

  const closeImage = () => {
    setLightBoxDisplay(false);
  }

  const markAsHelpful = (e) => {
    e.preventDefault();
    // checks if item has already been marked as helpful
    if (!helpfulnessClicked) {
      axios.put(`/reviews/${props.review.review_id}/helpful`)
        .then((response) => {
          console.log('RESPONSE IS...', response)
          if (response.status === 204) {
            setHelpfulnessCount(helpfulnessCount + 1);
            setHelpfulnessClicked(true);
          }
        })
        .catch((e) => {
          console.error(e)
        })
    }
  }

  return (
    <TileDiv>

      <StarsAndUserInfoBar>
        <div>star rating</div>
        <div>{props.review.reviewer_name}, {date}</div>
      </StarsAndUserInfoBar>
      <ReviewSummary>
        {props.review.summary}
      </ReviewSummary>
      {RenderDescription()}
      {listPhotos.length > 0
        ? <PhotoCarousel>
          {listPhotos}
        </PhotoCarousel>
        : ''
      }
      {lightBoxDisplay
        ? <LightBox onClick={closeImage}>
          <img id="lightbox-img" src={imageToShow} onClick={closeImage}></img>
        </LightBox>
        : ''
      }
      {props.review.recommend
        ? <Recommended>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          I recommend this product
        </Recommended>
        : ''
      }
      {props.review.response
        ? <SellerResponse>
          <h5>Response:</h5>
          <p>{props.review.response}</p>
        </SellerResponse>
        : ''
      }
      <Helpfulness>
        <span>Helpful? </span>
        <a href="#" onClick={markAsHelpful}>Yes</a> ({helpfulnessCount})
      </Helpfulness>



    </TileDiv>
  )
}