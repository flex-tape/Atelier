import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const RatingsBarText = styled.div`
  flex: 20%;
  // height: 10px;
  // vertical-align: middle;
  // align-self: center;
  text-decoration: underline;
  font-size: 14px;
`;

const ParentBar = styled.div`
  flex: 80%;
  display: flex;
  height: 8px;
  width: 100%;
  // background-color: silver;
`;

const FilledPortion = styled.div`
  flex: ${(props) => String(props.percentTrue) + '%'};
  background-color: limegreen;
`;

const UnfilledPortion = styled.div`
  flex: ${(props) => String(props.percentFalse) + '%'};
  background-color: silver;
`;

const StarRatingItem = styled.li`
  background-color: ${props => props.inFilter ? 'orange' : 'white'}
`;


export default function RatingsBar(props) {
  let [itemClicked, setItemClicked] = useState(false);

  const filterHandler = async (e) => {
    if (props.starsFilter.indexOf(props.starValue) === -1) {
      let newState = props.starsFilter.slice();
      newState.push(e.currentTarget.id);
      await props.setStarsFilter(newState);
    } else {
      let newState = props.starsFilter.filter( (el) => {
        return el !== e.currentTarget.id;
      })

      await props.setStarsFilter(newState);
    }
  }

  const clickHandler = (e) => {
    e.preventDefault();
    setItemClicked(!itemClicked);
    filterHandler(e);
  }

  return (
    <StarRatingItem id={props.starValue} onClick={clickHandler} itemClicked={itemClicked}  inFilter={props.starsFilter.includes(props.starValue)}>
      <RatingsBarText>
        {props.starValue} stars
      </RatingsBarText>
      <ParentBar>
        <FilledPortion percentTrue={props.ratingsPercent}>
        </FilledPortion>
        <UnfilledPortion percentFalse={props.ratingsPercentRemainder}>
        </UnfilledPortion>
      </ParentBar>
    </StarRatingItem>
  )
}