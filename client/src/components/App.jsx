/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
// import ReactDOM from 'react-dom';
import Overview from './Overview/Overview.jsx';
import QandA from './QandA/QandA.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';

export const IDContext = React.createContext()

export default function App() {
  const [productID, setProductID] = useState(40349);

  // const [productID, setProductID] = useState(() => { return 40344; }); best practice but probably doesn't matter here
  // const [productStyles, setProductStyle] = useState([]); // might not need this here, because to get product styles, all you need is product_id
  //
  // pass setProductID as prop to related items
  const setID = (id) => {
    setProductID(id);
  }

  return (
    <IDContext.Provider value={productID}>
      <div>
        <h1>HELLO, WORLD!</h1>
        {/* <Overview setProductID={setProductID} productID={productID}/>
        <RelatedItems setID={setID} productID={productID}/>
        <QandA productID={productID}/> */}
        <RatingsAndReviews productID={productID}/>
      </div>
    </IDContext.Provider>
  )
}
