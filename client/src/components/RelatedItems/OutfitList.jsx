/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { IDContext } from '../App.jsx';
import axios from 'axios';
import styled from 'styled-components';
// import OutfitCard from './OutfitCard.jsx'
import { BsPlus } from 'react-icons/bs';


const OutfitCarousel = styled.div`
display: flex;
max-width: 1300px;
overflow: hidden;
`

const AddCard = styled.div`
position: relative;
height: 400px;
width: 270px;
display: block;
align-items: center;
border: 1px solid lightgray;
box-shadow: 7px 7px 7px lightgray;
margin-right: 50px;
margin-bottom: 30px;
`

const AddProduct = styled.h2 `
position: absolute;
left: 65px
`

const PlusIcon = styled(BsPlus)`
// display: flex;
// justify-content: center;
// align-items: center;
// position: absolute;
height: 250px;
width: 250px;
margin: 10px;
background-color: #f0ffff;
`


const PrimaryImage = styled.img`
// display: flex;
// justify-content: center;
// align-items: center;
// position: absolute;
height: 280px;
width: 250px;
object-fit: contain;
margin: 10px;
background-color: #f0ffff;
`

const RemoveButton = styled.button`
position: absolute;
z-index: 3;
left: 400px;
top: 200px;
`

const OutfitCard = styled.div`
position: relative;
height: 400px;
width: 270px;
display: block;
align-items: center;
border: 1px solid lightgray;
box-shadow: 7px 7px 7px lightgray;
margin-right: 50px;
margin-bottom: 30px;
`

const StrikePrice = styled.div`
text-decoration: line-through;
text-decoration-thickness: 0.15rem;
`

const SalesPrice = styled.div`
color: red;
`


export default function OutfitList ({ setID }) {
  const [outfitList, setOutfitList] = useState([]);
  // const [preList, setPrelist] = useState([]);
  const [outfitLength, setOutfitLength] = useState([0, 4]);
  const [outfitProductInfo, setOutfitProductInfo] = useState({name: 'Camo Onesite', category: 'Jackets'});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hoverStatus, setHoverStatus] = useState(false);
  const [outfitStyleInfo, setOutfitStyleInfo] = useState({default_price: '$140.00', sale_price: null, image: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'});

  let productID = useContext(IDContext);
  const preList = [];

  const getOutfitInfo = () => {
    axios.get(`/products/${productID}`)
      .then((res) => {
      let outfitLevelInfo = {name: res.data.name, category: res.data.category}
      setOutfitProductInfo(outfitLevelInfo);
      })
      .catch(() => {
        console.log('GET request failed for relatedInfo')
      })
    axios.get(`/products/${productID}/styles`)
      .then((res) => {
      let primaryPhoto = '';
      if (res.data.results[0].photos[0].url === null) {
        primaryPhoto = 'https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80';
      } else {
        primaryPhoto = res.data.results[0].photos[0].url;
      }
      let styleInfo = {default_price: res.data.results[0].original_price, sale_price: res.data.results[0].sale_price, image: primaryPhoto}
      setOutfitStyleInfo(styleInfo);
      })
      .then(() => {
        setHasLoaded(true)
      })
      .catch((err) => {
        console.log('GET request failed for productStyles')
      })
  }

  const addToList = (id) => {
    if (outfitList.indexOf(id) === -1) {
      outfitList.push(id);
      setOutfitList(outfitList);
    }

  }

  const removeFromList = (id) => {
    let index = outfitList.indexOf(id);
    if (index > -1) {
      outfitList.splice(index, 1);
    }
  }

  useEffect(() => {
    getOutfitInfo();
  }, [productID])

  // useEffect(() => {
  //   setOutfitList();
  // }, [outfitList])

  const seeChange = () => {
    console.log(outfitList)
  }

  let onHover = () => {
    setHoverStatus(true);
  }
  let offHover = () => {
    setHoverStatus(false);
  }

  return (
    <div>
      <div onClick={seeChange}>
        Hello
      </div>
      <OutfitCarousel>
      <AddCard onClick={() => addToList(productID)}><PlusIcon /><div><AddProduct>Add to Fit!</AddProduct></div></AddCard>
        { outfitList.length > 0 ? outfitList.map((item, index) => (
          <div key={index} >

            <OutfitCard>
            <PrimaryImage src={outfitStyleInfo.image} onMouseEnter={onHover} onMouseLeave={offHover} onClick={() => setID(item)}></PrimaryImage>
            {hoverStatus ? <div>Thumbnail photos go here</div> : <div onClick={() => setID(item)}><div>{outfitProductInfo.category}</div>
            <div >{outfitProductInfo.name}</div>
            {outfitStyleInfo.sale_price !== null ?
            <div><StrikePrice>{outfitStyleInfo.default_price}</StrikePrice><SalesPrice>{outfitStyleInfo.sale_price}</SalesPrice></div> : <div>{outfitStyleInfo.default_price}</div>}
            <div>Star rating goes here</div></div>}
          </OutfitCard>

          </div>
        )) : null}
      </OutfitCarousel>
    </div>

  )
}



//   const adding = () => {
//     addToList(productID);
//   }

//   const removing = () => {
//   removeFromList(productID);
//   }

//  const seeChange = () => {
//    console.log(outfitList)
//  }



{/* <OutfitCarousel>
        {outfitList.map((item, index) => (
          <div key={index} >
            {item === 1 ? <AddCard onClick={() => addToList(productID)}><PlusIcon /><div><AddProduct>Add to Fit!</AddProduct></div></AddCard> :
            <OutfitCard>
            <PrimaryImage src={outfitStyleInfo.image} onMouseEnter={onHover} onMouseLeave={offHover} onClick={() => setID(item)}></PrimaryImage>
            {hoverStatus ? <div>Thumbnail photos go here</div> : <div onClick={() => setID(item)}><div>{outfitProductInfo.category}</div>
            <div >{outfitProductInfo.name}</div>
            {outfitStyleInfo.sale_price !== null ?
            <div><StrikePrice>{outfitStyleInfo.default_price}</StrikePrice><SalesPrice>{outfitStyleInfo.sale_price}</SalesPrice></div> : <div>{outfitStyleInfo.default_price}</div>}
            <div>Star rating goes here</div></div>}
          </OutfitCard>
            }
          </div>
        ))}
      </OutfitCarousel> */}

              {/* {outfitList.map((item, index) => (
          <OutfitCard id={item} key={index} setID={setID} outfitProductInfo={outfitProductInfo} outfitStyleInfo={outfitStyleInfo}
          addToList={addToList} removeFromList={removeFromList} hasLoaded={hasLoaded}/>
        ))} */}