import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StyleList from './StyleList.jsx';
import ImageGallery from './ImageGallery.jsx';
import ExpandedModal from './ExpandedModal.jsx';
import StyleCart from './StyleCart.jsx';
import { FaFacebookF, FaPinterestP } from 'react-icons/fa';
import { FiTwitter } from 'react-icons/fi';
const axios = require('axios');

const Container = styled.div`
  border: 2px solid lightgray;
  box-shadow: 7px 7px 7px lightgray;
  // margin-right: 200px;
  // margin-left: 200px;
  display: flex;
  flex-direction: column;

  h4 {
    text-transform: uppercase;
  }
`
const SubContainer1 = styled.div`
  flex: 2 200px;
  display: flex;
  flex-direction: row;
`
const Description = styled.div`
  border-top: 2px solid lightgray;
  margin-left: 10px;
  flex: 1 100px;

  p {
    opacity: 70%;
  }
`
const SubContainer2 = styled.div`
  border-left: 2px solid lightgray;
  flex: 2 200px;
  display: flex;
  flex-direction: column;
  min-width: 500px;
  max-width: 500px;
`
const Product = styled.div`
  flex: 1 200px;
  margin-top: 25px;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  text-transform: uppercase;
`
const Socials = styled.div`
  a {
      padding: 12px 15px;
      box-sizing: border-box;
      border: 1px solid black;
      margin-right: 12px;
      background: none;
      font-weight: bold;
      font-size: 14px;
    }
`
const Selector = styled.div`
  flex: 1 200px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-transform: uppercase;
`
const Reviews = styled.div`
  font-size: 11px;
  cursor: pointer;
`
const ProductName = styled.div`
  font-size: 32px;
  font-weight: bold;
`
const InvSale = styled.div`
  visibility: hidden;
`

export default function Overview (props) {
  const [productInfo, setProductInfo] = useState({});
  const [styleInfo, setStyleInfo] = useState([]);
  const [productStyle, setProductStyle] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get(`/products/${props.productID}`)
    .then((response) => {
      setProductInfo(response.data);
    })
    .catch((err) => {
    })
    axios.get(`/products/${props.productID}/styles`)
    .then((response) => {
      setStyleInfo(response.data.results);
      const index = response.data.results.map((style) => (style.style_id)).indexOf(props.styleID);
      setProductStyle({
        ...productStyle,
        ...response.data.results[index]})
    })
    .then(() => {
      setHasLoaded(true);
    })
    .catch((err) => {
    })
    axios.get('/reviews/meta', {params: { product_id: props.productID }})
    .then((response) => {
      return response.data.ratings;
    })
    .then((reviewObj) => {
      var count = 0;
      for (var key in reviewObj) {
        count += parseInt(reviewObj[key]);
      }
      setReviews(count);
    })
    axios.get('/cart')
    .then((response) => {
      setCart(response.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [props.productID, props.styleID])


  return (
    <>
      {hasLoaded && <Container>
        {showModal && <ExpandedModal setShowModal={setShowModal} hasLoaded={hasLoaded} productStyle={productStyle} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>}
          <SubContainer1>
            <ImageGallery setShowModal={setShowModal} hasLoaded={hasLoaded} productStyle={productStyle} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
            <SubContainer2>
              <Product ref={props.reference}>
                <Reviews onClick={props.click}><u>Read all {reviews} reviews</u></Reviews>
                <div>
                  <div>{productInfo.category}</div>
                  <ProductName>{productInfo.name}</ProductName>
                </div>
                <div>
                  {productStyle.sale_price === null ? <div>${productStyle.original_price}</div> : <div><s>${productStyle.original_price}</s></div>}
                  {productStyle.sale_price === null ? <InvSale>${productStyle.original_price}</InvSale> : <div>${productStyle.sale_price}</div>}
                </div>
                <Socials>
                  <a href="http://www.facebook.com/share.php?u=https://www2.hm.com/en_us/index.html" target="_blank" rel="noopener noreferrer"><FaFacebookF/> FACEBOOK</a>
                  <a href="https://twitter.com/intent/tweet" target="_blank" rel="noopener noreferrer"><FiTwitter/> TWITTER</a>
                  <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer"><FaPinterestP/> PINTEREST</a>
                </Socials>
              </Product>
              <Selector>
              <StyleList styleName={productStyle.name} setStyleID={props.setStyleID} setProductStyle={setProductStyle} styleID={props.styleID} styleInfo={styleInfo}/>
              </Selector>
              <StyleCart styleID={props.styleID} cart={cart} setCart={setCart} productStyle={productStyle}/>
            </SubContainer2>
          </SubContainer1>
          <Description>
            <h4>{productInfo.slogan}</h4>
            <p>{productInfo.description}</p>
          </Description>
      </Container>}
    </>
  )
}

