import React from 'react';
import styled from 'styled-components';

const FeaturesBarSlider = styled.div`
display: flex;
height: 8px;
justify-content: space-between;
margin: 6px 0;
`;

const FeaturesNamesSlider = styled.div`
display: flex;
height: 8px;
justify-content: space-between;
`;

const FeaturesNameSegment = styled.div`
// display: flex;
height: 8px;
// justify-content: space-between;
// text-align: center;
`;

const FeaturesBarSegments = styled.div`
background-color: silver;
width: 33%;
`;

export default function FeaturesBar(props) {
  return (
    <>
      <div>
        {props.labelName}
      </div>
      <FeaturesBarSlider>
        <FeaturesBarSegments></FeaturesBarSegments>
        <FeaturesBarSegments></FeaturesBarSegments>
        <FeaturesBarSegments></FeaturesBarSegments>
      </FeaturesBarSlider>
      <FeaturesNamesSlider>
        <FeaturesNameSegment>{props.labelDescs[0]}</FeaturesNameSegment>
        <FeaturesNameSegment>{props.labelDescs[1]}</FeaturesNameSegment>
        <FeaturesNameSegment>{props.labelDescs[2]}</FeaturesNameSegment>
      </FeaturesNamesSlider>
    </>
  )
}