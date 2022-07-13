/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PrimaryImage = styled.img`
// display: flex;
// justify-content: center;
// align-items: center;
// position: absolute;
height: 320px;
width: 250px;
object-fit: contain;
margin: 10px;
background-color: #f0ffff;
`

const RelatedItemsCard = styled.div`
position: relative;
height: 450px;
width: 270px;
display: block;
align-items: center;
border: 1px solid;
margin-right: 50px;
margin-bottom: 30px;
`

export default function RelatedCard({item}) {
  const [relatedProductInfo, setRelatedProductInfo] = useState([]);
  const [hoverStatus, setHoverStatus] = useState(false);

  const getRelatedInfo = async () => {
    let productLevelInfo = await axios.get(`/products/${item}`)
      .then((res) => {
      console.log('product level info: ', res.data);
      return res.data;
    })

    let productStyles = await axios.get(`/products/${item}/styles`)
      .then((res) => {
      // console.log('product styles: ', res.data);
      return res.data;
    })

    let primaryPhoto = '';
    if (productStyles.results[0].photos[0].url === null) {
      primaryPhoto = 'https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80';
    } else {
      primaryPhoto = productStyles.results[0].photos[0].url;
    }

    let relatedInfo = {
      name: productLevelInfo.name,
      category: productLevelInfo.category,
      price: productStyles.results[0].original_price,
      image: primaryPhoto
    }

    await setRelatedProductInfo(relatedInfo)
  }

  useEffect(() => {
    getRelatedInfo();
  }, [])

  useEffect(() => {
    getRelatedInfo();
  }, [item])

  let onHover = () => {
    setHoverStatus(true);
  }
  let offHover = () => {
    setHoverStatus(false);
  }

  return (
    <RelatedItemsCard>
      <button>Star</button>
      <PrimaryImage src={relatedProductInfo.image} onMouseEnter={onHover} onMouseLeave={offHover}></PrimaryImage>
      {hoverStatus ? <div>Thumbnail photos go here</div> : <div><div>{relatedProductInfo.category}</div>
      <div>{relatedProductInfo.name}</div>
      <div>{relatedProductInfo.price}</div>
      <div>Star rating goes here</div></div>}
      {/* <div>{relatedProductInfo.category}</div>
      <div>{relatedProductInfo.name}</div>
      <div>{relatedProductInfo.price}</div>
      <div>Star rating goes here</div> */}

    </RelatedItemsCard>
  )
}