import React from 'react';

export default function SizeEntry (props) {

  return (
    <option value={props.index}>{props.value.size}</option>
  )
}