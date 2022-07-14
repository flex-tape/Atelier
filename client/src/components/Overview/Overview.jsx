import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StyleList from './StyleList.jsx';
import ImageGallery from './ImageGallery.jsx';
const axios = require('axios');

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%,
  width: 100%
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
`
// align-self: flex-end;

const SubContainer2 = styled.div`
  flex: 2 200px;
  display: flex;
  flex-direction: column;
  min-width: 500px;
  max-width: 500px;
`
const Image = styled.div`
  flex: 1 200px;
  border: 1px dotted;
  margin: 5px;
`
const Product = styled.div`
  flex: 1 200px;
  border: 1px dotted;
  margin: 5px;
  padding-left: 10px;
`
const Selector = styled.div`
  flex: 1 200px;
  border: 1px dotted;
  margin: 5px;
`
const AddtoCart = styled.div`
  flex: 1 200px;
  border: 1px dotted;
  margin: 5px;
`

export default function Overview (props) {
  // props.productID

  // const [productID, setProductID] = useState(props.productID);
  const [productInfo, setProductInfo] = useState({});
  const [styleID, setStyleID] = useState(240500);
  const [styleInfo, setStyleInfo] = useState([]);
  const [productStyle, setProductStyle] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  // const [cart, setCart] = useState({});


  useEffect(() => {
    axios.get(`/products/${props.productID}`)
    .then((response) => {
      setProductInfo(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
    axios.get(`/products/${props.productID}/styles`)
      .then((response) => {
        setStyleID(response.data.results[0].style_id);
        setStyleInfo(response.data.results);
        const index = response.data.results.map((style) => (style.style_id)).indexOf(styleID);
        console.log('index', index)
        setProductStyle({
          ...productStyle,
          ...response.data.results[index]})
      })
      .then(() => {
        setHasLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      })
    // getProductAndStyleInfo();
  }, [])

  return (
    <Container>
      <SubContainer1>
        <Image>
          BIG OLE IMAGE
          <ImageGallery hasLoaded={hasLoaded} productStyle={productStyle}/>
        </Image>
        <SubContainer2>
          <Product>
            <h1>{productInfo.name}</h1>
            <div>{productInfo.category}</div>
            {productStyle.sale_price === null ? <div>{productStyle.original_price}</div> : <div><s>{productStyle.original_price}</s></div>}
            <div>{productStyle.sale_price}</div>
            <div>{productStyle.name}</div>
          </Product>
          <Selector>
            <StyleList setStyleID={setStyleID} setProductStyle={setProductStyle} styleID={styleID} styleInfo={styleInfo}/>
          </Selector>
          <AddtoCart>
            Add to Cart
          </AddtoCart>
        </SubContainer2>
      </SubContainer1>
      <Description>
        <h4>{productInfo.slogan}</h4>
        <div>{productInfo.description}</div>
      </Description>
    </Container>
  )
}

  // const changeID = () => {
  //   props.setProductID(65656);
  // }

