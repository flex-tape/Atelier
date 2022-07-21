
export default function getReviewAvg(ratingsObj) {
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