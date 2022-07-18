import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import Overview from './Overview.jsx';
import QandA from './QandA/QandA.jsx';
// import RatingsAndReviews from './RatingsAndReviews.jsx';
// import RelatedItems from './RelatedItems.jsx';

export default function App() {
  const [productID, setProductID] = useState(40344);

  return (
    <div>
      <h1>FEC</h1>
      {/* <Overview/> */}
      <QandA productID={productID}/>
      {/* <RatingsAndReviews/> */}
      {/* <RelatedItems/> */}
    </div>
  )
}

