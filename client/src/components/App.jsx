// import React from 'react';
// import ReactDOM from 'react-dom';
import Overview from './Overview.jsx';
import QandA from './QandA.jsx';
import RatingsAndReviews from './RatingsAndReviews.jsx';
import RelatedItems from './RelatedItems.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    //bindings
  }
  render () {
    return (
      <div>
        <h1>HELLO, WORLD!</h1>
        <Overview/>
        <QandA/>
        <RatingsAndReviews/>
        <RelatedItems/>
      </div>
    )
  }
}

export default App;