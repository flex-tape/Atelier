/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import Overview from './Overview/Overview.jsx';
import QandA from './QandA/QandA.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';
import styled from 'styled-components';
import getReviewAvg from '../lib/getReviewAvg.js'
const axios = require('axios');
export const IDContext = React.createContext()


const Container = styled.div`
  font-family: Arial, sans-serif;
`
const Logo = styled.h1`
  // margin-left: 200px;
`

export default function App() {

  const [productID, setProductID] = useState(40344);
  const [styleID, setStyleID] = useState(240500);
  const [reviewAvg, setReviewAvg] = useState(0);
  // const [reviewMetadata, setReviewMetadata] = useState({});
  const [pageLoaded, setPageLoaded] = useState(false);

  // const [productID, setProductID] = useState(() => { return 40344; }); best practice but probably doesn't matter here
  // const [productStyles, setProductStyle] = useState([]); // might not need this here, because to get product styles, all you need is product_id
  //
  // pass setProductID as prop to related items

  useEffect(() => {
    axios.get(`/products/${productID}/styles`)
      .then((response) => {
        setStyleID(response.data.results[0].style_id);
      })
      .catch((err) => {
        console.error(err)
      })

    axios.get('/reviews/meta', { params: { product_id: productID } })
      .then((response) => {
        setReviewAvg(getReviewAvg(response.data.ratings));
      })

    setPageLoaded(true);

  }, [productID])

  // useEffect(() => {
  //   axios.get('/reviews/meta', { params: { product_id: productID } })
  //     .then( (response) => {
  //       setReviewAvg(getReviewAvg(response.data.ratings));
  //     })
  // }, [productID])

  // const loadMainPage = async () => {
  //   let res1 = await axios.get(`/products/${productID}/styles`)

  //   setStyleID(res1.data.results[0].style_id);

  //   let res2 = await axios.get('/reviews/meta', { params: { product_id: productID } })
  //   console.log(res2)
  //   setReviewAvg(getReviewAvg(res2.data.ratings));
  // }

  const setID = (id) => {
    setProductID(id);
  }

  return (

    <IDContext.Provider value={productID}>
      {pageLoaded &&
        <Container id="master-container">
          {reviewAvg}
          <Logo>ATELIER</Logo>
          {/* <Overview styleID={styleID} setStyleID={setStyleID} setProductID={setProductID} productID={productID} />
          <RelatedItems setID={setID} productID={productID} />
          <QandA productID={productID} /> */}
          <RatingsAndReviews productID={productID}/>
        </Container>
      }
    </IDContext.Provider>
  )
}
