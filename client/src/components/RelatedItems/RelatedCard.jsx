/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ComparisonModal from './ComparisonModal.jsx'

export const CompareContext = React.createContext()

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
border: 1px solid lightgray;
box-shadow: 7px 7px 7px lightgray;
margin-right: 50px;
margin-bottom: 30px;
`

const CompareButton = styled.button`
position: absolute;
z-index: 3;
left: 400px;
top: 200px;
`


export default function RelatedCard({item, setID}) {
  const [relatedProductInfo, setRelatedProductInfo] = useState([]);
  const [hoverStatus, setHoverStatus] = useState(false);
  const [compareProducts, setCompareProducts] = useState(false);

  const getRelatedInfo = async () => {
    let productLevelInfo = await axios.get(`/products/${item}`)
      .then((res) => {
      // console.log('product level info: ', res.data);
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

  let setCompareOn = () => {
    setCompareProducts(true)
  }

  let setCompareOff = () => {
    setCompareProducts(false)
  }

  return (
    <CompareContext.Provider value={compareProducts}>
      <div>
      {compareProducts ? <div><ComparisonModal item={item}/><CompareButton onClick={setCompareOff}>EXIT</CompareButton></div> : null}
      <RelatedItemsCard>
        <button onClick={setCompareOn}>Star</button>
        <PrimaryImage src={relatedProductInfo.image} onMouseEnter={onHover} onMouseLeave={offHover} onClick={() => setID(item)}></PrimaryImage>
        {hoverStatus ? <div>Thumbnail photos go here</div> : <div onClick={() => setID(item)}><div>{relatedProductInfo.category}</div>
        <div >{relatedProductInfo.name}</div>
        <div>{relatedProductInfo.price}</div>
        <div>Star rating goes here</div></div>}
        {/* <div>{relatedProductInfo.category}</div>
        <div>{relatedProductInfo.name}</div>
        <div>{relatedProductInfo.price}</div>
        <div>Star rating goes here</div> */}
      </RelatedItemsCard>
    </div>
    </CompareContext.Provider>
  )
}