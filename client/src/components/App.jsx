<<<<<<< HEAD
import React from 'react';
// import ReactDOM from 'react-dom';
// import Overview from './Overview.jsx';
import QandA from './QandA/QandA.jsx';
// import RatingsAndReviews from './RatingsAndReviews.jsx';
// import RelatedItems from './RelatedItems.jsx';
=======
import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import Overview from './Overview/Overview.jsx';
// import QandA from './QandA/QandA.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
// import RelatedItems from './RelatedItems/RelatedItems.jsx';
>>>>>>> main

export default function App() {
  const [productID, setProductID] = useState(40344);

<<<<<<< HEAD
    }
  }
  render () {
    return (
      <div>
        <h1>FEC</h1>
        {/* <Overview/> */}
        <QandA />
        {/* <RatingsAndReviews/> */}
        {/* <RelatedItems/> */}
      </div>
    )
  }
=======
  // const [productID, setProductID] = useState(() => { return 40344; }); best practice but probably doesn't matter here
  // const [productStyles, setProductStyle] = useState([]); // might not need this here, because to get product styles, all you need is product_id
  //
  // pass setProductID as prop to related items
  return (
    <div>
      <h1>HELLO, WORLD!</h1>
      <Overview setProductID={setProductID} productID={productID}/>
      {/* <QandA productID={productID}/> */}
      <RatingsAndReviews productID={productID}/>
      {/* <RelatedItems handleRelatedItemClick={setProductID} productID={productID}/> */}
    </div>
  )
>>>>>>> main
}
