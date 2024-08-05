import React, {useEffect} from "react";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import styled from "styled-components";
import test from "./../assets/images/test.jpg";

const number = 37;
const FlexItemStyles = styled.div`
   ${'' /* min-width: ${(props) => props.$imgWidth}%; */}
   min-width: 3vw;
   width:80%;
    ${'' /* background-color: #3498db; */}
    ${'' /* transform: scale(calc(1 / 4 * ${(props) => props.$imgWidth})); */}
    
`;


const TestPerson = ({ index, totalImages, totalImagesSqInt, showPics }) => {

    const imgWidth = Math.round(100/totalImagesSqInt);

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(CSSPlugin);
    useEffect(() => {
        let randomDelay = 0;
        let animationDuration = 0;

 
      if (showPics === "highlights") {
        randomDelay = 0.2 * 10000
       animationDuration = 2;
      } else if (showPics === "participants"){
         randomDelay = Math.random() * 10000;
           // Generate a random delay value between 0 and 10 seconds.
         animationDuration = 0.5;
            // Calculate the animation duration for each element to ensure the total duration is 10 seconds.
      }
  
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

    useEffect(() => {
      // Trigger the scroll animation
      
      gsap.to(window, { 
      duration: 20, 
      scrollTo: { y: '#target', offsetY: 50 }, 
      delay:2, 
      ease: "power2.inOut" });
    }, []);

   
  
    return (
      <FlexItemStyles
        className={`img-wrapper element-${index}`}
        totalImages={totalImages}
        $imgWidth={imgWidth}
      >
        <img src={test} alt={`Test image ${index}`} />
      </FlexItemStyles>
    );
  };

  export default TestPerson;