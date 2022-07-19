/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ComparisonModal from './ComparisonModal.jsx'
import ThumbnailList from './ThumbnailList.jsx'
import { IDContext } from '../App.jsx';
import { HiX } from 'react-icons/hi';


const PrimaryImage = styled.img`
display: flex;
// justify-content: center;
// align-items: center;
position: relative;
z-index: 1
top: 0;
left: 0;
height: 280px;
width: 245px;
object-fit: contain;
margin: 10px 5px 10px 5px;
max-width: 100%;
background-color: #f0ffff;
`

const PhotosContainer = styled.div`
position: relative;
display: flex;
align-items: flex-end;
justify-content: space-around;
`

const RemoveButton = styled(HiX)`
position: absolute;
top: 0;
right: 0;
height: 25px;
width: 25px;
`

const OutfitCardDiv = styled.div`
position: relative;
height: 400px;
width: 270px;
display: block;
align-items: center;
border: 1px solid lightgray;
box-shadow: 7px 7px 7px lightgray;
margin-right: 15px;
margin-left: 15px;
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
  // const [outfitProductInfo, setOutfitProductInfo] = useState({});
  // const [outfitStyleInfo, setOutfitStyleInfo] = useState({});
  const [relatedProductInfo, setRelatedProductInfo] = useState([]); // name, category, features, default price
  const [relatedStyleInfo, setRelatedStyleInfo] = useState([]); // sale price, photos
  const [thumbnailPhotos, setThumbnailPhotos] = useState([]);


  let productID = id;

  const getOutfitInfo = () => {
    if (styleCache[productID]) {
      setRelatedProductInfo(productCache[productID])
      setRelatedStyleInfo(styleCache[productID])
      console.log('cache: ', productCache[productID])
      setHasLoaded(true)
    } else {
      axios.get(`/products/${productID}`)
      .then((res) => {
      let outfitLevelInfo = {name: res.data.name, category: res.data.category}
      setRelatedProductInfo(outfitLevelInfo);
      addProductCache(productID, outfitLevelInfo);
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
        setThumbnailPhotos(res.data.results[0].photos)
      }
      let styleInfo = {default_price: res.data.results[0].original_price, sale_price: res.data.results[0].sale_price, image: primaryPhoto}
      setRelatedStyleInfo(styleInfo);
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

  // useEffect (() => {
  //   getOutfitInfo();
  // }, [])

  useEffect (() => {
    getOutfitInfo();
  }, [id])

  const showInfo = () => {
    console.log('product info: ', relatedProductInfo)
  }
  return (
    <div>
    {hasLoaded && <OutfitCardDiv>
              <PhotosContainer onMouseEnter={onHover} onMouseLeave={offHover}><PrimaryImage src={relatedStyleInfo.image} onClick={() => setID(id)}></PrimaryImage><RemoveButton onClick={() => removeFromList(id)}></RemoveButton>
              {hoverStatus ? <ThumbnailList id={id} setRelatedStyleInfo={setRelatedStyleInfo} thumbnailPhotos={thumbnailPhotos} relatedStyleInfo={relatedStyleInfo}/> : null}</PhotosContainer>
              <div onClick={() => setID(id)}><div>{relatedProductInfo.category}</div>
              <div >{relatedProductInfo.name}</div>
              {relatedStyleInfo.sale_price !== null ?
              <div><StrikePrice>{relatedStyleInfo.default_price}</StrikePrice><SalesPrice>{relatedStyleInfo.sale_price}</SalesPrice></div> : <div>{relatedStyleInfo.default_price}</div>}
              <div>Star rating goes here</div></div>
            </OutfitCardDiv>}
    </div>
  )
}


// const [outfitProductInfo, setOutfitProductInfo] = useState({name: 'Camo Onesite', category: 'Jackets'});
// const [outfitStyleInfo, setOutfitStyleInfo] = useState({default_price: '$140.00', sale_price: null, image: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'});