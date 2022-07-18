const axios = require('axios');
const config = require('../config.js');

let options = {
  headers: {
    'Authorization': config.TOKEN
  }
}

exports.listReviews = (req, res) => {
  console.log(req.query)
  let listReviewOptions = {
    ...options,
    params: {
      product_id: req.query.product_id,
      page: req.query.page,
      count: req.query.count,
      sort: req.query.sort
    }
  }
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews`;
  axios.get(url, listReviewOptions)
    .then((result) => res.status(200).send(result.data))
    .catch((e) => res.status(400).send(e))
}

exports.getReviewMetadata = (req, res) => {
  let getReviewMetaOptions = {
    ...options,
    params: {
      product_id: req.query.product_id
    }
  }
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta`;
  axios.get(url, getReviewMetaOptions)
    .then((result) =>  res.status(200).send(result.data))
    .catch((e) => res.status(400).send(e))
}

exports.addReview = (req, res) => {
  console.log(req.body)
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/`;
  axios.post(url, req.body, options)
    .then((result) => res.status(201).send(result.data))
    .catch((e) => res.status(400).send(e))
}

exports.markAsHelpful = (req, res) => {
  // 1274559
  // console.log('REQUEST IS...', req)
  // console.log('REQUEST PARAMS IS...', req.params)
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${req.params.review_id}/helpful`;
  axios.put(url, req.params, options)
    .then((result) => res.status(204).send(result.data))
    .catch((e) => res.status(404).send(e))
}

exports.reportReview = (req, res) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${req.params.review_id}/report`
  axios.put(url, req.params, options)
    .then((result) => res.status(204).send(result.data))
    .catch((e) => res.status(404).send(e))
}