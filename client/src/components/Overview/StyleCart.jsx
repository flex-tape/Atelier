import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SizeEntry from './SizeEntry.jsx';
import QuantityEntry from './QuantityEntry.jsx';
import SizeModal from './SizeModal.jsx';
const axios = require('axios');

const Container = styled.div`
  flex: 1 125px;
  border: 1px dotted;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 30px;

  select {
    padding: 12px 15px;
    box-sizing: border-box;
    border: 1px solid black;
    margin-right: 12px;
    background: none;
    font-weight: bold;
  }

  button {
    padding: 12px 15px;
    box-sizing: border-box;
    border: 1px solid black;
    margin-right: 12px;
    background: none;
    font-weight: bold;
  }
`

const Size = styled.select`
`
const OOS = styled.select`
`
const QuantityActive = styled.select`
`
const QuantityDisabled = styled.select`
`
const Add = styled.button`
`
const AddSize = styled.button`
`

export default function StyleCart (props) {

  const [selectSize, setSelectSize] = useState('SELECT SIZE');
  const [quantity, setQuantity] = useState(1);
  const [quantityArray, setQuantityArray] = useState([]);
  const [sizeModal, setSizeModal] = useState(false);

  const styleObj = props.productStyle.skus;
  const quantityObj = props.productStyle.skus[selectSize];
  const fifteen = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  useEffect(() => {
    if (selectSize !== 'SELECT SIZE') {
      var array = [];
      var option = 1;
      for (var i = 0; i < quantityObj.quantity; i++) {
        array.push(option);
        option++;
      }
      setQuantityArray(array);
    }
  }, [selectSize]);

  useEffect(() => {
    setSelectSize('SELECT SIZE');
    setQuantity(1);
  }, [props.styleID]);

  // const handleCart = () => {
  //   console.log(props.cart);
  //   const array = props.cart.slice();
  //   const newAdd = {
  //     sku_id: selectSize,
  //     count: quantity
  //   }
  //   array.push(newAdd);
  //   props.setCart(array);
  // }

  const handleAPICart = () => {
    for (var i = 0; i < quantity; i++) {
      axios.post('/cart', {
        sku_id: selectSize
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }


  return (
      <Container>
        <div>
        {styleObj !== null && <Size value={selectSize} onChange={()=> setSelectSize(event.target.value)}>
          <option value ='SELECT SIZE'>SELECT SIZE</option>
          {Object.keys(styleObj).map((key) => (
            <SizeEntry key={key} index={key} value={styleObj[key]}/>
          ))}
        </Size>}

        {styleObj === null && <OOS disabled>
          <option value='-'>OUT OF STOCK</option>
        </OOS>}

        {selectSize !== 'SELECT SIZE' && <QuantityActive value={quantity} onChange={()=> setQuantity(event.target.value)}>
          {/* <option value='1'>1</option> */}
          {fifteen.length <= quantityArray.length ? fifteen.map((num) => (<QuantityEntry key={num} num={num}/>)) : quantityArray.map((num) => (<QuantityEntry key={num} num={num}/>))}
        </QuantityActive>}

        {selectSize === 'SELECT SIZE' && <QuantityDisabled disabled>
          <option value='-'>-</option>
        </QuantityDisabled>}
        </div>
        <div>
        {styleObj !== null && selectSize !== 'SELECT SIZE' && <Add onClick={handleAPICart}>
          ADD TO CART +
        </Add>}

        {styleObj !== null && selectSize === 'SELECT SIZE' && <AddSize onClick={()=> setSizeModal(true)}>
          ADD TO CART +
        </AddSize>}
        </div>

        {sizeModal && <SizeModal setSizeModal={setSizeModal} />}

      </Container>
  )
}

