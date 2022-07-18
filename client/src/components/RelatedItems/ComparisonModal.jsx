/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
// import { CompareContext } from './RelatedCard.jsx';
import { IDContext } from '../App.jsx';
import { HiX } from 'react-icons/hi';

const CompareTable = styled.table`
  position: absolute;
  z-index: 2;
  left: 600px;
  top: 200px;
  width: 500px;
  height: 500px;
  overflow: auto;
  background-color: #f0ffff;
  border: 1px solid lightgray;
  box-shadow: 7px 7px 7px lightgray;
`
const CompareDiv = styled.div`
  left: 400px;
  top: 200px;
  width: 550px;
  height: 550px;
`

const RemoveButton = styled(HiX)`
float: right;
height: 25px;
width: 25px;
`
export default function ComparisonModal ({id, relatedFeatures, currentFeatures, toggleCompare}) {
  const [allFeatures, setAllFeatures] = useState([]);
  const [featureValue, setFeatureValue] = useState('');
  const [relatedStatus, setRelatedStatus] = useState({});
  const [currentStatus, setCurrentStatus] = useState({});

  let featuresObj = {};
  let currentFeaturesObj = {};
  let relatedFeaturesObj = {};
  for (var i = 0; i < relatedFeatures.length; i++) {
    featuresObj[relatedFeatures[i].feature] = true;
    relatedFeaturesObj[relatedFeatures[i].feature] = [relatedFeatures[i].value]
  }
  for (var i = 0; i < currentFeatures.length; i++) {
    featuresObj[currentFeatures[i].feature] = true;
    currentFeaturesObj[currentFeatures[i].feature] = [currentFeatures[i].value]
  }
  let featuresArray = Object.keys(featuresObj);

  // useEffect (() => {
  //   console.log('has feature? ', hasFeature(currentFeatures, 'Fabric'));
  // }, [])

  useEffect (() => {
    setAllFeatures(featuresArray);
    console.log('currentFeaturesObj: ', currentFeaturesObj)
    console.log('relatedFeaturesObj: ', relatedFeaturesObj)
    console.log('allFeatures: ', featuresArray)
  }, [])


  return (
    <div>
      <CompareTable>
        <thead>
          <tr>
            <th colSpan={'3'}>Comparison<RemoveButton onClick={()=>toggleCompare()}></RemoveButton></th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Current Product</th>
            <th></th>
            <th>Related Product</th>
          </tr>
        </thead>
        <tbody>
          {allFeatures.map((feature, index) => (
            <tr key={index}>
              {currentFeaturesObj[feature] ? <td>{currentFeaturesObj[feature]}</td>: <td></td>}
              <td>{feature}</td>
              {relatedFeaturesObj[feature] ? <td>{relatedFeaturesObj[feature]}</td>: <td></td>}
            </tr>
            ))}
          {/* <tr>
            <td>Value</td>
            <td>Feature</td>
            <td>Value</td>
          </tr>
          <tr>
            <td>Value</td>
            <td>Feature</td>
            <td>Value</td>
          </tr>
          <tr>
            <td>Value</td>
            <td>Feature</td>
            <td>Value</td>
          </tr> */}
        </tbody>
      </CompareTable>
    </div>
  )
}




// const findFeatureData = () => {
//   let currentFeatObj = {};
//   let relatedFeatObj = {};
//    for (var i = 0; i < featuresArray.length; i++) {
//      for (var j = 0; j < currentFeatures.length; i++) {
//        if (featuresArray[i] === currentFeatures[j].feature) {
//          currentFeatObj[featuresArray[i]] === true;
//        }
//        if (featuresArray[i] !== currentFeatures[j] && currentFeatObj[featuresArray[i]] === undefined) {
//          currentFeatObj[featuresArray[i]] === false;
//        }
//      }
//    }
//    for (var i = 0; i < featuresArray.length; i++) {
//      for (var j = 0; j < relatedFeatures.length; i++) {
//        if (featuresArray[i] === relatedFeatures[j].feature) {
//          relatedFeatObj[featuresArray[i]] === true;
//        }
//        if (featuresArray[i] !== relatedFeatures[j] && relatedFeatObj[featuresArray[i]] === undefined) {
//          relatedFeatObj[featuresArray[i]] === false;
//        }
//      }
//    }
//    setCurrentStatus(currentFeatObj);
//    setRelatedStatus(relatedFeatObj);
//    console.log('currentFeatObj: ', currentFeatObj);
//    console.log('relatedFeatObj: ', relatedFeatObj)
// }

 // const hasFeature = (list, selectedFeature) => { // this function will tell us if the feature is present in the product
  //   let featurePresent = false;
  //   for (var i = 0; i < list.length; i++) {
  //     if (list[i].feature === selectedFeature) {
  //       console.log(list)
  //       setFeatureValue(list[i].value);
  //       featurePresent = true;
  //     }
  //   }
  //   return featurePresent;
  // }