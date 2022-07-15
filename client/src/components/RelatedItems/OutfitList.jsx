/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { IDContext } from '../App.jsx';
import axios from 'axios';
import styled from 'styled-components';
import { BsPlus } from 'react-icons/bs';

const PlusIcon = styled(BsPlus)`
// display: flex;
// justify-content: center;
// align-items: center;
// position: absolute;
height: 250px;
width: 250px;
margin: 10px;
background-color: #f0ffff;
`

const AddCard = styled.div`
position: relative;
height: 450px;
width: 270px;
display: block;
align-items: center;
border: 1px solid lightgray;
box-shadow: 7px 7px 7px lightgray;
margin-right: 50px;
margin-bottom: 30px;
`

const AddProduct = styled.h2 `
position: absolute;
left: 65px
`

export default function OutfitList () {
  const [outfitList, setOutfitList] = useState([1]);
  const [outfitLength, setOutfitLength] = useState([0, 3]);

  let productID = useContext(IDContext);
  let slicedOutfitList = outfitList.slice(outfitLength[0], outfitLength[1]);

  const addToList = (id) => {
    outfitList.push(id);
  }

  const removeFromList = (id) => {
    let index = outfitList.indexOf(id);
    if (index > -1) {
      outfitList.splice(index, 1);
    }
  }


  return (
    <div>
      {/* <div onClick={seeChange}>
        Hello
      </div> */}
      <div>
        {outfitList.map((item, index) => (
          <div key={index}>
            {item === 1 ? <AddCard><PlusIcon /><div><AddProduct>Add Product</AddProduct></div></AddCard> : null}
          </div>
        ))}
      </div>
    </div>

  )
}



//   const adding = () => {
//     addToList(productID);
//   }

//   const removing = () => {
//   removeFromList(productID);
//   }

//  const seeChange = () => {
//    console.log(outfitList)
//  }

