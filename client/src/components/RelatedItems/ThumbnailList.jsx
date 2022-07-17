/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import RelatedCard from './RelatedCard.jsx'

const ThumbnailImage = styled.img`
// display: flex;
// justify-content: center;
// align-items: center;
// position: absolute;
height: 50px;
width: 50px;
object-fit: contain;
// margin: 10px;
background-color: #f0ffff;
`

export default function ThumbnailList ({ id, setRelatedStyleInfo, thumbnailPhotos }) {



  return (
    <div>
      {thumbnailPhotos.map((photo, index) => (
        <ThumbnailImage key={index} src={photo.thumbnail_url} />
      ))}
    </div>
  )
}