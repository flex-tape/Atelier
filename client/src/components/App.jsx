import React from 'react';
// import ReactDOM from 'react-dom';
// import Overview from './Overview.jsx';
// import QandA from './QandA.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
// import RelatedItems from './RelatedItems.jsx';

<<<<<<< Updated upstream
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
=======
export default function App() {
  const [productID, setProductID] = useState(40345);
  // const [productID, setProductID] = useState(() => { return 40344; }); best practice but probably doesn't matter here
  // const [productStyles, setProductStyle] = useState([]); // might not need this here, because to get product styles, all you need is product_id
  //
  // pass setProductID as prop to related items
>>>>>>> Stashed changes

    }
    //bindings
  }
  render () {
    return (
      <div>
        <h1>HELLO, WORLD!</h1>
        {/* <Overview/> */}
        {/* <QandA/> */}
        <RatingsAndReviews/>
        {/* <RelatedItems/> */}
      </div>
    )
  }
}

export default App;