import React, {useEffect} from "react";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import styled from "styled-components";

const FlexItemStyles = styled.div`
  width: calc(100% / ${(props) => props.totalImages}*100);
  max-width: 100%;
  box-sizing: border-box;
  object-fit: cover;
`;


const Person = ({ index, image, totalImages, showPics }) => {
    console.log("totalImages in P", totalImages)
    useEffect(() => {
        let randomDelay = 0;
        let animationDuration = 0;
      gsap.registerPlugin(CSSPlugin);

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
  
    return (
      <FlexItemStyles
        className={`img-wrapper element-${index}`}
        totalImages={totalImages}
      >
        <img className="img" src={image.asset.url} alt={`Image ${index}`} />
      </FlexItemStyles>
    );
  };

  export default Person;