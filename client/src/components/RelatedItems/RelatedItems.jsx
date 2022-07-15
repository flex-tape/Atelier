/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { IDContext } from '../App.jsx';
import axios from 'axios';
import RelatedCard from './RelatedCard.jsx'
import RelatedListCarousel from './RelatedListCarousel.jsx'
import styled from 'styled-components';

export const RelatedContext = React.createContext()

const RelatedCarousel = styled.div`
display: flex;
max-width: 1300px;
overflow: scroll;
`

export default function RelatedItems({ setID }) {
  // will need product ID of current product
  // grab related products of current produt
  // related products for 40344: 40345, 40346, 40351, 40350
  const [relatedItems, setRelatedItems] = useState([40345, 40346, 40351, 40350]);
  const [currentFeatures, setCurrentFeatures] = useState([{feature: 'Fabric', value: 'Canvas'}, {feature: 'Buttons', value: 'Brass'}])

  let productID = useContext(IDContext)

  const getRelatedItems = () => {
    axios.get('/productsrelated', {params: {product_id: productID}})
    .then((res) => {
      // console.log('new response: ', res)
      setRelatedItems(res.data);
    })
  }

  const getCurrentFeatures = () => {
    axios.get(`/products/${productID}`)
      .then((res) => {
      setCurrentFeatures(res.data.features);
    })
    .catch(() => {
      console.log('GET request failed for getCurrentFeatures')
    })
  }

  // run getRelatedItems whenever selected productID changes
  useEffect(() => {
    getRelatedItems();
    getCurrentFeatures();
  }, [productID]);


  return (
    <RelatedContext.Provider value={relatedItems}>
    <div>
      <div>
        <h3>Related Products</h3>
          {/* <RelatedCarousel>
            {relatedItems.map((item, index) => (
              <RelatedCard item={item} key={index}/>
            ))}
          </RelatedCarousel> */}
          <RelatedListCarousel setID={setID} currentFeatures={currentFeatures}/>
        <button onClick={getRelatedItems}>Get Related</button>

      </div>
      <div>
        <h3>Your Outfit</h3>


      </div>
    </div>
    </RelatedContext.Provider>
  )
}