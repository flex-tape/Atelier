const axios = require('axios');
const config = require('../config.js')

const options = {
  headers: {
    'Authorization': config.TOKEN
  }
}

exports.getQuestions = (req, res) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions`;
  let questionOptions = {
    headers: {
      'Authorization': config.TOKEN
    },
    params: {
      product_id: req.query.product_id
    }
  }
  axios.get(url, questionOptions)
    .then((response) => { res.status(200).send(response.data) })
    .catch((err) => { console.log(err); res.status(400).send(err); });
}

exports.getAnswers = (req, res) => {
  //640785
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.params.question_id}/answers`;
  axios.get(url, options)
    .then((response) => {res.status(201).send(response.data)})
    .catch((err) => { console.log(err); res.status(400).send(err); });
}

exports.markHelpful = (req, res) => {
  let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${req.params.question_id}/helpful`;
  axios.put(url, req.params, options)
    .then(() => { res.status(204).send('successfully marked helpful'); })
    .catch((err) => { res.status(400).send(err); });
}