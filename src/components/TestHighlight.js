import React, {useEffect} from "react";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import styled from "styled-components";
import test from "./../assets/images/test.jpg";


const FlexItemStyles = styled.div`
min-width: 3vw;
    width: 80%;
    max-width: 20%;
`;


const TestHighlight = ({ index, totalImages, showPics, image }) => {
  console.log("image", image)
gsap.registerPlugin(CSSPlugin);
    useEffect(() => {
      let randomDelay = Math.random() * 6000;
      // Generate a random delay value between 0 and 10 seconds.
      let animationDuration = 0.5;
       // Calculate the animation duration for each element to ensure the total duration is 10 seconds.
  
      gsap.fromTo(
        `.element-${index}`,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: animationDuration,
          delay: randomDelay / 1000,
        },
      );

     
    }, [index]);

 
   
  
    return (
      <FlexItemStyles
        className={`img-wrapper element-${index} highlight`}
        totalImages={totalImages}
      >
        {/* <img src={test} alt={`Test image ${index}`} /> */}
        <img className="img" src={image.asset.url} alt={`Image ${index}`} />
      </FlexItemStyles>
    );
  };

  export default TestHighlight;