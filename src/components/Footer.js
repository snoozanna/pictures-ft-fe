import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';


import { devices } from '../styles/breakpoints';

const FooterStyles = styled.footer`
background-color:var(--blue);
background-color:var(--orange);
z-index: 9999;
position:fixed;
bottom:0;
padding:  var(--padding);
padding-top: 0;
width: 100%;
  display: flex;
  justify-content: flex-start;
  justify-content: space-around; 
   align-items:end;
  nav{
    width: 100%;
    display: flex;
  justify-content: space-around; 
  }
  .scroller-wrapper{
    back
  }
    @media ${devices.mobileL} {
     align-items:end;
     width: 100%;
nav{
    width: 100%;
    display: flex;
  justify-content: space-around; 
  flex-direction: column;
  a{
    text-align:right;
    margin-block-end:1rem;
  }
  }
    }
`;

const Footer = () => {


  return (
    <FooterStyles>
      <nav>
        <Link to="/admin">Upload images</Link>
        <Link to="/people">People</Link>

      </nav>
    </FooterStyles>
  );
};

export default Footer;
