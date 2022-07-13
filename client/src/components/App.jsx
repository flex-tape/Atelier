import React from 'react';
// import ReactDOM from 'react-dom';
// import Overview from './Overview.jsx';
import QandA from './QandA/QandA.jsx';
// import RatingsAndReviews from './RatingsAndReviews.jsx';
// import RelatedItems from './RelatedItems.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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
}

export default App;