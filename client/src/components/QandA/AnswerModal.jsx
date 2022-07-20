import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(200, 200, 200, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`
const ModalContainer = styled.div`
  width: 500px;
  height: 550px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
`
const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 2px;
`
const Title = styled.div`
  display: inline;
  text-align: center;
  border-bottom: 1px solid black;
  margin-bottom: 15px;
`
const AnswerBody = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px 10px;
  box-sizing: border-box;
  border: 1px solid black;
`
const Entries = styled.div`
  display: flex;
  width: 100%;
`
const EntryDivLeft = styled.div`
  flex: 1;
  margin-right: 8px;
`
const EntryDiv = styled.div`
  flex: 1;
`
const EntryInput = styled.input`
  width: 97%;
`
const Authentication = styled.label`
  font-size: 10px;
  font-style: italic;
`
const Label = styled.label`
  display: inline-block;
  margin-bottom: 4px;
`
const AnswerContainer = styled.div`
  margin-bottom: 10px;
`
const Button = styled.button`
  padding: 12px 15px;
  box-sizing: border-box;
  border: 1px solid black;
  margin-right: 12px;
  background: none;
  font-weight: bold;
  margin-top: 15px;
`
const X = styled.button`
  background: red;
  float: right;
  width: 25px;
  height: 25px;
`

export default function AnswerModal(props) {
  const [answerForm, setAnswerForm] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState([]);
  const [photoURLs, setPhotoURLs] = useState([]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(prevSource => [...prevSource, reader.result]);
    }
  }

  const handleAnswerChange = (e) => {
    setAnswerForm(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post(`/qa/questions/${props.question_id}/answers`, {
      body: answerForm,
      name: username,
      email: email,
      photos: photoURLs
    }).then(() => {
      axios.get(`/qa/questions/${props.question_id}/answers`)
        .then((response) => {
          let sortedHelpful = response.data.sort((a, b) => b.helpfulness - a.helpfulness);
          let sortedSeller = sortedHelpful.sort((a, b) => {
            const k1 = a.answerer_name === 'Seller' ? 1 : 0;
            const k2 = b.answerer_name === 'Seller' ? 1 : 0;
            return k2 - k1;
          });
          if (response.data.length <= 2) {
            props.setMoreAnswers(false);
          }
          props.setAnswers(sortedSeller.slice(0, 2));
          props.setAllAnswers(sortedSeller);
        }).catch(err => console.log(err));
    }).then(() => {
      props.setOpenAnswerModal(false);
    }).catch(err => console.error(err));
  }

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
        uploadImage(reader.result);
    };
    reader.onerror = () => {
        console.error('error posting file');
    };
  }

  const uploadImage = (base64EncodedImage) => {
    axios.post('/api/upload', ({data: base64EncodedImage}))
      .then((response) => {setPhotoURLs(prev => [...prev, response.data])})
      .catch(err => console.error(err));
  }

  return(
    <ModalBackground>
      <ModalContainer>
        <form onSubmit={handleFormSubmit}>
          <Title>
            <X onClick={() => props.setOpenAnswerModal(false)}>X</X>
            <h3>Submit Your Answer</h3>
            About {props.productName}: {props.question_body}
          </Title>
          <AnswerContainer>
            <Label>What is your answer?</Label>
            <AnswerBody type='text' value={answerForm} onChange={handleAnswerChange} maxLength='1000' required />
          </AnswerContainer>
          <Entries>
            <EntryDivLeft>
              <Label>Username</Label>
              <EntryInput type='text' placeholder='Example: jack543!' value={username} onChange={handleUsernameChange} maxLength='60' required />
            </EntryDivLeft>
            <EntryDiv>
              <Label>What is your email?</Label>
              <EntryInput type='email' placeholder='Example: jack@email.com' value={email} onChange={handleEmailChange} maxLength='60' required />
              <Authentication>For authentication purposes, you will not be emailed.</Authentication>
            </EntryDiv>
          </Entries>
          <div>
            <input type='file' onChange={handleFileInputChange} value={fileInputState}/>
            {(previewSource.length > 0 && previewSource.length <= 5) && <button onClick={handleSubmitFile}>Upload Image</button>}
          </div>
          {previewSource && (previewSource.map((image, key) => <Thumbnail src={image} key={key} width='100' height='100' />))}
          <div>
            <Button type='submit'>SUBMIT ANSWER</Button>
          </div>
        </form>
      </ModalContainer>
    </ModalBackground>
  );
}