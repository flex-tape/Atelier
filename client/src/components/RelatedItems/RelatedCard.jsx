/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RelatedCard({item}) {
  const [relatedProductInfo, setRelatedProductInfo] = useState([]);

  let productInfo =  axios.get(`/products/${item}`)
  .then((res) => {
    console.log('product level info: ', res.data);
    return res.data;
  })

  let productStyles = axios.get(`/products/${item}/styles`)
  .then((res) => {
    console.log('product styles: ', res.data);
    return res.data;
  })

  return (
    <div>
      <p>{item}</p>
    </div>
  )
}