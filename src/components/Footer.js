import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';


import { devices } from '../styles/breakpoints';

const FooterStyles = styled.footer`
background: black;
z-index: 9999;
position:fixed;
bottom:0;
left: 0;
padding:  var(--padding);
/* padding-top: 0; */
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

const Footer = ({showPics, setShowPics}) => {
  const clickHandler = () => {
    setShowPics("highlights");
    setTimeout(()=> {
      setShowPics("none");
    }, [5000])
    setTimeout(()=> {
      setShowPics("participants");
    }, [7000])
  };

  const refresh = () => {
    window.location.reload();
  }
  return (
    <FooterStyles>
      <nav>
        <a href="https://pictures-experiment.sanity.studio/" target="_blank">
          Database
        </a>
        <Link to="/people">People</Link>
        <button onClick={refresh}>Refresh Page</button>
        
        <button onClick={clickHandler}>Show/Hide</button>
      </nav>
    </FooterStyles>
  );
};

export default Footer;
