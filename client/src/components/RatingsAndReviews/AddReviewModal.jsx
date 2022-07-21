import React, { useState } from 'react';
import styled from 'styled-components';
// import ReviewTile from './ReviewTile.jsx';
import DescriptionBar from './DescriptionBar.jsx';

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(200, 200, 200, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalContainer = styled.div`
  width: 650px;
  height: 650px;
  border-radius: 8px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  position: relative;
  overflow: auto;
`;

const Submit = styled.button`
  // position: absolute;
  padding: 8px 10px;
  // bottom: 15px;
  // right: 10px;
  background: rgba(51, 204, 255);
  color: rgba(250, 250, 250);
  border-radius: 4px;
  border: solid rgba(210, 210, 210);
`;

const Close = styled.button`
  // position: absolute;
  padding: 8px 10px;
  // bottom: 15px;
  // right: 125px;
  border-radius: 4px;
  border: solid rgba(210, 210, 210);
`;

const Subtitle = styled.p`
  font-size: 15px;
  opacity: 0.8;
  margin-bottom: 5px;
`

const Title = styled.h3`
  text-align: center;
  border-bottom: 1px solid rgba(210, 210, 210);
  margin-bottom: 15px;
`

const Header = styled.label`
  font-size: 18px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`



export default function AddReviewModal(props) {

  const [reviewSummary, setReviewSummary] = useState('');
  const [reviewBody, setReviewBody] = useState('');

  const inputHandler = (e) => {
    if (e.target.id === "review-summary") {
      setReviewSummary(e.target.value)
    }
    if (e.target.id === "review-body") {
      setReviewBody(e.target.value)
    }
  }

  // props.metadata.characteristics



  // const generateCharacteristicsBar = Object.keys(props.metadata.characteristics).map( (label) => {
  //   return <DescriptionBar label={label}></DescriptionBar>
  // })

  return (
    <ModalBackground>
      <ModalContainer>
        <form>
          <Title>
            <Header>Write Your Review</Header><br />
            <Subtitle>About the {props.productName}</Subtitle>
          </Title>
          <div>
            <fieldset>
              Do you recommend this product?
              <div>
                <input type="radio" id="yes" value="Yes"></input>
                <label htmlFor="yes">Yes</label>
              </div>
              <div>
                <input type="radio" id="no" value="No"></input>
                <label htmlFor="no">No</label>
              </div>
            </fieldset>
          </div>
          <div>
            <h4>Characteristics</h4>
            {Object.keys(props.metadata.characteristics).map((label) => {
              return <DescriptionBar label={label}></DescriptionBar>
            })}
          </div>
          <div>
            <h4><label htmlFor="review-summary">Add a headline</label></h4>
            <input type="text" id="review-summary" name="review-summary" value={reviewSummary} onChange={inputHandler} placeholder="Best purchase ever!" size="61" maxLength="60" />
            <h4><label htmlFor="review-body">Add a written review</label></h4>
            <textarea id="review-body" name="review-body" rows="15" cols="61" value={reviewBody} onChange={inputHandler} placeholder="Why did you like the product or not?" maxLength="1000" />
            <div>
              Minimum characters left: {50 - reviewBody.length}
            </div>
          </div>
          <ButtonContainer>
            <Close onClick={props.addReviewClickHandler}>Close</Close>
            <Submit type='submit'>Submit Answer</Submit>
          </ButtonContainer>
        </form>
      </ModalContainer>
    </ModalBackground>
  )
}