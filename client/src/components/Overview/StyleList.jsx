import React from 'react';
import styled from 'styled-components';
import StyleEntry from './StyleEntry.jsx';

const StyleTitle = styled.div`
  padding-left: 29px;
`

const Container = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  border: 0;
`

export default function StyleList (props) {

  return (
    <>
      <StyleTitle>STYLE > {props.styleName}</StyleTitle>
      <Container>
        {props.styleInfo.map((style, key) => (
          <StyleEntry styleInfo={props.styleInfo} setStyleID={props.setStyleID} setProductStyle={props.setProductStyle} styleID={props.styleID} key={key} style={style}/>
        ))}
      </Container>
    </>
  )
}

