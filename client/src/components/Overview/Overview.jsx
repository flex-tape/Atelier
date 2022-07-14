import React, { useState } from 'react';

export default function Overview(props) {
  // props.productID


  // const changeID = () => {
  //   props.setProductID(65656);
  // }

  return (
    <div>
      <h1>HELLO, OVERVIEW!</h1>
<<<<<<< HEAD
      <button onClick={()=> props.setProductID(props.productID + 1)}>Click here!</button>
=======
>>>>>>> main
      {props.productID}
    </div>
  )
}