import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewTile from './ReviewTile.jsx'

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
  width: 510px;
  height: 500px;
  border-radius: 8px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  position: relative;
`;

const Submit = styled.button`
  position: absolute;
  padding: 8px 10px;
  bottom: 15px;
  right: 10px;
  background: rgba(51, 204, 255);
  color: rgba(250, 250, 250);
  border-radius: 4px;
  border: solid rgba(210, 210, 210);
`;

const Close = styled.button`
  position: absolute;
  padding: 8px 10px;
  bottom: 15px;
  right: 125px;
  border-radius: 4px;
  border: solid rgba(210, 210, 210);
`;

const Subtitle = styled.p`
  font-size: 15px;
  opacity: 0.8;
  margin-bottom: 5px;
`

const Title = styled.div`
  text-align: center;
  border-bottom: 1px solid rgba(210, 210, 210);
  margin-bottom: 15px;
`

const Header = styled.label`
  font-size: 18px;
`

export default function AddReviewModal(props) {

  return (
    <ModalBackground>
      <ModalContainer>
        <Title>
          <Header>Write Your Review</Header><br />
          <Subtitle>About the {props.productName}</Subtitle>
        </Title>

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

        <div>
          <Close onClick={props.addReviewClickHandler}>Close</Close>
          <Submit type='submit'>Submit Answer</Submit>
        </div>
      </ModalContainer>
    </ModalBackground>
  )
}