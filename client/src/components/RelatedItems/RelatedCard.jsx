/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PrimaryImage = styled.img`
height: 350px;
width: 350px;
object-fit: contain;
`

const RelatedItemsList = styled.div`
display: inline-block;
`

export default function RelatedCard({item}) {
  const [relatedProductInfo, setRelatedProductInfo] = useState([]);

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


  return (
    <RelatedItemsList>
      <PrimaryImage src={relatedProductInfo.image}></PrimaryImage>
      <div>{relatedProductInfo.category}</div>
      <div>{relatedProductInfo.name}</div>
      <div>{relatedProductInfo.price}</div>
    </RelatedItemsList>
  )
}