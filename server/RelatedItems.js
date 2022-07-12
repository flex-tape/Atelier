const axios = require('axios');
const config = require('../config.js')

exports.getRelated = (req, res) => {
  console.log('req.query: ', req.query);
  let product_id = req.query.product_id
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product_id}/related`;
  let options = {
    headers: {
      'Authorization': config.TOKEN
    }
  }
  axios.get(url, options)
  .then((response) => {
    console.log('related response: ', response)
    res.status(200).send(response.data)
  })
  .catch((err) => {
    res.status(400).send(err);
  })
}