const axios = require('axios');
const config = require('../config.js')

exports.listReviews = (req, res) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/:hr-rfp/reviews`;
  let options = {
    headers: {
      // 'User-Agent': 'FEC',
      'Authorization': config.TOKEN
    }
  }
  axios.get(url, options)
  .then((response) => {
    res.status(200).send(response) // should probably send response.data instead of whole response body
  })
  .catch((err) => {
    res.status(400).send(err);
  })
}

exports.productInfo = (req, res) => {
  let product_id = req.body.data.id // req.body should be req.query or req.params
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/:hr-rfp/products/:${product_id}`
  let options = {
    headers: {
      'Authorization': config.TOKEN
    }
  }
  axios.get(url, options)
  .then((response) => {
    res.status(200).send(response)
  })
  .catch((err) => {
    res.status(400).send(err);
  })
}

exports.productStyles = (req, res) => {
  let product_id = req.body.data.id // req.body.data should be req.query?? not 100% sure
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/:hr-rfp/products/:${product_id}/styles`
  let options = {
    headers: {
      'Authorization': config.TOKEN
    }
  }
  axios.get(url, options)
  .then((response) => {
    res.status(200).send(response)
  })
  .catch((err) => {
    res.status(400).send(err);
  })
}

exports.relatedProduct = (req, res) => {
  let product_id = req.body.data.id
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/:hr-rfp/products/:${product_id}/related`
  let options = {
    headers: {
      'Authorization': config.TOKEN
    }
  }
  axios.get(url, options)
  .then((response) => {
    res.status(200).send(response)
  })
  .catch((err) => {
    res.status(400).send(err);
  })
}

