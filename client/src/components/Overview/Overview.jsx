import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StyleList from './StyleList.jsx';
import ImageGallery from './ImageGallery.jsx';
import ExpandedModal from './ExpandedModal.jsx';
import StyleCart from './StyleCart.jsx';
const axios = require('axios');

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

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
  flex: 1 100px;
  border: 1px dotted;
  margin: 5px;

  p {
    opacity: 70%;
  }
`
const SubContainer2 = styled.div`
  flex: 2 200px;
  display: flex;
  flex-direction: column;
  min-width: 500px;
  max-width: 500px;
`
const Image = styled.div`
  display: flex;
  justify-content: center;
  flex: 3 200px;
  border: 1px dotted;
  margin: 5px;
`
const Product = styled.div`
  flex: 1 200px;
  border: 1px dotted;
  margin: 5px;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-transform: uppercase;
`
const Selector = styled.div`
  flex: 1 200px;
  border: 1px dotted;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-transform: uppercase;

`

export default function Overview (props) {
  const [productInfo, setProductInfo] = useState({});
  const [styleInfo, setStyleInfo] = useState([]);
  const [productStyle, setProductStyle] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cart, setCart] = useState([]);
  // const [productID, setProductID] = useState(props.productID);
  // const [styleID, setStyleID] = useState(240500);
  //240500//240510

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
            <Image>
                <ImageGallery setShowModal={setShowModal} hasLoaded={hasLoaded} productStyle={productStyle} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
            </Image>
            <SubContainer2>
              <Product>
                <div>
                  <div>{productInfo.category}</div>
                  <h1>{productInfo.name}</h1>
                </div>
                {productStyle.sale_price === null ? <div>${productStyle.original_price}</div> : <div><s>${productStyle.original_price}</s></div>}
                {productStyle.sale_price === null ? null : <div>${productStyle.sale_price}</div>}
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

