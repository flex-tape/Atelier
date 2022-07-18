const calculateReviewAvg = (ratingsObj) => {
  // Usage: function recieves a ratings object and returns a number consisting of 0-4 whole stars and a decimal ranging from 0-1 in 0.25 steps. Examples: 1.25, 2.50, 4

  // example ratingsObj: {
  //     "1": "77",
  //     "2": "74",
  //     "3": "182",
  //     "4": "157",
  //     "5": "351"
  // }

  let counter = 0;
  let sum = 0;
  let result = 0;

  for (let key in ratingsObj) {
    if (Object.hasOwn(ratingsObj, key)) {
      sum += parseInt(ratingsObj[key]) * parseInt(key)
      counter += parseInt(ratingsObj[key])
    }
  }

  let roundedAvg = (sum / counter).toFixed(2);
  // will take the avg sum / counter, which can be up to 3 decimals (i.e. 3.125)
  // and round to 2 decimals (i.e. 3.13) stored as a string
  let numArray = roundedAvg.split('.');
  // this rounded average will be evaluated by splitting the string representing an integer and a decimal (3.13 -> ["3", "13"])
  let wholeStarCount = numArray[0]; // "3"

  result += parseInt(wholeStarCount);
  // converts string whole number to integer for addition operations in the next part

  let parsedDecimal = parseInt(numArray[1]); // "13" -> 13

  if (parsedDecimal >= 0 && parsedDecimal <= 13) {
    result += 0;
  } else if (parsedDecimal >= 13 && parsedDecimal <= 38) {
    result += 0.25;
  } else if (parsedDecimal >= 38 && parsedDecimal <= 63) {
    result += 0.5;
  } else if (parsedDecimal >= 63 && parsedDecimal <= 88) {
    result += 0.75;
  } else if (parsedDecimal >= 88 && parsedDecimal <= 100) {
    result += 1;
  }
  return result;
  // result can be used as an argument to another function that renders the star elements, or it can also be a part of this function
}