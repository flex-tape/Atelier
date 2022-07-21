export default function calculateReviewAvg (ratingsObj) {
  // Usage: function recieves a ratings object and returns an object with two items: the first is a string of the average rating to a single decimal (e.g. 3.125 -> "3.1") and the second is an array in which the first element represents the whole star count and the second represents the fractional star count

  // example ratingsObj: {
  //     "1": "77",
  //     "2": "74",
  //     "3": "182",
  //     "4": "157",
  //     "5": "351"
  // }

  let counter = 0;
  let sum = 0;

  for (let key in ratingsObj) {
    if (Object.hasOwn(ratingsObj, key)) {
      sum += parseInt(ratingsObj[key]) * parseInt(key)
      counter += parseInt(ratingsObj[key])
    }
  }

  let roundedAvg = (sum / counter).toFixed(2);
  return roundedAvg;
}

  // // will take the avg sum / counter, which can be up to 3 decimals (i.e. 3.125)
  // // and round to 2 decimals (i.e. 3.13) stored as a string
  // let numArray = roundedAvg.split('.');
  // // this rounded average will be evaluated by splitting the string representing an integer and a decimal (3.13 -> ["3", "13"])
  // let starWholeNumber = parseInt(numArray[0]); // 3
  // let starDecimal;

  // let parsedDecimal = numArray[1]; // "13"

  // if (parsedDecimal >= 0 && parsedDecimal <= 13) {
  //   starDecimal = 0;
  // } else if (parsedDecimal >= 13 && parsedDecimal <= 38) {
  //   starDecimal = .25;
  // } else if (parsedDecimal >= 38 && parsedDecimal <= 63) {
  //   starDecimal = 0.5;
  // } else if (parsedDecimal >= 63 && parsedDecimal <= 88) {
  //   starDecimal = 0.75;
  // } else if (parsedDecimal >= 88 && parsedDecimal <= 100) {
  //   starDecimal = 1;
  // }
  // let obj = {
  //   ratingSummary: (sum / counter).toFixed(1), // e.g. "3.1"
  //   starSummary: [starWholeNumber, starDecimal] // e.g. [3, 0]
  // }

  // const partialStar = (value) => {

  // }

  // let starPercentage = 20 * (starWholeNumber + starDecimal)

  // return obj;
  // result can be used as an argument to another function that renders the star elements, or it can also be a part of this function