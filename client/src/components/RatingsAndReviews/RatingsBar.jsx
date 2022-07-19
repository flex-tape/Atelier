import React from 'react';
import styled from 'styled-components';

const RatingsBarText = styled.div`
  flex: 10%;
  // height: 10px;
  // vertical-align: middle;
  // align-self: center;
  text-decoration: underline;
`;

const ParentBar = styled.div`
  flex: 90%;
  display: flex;
  height: 7px;
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


export default function RatingsBar(props) {
  return (
    <li>
      <RatingsBarText>
        {props.starValue} stars
      </RatingsBarText>
      <ParentBar>
        <FilledPortion percentTrue={props.ratingsPercent}>
        </FilledPortion>
        <UnfilledPortion percentFalse={props.ratingsPercentRemainder}>
        </UnfilledPortion>
      </ParentBar>
    </li>
  )
}