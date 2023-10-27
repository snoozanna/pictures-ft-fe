import { Link, graphql } from 'gatsby';
import React, { useEffect, useState }  from 'react';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints.js';



import Loader from '../components/Loader/index.js';

const UploadPageStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* height: 100%; */
  width: 100%;
  align-items: center;
 

`;



const UploadPage = () => {

  const clickHandler = () => {

  }


  return (
    <>
     <UploadPageStyles>
     <p>Hello</p>
      </UploadPageStyles>
    </>
  );
};

export default UploadPage;


