// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import ComparisonModal from './ComparisonModal.jsx'
// import { IDContext } from '../App.jsx';



// const PrimaryImage = styled.img`
// // display: flex;
// // justify-content: center;
// // align-items: center;
// // position: absolute;
// height: 280px;
// width: 250px;
// object-fit: contain;
// margin: 10px;
// background-color: #f0ffff;
// `

// const RemoveButton = styled.button`
// position: absolute;
// z-index: 3;
// left: 400px;
// top: 200px;
// `

// const OutfitCardDiv = styled.div`
// position: relative;
// height: 400px;
// width: 270px;
// display: block;
// align-items: center;
// border: 1px solid lightgray;
// box-shadow: 7px 7px 7px lightgray;
// margin-right: 50px;
// margin-bottom: 30px;
// `

// const StrikePrice = styled.div`
// text-decoration: line-through;
// text-decoration-thickness: 0.15rem;
// `

// const SalesPrice = styled.div`
// color: red;
// `

// export default function OutfitCard({id, setID, outfitStyleInfo, outfitProductInfo, addToList, removeFromList, hasLoaded}) {
//   const [hoverStatus, setHoverStatus] = useState(false);

//   let productID = useContext(IDContext);

//   let onHover = () => {
//     setHoverStatus(true);
//   }
//   let offHover = () => {
//     setHoverStatus(false);
//   }

//   // useEffect (() => {
//   //   console.log('outfitStyleInfo: ', outfitStyleInfo)
//   // }, [])

// return (
//   <>
//   {hasLoaded && <OutfitCard>
//             <PrimaryImage src={outfitStyleInfo.image} onMouseEnter={onHover} onMouseLeave={offHover} onClick={() => setID(item)}></PrimaryImage>
//             {hoverStatus ? <div>Thumbnail photos go here</div> : <div onClick={() => setID(id)}><div>{outfitProductInfo.category}</div>
//             <div >{outfitProductInfo.name}</div>
//             {outfitStyleInfo.sale_price !== null ?
//             <div><StrikePrice>{outfitStyleInfo.default_price}</StrikePrice><SalesPrice>{outfitStyleInfo.sale_price}</SalesPrice></div> : <div>{outfitStyleInfo.default_price}</div>}
//             <div>Star rating goes here</div></div>}
//           </OutfitCard>}
//   </>

// )


// }