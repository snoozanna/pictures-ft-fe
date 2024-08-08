import React, { useState } from 'react';
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
  align-items: end;
  .inputOptionsWrapper{
    display: flex;
    align-items: center;
    gap: 1rem;
    p{
    margin-block-end: 0;
    }
    input{
    width: 65px;
    }
  }
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

const Footer = ({showPics, setShowPics, llength, setLlength}) => {
  const [inputValue, setInputValue] = useState("");
  const clickHandler = () => {
    setShowPics("highlights");
    // setTimeout(()=> {
    //   setShowPics([]);
    // }, [7500])
    setTimeout(()=> {
      setShowPics("participants");
    }, [9000])


  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputButtonClick = () => {
    setLlength(Number(inputValue));
  };

  const refresh = () => {
    window.location.reload();
  }
  return (
    <FooterStyles>
      <nav>
        <a href="https://pictures-ft-update.sanity.studio/" target="_blank">
          Database
        </a>
        <Link to="/people">People</Link>
        <button onClick={refresh}>Refresh Page</button>
  <div className='inputOptionsWrapper'>
          <p>No of people: {llength}</p>
          <input
    type="number"
    value={inputValue}
    onChange={handleInputChange}
  />
  <button onClick={handleInputButtonClick}>Save</button>
       </div>
        <button onClick={clickHandler}>Show People</button>
      </nav>
    </FooterStyles>
  );
};

export default Footer;
