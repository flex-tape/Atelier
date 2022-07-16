/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ComparisonModal from './ComparisonModal.jsx'
import { IDContext } from '../App.jsx';



const PrimaryImage = styled.img`
// display: flex;
// justify-content: center;
// align-items: center;
// position: absolute;
height: 280px;
width: 250px;
object-fit: contain;
margin: 10px;
background-color: #f0ffff;
`

const RemoveButton = styled.button`
position: absolute;
z-index: 3;
left: 400px;
top: 200px;
`

const OutfitCardDiv = styled.div`
position: relative;
height: 400px;
width: 270px;
display: block;
align-items: center;
border: 1px solid lightgray;
box-shadow: 7px 7px 7px lightgray;
margin-right: 50px;
margin-bottom: 30px;
`

const StrikePrice = styled.div`
text-decoration: line-through;
text-decoration-thickness: 0.15rem;
`

const SalesPrice = styled.div`
color: red;
`

export default function OutfitCard({id, setID, removeFromList, addProductCache, addStyleCache, productCache, styleCache}) {
  const [hoverStatus, setHoverStatus] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [outfitProductInfo, setOutfitProductInfo] = useState({});
  const [outfitStyleInfo, setOutfitStyleInfo] = useState({});


  let productID = id;

  const getOutfitInfo = () => {
    if (styleCache[productID]) {
      setOutfitProductInfo(productCache[productID])
      setOutfitStyleInfo(styleCache[productID])
      console.log('got from cache!!')
    } else {
      axios.get(`/products/${productID}`)
      .then((res) => {
      let outfitLevelInfo = {name: res.data.name, category: res.data.category}
      setOutfitProductInfo(outfitLevelInfo);
      addProductCache(productID, outfitLevelInfo);
      console.log('is this adding??')
      })
      .catch(() => {
        console.log('GET request failed for outfitInfo')
      })
    axios.get(`/products/${productID}/styles`)
      .then((res) => {
      let primaryPhoto = '';
      if (res.data.results[0].photos[0].url === null) {
        primaryPhoto = 'https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80';
      } else {
        primaryPhoto = res.data.results[0].photos[0].url;
      }
      let styleInfo = {default_price: res.data.results[0].original_price, sale_price: res.data.results[0].sale_price, image: primaryPhoto}
      setOutfitStyleInfo(styleInfo);
      addStyleCache(productID, styleInfo);
      })
      .then(() => {
        setHasLoaded(true)
      })
      .catch((err) => {
        console.log('GET request failed for outfitStyles')
      })
    }
  }

  let onHover = () => {
    setHoverStatus(true);
  }
  let offHover = () => {
    setHoverStatus(false);
  }

  useEffect (() => {
    getOutfitInfo();
  }, [])

  useEffect (() => {
    getOutfitInfo();
  }, [id])

  return (
    <div>
    {hasLoaded && <OutfitCardDiv>
              <button onClick={() => removeFromList(id)}>REMOVE</button>
              <PrimaryImage src={outfitStyleInfo.image} onMouseEnter={onHover} onMouseLeave={offHover} onClick={() => setID(id)}></PrimaryImage>
              {hoverStatus ? <div>Thumbnail photos go here</div> : <div onClick={() => setID(id)}><div>{outfitProductInfo.category}</div>
              <div >{outfitProductInfo.name}</div>
              {outfitStyleInfo.sale_price !== null ?
              <div><StrikePrice>{outfitStyleInfo.default_price}</StrikePrice><SalesPrice>{outfitStyleInfo.sale_price}</SalesPrice></div> : <div>{outfitStyleInfo.default_price}</div>}
              <div>Star rating goes here</div></div>}
              <div>{id}</div>
            </OutfitCardDiv>}
    </div>
  )
}


// const [outfitProductInfo, setOutfitProductInfo] = useState({name: 'Camo Onesite', category: 'Jackets'});
// const [outfitStyleInfo, setOutfitStyleInfo] = useState({default_price: '$140.00', sale_price: null, image: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'});