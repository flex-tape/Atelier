const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
// import api files
const overview = require('./OverviewAPI.js');
const qa = require('./QuestionsAndAnswersAPI.js');

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

// TODO: Define routes

//OVERVIEW - KEVIN
// app.get('/product', (req, res) => {
//   overview.listProducts(req.params/req.query)
//   res.send

// })

// PRODUCTS

app.get('/products', overview.listProducts)
app.get('/products/styles', overview.productStyles)

// REVIEWS


// QUESTIONS & ANSWERS
app.get('/qa/questions', qa.getQuestions);
app.get('/qa/questions/:question_id/answers', qa.getAnswers);
app.put('/qa/questions/:question_id/helpful', qa.markHelpful);


// CART

// RELATED ITEMS
// app.get('/product', overview.relatedProducts)


// INTERACTIONS

app.listen(port);
console.log(`Server listening at http://localhost:${port}`);