/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { CompareContext } from './RelatedCard.jsx';

const CompareTable = styled.table`
  position: absolute;
  z-index: 2;
  left: 400px;
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
export default function ComparisonModal () {


  let compareProducts = useContext(CompareContext);


  return (
    <div>
      <CompareTable>
        <thead>
          <tr>
            <th colSpan={'3'}>Comparison</th>
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
          <tr>
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
            {/* <td> <button>X</button></td> */}
          </tr>
        </tbody>
      </CompareTable>
    </div>
  )
}