import React from 'react';
import styled from 'styled-components';

const Descriptions = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
  width: 90%;
`

const SingleDes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  font-size: 0.8em;
`

const Characteristics = styled.div`
  font-color: inherit;
  font-size: 1em;
  padding-bottom: 0.5em;
  width: 10%;
`

export default function DescriptionBar(props) {
  console.log(props.label)


  const descriptionMap = {
    'Size': [
      'A size too small',
      '½ a size too small',
      'Perfect',
      '½ a size too big',
      'A size too wide'
    ],
    'Width': [
      'Too narrow',
      'Slightly narrow',
      'Perfect',
      'Slightly wide',
      'Too wide'
    ],
    'Comfort': [
      'Uncomfortable',
      'Slightly uncomfortable',
      'Ok',
      'Comfortable',
      'Perfect'
    ],
    'Quality': [
      'Poor',
      'Below average',
      'What I expected',
      'Pretty great',
      'Perfect'
    ],
    'Length': [
      'Runs Short',
      'Runs slightly short',
      'Perfect',
      'Runs slightly long',
      'Runs long'
    ],
    'Fit': [
      'Runs tight',
      'Runs slightly tight',
      'Perfect',
      'Runs slightly long',
      'Runs long']
  }



  return (
    <>
      <Characteristics>
      </Characteristics>
      <Descriptions>
        {descriptionMap[props.label].map((desc, index) => {
          if (index === 0 || index === 4) {
            return (
              <SingleDes>
                <input type="radio" name={props.label} ></input>
                <div>{desc}</div>
              </SingleDes>
            )
          }
        })}
      </Descriptions>
    </>
  )
}