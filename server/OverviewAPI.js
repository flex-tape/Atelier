const axios = require('axios');
const config = require('../config.js')

let options = {
  headers: {
    // 'User-Agent': 'FEC',
    'Authorization': config.TOKEN
  }
}

exports.listProducts = (req, res) => {
  console.log('this is req.query: ', req.query)
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products`;
  if (req.query.product_id === undefined) {
    axios.get(url, options)
      .then((response) => {
        console.log('getall', response.data);
        res.status(200).send(response.data)
      })
      .catch((err) => {
        res.status(400).send(err);
      })
  } else {
    url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${req.query.product_id}`;
    //`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/101`
    //`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/$(req.query.product_id)`;
    console.log('this is url:', url)
    axios.get(url, options)
    .then((response) => {
      console.log('getOne', response.data);
      res.status(200).send(response.data)
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  }
}

exports.productInfo = (req, res) => {
  console.log('info req', req)
  // /products/id/product_id
  // /products/asda231a

  // req.params = :id
  let product_id = `${req.params.product_id}`; // req.body should be req.query or req.params
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product_id}`
  let options = {
    headers: {
      'Authorization': config.TOKEN
    }
  }
  axios.get(url, options)
  .then((response) => {
    // console.log('resp', response)
    res.status(200).send(response)
  })
  .catch((err) => {
    console.log('err', err);
    res.status(400).send(err);
  })
}

exports.productStyles = (req, res) => {
  let product_id = req.params.product_id; // req.body.data should be req.query?? not 100% sure
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/:${product_id}/styles`
  axios.get(url, options)
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((err) => {
      res.status(400).send(err);
    })
}

// exports.relatedProduct = (req, res) => {
//   let product_id = req.body.data.id
//   let url = `https://app-hrsei-api.herokuapp.com/api/fec2/:hr-rfp/products/:${product_id}/related`
//   let options = {
//     headers: {
//       'Authorization': config.TOKEN
//     }
//   }
//   axios.get(url, options)
//   .then((response) => {
//     res.status(200).send(response)
//   })
//   .catch((err) => {
//     res.status(400).send(err);
//   })
// }

