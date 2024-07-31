import { Link, graphql } from 'gatsby';
import React, { useEffect, useState }  from 'react';
import styled from 'styled-components';
import { devices } from '../styles/breakpoints.js';
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";

import { useQuery } from "@apollo/client";

import Loader from '../components/Loader/index.js';

const AdminPageStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* height: 100%; */
  width: 100%;
  align-items: center;
  

`;



const AdminPage = () => {
 

  return (
    <>
      <AdminPageStyles>
       <a href="https://pictures-experiment.sanity.studio/" target="_blank">Database</a>
      </AdminPageStyles>
    </>
  );
};

export default AdminPage;


