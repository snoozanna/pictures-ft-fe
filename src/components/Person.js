import React, { useEffect } from "react";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import styled from "styled-components";
import { urlFor } from "../utils/sanityImageUrl.js";

gsap.registerPlugin(CSSPlugin);

const FlexItemStyles = styled.div`
  min-width: 3vw;
  width: 100%;
`;

const Person = ({ index, totalImages, totalImagesSqInt, image, cols }) => {
  const imgWidth = Math.round(100 / totalImagesSqInt);

  useEffect(() => {
    // Calculate row number (top to bottom)
    const row = Math.floor(index / cols);
    
    // Stagger delay based on row position
    const delayPerRow = 0.3; // seconds between rows
    const staggerDelay = row * delayPerRow;
    
    const animationDuration = 0.8;

    gsap.fromTo(
      `.element-${index}`,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: animationDuration,
        delay: staggerDelay,
        ease: "power2.out"
      }
    );
  }, [index, cols]);

  const optimizedUrl = urlFor(image.asset.url)
    .width(400)
    .format("webp")
    .quality(75)
    .url();

  return (
    <FlexItemStyles
      className={`img-wrapper element-${index}`}
      totalImages={totalImages}
      $imgWidth={imgWidth}
    >
      <img
        className="img"
        src={optimizedUrl}
        alt={`Image ${index}`}
        loading="lazy"
        decoding="async"
        width="100%"
      />
    </FlexItemStyles>
  );
};

export default Person;